
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobCard, type Job } from "@/components/job-card";

const dummyJobs: Job[] = [
  { id: 1, title: "Tractor Driver", company: "Sharma Farms", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, salary: "15,000 - 20,000", description: "Experienced tractor driver needed for a large farm. Must have a valid license and knowledge of modern farming equipment.", category: "agriculture", url: "https://in.indeed.com/viewjob?jk=1" },
  { id: 2, title: "Data Entry Operator", company: "Gramin Suvidha Kendra", location: "Nashik, Maharashtra", type: "Part-time", salary: "8,000", description: "Basic computer knowledge required. Work involves entering data from government forms into our system. Flexible hours.", category: "it", url: "https://in.indeed.com/viewjob?jk=2" },
  { id: 3, title: "Healthcare Assistant", company: "Village Clinic", location: "Satara, Maharashtra", type: "Full-time", isVerified: true, description: "Assist doctors and nurses with daily tasks. A compassionate and caring attitude is a must.", category: "healthcare", url: "https://in.indeed.com/viewjob?jk=3" },
  { id: 4, title: "Primary School Teacher", company: "Sarvodaya School", location: "Aurangabad, Maharashtra", type: "Full-time", isVerified: true, salary: "12,000", description: "Looking for a teacher for classes 1-4. D.Ed or B.Ed preferred. Passion for teaching young children is essential.", category: "teaching", url: "https://in.indeed.com/viewjob?jk=4" },
  { id: 5, title: "Construction Worker", company: "Local Builders", location: "Mumbai, Maharashtra", type: "Contract", description: "General labor needed for a new housing project. Daily wages. Immediate start.", category: "construction", url: "https://in.indeed.com/viewjob?jk=5" },
  { id: 6, title: "Retail Sales Associate", company: "Kisan Retail Store", location: "Nagpur, Maharashtra", type: "Full-time", isVerified: true, description: "Customer service and sales role in a busy retail environment. Previous experience is a plus.", category: "retail", url: "https://in.indeed.com/viewjob?jk=6" },
  { id: 7, title: "Farm Hand", company: "Green Valley Organics", location: "Sangli, Maharashtra", type: "Full-time", description: "General farm duties including planting, harvesting, and livestock care. Hardworking and reliable individuals are welcome.", category: "agriculture", url: "https://in.indeed.com/viewjob?jk=7" },
  { id: 8, title: "Anganwadi Worker", company: "Govt. of Maharashtra", location: "Latur, Maharashtra", type: "Full-time", isVerified: true, salary: "As per govt. norms", description: "Provide health and nutrition education and support to women and children in the community.", category: "government", url: "https://in.indeed.com/viewjob?jk=8" },
  { id: 9, title: "Electrician", company: "PowerGrid Services", location: "Thane, Maharashtra", type: "Contract", description: "Certified electrician needed for residential and commercial wiring projects. Must have own tools.", category: "construction", url: "https://in.indeed.com/viewjob?jk=9" },
  { id: 10, title: "Nursing Aide", company: "City General Hospital", location: "Amravati, Maharashtra", type: "Full-time", isVerified: true, description: "Support nursing staff with patient care, monitoring vitals, and maintaining hygiene.", category: "healthcare", url: "https://in.indeed.com/viewjob?jk=10" },
  { id: 11, title: "Computer Operator", company: "e-Seva Center", location: "Akola, Maharashtra", type: "Part-time", salary: "7,500", description: "Assist citizens with online services, form filling, and document processing.", category: "it", url: "https://in.indeed.com/viewjob?jk=11" },
  { id: 12, title: "Security Guard", company: "SecureCorp", location: "Pune, Maharashtra", type: "Full-time", description: "Night shift security guard for a corporate office. Prior experience is preferred.", category: "retail", url: "https://in.indeed.com/viewjob?jk=12" },
  { id: 13, title: "Middle School Science Teacher", company: "Jnana Prabodhini", location: "Solapur, Maharashtra", type: "Full-time", isVerified: true, salary: "18,000", description: "Seeking a science teacher for classes 5-8 with a B.Sc and B.Ed degree.", category: "teaching", url: "https://in.indeed.com/viewjob?jk=13" },
  { id: 14, title: "Plumber", company: "QuickFix Solutions", location: "Mumbai, Maharashtra", type: "Contract", description: "On-call plumber for maintenance and repair jobs. Experience with residential plumbing is a must.", category: "construction", url: "https://in.indeed.com/viewjob?jk=14" },
  { id: 15, title: "Organic Farm Supervisor", company: "Dharti Organics", location: "Wardha, Maharashtra", type: "Full-time", isVerified: true, salary: "22,000", description: "Supervise farm operations, manage workers, and ensure compliance with organic standards.", category: "agriculture", url: "https://in.indeed.com/viewjob?jk=15" },
  { id: 16, title: "Government Clerk", company: "District Collector Office", location: "Jalgaon, Maharashtra", type: "Full-time", isVerified: true, salary: "As per pay scale", description: "Clerical duties including file management, data entry, and official correspondence.", category: "government", url: "https://in.indeed.com/viewjob?jk=16" },
  { id: 17, title: "Pharmacist Assistant", company: "Apna Medicals", location: "Kolhapur, Maharashtra", type: "Full-time", description: "Assist the head pharmacist in dispensing medicines and managing inventory. D.Pharm required.", category: "healthcare", url: "https://in.indeed.com/viewjob?jk=17" },
  { id: 18, title: "Warehouse Packer", company: "InstaLogistics", location: "Bhandara, Maharashtra", type: "Part-time", description: "Packing and sorting goods in a large warehouse. Physical fitness is required.", category: "retail", url: "https://in.indeed.com/viewjob?jk=18" },
  { id: 19, title: "Web Developer Intern", company: "Web Weavers", location: "Nagpur, Maharashtra", type: "Contract", salary: "5,000 stipend", description: "Internship opportunity for aspiring web developers. Basic knowledge of HTML, CSS, and JS required.", category: "it", url: "https://in.indeed.com/viewjob?jk=19" },
  { id: 20, title: "Yoga Instructor", company: "Gramin Arogya Mission", location: "Yavatmal, Maharashtra", type: "Part-time", description: "Conduct yoga and wellness sessions for community groups. Certification is a plus.", category: "healthcare", url: "https://in.indeed.com/viewjob?jk=20" },
  { id: 21, title: "Dairy Farm Worker", company: "Nanded Milk Union", location: "Nanded, Maharashtra", type: "Full-time", isVerified: true, description: "Duties include milking, feeding, and cleaning of cattle sheds.", category: "agriculture", url: "https://in.indeed.com/viewjob?jk=21" },
  { id: 22, title: "Mason (Gawandi)", company: "Sunrise Constructions", location: "Chandrapur, Maharashtra", type: "Contract", description: "Skilled mason required for brickwork and plastering in a new building project.", category: "construction", url: "https://in.indeed.com/viewjob?jk=22" },
  { id: 23, title: "Police Constable", company: "Maharashtra Police", location: "Dhule, Maharashtra", type: "Full-time", isVerified: true, salary: "As per govt. rules", description: "Recruitment for the post of Police Constable. Requires passing physical and written tests.", category: "government", url: "https://in.indeed.com/viewjob?jk=23" },
  { id: 24, title: "Mobile Repair Technician", company: "Mobile Doctor", location: "Parbhani, Maharashtra", type: "Full-time", description: "Technician for repairing smartphones and feature phones. Chip-level repair skills are a bonus.", category: "it", url: "https://in.indeed.com/viewjob?jk=24" },
  { id: 25, title: "English Teacher (High School)", company: "Modern English School", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, salary: "25,000", description: "Experienced English teacher for secondary and higher secondary classes. MA in English required.", category: "teaching", url: "https://in.indeed.com/viewjob?jk=25" },
  { id: 26, title: "Store Manager", company: "Reliance Smart Point", location: "Satara, Maharashtra", type: "Full-time", isVerified: true, description: "Manage store operations, inventory, and staff. Previous retail management experience needed.", category: "retail", url: "https://in.indeed.com/viewjob?jk=26" },
  { id: 27, title: "Carpenter", company: "FurniCraft", location: "Aurangabad, Maharashtra", type: "Contract", description: "Skilled carpenter for making custom furniture. Must be able to read designs.", category: "construction", url: "https://in.indeed.com/viewjob?jk=27" },
  { id: 28, title: "Lab Technician", company: "HealthFirst Diagnostics", location: "Nashik, Maharashtra", type: "Full-time", description: "Collect and process samples, perform tests, and maintain lab equipment. DMLT required.", category: "healthcare", url: "https://in.indeed.com/viewjob?jk=28" },
  { id: 29, title: "Soil Testing Assistant", company: "Krishi Vigyan Kendra", location: "Jalgaon, Maharashtra", type: "Contract", isVerified: true, description: "Assist in soil sample collection and basic testing. B.Sc in Agriculture preferred.", category: "agriculture", url: "https://in.indeed.com/viewjob?jk=29" },
  { id: 30, title: "Delivery Partner", company: "Gramin Express", location: "Kolhapur, Maharashtra", type: "Part-time", salary: "Per-delivery basis", description: "Deliver packages within the city limits. Must have a two-wheeler and a valid license.", category: "retail", url: "https://in.indeed.com/viewjob?jk=30" },
  { id: 31, title: "Beautician", company: "Sunder Salon", location: "Solapur, Maharashtra", type: "Part-time", description: "Looking for a beautician skilled in threading, waxing, and facials.", category: "retail", url: "https://in.indeed.com/viewjob?jk=31" },
  { id: 32, title: "Welder", company: "MetalWorks Inc.", location: "Nagpur, Maharashtra", type: "Full-time", isVerified: true, description: "Experienced welder for manufacturing and repair work. Certification is a plus.", category: "construction", url: "https://in.indeed.com/viewjob?jk=32" },
  { id: 33, title: "Primary Health Worker (ASHA)", company: "National Health Mission", location: "Various Rural", type: "Full-time", isVerified: true, salary: "Honorarium", description: "Community health activist to serve as a link between the community and the public health system.", category: "government", url: "https://in.indeed.com/viewjob?jk=33" },
  { id: 34, title: "Call Center Executive (Vernacular)", company: "ConnectFirst BPO", location: "Pune, Maharashtra", type: "Full-time", description: "Voice process for a leading telecom company. Fluency in Marathi is required.", category: "it", url: "https://in.indeed.com/viewjob?jk=34" },
  { id: 35, title: "Preschool Teacher", company: "Little Angels Play School", location: "Thane, Maharashtra", type: "Part-time", salary: "9,000", description: "Creative and patient teacher for a preschool. Experience with play-based learning preferred.", category: "teaching", url: "https://in.indeed.com/viewjob?jk=35" },
  { id: 36, title: "Poultry Farm Worker", company: "Suguna Foods", location: "Nashik, Maharashtra", type: "Full-time", isVerified: true, description: "Responsible for feeding, watering, and maintaining the health of poultry.", category: "agriculture", url: "https://in.indeed.com/viewjob?jk=36" },
  { id: 37, title: "Physiotherapist", company: "Active Life Clinic", location: "Mumbai, Maharashtra", type: "Contract", description: "Part-time physiotherapist for a private clinic. Must have a Bachelor's degree in Physiotherapy.", category: "healthcare", url: "https://in.indeed.com/viewjob?jk=37" },
  { id: 38, title: "Cashier", company: "DMart", location: "Amravati, Maharashtra", type: "Full-time", isVerified: true, description: "Handle cash transactions and customer service at checkout counters.", category: "retail", url: "https://in.indeed.com/viewjob?jk=38" },
  { id: 39, title: "Office Assistant", company: "Chopra & Associates", location: "Aurangabad, Maharashtra", type: "Full-time", description: "General office duties including filing, answering phones, and managing correspondence.", category: "it", url: "https://in.indeed.com/viewjob?jk=39" },
  { id: 40, title: "Site Supervisor", company: "Patil Constructions", location: "Kolhapur, Maharashtra", type: "Full-time", isVerified: true, salary: "28,000", description: "Supervise construction activities and ensure safety and quality standards are met.", category: "construction", url: "https://in.indeed.com/viewjob?jk=40" }
];

