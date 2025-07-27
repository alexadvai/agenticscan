
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type SidebarMenuLinkProps = {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  sheetMode?: boolean;
};

export function SidebarMenuLink({ href, icon, children, sheetMode = false }: SidebarMenuLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const linkClassName = sheetMode ? 
    cn(
        "flex items-center gap-4 px-2.5",
        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    ) :
    cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        isActive
          ? "bg-muted text-primary"
          : "text-muted-foreground hover:text-primary"
    );

  return (
    <Link href={href} className={linkClassName}>
        {icon}
        {children}
    </Link>
  );
}
