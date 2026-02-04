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

    // Return the mailto link that opens the user's email client
    const mailtoLink = `mailto:join@kolektivkrog.si?subject=New membership request from ${encodeURIComponent(nickname)}&body=${encodeURIComponent(emailContent)}&reply-to=${encodeURIComponent(email)}`;

    return Response.json({ 
      success: true,
      mailtoLink: mailtoLink
    });
  } catch (error) {
    console.error('Join submission error:', error);
    return Response.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
