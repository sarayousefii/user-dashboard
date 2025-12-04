// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_URL = "http://localhost:5000/users";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    const res = await fetch(API_URL);
    const users = await res.json();

    const existingUser = users.find((u: any) => u.email === email);
    if (existingUser) {
      return NextResponse.json({ message: "این ایمیل قبلاً ثبت شده" }, { status: 400 });
    }

    const newUser = { id: Date.now(), name, email, password, role: "user" }; // نقش پیش‌فرض "user"

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "خطا در سرور" }, { status: 500 });
  }
}
