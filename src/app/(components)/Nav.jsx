import { getServerSession } from 'next-auth';
import Link from "next/link";
import { options } from '../api/auth/[...nextauth]/options';

const Nav = async () => {
  const session = await getServerSession(options);

  return (
    <header className="bg-gradient-to-b from-[#2c251d] to-[#3a3024] shadow-xl">
      <nav className="relative flex items-center justify-between w-full px-16 py-3 mx-auto max-w-7xl">
        <div className="font-serif text-2xl text-[#d4b483] relative group">
          <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-[#8b7355] text-2xl rotate-180">❀</span>
          <span className="tracking-widest hover:text-[#e6ccb3] transition-colors duration-300 cursor-pointer">
            My Site
          </span>
          <span className="absolute -right-8 top-1/2 -translate-y-1/2 text-[#8b7355] text-2xl">❀</span>
        </div>

        <div className="flex items-center gap-12">
          {[
            { href: "/", label: "Home" },
            { href: "/Member", label: "Member" },
            { href: "/ClientMember", label: "Client" },
            { href: "/CreateUser", label: "Create" },
            { href: "/Denied", label: "Denied" },
            { href: "/Public", label: "Public" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-2 py-1 group"
            >
              <span className="font-serif tracking-wide text-[#d4b483] group-hover:text-[#e6ccb3] 
                             transition-colors duration-300 relative z-10">
                {link.label}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8b7355] 
                             origin-left scale-x-0 group-hover:scale-x-100
                             transition-transform duration-300
                             rounded-full"></span>
              <span className="absolute -inset-1 bg-[#8b7355]/10 
                             scale-y-0 group-hover:scale-y-100
                             transition-transform duration-300
                             rounded-full blur-sm"></span>
            </Link>
          ))}

          {session ? (
            <Link
              href="/api/auth/signout?callbackUrl=/"
              className="relative px-8 py-3 group"
            >
              <span className="relative z-10 font-serif tracking-wide text-[#2c251d] group-hover:text-[#1a1610]">
                Sign Out
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#d4b483] to-[#8b7355]
                             rounded-full group-hover:shadow-[0_0_20px_rgba(212,180,131,0.3)]
                             transition-all duration-300"></span>
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className="relative px-8 py-3 group"
            >
              <span className="relative z-10 font-serif tracking-wide text-[#2c251d] group-hover:text-[#1a1610]">
                Sign In
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#d4b483] to-[#8b7355]
                             rounded-full group-hover:shadow-[0_0_20px_rgba(212,180,131,0.3)]
                             transition-all duration-300"></span>
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-[#d4b483] opacity-60">❋</span>
              <span className="absolute -right-4 top-1/2 -translate-y-1/2 text-[#d4b483] opacity-60">❋</span>
            </Link>
          )}
        </div>
      </nav>

      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#8b7355] to-transparent
                     relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDUwIEMxNTAgMCwgMzUwIDAsIDUwMCA1MCBDNjUwIDEwMCwgODUwIDEwMCwgMTAwMCA1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOGI3MzU1IiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=')] 
                        opacity-30"></div>
      </div>
    </header>
  );
};

export default Nav;