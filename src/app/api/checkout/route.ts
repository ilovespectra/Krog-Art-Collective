import { NextRequest, NextResponse } from 'next/server';

interface CartItem {
  name: string;
  price: string | number;
  quantity: string | number;
  description?: string;
}

interface LineItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      description: string;
    };
    unit_amount: number;
  };
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Create line items for Stripe
    const lineItems = items.map((item: CartItem) => {
      const unitAmount = Math.round(parseFloat(String(item.price)) * 100);
      if (isNaN(unitAmount) || unitAmount <= 0) {
        throw new Error(`Invalid price for item ${item.name}: ${item.price}`);
      }
      
      const quantity = parseInt(String(item.quantity), 10);
      if (isNaN(quantity) || quantity <= 0) {
        throw new Error(`Invalid quantity for item ${item.name}: ${item.quantity}`);
      }
      
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            description: item.description || '',
          },
          unit_amount: unitAmount,
        },
        quantity: quantity,
      };
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Build form data for Stripe API
    const formData = new URLSearchParams();
    formData.append('payment_method_types[0]', 'card');
    formData.append('mode', 'payment');
    formData.append('success_url', `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`);
    formData.append('cancel_url', `${baseUrl}/cart`);

    lineItems.forEach((item: LineItem, index: number) => {
      const prefix = `line_items[${index}]`;
      formData.append(`${prefix}[price_data][currency]`, item.price_data.currency);
      formData.append(`${prefix}[price_data][product_data][name]`, item.price_data.product_data.name);
      formData.append(`${prefix}[price_data][product_data][description]`, item.price_data.product_data.description);
      formData.append(`${prefix}[price_data][unit_amount]`, item.price_data.unit_amount.toString());
      formData.append(`${prefix}[quantity]`, item.quantity.toString());
    });

    // Create checkout session using Stripe API directly
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Stripe error:', data);
      return NextResponse.json(
        { error: data.error?.message || 'Failed to create checkout session' },
        { status: 500 }
      );
    }

    return NextResponse.json({ sessionId: data.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create checkout session';
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
