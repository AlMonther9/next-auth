import { redirect } from "next/navigation"
import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"

const Member = async () => {
  const session = await getServerSession(options)

  if (!session) {
    redirect('api/auth/signin?callbackUrl=/Member')
  }
  return (
    <div className="font-serif text-xl text-[#d4b483]">
      <h1>Member Server Session</h1>
      <p>Email: {session?.user?.email}</p>
      <p>Role: {session?.user?.role}</p>
    </div>
  )
}

export default Member
