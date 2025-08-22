import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Briefcase,
  Users,
  GraduationCap,
  Sparkles,
  BarChart,
  CircleUser,
} from "lucide-react";
import { Logo } from "./logo";

export function MainHeader() {
  const navItems = [
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    { href: "/resume-builder", label: "Resume Builder", icon: Sparkles },
    { href: "/community", label: "Community", icon: Users },
    { href: "/learning", label: "Learning", icon: GraduationCap },
    { href: "/analytics", label: "Analytics", icon: BarChart },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="font-bold">Gramin Jobs Connect</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex h-full flex-col p-6">
              <Link href="/" className="mb-8 flex items-center space-x-2">
                <Logo />
                <span className="font-bold">Gramin Jobs Connect</span>
              </Link>
              <div className="flex-1 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 rounded-md p-2 font-medium hover:bg-muted"
                  >
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Link href="/profile">
            <Button variant="ghost" size="icon" aria-label="Profile">
              <CircleUser className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
