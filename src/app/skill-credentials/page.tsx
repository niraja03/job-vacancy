
"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, ArrowRight, Star, Trophy, Download, Share2, Medal, Image, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const certificationLinks = [
    { name: "Skill India", url: "https://www.skillindia.gov.in/", description: "Government of India's flagship scheme for skill development." },
    { name: "Coursera for Rural", url: "https://www.coursera.org/", description: "Access free courses from top universities and companies." },
    { name: "e-Krishi Shiksha", url: "https://icar.org.in/content/e-krishi-shiksha", description: "Learn about modern agricultural practices from ICAR." },
    { name: "Swayam", url: "https://swayam.gov.in/", description: "Free online courses by Government of India." },
];

type AchievementType = 'trophy' | 'certificate' | 'badge' | 'points';

type Achievement = {
  id: string;
  type: AchievementType;
  title: string;
  date: string;
  fileUrl?: string; // For linking to PDF or image
};

const initialAchievements: Achievement[] = [
    { id: '1', type: 'trophy', title: 'Top Learner of the Month', date: 'June 2024' },
    { id: '2', type: 'certificate', title: 'Digital Literacy Certificate', date: 'May 20, 2024', fileUrl: '#' },
    { id: '3', type: 'badge', title: '5 Videos Watched', date: 'May 18, 2024' },
    { id: '4', type: 'badge', title: 'First Course Completed', date: 'May 15, 2024' },
    { id: '5', type: 'points', title: '500 Learning Points', date: 'Accumulated' },
    { id: '6', type: 'badge', title: 'Community Helper', date: 'April 2024' },
];

const getAchievementVisuals = (achievement: Achievement) => {
    switch (achievement.type) {
        case 'trophy': return { icon: Trophy, color: 'text-yellow-400' };
        case 'certificate': return { icon: Award, color: 'text-blue-500' };
        case 'badge': return { icon: Medal, color: 'text-green-500' };
        case 'points': return { icon: Star, color: 'text-orange-500' };
        default: return { icon: Award, color: 'text-gray-500' };
    }
};

const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
    const { icon: Icon, color } = getAchievementVisuals(achievement);

    const CardBody = (
        <Card className="group bg-card overflow-hidden h-full flex flex-col items-center justify-center text-center p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 border-2 border-transparent hover:border-primary">
            <Icon className={`h-16 w-16 mb-3 transform transition-transform duration-300 group-hover:scale-110 ${color}`} />
            <CardTitle className="text-base font-bold leading-tight">{achievement.title}</CardTitle>
            <CardDescription className="text-xs mt-1">{achievement.date}</CardDescription>
        </Card>
    );

    return achievement.fileUrl ? (
        <Link href={achievement.fileUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
            {CardBody}
        </Link>
    ) : CardBody;
};

export default function SkillCredentialsPage() {
  const { toast } = useToast();
  const achievementsRef = useRef<HTMLDivElement>(null);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);

  const handleShare = async () => {
    const shareData = {
      title: "My Achievements on Gramin Jobs Connect",
      text: "Check out my learning achievements! I'm building new skills.",
      url: window.location.href,
    };
    try {
      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast({ title: "Shared successfully!" });
      } else {
        throw new Error('Web Share API not supported.');
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Fallback to copying to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link Copied!", description: "Achievements link copied to your clipboard." });
    }
  };

  const handleDownloadText = () => {
    const portfolioContent = achievements
      .map(ach => `- ${ach.title} (Earned: ${ach.date})`)
      .join("\n");

    const fullContent = `My Learning Portfolio\n\n${portfolioContent}`;

    const blob = new Blob([fullContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my_achievements.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Portfolio Downloaded", description: "my_achievements.txt has been saved."});
  };

  const handleDownloadImage = async () => {
    const element = achievementsRef.current;
    if (!element) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not find achievements to download.",
        });
        return;
    }

    try {
        const canvas = await html2canvas(element, { 
            backgroundColor: null, // Use the actual background
            scale: 2 // Increase resolution
        });
        const dataUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'my_achievements.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast({ title: "Image Downloaded", description: "Your achievements image has been saved." });
    } catch (error) {
        console.error('Error generating image:', error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not download image.",
        });
    }
};

const handleDownloadPdf = async () => {
    const element = achievementsRef.current;
    if (!element) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not find achievements to download.',
      });
      return;
    }

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      
      let imgWidth = pdfWidth - 20; // with margin
      let imgHeight = imgWidth / ratio;

      if (imgHeight > pdfHeight - 20) {
        imgHeight = pdfHeight - 20;
        imgWidth = imgHeight * ratio;
      }
      
      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save('my_achievements.pdf');
      
      toast({ title: 'PDF Downloaded', description: 'Your achievements PDF has been saved.' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not download PDF.',
      });
    }
  };


  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Skill Credentials</h1>
        <p className="mt-2 text-lg text-muted-foreground">Your official certifications and learning achievements.</p>
      </header>

      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto mb-8">
          <TabsTrigger value="achievements"><Trophy className="h-4 w-4 mr-2" />My Achievements</TabsTrigger>
          <TabsTrigger value="certifications"><Award className="h-4 w-4 mr-2" />Certifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="achievements">
            <div className="max-w-5xl mx-auto">
                <div ref={achievementsRef} className="p-8 bg-card">
                    <CardHeader className="text-center mb-4">
                        <CardTitle className="text-3xl font-bold font-headline">Your Trophy Wall</CardTitle>
                        <CardDescription>All your certificates, badges, and awards in one place.</CardDescription>
                    </CardHeader>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {achievements.map((ach) => (
                          <AchievementCard key={ach.id} achievement={ach} />
                        ))}
                    </div>
                 </div>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button onClick={handleShare}>
                        <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                     <Button variant="outline" onClick={handleDownloadText}>
                        <FileText className="mr-2 h-4 w-4" /> Download as Text
                    </Button>
                    <Button variant="outline" onClick={handleDownloadImage}>
                        <Image className="mr-2 h-4 w-4" /> Download as Image
                    </Button>
                    <Button variant="outline" onClick={handleDownloadPdf}>
                        <Download className="mr-2 h-4 w-4" /> Download as PDF
                    </Button>
                </div>
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

    