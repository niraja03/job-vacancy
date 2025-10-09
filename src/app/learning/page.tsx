
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BookOpen, Video, Award, ArrowRight, Laptop, Tractor, Briefcase, IndianRupee, HeartPulse, GraduationCap, Building, Shield, LucideIcon } from "lucide-react";
import Link from "next/link";

// Dummy icons for new categories
const Users = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Code = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);


type LearningModule = {
  title: string;
  description: string;
  category: string;
  type: 'video' | 'pdf';
  duration: string;
  icon: LucideIcon;
};

const learningContent: Record<string, LearningModule[]> = {
  "Common": [
    { 
      title: "Basic English Communication", 
      description: "Enhance your English communication skills for everyday and professional interactions.",
      category: "Common Learning", 
      type: "video", 
      duration: "25 min", 
      icon: GraduationCap 
    },
    { 
      title: "Digital Literacy", 
      description: "An introductory course on digital literacy, covering essential computer and internet skills.",
      category: "Common Learning", 
      type: "video", 
      duration: "30 min", 
      icon: Laptop
    },
  ],
  "Teaching": [
    {
      title: "Classroom Management Basics",
      description: "Learn effective classroom management techniques to create a positive learning environment.",
      category: "Teaching",
      type: "video",
      duration: "18 min",
      icon: Briefcase,
    },
    {
      title: "Digital Teaching Tools",
      description: "A step-by-step guide to using Google Classroom for organizing and managing class activities.",
      category: "Teaching",
      type: "video",
      duration: "22 min",
      icon: Laptop,
    },
  ],
  "Healthcare": [
    {
      title: "Basic First Aid & CPR Training",
      description: "Detailed instructions on performing CPR, including chest compressions and rescue breaths.",
      category: "Healthcare",
      type: "video",
      duration: "25 min",
      icon: HeartPulse,
    },
    {
      title: "Patient Communication Skills",
      description: "Tips and techniques for effective communication with patients in a healthcare setting.",
      category: "Healthcare",
      type: "video",
      duration: "15 min",
      icon: Users,
    },
  ],
  "Farming": [
    {
      title: "Modern Farming Techniques",
      description: "Explore innovative technologies transforming modern agriculture practices.",
      category: "Agriculture",
      type: "video",
      duration: "28 min",
      icon: Tractor,
    },
    {
      title: "Soil Health & Fertilizer Management",
      description: "Understanding the importance of soil health and effective fertilizer use for sustainable farming.",
      category: "Agriculture",
      type: "video",
      duration: "19 min",
      icon: BookOpen,
    },
  ],
  "IT": [
    {
      title: "Basic Computer Use",
      description: "A beginner-friendly guide to understanding computer components and basic operations.",
      category: "IT Sector",
      type: "video",
      duration: "35 min",
      icon: Laptop,
    },
    {
      title: "Introduction to Programming",
      description: "An introductory session on Python programming, covering basic concepts and syntax.",
      category: "IT Sector",
      type: "video",
      duration: "60 min",
      icon: Code,
    },
  ],
  "Construction": [
    {
      title: "Construction Safety Training",
      description: "Essential safety practices and guidelines for working on construction sites.",
      category: "Construction",
      type: "video",
      duration: "20 min",
      icon: Shield,
    },
    {
      title: "Blueprint Reading Basics",
      description: "A beginner's guide to understanding and interpreting construction blueprints.",
      category: "Construction",
      type: "video",
      duration: "30 min",
      icon: BookOpen,
    },
  ],
  "Government": [
    {
      title: "Aptitude & Reasoning Practice",
      description: "Practice exercises and strategies for improving aptitude and reasoning skills for competitive exams.",
      category: "Government Jobs",
      type: "video",
      duration: "45 min",
      icon: GraduationCap,
    },
    {
      title: "Basic English Grammar & GK Preparation",
      description: "A comprehensive tutorial on English grammar essentials for exam preparation.",
      category: "Government Jobs",
      type: "video",
      duration: "50 min",
      icon: BookOpen,
    },
  ],
};


const certificationLinks = [
    { name: "Skill India", url: "https://www.skillindia.gov.in/", description: "Government of India's flagship scheme for skill development." },
    { name: "Coursera for Rural", url: "https://www.coursera.org/", description: "Access free courses from top universities and companies." },
    { name: "e-Krishi Shiksha", url: "https://icar.org.in/content/e-krishi-shiksha", description: "Learn about modern agricultural practices from ICAR." },
    { name: "Swayam", url: "https://swayam.gov.in/", description: "Free online courses by Government of India." },
]

const LearningModuleCard = ({ module, onClick }: { module: LearningModule, onClick: () => void }) => (
  <Card 
    className="group overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    onClick={onClick}
  >
    <CardHeader className="p-4">
      <div className="flex justify-between items-start">
        <p className="text-xs font-bold uppercase text-primary">{module.category}</p>
        <div className="bg-background/80 backdrop-blur-sm text-foreground text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
          {module.type === 'video' ? <Video className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
          <span>{module.duration}</span>
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-4 flex-grow flex flex-col">
      <div className="flex items-start gap-4 mb-2">
        <module.icon className="h-8 w-8 text-accent mt-1 shrink-0" />
        <CardTitle className="text-lg font-headline leading-tight flex-grow">{module.title}</CardTitle>
      </div>
      <CardDescription className="text-sm">{module.description}</CardDescription>
    </CardContent>
  </Card>
);


export default function LearningPage() {
  const categories = Object.keys(learningContent);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);

  const handleModuleClick = (module: LearningModule) => {
    setSelectedModule(module);
  };

  const handleDialogClose = () => {
    setSelectedModule(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Learning &amp; Skilling Hub</h1>
        <p className="mt-2 text-lg text-muted-foreground">Learn new skills, get certified, and advance your career.</p>
      </header>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
          <TabsTrigger value="courses"><BookOpen className="h-4 w-4 mr-2" />Micro-Learning</TabsTrigger>
          <TabsTrigger value="certifications"><Award className="h-4 w-4 mr-2" />Certifications</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
            <Tabs defaultValue={categories[0]} className="w-full">
               <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 mb-8">
                {categories.map(category => (
                   <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                ))}
              </TabsList>
                {categories.map(category => (
                    <TabsContent key={category} value={category}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {learningContent[category].map((module) => (
                                <LearningModuleCard key={module.title} module={module} onClick={() => handleModuleClick(module)} />
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
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
      
      {selectedModule && (
        <Dialog open={!!selectedModule} onOpenChange={handleDialogClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{selectedModule.title}</DialogTitle>
                    <DialogDescription>{selectedModule.description}</DialogDescription>
                </DialogHeader>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted mt-4">
                     <iframe 
                        className="w-full h-full" 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder video
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                </div>
            </DialogContent>
        </Dialog>
      )}

    </div>
  );
}

    