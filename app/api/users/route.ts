import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://localhost:4000/users"); // آدرس json-server
    const users = await res.json();

    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
  }
}
