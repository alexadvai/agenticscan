
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShieldCheck, BarChart2, ScanLine, History, CalendarClock } from "lucide-react";
import Link from "next/link";
import { SidebarMenuLink } from "@/components/sidebar-menu-link";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/agentic-scanning", icon: <BarChart2 className="h-4 w-4" />, mobileIcon: <BarChart2 className="h-5 w-5" />, label: "Dashboard" },
  { href: "/agentic-scanning/new", icon: <ScanLine className="h-4 w-4" />, mobileIcon: <ScanLine className="h-5 w-5" />, label: "New Scan" },
  { href: "/agentic-scanning/results", icon: <History className="h-4 w-4" />, mobileIcon: <History className="h-5 w-5" />, label: "Scan Results" },
  { href: "/agentic-scanning/scheduled", icon: <CalendarClock className="h-4 w-4" />, mobileIcon: <CalendarClock className="h-5 w-5" />, label: "Scheduled Scans" },
];


export default function AgenticScanningLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/agentic-scanning" className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="">Agentic Scan</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map(item => (
                <SidebarMenuLink key={item.href} href={item.href} icon={item.icon}>
                  {item.label}
                </SidebarMenuLink>
              ))}
            </nav>
          </div>
        </div>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
           <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                   <Link
                    href="/agentic-scanning"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <ShieldCheck className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Agentic Scan</span>
                  </Link>
                  {navItems.map(item => (
                    <SidebarMenuLink key={item.href} href={item.href} icon={item.mobileIcon} sheetMode>
                      {item.label}
                    </SidebarMenuLink>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                   <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/40x40/E3F2FD/4285F4" alt="User avatar" data-ai-hint="user avatar" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
