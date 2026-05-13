import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, company, service, message, locale } = data;

    // TODO: Integrate with Resend, SendGrid, or Nodemailer here.
    // Example with Resend:
    /*
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Apex Zone Website <onboarding@resend.dev>',
        to: ['hello@apexzone.us'],
        subject: `[Website Inquiry] ${service || 'General'} - ${name}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Service:</strong> ${service || 'N/A'}</p>
          <p><strong>Locale:</strong> ${locale}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
    });
    */

    console.log('Contact form data received:', data);

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send' }, { status: 500 });
  }
}
