"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Member = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember");
    },
  });

  return (
    <div className="font-serif text-xl text-[#d4b483]">
      <h1>Member Client Session</h1>
      <p>Email: {session?.user?.email}</p>
      <p>Role: {session?.user?.role}</p>
    </div>
  );
};

export default Member;