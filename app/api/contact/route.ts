import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Please fill out all fields." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !to) {
      return NextResponse.json(
        { ok: false, error: "Server email is not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      // still need to verify erolcetinok.com in Resend and use contact@erolcetinok.com
      from: "Erol Cetinok <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `Contact form: ${firstName} ${lastName}`,
      text: `From: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message." },
      { status: 500 }
    );
  }
}