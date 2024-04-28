import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center flex-col">
    <h1 className="text-slate-200 font-bold text-4xl mb-4 mt-2">Welcome to Marketing App</h1>
      <div className="flex flex-col gap-10 justify-center items-center mt-4">
        <Link href='/auth/login' className="rounded text-blue-600 text-3xl hover:text-blue-400 font-bold">Login</Link>
        <p className="text-white">or</p>
        <Link href='/auth/register' className="rounded text-white text-xl hover:text-gray-400 font-bold">Register</Link>
      </div>
    </div>
  );
}
