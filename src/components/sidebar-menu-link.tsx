"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type SidebarMenuLinkProps = {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

// Client component to handle active state based on pathname
function ActiveLink({ href, children }: { href: string, children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  // Determine if we are in the mobile sheet view by checking parent context
  const isSheet = React.useContext(SheetContext);

  if (isSheet) {
    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-4 px-2.5",
          isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        isActive
          ? "bg-muted text-primary"
          : "text-muted-foreground hover:text-primary"
      )}
    >
      {children}
    </Link>
  );
}

// Create a context to detect if we are inside a Sheet
const SheetContext = React.createContext(false);

// We check if the component is rendered inside a SheetContent by checking for a specific data attribute.
// This is a bit of a workaround but avoids needing to pass props down through multiple layers.
const useInSheet = () => {
    const [inSheet, setInSheet] = React.useState(false);
    const ref = React.useRef<HTMLAnchorElement>(null);

    React.useEffect(() => {
        if (ref.current && ref.current.closest('[data-radix-dialog-content]')) {
            setInSheet(true);
        }
    }, []);

    return { ref, inSheet };
};


export function SidebarMenuLink({ href, icon, children }: SidebarMenuLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const isSheetMenu = React.useContext(SheetContext);

  const linkClassName = isSheetMenu ? 
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