"use client";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  total: number;
  admins: number;
  regular: number;
}

const StatsCard = ({ total, admins, regular }: Props) => (
  <Card className="mb-4">
    <CardContent className="flex gap-4">
      <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded">کل کاربران: {total}</div>
      <div className="bg-green-100 text-green-800 px-4 py-2 rounded">ادمین‌ها: {admins}</div>
      <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded">کاربران عادی: {regular}</div>
    </CardContent>
  </Card>
);

export default StatsCard;
