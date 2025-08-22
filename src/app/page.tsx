import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, BookOpen, Users, MessageSquare, Award, ThumbsUp, MapPin, Building, IndianRupee, Verified, Bot, Languages, Bell, UserPlus, LogIn, ArrowRight } from "lucide-react";
import Link from "next/link";

const keyFeatures = [
  { title: "Local Jobs Matching", icon: MapPin, description: "Find jobs in your own village or nearby areas." },
  { title: "Voice & Vernacular Support", icon: Bot, description: "Use your own language to search and apply for jobs." },
  { title: "Skill Training Recommendations", icon: Award, description: "Get suggestions for courses to improve your skills." },
  { title: "Direct Employer Access", icon: Building, description: "Connect directly with companies without middlemen." },
  { title: "SMS/WhatsApp Alerts", icon: Bell, description: "Receive job notifications directly on your phone." },
  { title: "Community Referrals", icon: ThumbsUp, description: "Get job referrals and tips from your peers."}
];

const womenEmpowermentJobs = [
    { title: "Stitching & Tailoring" },
    { title: "Self-Help Group (SHG) Products" },
    { title: "Teaching & Anganwadi" },
    { title: "Dairy & Livestock Farming" },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-1 items-center text-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl font-headline">
                  Gramin Job Connect
                </h1>
                <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                  Empowering Rural Talent with Opportunities. Millions of rural youth have skills but lack access to jobs. We connect them directly with opportunities.
                </p>
                <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
                  <Link href="/jobs">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      <Briefcase className="mr-2 h-5 w-5" /> Find Jobs
                    </Button>
                  </Link>
                  <Link href="#">
                    <Button size="lg" variant="secondary" className="w-full min-[400px]:w-auto">
                      Hire Talent
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="w-full py-12 md:py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 font-headline">Why Gramin Job Connect?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyFeatures.map((feature) => (
                <Card key={feature.title} className="text-center flex flex-col items-center p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                      <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="flex-grow">{feature.description}</CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </section>

         {/* Women Empowerment Section */}
        <section id="women-empowerment" className="w-full py-12 md:py-20 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 font-headline">Opportunities for Women</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {womenEmpowermentJobs.map((job) => (
                <Link href="/jobs" key={job.title}>
                    <Card className="group overflow-hidden h-full shadow-lg hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 flex items-center justify-center p-6 bg-secondary/50">
                        <CardTitle className="text-center text-secondary-foreground">{job.title}</CardTitle>
                    </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Login/Register Section */}
        <section className="w-full py-12 md:py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-4 font-headline">Join Our Platform</h2>
            <p className="max-w-xl mx-auto text-center text-muted-foreground mb-12">Whether you are looking for a job or hiring, get started in just a few clicks.</p>
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <Card className="p-8 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <Users className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="mb-2">For Job Seekers</CardTitle>
                <CardDescription className="mb-6 flex-grow">Create your profile, get skill recommendations, and find jobs near you.</CardDescription>
                <Button className="w-full">
                  Register Now <ArrowRight className="ml-2" />
                </Button>
              </Card>
               <Card className="p-8 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <Building className="h-12 w-12 text-accent mb-4" />
                <CardTitle className="mb-2">For Employers</CardTitle>
                <CardDescription className="mb-6 flex-grow">Post jobs, access a wide talent pool, and hire the best candidates from rural India.</CardDescription>
                <Button className="w-full">
                  Start Hiring <ArrowRight className="ml-2" />
                </Button>
              </Card>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-primary text-primary-foreground">
        <div className="container py-8 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                  <p className="font-bold text-lg">Gramin Job Connect</p>
                  <p className="text-sm text-primary-foreground/80">Built with ❤️ for Gramin Bharat.</p>
              </div>
              <div className="flex gap-6">
                <Link href="#" className="text-sm hover:underline">About</Link>
                <Link href="#" className="text-sm hover:underline">Contact</Link>
                <Link href="#" className="text-sm hover:underline">FAQ</Link>
                 <Link href="#" className="text-sm hover:underline">Support</Link>
              </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-6 pt-6 text-center text-sm text-primary-foreground/60">
            &copy; 2024 Gramin Jobs Connect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
