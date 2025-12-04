"use client"; // ⭐ حتما اول فایل

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // ⚡️ App Router
import { useEffect } from "react";
import React from "react";

export default function withAdmin<T extends {}>(Component: React.ComponentType<T>) {
  const AdminComponent: React.FC<T> = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return;
      if (!session || session.user.role !== "admin") {
        router.replace("/unauthorized");
      }
    }, [session, status, router]);

    if (status === "loading") return <p>در حال بررسی دسترسی...</p>;
    if (!session || session.user.role !== "admin") return null;

    return <Component {...props} />;
  };

  return AdminComponent;
}
