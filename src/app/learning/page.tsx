import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, Award, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const learningModules = [
  { title: "Basic Computer Use", category: "Computers", type: "video", duration: "15 min", image: "https://placehold.co/600x400.png", dataAiHint: "computer user" },
  { title: "Modern Farming Techniques", category: "Agriculture", type: "pdf", duration: "10 pages", image: "https://placehold.co/600x400.png", dataAiHint: "modern farming" },
  { title: "Interview Skills", category: "Career", type: "video", duration: "20 min", image: "https://placehold.co/600x400.png", dataAiHint: "job interview" },
  { title: "Digital Payments", category: "Finance", type: "pdf", duration: "5 pages", image: "https://placehold.co/600x400.png", dataAiHint: "digital payment" },
];

const certificationLinks = [
    { name: "Skill India", url: "https://www.skillindia.gov.in/", description: "Government of India's flagship scheme." },
    { name: "Coursera for Rural", url: "https://www.coursera.org/", description: "Access free courses from top universities." },
    { name: "e-Krishi Shiksha", url: "#", description: "Learn about modern agricultural practices." },
]

export default function LearningPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Learning Hub</h1>
        <p className="mt-2 text-lg text-muted-foreground">Short videos and guides to help you learn new skills and get certified.</p>
      </header>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-8">
          <TabsTrigger value="courses"><BookOpen className="h-4 w-4 mr-2" />Courses</TabsTrigger>
          <TabsTrigger value="videos"><Video className="h-4 w-4 mr-2" />Videos</TabsTrigger>
          <TabsTrigger value="certifications"><Award className="h-4 w-4 mr-2" />Certifications</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningModules.map((module) => (
              <Card key={module.title} className="group overflow-hidden">
                <CardHeader className="p-0 relative">
                  <Image src={module.image} alt={module.title} width={600} height={400} className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110" data-ai-hint={module.dataAiHint} />
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-xs font-semibold uppercase text-primary">{module.category}</p>
                  <CardTitle className="text-md mt-1 font-headline">{module.title}</CardTitle>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="videos">
           <div className="text-center py-16 text-muted-foreground">
             <Video className="h-12 w-12 mx-auto mb-4" />
             <p>Video content coming soon!</p>
           </div>
        </TabsContent>
        <TabsContent value="certifications">
            <div className="max-w-3xl mx-auto space-y-4">
                {certificationLinks.map(link => (
                    <Link href={link.url} target="_blank" rel="noopener noreferrer" key={link.name}>
                        <Card className="hover:bg-muted/50 transition-colors">
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
