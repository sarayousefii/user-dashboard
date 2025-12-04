"use client";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string;
}

interface Props {
  users: User[];
  currentPage: number;
  usersPerPage: number;
  sortKey: keyof User;
  sortAsc: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onPageChange: (page: number) => void;
  onSort: (key: keyof User) => void;
}

const UsersTable = ({
  users,
  currentPage,
  usersPerPage,
  sortKey,
  sortAsc,
  onEdit,
  onDelete,
  onPageChange,
  onSort,
}: Props) => {
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  if (users.length === 0)
    return <p className="text-gray-600 text-sm p-4">هیچ کاربری یافت نشد.</p>;

  return (
    <div className="w-full overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            {(["id", "name", "email", "role"] as (keyof User)[]).map((key) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer whitespace-nowrap hover:text-gray-900 transition"
                onClick={() => onSort(key)}
              >
                {key.toUpperCase()} {sortKey === key ? (sortAsc ? "▲" : "▼") : ""}
              </th>
            ))}
            <th className="px-6 py-3 text-sm font-semibold text-gray-700">
              عملیات
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {currentUsers.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                {u.id}
              </td>

              <td className="px-6 py-4 text-sm text-gray-900 font-medium whitespace-nowrap">
                {u.name}
              </td>

              <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                {u.email}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    u.role === "admin"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {u.role}
                </span>
              </td>

              <td className="px-6 py-4 flex gap-2 whitespace-nowrap">
                <Button size="sm" variant="outline" onClick={() => onEdit(u)}>
                  ویرایش
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(u.id)}
                >
                  حذف
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 mb-4 gap-2">
        <Button
          size="sm"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          قبلی
        </Button>

        <span className="text-sm">
          {currentPage} / {totalPages}
        </span>

        <Button
          size="sm"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
};

export default UsersTable;