const maharashtraCities = [
  "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati", 
  "Nanded", "Kolhapur", "Thane", "Akola", "Latur", "Dhule", "Jalgaon",
  "Sangli", "Satara", "Wardha", "Yavatmal", "Parbhani", "Chandrapur", "Bhandara"
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");
  const [category, setCategory] = useState("all");

  const filteredJobs = dummyJobs;

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Find Your Next Job</h1>
        <p className="mt-2 text-lg text-muted-foreground">Search thousands of jobs from verified employers in your area.</p>
      </header>

      <div className="sticky top-16 bg-background/95 backdrop-blur-sm z-10 py-4 mb-8 -mx-4 px-4 border-b">
        <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search for jobs like 'teacher' or 'driver'..." 
              className="pl-10 h-12 text-base" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
              <Mic className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
          <Button size="lg" className="h-12 text-base">Find Jobs</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 max-w-7xl mx-auto">
          <Select value={jobType} onValueChange={setJobType}>
            <SelectTrigger>
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {maharashtraCities.map(city => (
                    <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="agriculture">Agriculture</SelectItem>
              <SelectItem value="teaching">Teaching</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="construction">Construction</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="government">Government</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-muted-foreground">No jobs found</h2>
          <p className="mt-2 text-muted-foreground">Try adjusting your search filters.</p>
        </div>
      )}
    </div>
  );
}
