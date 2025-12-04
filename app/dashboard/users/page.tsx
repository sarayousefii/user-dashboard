"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import StatsCard from "@/components/dashboard/StatsCard";
import UserForm from "@/components/dashboard/users/UserForm";
import UsersTable from "@/components/dashboard/users/UsersTable";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string;
}

const UsersPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof User>("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const usersPerPage = 5;

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/login");
    if (session?.user?.role !== "admin") router.push("/dashboard");
    fetchUsers();
  }, [session, status, router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("آیا از حذف این کاربر مطمئن هستید؟")) return;
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== id));
        toast.success("کاربر حذف شد");
      } else toast.error("خطا در حذف کاربر");
    } catch (err) { toast.error("خطا در حذف کاربر"); }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData: { name: string; email: string; role: string; password: string }) => {
    try {
      if (editingUser) {
        await fetch(`http://localhost:5000/users/${editingUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editingUser, ...formData }),
        });
        toast.success("ویرایش انجام شد");
      } else {
        const newUser = { ...formData, id: Date.now() };
        await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
        toast.success("کاربر اضافه شد");
      }
      fetchUsers();
      setIsFormOpen(false);
      setEditingUser(null);
    } catch (err) { toast.error("خطا در عملیات"); }
  };

  const filteredUsers = users
    .filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortKey] ?? "";
      const bVal = b[sortKey] ?? "";
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });

  return (
    <div className="">
      <Toaster position="top-right" />

      <StatsCard
        total={users.length}
        admins={users.filter(u => u.role === "admin").length}
        regular={users.filter(u => u.role !== "admin").length}
      />

      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
        <Button onClick={() => { setEditingUser(null); setIsFormOpen(true); }} className="bg-blue-600 hover:bg-blue-700">افزودن کاربر</Button>
        <Input placeholder="جستجو..." value={search} onChange={e => setSearch(e.target.value)} className="sm:max-w-sm" />
      </div>

      {isFormOpen && (
        <UserForm
          initialData={editingUser ?? undefined}
          isEditing={!!editingUser}
          onSubmit={handleFormSubmit}
          onCancel={() => { setIsFormOpen(false); setEditingUser(null); }}
        />
      )}

      <UsersTable
        users={filteredUsers}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        sortKey={sortKey}
        sortAsc={sortAsc}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPageChange={setCurrentPage}
        onSort={setSortKey}
      />
    </div>
  );
};

export default UsersPage;
