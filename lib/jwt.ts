// BACKEND: helper برای ساخت و بررسی JWT
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!; // مطمئن شو JWT_SECRET در .env هست

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
