"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4 relative overflow-hidden">

      <svg
        className="absolute top-0 right-0 w-96 opacity-20 -z-10 animate-pulse pointer-events-none select-none"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="300" cy="300" r="300" fill="#A78BFA" />
        <circle cx="200" cy="200" r="150" fill="#F472B6" opacity="0.6" />
        <circle cx="400" cy="400" r="100" fill="#3B82F6" opacity="0.4" />
      </svg>

      <Card className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl p-12 max-w-lg w-full text-center border border-gray-100 animate-fadeIn">
        <CardContent>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            خوش آمدید به داشبورد من
          </h1>
          <p className="mb-10 text-gray-700 text-lg sm:text-xl">
            مدیریت داده‌ها و پیگیری فعالیت‌هایتان را در یکجا انجام دهید. برای ادامه وارد شوید یا ثبت‌نام کنید.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/login">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transform transition duration-300 hover:scale-105 hover:rotate-1">
                ورود
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600 transform transition duration-300 hover:scale-105 hover:rotate-1">
                ثبت‌نام
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-16 text-gray-400 text-sm opacity-70 animate-fadeIn delay-300">
        &copy; {new Date().getFullYear()} داشبورد من. تمامی حقوق محفوظ است.
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </main>
  );
}
