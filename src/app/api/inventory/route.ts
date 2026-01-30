import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const inventoryPath = path.join(process.cwd(), 'src/data/inventory.json');

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items to update' },
        { status: 400 }
      );
    }

    // Read current inventory
    const inventoryData = await fs.readFile(inventoryPath, 'utf-8');
    const inventory = JSON.parse(inventoryData);

    // Update stock for purchased items
    for (const item of items) {
      const product = inventory.products.find((p: { id: string }) => p.id === item.id);
      if (product) {
        product.stock = Math.max(0, product.stock - item.quantity);
      }
    }

    // Write updated inventory
    await fs.writeFile(inventoryPath, JSON.stringify(inventory, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Inventory updated successfully',
      inventory,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update inventory';
    console.error('Inventory update error:', error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const inventoryData = await fs.readFile(inventoryPath, 'utf-8');
    const inventory = JSON.parse(inventoryData);
    return NextResponse.json(inventory);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to read inventory';
    console.error('Inventory read error:', error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
