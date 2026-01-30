import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { toolIds, date, startTime, endTime, userName, userEmail, userPhone, purpose } = await request.json();

    if (!toolIds || !date || !userName || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Draft email body
    const emailBody = `
Dear Krog Art Collective,

I would like to book the following tools for use:
- Tool IDs: ${toolIds.join(', ')}
- Date: ${date}
- Time: ${startTime} - ${endTime}
- Purpose: ${purpose}

My contact information:
- Name: ${userName}
- Email: ${userEmail}
- Phone: ${userPhone}

Please confirm availability and any additional requirements.

Thank you,
${userName}
    `.trim();

    // Create mailto URL
    const mailtoUrl = `mailto:tools@krog-art.si?subject=Tool Booking Request for ${date}&body=${encodeURIComponent(emailBody)}`;

    return NextResponse.json({
      success: true,
      mailtoUrl,
      emailBody,
      message: 'Email draft prepared. Click the link or copy the content to send your booking request.',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to prepare email draft';
    console.error('Email draft error:', error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
