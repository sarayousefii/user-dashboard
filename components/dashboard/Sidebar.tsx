"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const links = [
  { name: "داشبورد", path: "/dashboard", adminOnly: false },
  { name: "کاربران", path: "/dashboard/users", adminOnly: true },
];

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const path = usePathname();
  const { data: session } = useSession();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-white border-r p-4 transform transition-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex md:flex-col`}
      >
        <h2 className="text-xl font-bold mb-6">پنل مدیریت</h2>
        <nav className="flex flex-col gap-2">
          {links.map((item) => {
            if (item.adminOnly && session?.user?.role !== "admin") return null;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`p-2 rounded-md transition ${
                  path === item.path ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
