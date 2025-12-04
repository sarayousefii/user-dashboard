"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import toast from "react-hot-toast";

interface UserFormProps {
  initialData?: { name: string; email: string; role: string; password: string };
  isEditing?: boolean;
  onSubmit: (data: { name: string; email: string; role: string; password: string }) => void;
  onCancel: () => void;
}

const UserForm = ({ initialData, isEditing, onSubmit, onCancel }: UserFormProps) => {
  const [form, setForm] = useState({ name: "", email: "", role: "user", password: "" });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("لطفاً همه فیلدها را پر کنید");
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="mb-4 p-4 max-w-md bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-2">{isEditing ? "ویرایش کاربر" : "افزودن کاربر"}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input name="name" value={form.name} onChange={handleChange} placeholder="نام" required />
        <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="ایمیل" required />
        <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="پسوورد" required />

        <Select value={form.role} onValueChange={(val) => setForm({ ...form, role: val })}>
          <SelectTrigger>
            <SelectValue placeholder="نقش" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">کاربر عادی</SelectItem>
            <SelectItem value="admin">ادمین</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2 mt-2">
          <Button type="submit" className="bg-green-600 hover:bg-green-700">{isEditing ? "ذخیره تغییرات" : "افزودن"}</Button>
          <Button type="button" variant="outline" onClick={onCancel}>لغو</Button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
