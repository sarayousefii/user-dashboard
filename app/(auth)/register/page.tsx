"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "خطا در ثبت‌نام");
        return;
      }

      // لاگین خودکار بعد از ثبت‌نام
      const loginResult = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (loginResult?.error) {
        setError("خطا در ورود خودکار");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("خطا در سرور");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4">
      <Card className="max-w-sm w-full p-8 shadow-2xl rounded-3xl">
        <CardContent>
          <h1 className="text-2xl font-bold mb-6 text-center">ثبت‌نام</h1>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input name="name" value={form.name} onChange={handleChange} placeholder="نام" required />
            <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="ایمیل" required />
            <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="رمز عبور" required />
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">ثبت‌نام</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
