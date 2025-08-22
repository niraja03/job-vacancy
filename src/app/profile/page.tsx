"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Award, Moon, Sun, User, Palette, Text, Gift } from "lucide-react";

const badges = [
  { name: "First Resume", icon: Award, color: "text-yellow-500" },
  { name: "Job Applied", icon: Award, color: "text-blue-500" },
  { name: "Skill Master", icon: Award, color: "text-green-500" },
  { name: "Community Helper", icon: Award, color: "text-purple-500" },
];

export default function ProfilePage() {
  const { setTheme, theme } = useTheme();
  const [fontSize, setFontSize] = useState("base");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedFontSize = localStorage.getItem("font-size") || "base";
    setFontSize(storedFontSize);
    document.documentElement.style.fontSize = 
      storedFontSize === 'large' ? '18px' :
      storedFontSize === 'xlarge' ? '20px' : '16px';
  }, []);
  
  const handleFontSizeChange = (value: string) => {
    setFontSize(value);
    localStorage.setItem("font-size", value);
    document.documentElement.style.fontSize = 
      value === 'large' ? '18px' :
      value === 'xlarge' ? '20px' : '16px';
  }

  if (!mounted) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-4 border-4 border-primary/50">
          <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Jhon Doe</h1>
        <p className="mt-2 text-lg text-muted-foreground">pune, Maharashtra</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Palette /> Accessibility</CardTitle>
            <CardDescription>Customize the app's appearance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="flex items-center gap-2 mb-2"><Palette /> Theme</Label>
              <div className="flex gap-2">
                <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme("light")} className="w-full">
                  <Sun className="mr-2 h-4 w-4" /> Light
                </Button>
                <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme("dark")} className="w-full">
                  <Moon className="mr-2 h-4 w-4" /> Dark
                </Button>
              </div>
            </div>
            <div>
              <Label className="flex items-center gap-2 mb-2"><Text /> Font Size</Label>
              <RadioGroup value={fontSize} onValueChange={handleFontSizeChange} className="flex gap-2">
                <Label htmlFor="fs-base" className="flex-1 p-3 border rounded-md has-[:checked]:bg-primary has-[:checked]:text-primary-foreground cursor-pointer text-center">
                  <RadioGroupItem value="base" id="fs-base" className="sr-only" />
                  <span>Normal</span>
                </Label>
                <Label htmlFor="fs-large" className="flex-1 p-3 border rounded-md has-[:checked]:bg-primary has-[:checked]:text-primary-foreground cursor-pointer text-center">
                  <RadioGroupItem value="large" id="fs-large" className="sr-only" />
                  <span>Large</span>
                </Label>
                <Label htmlFor="fs-xlarge" className="flex-1 p-3 border rounded-md has-[:checked]:bg-primary has-[:checked]:text-primary-foreground cursor-pointer text-center">
                  <RadioGroupItem value="xlarge" id="fs-xlarge" className="sr-only" />
                  <span>Extra Large</span>
                </Label>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Award /> My Badges</CardTitle>
            <CardDescription>Your achievements and milestones.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {badges.map(badge => (
                <div key={badge.name} className="flex flex-col items-center text-center p-2 rounded-lg bg-muted/50">
                  <badge.icon className={`h-10 w-10 ${badge.color}`} />
                  <p className="mt-2 text-sm font-medium">{badge.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Gift /> Referral System</CardTitle>
            <CardDescription>Invite friends and earn rewards.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">Share your referral code to get bonus credits and free SMS alerts!</p>
            <div className="p-3 bg-muted rounded-md font-mono text-lg tracking-widest">GJC-JD123</div>
            <Button className="mt-4 w-full">Share Now</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
