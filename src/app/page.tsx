import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Briefcase,
  FileText,
  Users,
  GraduationCap,
  Sparkles,
  BarChart,
  ArrowRight,
} from "lucide-react";

const featureCards = [
  {
    title: "Find Jobs",
    description: "Search for verified jobs in your area.",
    href: "/jobs",
    icon: Briefcase,
    color: "text-primary",
  },
  {
    title: "AI Job Matcher",
    description: "Get recommendations based on your skills.",
    href: "/job-matcher",
    icon: Sparkles,
    color: "text-accent",
  },
  {
    title: "AI Resume Builder",
    description: "Create a professional resume in minutes.",
    href: "/resume-builder",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Community Board",
    description: "Connect with peers and share tips.",
    href: "/community",
    icon: Users,
    color: "text-orange-600",
  },
  {
    title: "Learning Hub",
    description: "Improve your skills with free modules.",
    href: "/learning",
    icon: GraduationCap,
    color: "text-indigo-600",
  },
  {
    title: "Policy Dashboard",
    description: "View job market trends and insights.",
    href: "/analytics",
    icon: BarChart,
    color: "text-red-600",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary font-headline">
          Welcome to Gramin Jobs Connect
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Your one-stop platform for finding jobs, building skills, and connecting with the community in rural India.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureCards.map((card) => (
          <Link href={card.href} key={card.title} className="group">
            <Card className="h-full transform transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-xl hover:border-primary/50 flex flex-col">
              <CardHeader className="flex-grow">
                 <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center`}>
                        <card.icon className={`h-7 w-7 ${card.color}`} strokeWidth={2} />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-headline">{card.title}</CardTitle>
                        <CardDescription className="mt-1">{card.description}</CardDescription>
                    </div>
                 </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-end text-sm font-semibold text-primary/80">
                  Explore <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
