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
  Landmark,
  ArrowRight,
} from "lucide-react";

const featureCards = [
  {
    title: "Find Jobs",
    description: "Search for jobs in your area.",
    href: "/jobs",
    icon: Briefcase,
    color: "text-green-600",
  },
  {
    title: "AI Resume Builder",
    description: "Create a professional resume in minutes.",
    href: "/resume-builder",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "AI Job Matcher",
    description: "Get job recommendations based on your skills.",
    href: "/job-matcher",
    icon: Sparkles,
    color: "text-purple-600",
  },
  {
    title: "Community Board",
    description: "Connect with other job seekers and share tips.",
    href: "/community",
    icon: Users,
    color: "text-orange-600",
  },
  {
    title: "Learning Hub",
    description: "Improve your skills with our micro-learning modules.",
    href: "/learning",
    icon: GraduationCap,
    color: "text-indigo-600",
  },
  {
    title: "Govt. Schemes & Centers",
    description: "Find information about government programs.",
    href: "/analytics", // Placeholder, can be a dedicated page
    icon: Landmark,
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
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Your one-stop platform for finding jobs, building skills, and connecting with your community in rural India.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureCards.map((card) => (
          <Link href={card.href} key={card.title} className="group">
            <Card className="h-full transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl hover:border-primary">
              <CardHeader className="flex flex-row items-center gap-4">
                <card.icon className={`h-12 w-12 ${card.color}`} strokeWidth={1.5} />
                <div>
                  <CardTitle className="text-xl font-headline">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-end text-sm font-semibold text-primary">
                  Go to {card.title} <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
