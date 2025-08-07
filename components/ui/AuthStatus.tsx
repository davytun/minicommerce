"use client";

import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

const AuthStatus = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <div className="flex items-center space-x-4">
          <p>{user.email}</p>
          <button
            onClick={() => auth.signOut()}
            className="px-4 py-2 font-bold text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default AuthStatus;
