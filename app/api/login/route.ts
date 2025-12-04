import { NextRequest, NextResponse } from "next/server";

const API_URL = "http://localhost:5000/users";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const res = await fetch(API_URL);
    const users = await res.json();

    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      const { password, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword, { status: 200 });
    } else {
      return NextResponse.json({ message: "ایمیل یا رمز عبور اشتباه است" }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json({ message: "خطا در سرور" }, { status: 500 });
  }
}
