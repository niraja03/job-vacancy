import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, Award, ArrowRight, Laptop, Tractor, Briefcase, IndianRupee } from "lucide-react";
import Link from "next/link";

const learningModules = [
  { 
    title: "Basic Computer Use", 
    category: "Computers", 
    type: "video", 
    duration: "15 min", 
    icon: Laptop
  },
  { 
    title: "Modern Farming Techniques", 
    category: "Agriculture", 
    type: "pdf", 
    duration: "10 pages", 
    icon: Tractor
  },
  { 
    title: "Interview Skills", 
    category: "Career", 
    type: "video", 
    duration: "20 min", 
    icon: Briefcase
  },
  { 
    title: "Understanding Digital Payments", 
    category: "Finance", 
    type: "pdf", 
    duration: "5 pages", 
    icon: IndianRupee
  },
];

const certificationLinks = [
    { name: "Skill India", url: "https://www.skillindia.gov.in/", description: "Government of India's flagship scheme for skill development." },
    { name: "Coursera for Rural", url: "https://www.coursera.org/", description: "Access free courses from top universities and companies." },
    { name: "e-Krishi Shiksha", url: "https://icar.org.in/content/e-krishi-shiksha", description: "Learn about modern agricultural practices from ICAR." },
    { name: "Swayam", url: "https://swayam.gov.in/", description: "Free online courses by Government of India." },
]

export default function LearningPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Learning & Skilling Hub</h1>
        <p className="mt-2 text-lg text-muted-foreground">Learn new skills, get certified, and advance your career.</p>
      </header>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
          <TabsTrigger value="courses"><BookOpen className="h-4 w-4 mr-2" />Micro-Learning</TabsTrigger>
          <TabsTrigger value="certifications"><Award className="h-4 w-4 mr-2" />Certifications</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningModules.map((module) => (
               <Link href="#" key={module.title}>
                <Card className="group overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                             <p className="text-xs font-bold uppercase text-primary">{module.category}</p>
                            <div className="bg-background/80 backdrop-blur-sm text-foreground text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                                {module.type === 'video' ? <Video className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
                                <span>{module.duration}</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 flex-grow">
                        <div className="flex items-start gap-4">
                             <module.icon className="h-8 w-8 text-accent mt-1" />
                            <CardTitle className="text-lg font-headline leading-tight flex-grow">{module.title}</CardTitle>
                        </div>
                    </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="certifications">
            <div className="max-w-3xl mx-auto space-y-4">
                <CardDescription className="text-center mb-6">Link to free courses from government and other organizations to get certified.</CardDescription>
                {certificationLinks.map(link => (
                    <Link href={link.url} target="_blank" rel="noopener noreferrer" key={link.name}>
                        <Card className="hover:bg-muted/50 transition-colors hover:border-primary/50">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-primary">{link.name}</h3>
                                    <p className="text-sm text-muted-foreground">{link.description}</p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
