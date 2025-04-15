import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import SignOutButton from "../components/SignOutButton";
// import { redirect } from "next/navigation";

export default async function Dasboard() {
  const session = await getServerSession(authOption);
  // console.log(session, "session");
  if (!session?.user?.name) return redirect("/login");
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6 border border-white/20">
        <h1 className="text-3xl font-semibold text-white text-center">
          Welcome {session?.user?.name}
        </h1>

        <SignOutButton />
      </div>
    </div>
  );
}
