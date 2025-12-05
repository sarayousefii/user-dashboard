"use client";

import { useSession, signOut } from "next-auth/react";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-white border-b px-4 py-3 flex items-center justify-between md:px-6">
      <button
        className="md:hidden p-2 rounded hover:bg-gray-100"
        onClick={toggleSidebar}
      >
        <span className="sr-only">باز کردن منو</span>
        ☰
      </button>

      <h1 className="font-semibold text-lg">Dashboard</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">{session?.user?.email}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600"
        >
          خروج
        </button>
      </div>
    </header>
  );
}
