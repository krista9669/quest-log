import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("email" in body) ||
    !("message" in body) ||
    typeof body.email !== "string" ||
    typeof body.message !== "string"
  ) {
    return NextResponse.json(
      { error: "A valid email and message are required" },
      { status: 400 }
    );
  }

  const email = body.email.trim();
  const message = body.message.trim();

  if (
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !message ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { error: "Enter a valid email and a message under 5,000 characters" },
      { status: 400 }
    );
  }

  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");

  if (!user || !pass) {
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local, then restart the server.",
      },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: user,
      to: "krishithaaaa@gmail.com",
      replyTo: email,
      subject: `New message from ${email}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
      text: `New contact form submission\n\nFrom: ${email}\n\n${message}`,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "EAUTH"
    ) {
      console.error(
        "Email send error: Gmail rejected the configured credentials (EAUTH)."
      );
      return NextResponse.json(
        {
          error:
            "Gmail rejected the mail credentials. Replace GMAIL_APP_PASSWORD in .env.local with a valid Google App Password, then restart the dev server.",
        },
        { status: 503 }
      );
    }

    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Email could not be sent. Please try again later." },
      { status: 500 }
    );
  }
}
