"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUsers, FaSignOutAlt, FaBuilding, FaHome } from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";

const menu_items = [
  { href: "/condominios", label: "Condomínios", icon: FaBuilding },
  { href: "/usuarios", label: "Usuários", icon: FaUsers },
];

export default function Menu() {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const logout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) window.location.href = "/";
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-white p-4 shadow-md">
      
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2 px-4">
        <FaHome className="h-6 w-6" style={{ color: "#a855f7" }} />
        <span className="text-xl font-semibold">Viva Condo</span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menu_items.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-all ${
                    active
                      ? "bg-[#f3e8ff] font-medium text-[#a855f7]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      active ? "text-[#a855f7]" : "text-gray-400"
                    }`}
                  />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <hr className="my-4 border-gray-300" />

        <div className="mt-auto">
          <ul className="space-y-2">
            <li>
              <button
                type="button"
                onClick={logout}
                className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-2 text-left text-gray-700 transition-all hover:bg-gray-100"
              >
                <FaSignOutAlt className="h-4 w-4 text-gray-400" />
                Sair
              </button>
            </li>
          </ul>
        </div>

      </nav>
    </aside>
  );
}
