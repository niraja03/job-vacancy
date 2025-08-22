import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, BookOpen, Users, MessageSquare, Award, ThumbsUp, MapPin, Building, IndianRupee, Verified } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const jobCategories = [
  { name: "Agriculture", icon: Briefcase, color: "bg-green-100 text-green-800" },
  { name: "Construction", icon: Building, color: "bg-blue-100 text-blue-800" },
  { name: "Teaching", icon: BookOpen, color: "bg-yellow-100 text-yellow-800" },
  { name: "Healthcare", icon: Users, color: "bg-red-100 text-red-800" },
];

const featuredJobs = [
  { title: "Tractor Driver", company: "Sharma Farms", location: "Pune", salary: "₹15,000/mo", isVerified: true },
  { title: "Data Entry Operator", company: "Gramin Suvidha Kendra", location: "Nashik", salary: "₹8,000/mo", isVerified: false },
  { title: "Primary School Teacher", company: "Sarvodaya School", location: "Aurangabad", salary: "₹12,000/mo", isVerified: true },
];

const learningModules = [
  { title: "Basic Computer Skills", image: "https://placehold.co/600x400.png", dataAiHint: "person using computer" },
  { title: "Interview Preparation", image: "https://placehold.co/600x400.png", dataAiHint: "job interview" },
  { title: "Digital Payments", image: "https://placehold.co/600x400.png", dataAiHint: "mobile payment" },
];

const communityPosts = [
    {
        author: "Ramesh Kumar",
        avatar: "RK",
        content: "Found a great opportunity for tractor drivers near Ludhiana. Good pay and verified employer.",
        likes: 15,
        comments: 4,
    },
    {
        author: "Sunita Devi",
        avatar: "SD",
        content: "Is the government skill training for computer basics helpful for data entry jobs?",
        likes: 8,
        comments: 12,
    },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 to-transparent">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl font-headline">
                  Connecting Rural India to Opportunity
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Your one-stop platform for jobs, skills, and community support, designed for Gramin Bharat.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/jobs">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      <Briefcase className="mr-2 h-5 w-5" /> Find a Job
                    </Button>
                  </Link>
                   <Link href="/job-matcher">
                    <Button size="lg" variant="secondary" className="w-full min-[400px]:w-auto">
                      AI Job Matcher
                    </Button>
                  </Link>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                data-ai-hint="happy rural workers"
              />
            </div>
          </div>
        </section>

        {/* Job Categories Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 font-headline">Search by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {jobCategories.map((category) => (
                <Link href="/jobs" key={category.name}>
                    <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-muted/50 hover:shadow-lg transition-all duration-300 h-full">
                        <div className={`p-4 rounded-full ${category.color} mb-4`}>
                            <category.icon className="h-8 w-8" />
                        </div>
                        <p className="font-semibold">{category.name}</p>
                    </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 font-headline">Featured Jobs</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map((job, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        {job.title}
                        {job.isVerified && <Verified className="h-5 w-5 text-green-500" />}
                    </CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground"><MapPin className="mr-2 h-4 w-4" />{job.location}</div>
                    <div className="flex items-center text-sm text-muted-foreground"><IndianRupee className="mr-2 h-4 w-4" />{job.salary}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
                <Link href="/jobs">
                    <Button variant="outline">View All Jobs</Button>
                </Link>
            </div>
          </div>
        </section>

        {/* Learning Hub Section */}
        <section id="learning" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 font-headline">Learn New Skills</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {learningModules.map((item) => (
                <Link href="/learning" key={item.title}>
                    <Card className="group overflow-hidden">
                        <Image
                        src={item.image}
                        width="600"
                        height="400"
                        alt={item.title}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={item.dataAiHint}
                        />
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                    </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 font-headline">From the Community</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {communityPosts.map((post, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-start gap-4">
                    <Avatar>
                        <AvatarImage src={`https://placehold.co/40x40.png?text=${post.avatar}`} />
                        <AvatarFallback>{post.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{post.author}</p>
                        <p className="text-sm text-muted-foreground">{post.content}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="border-t pt-4 flex gap-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground"><ThumbsUp className="mr-2 h-4 w-4" /> {post.likes}</Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground"><MessageSquare className="mr-2 h-4 w-4" /> {post.comments}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="text-center mt-8">
                <Link href="/community">
                    <Button>Join the Conversation</Button>
                </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground">
        <div className="container py-6 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">&copy; 2024 Gramin Jobs Connect. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm hover:underline">Privacy</Link>
            <Link href="#" className="text-sm hover:underline">Terms</Link>
             <Link href="#" className="text-sm hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}