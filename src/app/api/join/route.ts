import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { nickname, email, phone, mediums, tools, message } = await request.json();

    if (!nickname || !email || !phone) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure nodemailer (update with your email config)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

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

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'join@kolektivkrog.si',
      replyTo: email,
      subject: `New membership request from ${nickname}`,
      text: emailContent,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Join submission error:', error);
    return Response.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
