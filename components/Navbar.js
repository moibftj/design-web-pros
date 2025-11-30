import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="border-b">
      <nav className="max-w-4xl mx-auto p-4 flex items-center justify-between">
        <div className="flex gap-4">
          <Link href="/" className="font-semibold">Home</Link>
          <Link href="/protected">Protected</Link>
        </div>
        <div>
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">Signed in as {session.user?.email}</span>
              <button
                className="px-3 py-1 bg-gray-800 text-white rounded"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
