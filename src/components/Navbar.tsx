import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-3">
      <h1 className="text-xl font-bold">Marketing</h1>

      <ul className="flex gap-x-2">
        {!session?.user ? (
          <>
            <li>
              <Link className="rounded-xl p-2 hover:bg-gray-600" href="/">Home</Link>
            </li>
            <li>
              <Link className="rounded-xl p-2 hover:bg-gray-600" href="/auth/login">Login</Link>
            </li>
            <li>
              <Link className="rounded-xl p-2 hover:bg-gray-600" href="/auth/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="rounded-xl p-2 hover:bg-gray-600" href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link className="rounded-xl p-2 hover:bg-gray-600" href="/participants">Participants</Link>
            </li>
            <li>
              <Link href="/api/auth/signout" className="rounded-xl bg-red-500 p-2 hover:bg-red-700">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;