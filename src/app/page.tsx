
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Layers,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smartphone,
  Sprout,
  Users,
  Voicemail,
  Zap,
} from 'lucide-react';
import { StatsCard } from "@/components/stats-card";

const keyFeatures = [
  {
    icon: MapPin,
    title: 'Local Job Matching',
    description: 'Find jobs in your village or nearby towns with our location-based search.',
  },
  {
    icon: Voicemail,
    title: 'Voice & Vernacular Support',
    description: 'Use your own language to search for jobs and get assistance from our AI.',
  },
  {
    icon: Layers,
    title: 'Skill Recommendations',
    description: 'Our AI suggests skills to learn for better job opportunities in your area.',
  },
  {
    icon: Briefcase,
    title: 'Direct Employer Access',
    description: 'Connect directly with verified employers without any middlemen.',
  },
  {
    icon: Smartphone,
    title: 'SMS & WhatsApp Alerts',
    description: 'Get instant job alerts and updates directly on your mobile phone.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified & Secure',
    description: 'All employers are verified to ensure your safety and prevent fraud.',
  },
];

const womenEmpowermentJobs = [
  {
    title: 'Stitching & Tailoring',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'woman stitching',
    description: 'Home-based tailoring jobs from local boutiques and textile units.',
  },
  {
    title: 'Self-Help Groups (SHG)',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'group women working',
    description: 'Opportunities in food processing, handicrafts, and small-scale manufacturing.',
  },
  {
    title: 'Teaching & Anganwadi',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'woman teaching children',
    description: 'Roles as tutors, school teachers, and Anganwadi workers in your community.',
  },
  {
    title: 'Dairy & Animal Husbandry',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'woman with cow',
    description: 'Work with local dairy cooperatives and animal care centers.',
  },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full pt-12 md:pt-24 lg:pt-32 bg-primary/10">
           <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl font-headline">
                Gramin Job Connect
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl">
                Empowering Rural Talent with Opportunities
              </p>
              <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
                Millions of rural youth have skills but lack access to jobs. We connect them directly with opportunities.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/jobs">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                  <Briefcase className="mr-2 h-5 w-5" /> Find Jobs
                </Button>
              </Link>
              <Link href="#">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-6">
                  <Users className="mr-2 h-5 w-5" /> Hire Talent
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative mt-12 pb-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
                    <StatsCard icon={Briefcase} value="10,000+" label="Jobs Posted" />
                    <StatsCard icon={Users} value="50,000+" label="Candidates Registered" />
                    <StatsCard icon={Zap} value="25,000+" label="Successful Connections" />
                </div>
            </div>
           </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Us?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We've built a platform from the ground up to address the unique challenges of the rural job market.
              </p>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {keyFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
         {/* Women Empowerment Section */}
        <section id="women-empowerment" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
               <div className="inline-block rounded-lg bg-pink-100 text-pink-700 px-3 py-1 text-sm font-semibold">For Women</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Opportunities for Women</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Highlighting flexible and home-based job opportunities to empower women in rural areas.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {womenEmpowermentJobs.map((job) => (
                <Link href="/jobs" key={job.title}>
                  <Card className="group overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-0 relative">
                      <Image 
                        src={job.image} 
                        alt={job.title} 
                        width={600} 
                        height={400} 
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={job.dataAiHint}
                      />
                       <div className="absolute inset-0 bg-black/40" />
                       <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{job.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>


        {/* Impact Section */}
        <section id="impact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why This Matters</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Connecting Bharat’s villages to India’s growing job market. Over <span className="font-bold text-primary">70% of rural youth</span> lack easy access to formal job opportunities. We're here to change that.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-muted">
        <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm text-muted-foreground">&copy; 2024 Gramin Job Connect. Built with ❤️ for Gramin Bharat.</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-sm hover:underline underline-offset-4">About</Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">Contact</Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">FAQ</Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">Support</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

    