"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Award, Moon, Sun, User, Palette, Text, Gift, Edit, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  location: z.string().min(2, "Location is required."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

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
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Jhon Doe",
      location: "Pune, Maharashtra",
    },
  });

  const { watch } = form;
  const watchedName = watch("name");
  const watchedLocation = watch("location");

  useEffect(() => {
    setMounted(true);
    const storedFontSize = localStorage.getItem("font-size") || "base";
    handleFontSizeChange(storedFontSize, false);
  }, []);
  
  const handleFontSizeChange = (value: string, fromUser = true) => {
    setFontSize(value);
    if (fromUser) localStorage.setItem("font-size", value);
    
    let size = '16px';
    if (value === 'large') size = '18px';
    if (value === 'xlarge') size = '20px';
    document.documentElement.style.fontSize = size;
  }

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your information has been saved successfully.",
    });
  }
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  if (!mounted) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
          <AvatarFallback className="text-3xl bg-muted">{getInitials(watchedName)}</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">{watchedName}</h1>
        <p className="mt-1 text-lg text-muted-foreground">{watchedLocation}</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2"><User /> Personal Info</CardTitle>
              <CardDescription>View and edit your details.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <Save className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
            </Button>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full">
                    <Save className="mr-2 h-4 w-4"/>
                    Save Changes
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <p className="font-semibold">{watchedName}</p>
                </div>
                <div>
                  <Label>Location</Label>
                  <p className="font-semibold">{watchedLocation}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
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
              <RadioGroup value={fontSize} onValueChange={(v) => handleFontSizeChange(v)} className="flex gap-2">
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
                <div key={badge.name} className="flex flex-col items-center text-center p-2 rounded-lg bg-muted/50 border">
                  <badge.icon className={`h-10 w-10 ${badge.color}`} />
                  <p className="mt-2 text-sm font-medium">{badge.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
