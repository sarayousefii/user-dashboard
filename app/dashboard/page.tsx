"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="p-8">در حال بارگذاری...</p>;
  if (!session) return <p className="p-8">شما وارد نشده‌اید.</p>;

  return (
    <div className="">
      <div className="max-w-3xl mx-auto">
        <Card className="w-full p-8 shadow-xl rounded-3xl animate-fadeIn">
          <CardContent className="space-y-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">
              سلام، {session.user?.name}
            </h1>

          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
