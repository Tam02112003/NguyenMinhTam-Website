import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Vui lòng điền đầy đủ tên, email hợp lệ và nội dung." },
      { status: 400 }
    );
  }

  const { CONTACT_SMTP_USER, CONTACT_SMTP_PASS, CONTACT_TO_EMAIL } = process.env;

  if (!CONTACT_SMTP_USER || !CONTACT_SMTP_PASS) {
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: CONTACT_SMTP_USER, pass: CONTACT_SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: CONTACT_SMTP_USER,
      to: CONTACT_TO_EMAIL || CONTACT_SMTP_USER,
      replyTo: email,
      subject: `[Portfolio] New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Không gửi được email, vui lòng thử lại sau." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
