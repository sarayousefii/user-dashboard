export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">دسترسی غیرمجاز</h1>
      <p>شما اجازه دسترسی به این صفحه را ندارید.</p>
    </div>
  );
}