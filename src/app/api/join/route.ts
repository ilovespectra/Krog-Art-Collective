import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { nickname, email, phone, mediums, tools, message } = await request.json();

    if (!nickname || !email || !phone) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const mediumsList = mediums.length > 0 ? mediums.join(', ') : 'Not specified';
    const toolsList = tools.length > 0 ? tools.join(', ') : 'Not specified';

    const emailContent = `
New Join Request from Kolektiv Krog Website

Name/Nickname: ${nickname}
Email: ${email}
Phone: ${phone}

Art Mediums Interested In:
${mediumsList}

Tools Interested In:
${toolsList}

Message:
${message}
    `;

    // Send email using Resend
    const result = await resend.emails.send({
      from: 'hello@kolektivkrog.si',
      to: 'join@kolektivkrog.si',
      replyTo: email,
      subject: `New membership request from ${nickname}`,
      text: emailContent,
    });

    if (result.error) {
      console.error('Email send error:', result.error);
      return Response.json(
        { error: `Email service error: ${result.error.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', result.data?.id);

    return Response.json({ 
      success: true,
      message: 'Your membership request has been sent successfully!'
    });
  } catch (error) {
    console.error('Join submission error:', error);
    return Response.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
