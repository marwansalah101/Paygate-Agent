import { NextResponse } from "next/server";
import type { DemoRequestFieldErrors, DemoRequestPayload } from "@/types/demoRequest";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Partial<DemoRequestPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const errors: DemoRequestFieldErrors = {};

  if (!body.name || body.name.trim().length < 2) {
    errors.name = "Enter your full name.";
  }
  if (!body.company || body.company.trim().length < 2) {
    errors.company = "Enter your company name.";
  }
  if (!body.email || !EMAIL_RE.test(body.email)) {
    errors.email = "Enter a valid work email.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 422 });
  }

  console.log("[demo-request]", {
    name: body.name,
    company: body.company,
    email: body.email,
    phone: body.phone ?? null,
    message: body.message ?? null,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true, message: "Request received." });
}
