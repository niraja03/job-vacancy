
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Bell,
  MessageSquare,
  Bot,
  Award,
} from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

export function MainHeader() {
  const pathname = usePathname();
  const navItems = [
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    { href: "/learning", label: "Learning", icon: GraduationCap },
    { href: "/skill-credentials", label: "Skill Credentials", icon: Award },
    { href: "/analytics", label: "Analytics", icon: BarChart },
    { href: "/smart-recommender", label: "Smart Recommender", icon: Sparkles },
    { href: "/community", label: "Community", icon: Users },
  ];

  const isActive = (href: string) => {
    // For nested routes, we want to match the base path
    if (href === "/jobs") {
      return pathname.startsWith("/jobs");
    }
     if (href.startsWith("#")) return false;
    return pathname === href;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
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
                className={cn(
                  "font-bold transition-colors hover:text-foreground/80",
                  isActive(item.href)
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
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
                    className={cn(
                      "flex items-center space-x-3 rounded-md p-2 font-bold",
                      isActive(item.href)
                        ? "bg-muted"
                        : "hover:bg-muted"
                    )}
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
          <Button variant="ghost" size="icon" aria-label="Notifications">
             <Bell className="h-6 w-6" />
          </Button>
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
