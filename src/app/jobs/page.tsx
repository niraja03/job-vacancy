import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobCard, type Job } from "@/components/job-card";

const dummyJobs: Job[] = [
  { id: 1, title: "Tractor Driver", company: "Sharma Farms", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, salary: "₹15,000 - ₹20,000 per month", description: "Experienced tractor driver needed for a large farm. Must have a valid license and knowledge of modern farming equipment." },
  { id: 2, title: "Data Entry Operator", company: "Gramin Suvidha Kendra", location: "Nashik, Maharashtra", type: "Part-time", salary: "₹8,000 per month", description: "Basic computer knowledge required. Work involves entering data from government forms into our system. Flexible hours." },
  { id: 3, title: "Healthcare Assistant", company: "Village Clinic", location: "Satara, Maharashtra", type: "Full-time", isVerified: true, description: "Assist doctors and nurses with daily tasks. Training will be provided. A compassionate and caring attitude is a must." },
  { id: 4, title: "Primary School Teacher", company: "Sarvodaya School", location: "Aurangabad, Maharashtra", type: "Full-time", isVerified: true, salary: "₹12,000 per month", description: "Looking for a teacher for classes 1-4. D.Ed or B.Ed preferred. Passion for teaching young children is essential." },
  { id: 5, title: "Construction Worker", company: "Local Builders", location: "Pune, Maharashtra", type: "Contract", description: "General labor needed for a new housing project. Daily wages. Immediate start." },
  { id: 6, title: "Retail Sales Associate", company: "Kisan Retail Store", location: "Nashik, Maharashtra", type: "Full-time", isVerified: true, description: "Customer service and sales role in a busy retail environment. Previous experience is a plus." },
];

export default function JobsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Find Your Next Job</h1>
        <p className="mt-2 text-lg text-muted-foreground">Search thousands of jobs from verified employers in your area.</p>
      </header>

      <div className="sticky top-16 bg-background/95 backdrop-blur-sm z-10 py-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search for jobs like 'teacher' or 'driver'..." className="pl-10 h-12 text-base" />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
              <Mic className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
          <Button size="lg" className="h-12 text-base">Find Jobs</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pune">Pune</SelectItem>
              <SelectItem value="nashik">Nashik</SelectItem>
              <SelectItem value="satara">Satara</SelectItem>
              <SelectItem value="aurangabad">Aurangabad</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="agriculture">Agriculture</SelectItem>
              <SelectItem value="teaching">Teaching</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="construction">Construction</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Salary Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-10000">Below ₹10,000</SelectItem>
              <SelectItem value="10000-20000">₹10,000 - ₹20,000</SelectItem>
              <SelectItem value="20000+">Above ₹20,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
