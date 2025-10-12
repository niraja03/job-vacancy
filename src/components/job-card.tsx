import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, IndianRupee, CheckCircle2, Flag } from "lucide-react";

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary?: string;
  type: string;
  isVerified?: boolean;
  description: string;
  category?: string;
};

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-headline">{job.title}</CardTitle>
          {job.isVerified && (
            <Badge variant="secondary" className="bg-green-200 text-green-900 dark:bg-green-900/50 dark:text-green-300 border-green-400">
              <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
              Verified
            </Badge>
          )}
        </div>
        <CardDescription className="text-base">{job.company}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-muted-foreground text-sm">
          <Briefcase className="h-4 w-4 mr-2" />
          <span>{job.type}</span>
        </div>
        {job.salary && (
           <div className="flex items-center text-muted-foreground text-sm">
             <IndianRupee className="h-4 w-4 mr-2" />
             <span>{job.salary}</span>
           </div>
        )}
        <p className="text-sm text-foreground/80 pt-2 line-clamp-3">
          {job.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <Button>View Details</Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
          <Flag className="h-4 w-4 mr-2" /> Report
        </Button>
      </CardFooter>
    </Card>
  );
}
