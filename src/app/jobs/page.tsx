
"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobCard, type Job } from "@/components/job-card";

const dummyJobs: Job[] = [
  { id: 1, title: "Tractor Driver", company: "Sharma Farms", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, salary: "18,000", description: "Experienced tractor driver needed for a large farm. Must have a valid license and knowledge of modern farming equipment.", category: "agriculture" },
  { id: 2, title: "Data Entry Operator", company: "Gramin Suvidha Kendra", location: "Nashik, Maharashtra", type: "Part-time", salary: "8,000", description: "Basic computer knowledge required. Work involves entering data from government forms into our system. Flexible hours.", category: "it" },
  { id: 3, title: "Healthcare Assistant", company: "Village Clinic", location: "Satara, Maharashtra", type: "Full-time", isVerified: true, description: "Assist doctors and nurses with daily tasks. A compassionate and caring attitude is a must.", category: "healthcare" },
  { id: 4, title: "Primary School Teacher", company: "Sarvodaya School", location: "Aurangabad, Maharashtra", type: "Full-time", isVerified: true, salary: "12,000", description: "Looking for a teacher for classes 1-4. D.Ed or B.Ed preferred. Passion for teaching young children is essential.", category: "teaching" },
  { id: 5, title: "Construction Worker", company: "Local Builders", location: "Mumbai, Maharashtra", type: "Contract", description: "General labor needed for a new housing project. Daily wages. Immediate start.", category: "construction" },
  { id: 6, title: "Retail Sales Associate", company: "Kisan Retail Store", location: "Nagpur, Maharashtra", type: "Full-time", isVerified: true, description: "Customer service and sales role in a busy retail environment. Previous experience is a plus.", category: "retail" },
  { id: 7, title: "Farm Hand", company: "Green Valley Organics", location: "Sangli, Maharashtra", type: "Full-time", description: "General farm duties including planting, harvesting, and livestock care. Hardworking and reliable individuals are welcome.", category: "agriculture" },
  { id: 8, title: "Anganwadi Worker", company: "Govt. of Maharashtra", location: "Latur, Maharashtra", type: "Full-time", isVerified: true, salary: "As per govt. norms", description: "Provide health and nutrition education and support to women and children in the community.", category: "government" },
  { id: 9, title: "Electrician", company: "PowerGrid Services", location: "Thane, Maharashtra", type: "Contract", description: "Certified electrician needed for residential and commercial wiring projects. Must have own tools.", category: "construction" },
  { id: 10, title: "Nursing Aide", company: "City General Hospital", location: "Amravati, Maharashtra", type: "Full-time", isVerified: true, description: "Support nursing staff with patient care, monitoring vitals, and maintaining hygiene.", category: "healthcare" },
  { id: 11, title: "Computer Operator", company: "e-Seva Center", location: "Akola, Maharashtra", type: "Part-time", salary: "7,500", description: "Assist citizens with online services, form filling, and document processing.", category: "it" },
  { id: 12, title: "Security Guard", company: "SecureCorp", location: "Pune, Maharashtra", type: "Full-time", description: "Night shift security guard for a corporate office. Prior experience is preferred.", category: "retail" },
  { id: 13, title: "Middle School Science Teacher", company: "Jnana Prabodhini", location: "Solapur, Maharashtra", type: "Full-time", isVerified: true, salary: "18,000", description: "Seeking a science teacher for classes 5-8 with a B.Sc and B.Ed degree.", category: "teaching" },
  { id: 14, title: "Plumber", company: "QuickFix Solutions", location: "Mumbai, Maharashtra", type: "Contract", description: "On-call plumber for maintenance and repair jobs. Experience with residential plumbing is a must.", category: "construction" },
  { id: 15, title: "Organic Farm Supervisor", company: "Dharti Organics", location: "Wardha, Maharashtra", type: "Full-time", isVerified: true, salary: "22,000", description: "Supervise farm operations, manage workers, and ensure compliance with organic standards.", category: "agriculture" },
  { id: 16, title: "Government Clerk", company: "District Collector Office", location: "Jalgaon, Maharashtra", type: "Full-time", isVerified: true, salary: "As per pay scale", description: "Clerical duties including file management, data entry, and official correspondence.", category: "government" },
  { id: 17, title: "Pharmacist Assistant", company: "Apna Medicals", location: "Kolhapur, Maharashtra", type: "Full-time", description: "Assist the head pharmacist in dispensing medicines and managing inventory. D.Pharm required.", category: "healthcare" },
  { id: 18, title: "Warehouse Packer", company: "InstaLogistics", location: "Bhandara, Maharashtra", type: "Part-time", description: "Packing and sorting goods in a large warehouse. Physical fitness is required.", category: "retail" },
  { id: 19, title: "Web Developer Intern", company: "Web Weavers", location: "Nagpur, Maharashtra", type: "Contract", salary: "5,000 stipend", description: "Internship opportunity for aspiring web developers. Basic knowledge of HTML, CSS, and JS required.", category: "it" },
  { id: 20, title: "Yoga Instructor", company: "Gramin Arogya Mission", location: "Yavatmal, Maharashtra", type: "Part-time", description: "Conduct yoga and wellness sessions for community groups. Certification is a plus.", category: "healthcare" },
  { id: 21, title: "Dairy Farm Worker", company: "Nanded Milk Union", location: "Nanded, Maharashtra", type: "Full-time", isVerified: true, description: "Duties include milking, feeding, and cleaning of cattle sheds.", category: "agriculture" },
  { id: 22, title: "Mason (Gawandi)", company: "Sunrise Constructions", location: "Chandrapur, Maharashtra", type: "Contract", description: "Skilled mason required for brickwork and plastering in a new building project.", category: "construction" },
  { id: 23, title: "Police Constable", company: "Maharashtra Police", location: "Dhule, Maharashtra", type: "Full-time", isVerified: true, salary: "As per govt. rules", description: "Recruitment for the post of Police Constable. Requires passing physical and written tests.", category: "government" },
  { id: 24, title: "Mobile Repair Technician", company: "Mobile Doctor", location: "Parbhani, Maharashtra", type: "Full-time", description: "Technician for repairing smartphones and feature phones. Chip-level repair skills are a bonus.", category: "it" },
  { id: 25, title: "English Teacher (High School)", company: "Modern English School", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, salary: "25,000", description: "Experienced English teacher for secondary and higher secondary classes. MA in English required.", category: "teaching" },
  { id: 26, title: "Store Manager", company: "Reliance Smart Point", location: "Satara, Maharashtra", type: "Full-time", isVerified: true, description: "Manage store operations, inventory, and staff. Previous retail management experience needed.", category: "retail" },
  { id: 27, title: "Carpenter", company: "FurniCraft", location: "Aurangabad, Maharashtra", type: "Contract", description: "Skilled carpenter for making custom furniture. Must be able to read designs.", category: "construction" },
  { id: 28, title: "Lab Technician", company: "HealthFirst Diagnostics", location: "Nashik, Maharashtra", type: "Full-time", description: "Collect and process samples, perform tests, and maintain lab equipment. DMLT required.", category: "healthcare" },
  { id: 29, title: "Soil Testing Assistant", company: "Krishi Vigyan Kendra", location: "Jalgaon, Maharashtra", type: "Contract", isVerified: true, description: "Assist in soil sample collection and basic testing. B.Sc in Agriculture preferred.", category: "agriculture" },
  { id: 30, title: "Delivery Partner", company: "Gramin Express", location: "Kolhapur, Maharashtra", type: "Part-time", salary: "Per-delivery basis", description: "Deliver packages within the city limits. Must have a two-wheeler and a valid license.", category: "retail" },
  { id: 31, title: "Beautician", company: "Sunder Salon", location: "Solapur, Maharashtra", type: "Part-time", description: "Looking for a beautician skilled in threading, waxing, and facials.", category: "retail" },
  { id: 32, title: "Welder", company: "MetalWorks Inc.", location: "Nagpur, Maharashtra", type: "Full-time", isVerified: true, description: "Experienced welder for manufacturing and repair work. Certification is a plus.", category: "construction" },
  { id: 33, title: "Primary Health Worker (ASHA)", company: "National Health Mission", location: "Various Rural", type: "Full-time", isVerified: true, salary: "Honorarium", description: "Community health activist to serve as a link between the community and the public health system.", category: "government" },
  { id: 34, title: "Call Center Executive (Vernacular)", company: "ConnectFirst BPO", location: "Pune, Maharashtra", type: "Full-time", description: "Voice process for a leading telecom company. Fluency in Marathi is required.", category: "it" },
  { id: 35, title: "Preschool Teacher", company: "Little Angels Play School", location: "Thane, Maharashtra", type: "Part-time", salary: "9,000", description: "Creative and patient teacher for a preschool. Experience with play-based learning preferred.", category: "teaching" },
  { id: 36, title: "Poultry Farm Worker", company: "Suguna Foods", location: "Nashik, Maharashtra", type: "Full-time", isVerified: true, description: "Responsible for feeding, watering, and maintaining the health of poultry.", category: "agriculture" },
  { id: 37, title: "Physiotherapist", company: "Active Life Clinic", location: "Mumbai, Maharashtra", type: "Contract", description: "Part-time physiotherapist for a private clinic. Must have a Bachelor's degree in Physiotherapy.", category: "healthcare" },
  { id: 38, title: "Cashier", company: "DMart", location: "Amravati, Maharashtra", type: "Full-time", isVerified: true, description: "Handle cash transactions and customer service at checkout counters.", category: "retail" },
  { id: 39, title: "Office Assistant", company: "Chopra & Associates", location: "Aurangabad, Maharashtra", type: "Full-time", description: "General office duties including filing, answering phones, and managing correspondence.", category: "it" },
  { id: 40, title: "Site Supervisor", company: "Patil Constructions", location: "Kolhapur, Maharashtra", type: "Full-time", isVerified: true, salary: "28,000", description: "Supervise construction activities and ensure safety and quality standards are met.", category: "construction" },
  { id: 41, title: "Horticulturist", company: "The Green Patch", location: "Ratnagiri, Maharashtra", type: "Full-time", isVerified: true, salary: "25,000", description: "Manage cultivation of fruits and flowers, with a focus on mango and cashew crops.", category: "agriculture" },
  { id: 42, title: "Math Teacher (Secondary)", company: "Vidya Mandir School", location: "Jalna, Maharashtra", type: "Full-time", salary: "20,000", description: "B.Sc in Mathematics and B.Ed required for teaching grades 9 and 10.", category: "teaching" },
  { id: 43, title: "Pathology Lab Assistant", company: "Precision Labs", location: "Buldhana, Maharashtra", type: "Full-time", description: "Assist in sample processing and report generation in a busy pathology lab.", category: "healthcare" },
  { id: 44, "title": "Surveyor", "company": "Landmark Surveys", "location": "Beed, Maharashtra", "type": "Contract", "isVerified": true, "description": "Conduct land surveys for infrastructure projects. ITI in Surveying is required.", "category": "construction" },
  { id: 45, "title": "IT Hardware Technician", "company": "CompuCare", "location": "Osmanabad, Maharashtra", "type": "Full-time", "salary": "14,000", "description": "Assemble, repair, and maintain desktop computers and peripherals.", "category": "it" },
  { id: 46, "title": "Panchayat Secretary", "company": "Gram Panchayat Office", "location": "Hingoli, Maharashtra", "type": "Full-time", "isVerified": true, "salary": "As per govt. scale", "description": "Administrative head of the Panchayat office, responsible for records and meetings.", "category": "government" },
  { id: 47, "title": "Visual Merchandiser", "company": "Big Bazaar", "location": "Nagpur, Maharashtra", "type": "Full-time", "description": "Design and implement appealing and eye-catching visual displays for the store.", "category": "retail" },
  { id: 48, "title": "Drip Irrigation Technician", "company": "Jain Irrigation Systems", "location": "Jalgaon, Maharashtra", "type": "Full-time", "isVerified": true, "description": "Install and maintain drip irrigation systems for agricultural clients.", "category": "agriculture" },
  { id: 49, "title": "Sports Teacher / Coach", "company": "District Sports Academy", "location": "Gondia, Maharashtra", "type": "Contract", "description": "Coach students in various sports like Kabaddi and Kho-Kho for district-level competitions.", "category": "teaching" },
  { id: 50, "title": "Dental Hygienist", "company": "Smile Dental Clinic", "location": "Washim, Maharashtra", "type": "Part-time", "salary": "10,000", "description": "Assist the dentist with cleanings, X-rays, and patient education.", "category": "healthcare" },
  { id: 51, "title": "Crane Operator", "company": "Metro Rail Project", "location": "Pune, Maharashtra", "type": "Contract", "isVerified": true, "description": "Licensed and experienced crane operator for a major infrastructure project.", "category": "construction" },
  { id: 52, "title": "CSC Operator", "company": "Common Service Centre", "location": "Gadchiroli, Maharashtra", "type": "Full-time", "description": "Deliver various G2C (Government to Citizen) services to rural citizens.", "category": "it" },
  { id: 53, "title": "Talathi", "company": "Revenue Department", "location": "Raigad, Maharashtra", "type": "Full-time", "isVerified": true, "salary": "As per govt. rules", "description": "Maintain village revenue accounts and land records.", "category": "government" },
  { id: 54, "title": "E-commerce Packer", "company": "Amazon Warehouse", "location": "Bhiwandi, Maharashtra", "type": "Full-time", "description": "Picking, packing, and shipping orders in a large fulfillment center.", "category": "retail" },
  { id: 55, "title": "Fisheries Worker", "company": "Coastal Fisheries Co-op", "location": "Sindhudurg, Maharashtra", "type": "Full-time", "description": "Work on fishing trawlers, including net handling and fish sorting.", "category": "agriculture" },
  { id: 56, "title": "Music Teacher", "company": "Sangeet Kala Academy", "location": "Kolhapur, Maharashtra", "type": "Part-time", "description": "Teach vocal or instrumental music (Harmonium, Tabla) to students of all ages.", "category": "teaching" },
  { id: 57, "title": "Ambulance Driver", "company": "108 Emergency Services", "location": "Ahmednagar, Maharashtra", "type": "Full-time", "isVerified": true, "description": "Safely operate ambulance and provide first aid in emergency situations. Must have a valid heavy vehicle license and first-aid certification.", "category": "healthcare" },
  { id: 58, "title": "Painter", "company": "Decor Homes", "location": "Solapur, Maharashtra", "type": "Contract", "description": "Skilled painter for interior and exterior residential projects.", "category": "construction" },
  { id: 59, "title": "Tally Operator", "company": "Gupta Traders", "location": "Akola, Maharashtra", "type": "Full-time", "salary": "11,000", "description": "Manage accounts, GST filing, and inventory using Tally ERP 9.", "category": "it" },
  { id: 60, "title": "Forest Guard", "company": "Forest Department", "location": "Chandrapur, Maharashtra", "type": "Full-time", "isVerified": true, "salary": "As per govt. scale", "description": "Patrol and protect forest areas, prevent illegal activities, and assist in wildlife management.", "category": "government" },
  { id: 61, "title": "Inventory Assistant", "company": "More Supermarket", "location": "Latur, Maharashtra", "type": "Full-time", "description": "Manage stock levels, receive goods, and maintain inventory records.", "category": "retail" },
  { id: 62, "title": "Sugarcane Harvester", "company": "Local Sugar Factory", "location": "Satara, Maharashtra", "type": "Contract", "description": "Seasonal work for harvesting sugarcane during the crushing season. Paid on a per-ton basis.", "category": "agriculture" },
  { id: 63, "title": "Art and Craft Teacher", "company": "Zilla Parishad School", "location": "Parbhani, Maharashtra", "type": "Part-time", "description": "Encourage creativity in students through various art and craft activities.", "category": "teaching" },
  { id: 64, "title": "X-Ray Technician", "company": "General Hospital", "location": "Dhule, Maharashtra", "type": "Full-time", "isVerified": true, "description": "Operate X-ray equipment and prepare patients for radiological procedures.", "category": "healthcare" },
  { id: 65, "title": "Bar Bending and Steel Fixing", "company": "Infra Projects Ltd.", "location": "Navi Mumbai, Maharashtra", "type": "Contract", "description": "Skilled labor for cutting, bending, and fixing reinforcement steel for concrete work.", "category": "construction" },
  { id: 66, "title": "Social Media Handler (Marathi)", "company": "Digital Marathi", "location": "Aurangabad, Maharashtra", "type": "Part-time", "description": "Manage and create content for Facebook and Instagram pages for local businesses.", "category": "it" },
  { id: 67, "title": "MSRTC Bus Conductor", "company": "Maharashtra State Road Transport", "location": "Various", "type": "Full-time", "isVerified": true, "salary": "As per govt. scale", "description": "Issue tickets to passengers and manage bus operations.", "category": "government" },
  { id: 68, "title": "Customer Service Executive", "company": "Local Supermart", "location": "Yavatmal, Maharashtra", "type": "Full-time", "description": "Handle customer queries, complaints, and provide information about products.", "category": "retail" },
  { id: 69, "title": "Greenhouse Worker", "company": "Polyhouse Nursery", "location": "Pune, Maharashtra", "type": "Full-time", "description": "Work in a controlled environment for growing high-value vegetables and flowers.", "category": "agriculture" },
  { id: 70, "title": "Librarian Assistant", "company": "Public Library", "location": "Wardha, Maharashtra", "type": "Part-time", "description": "Assist with book cataloging, shelving, and helping patrons.", "category": "teaching" },
  { id: 71, "title": "Optometrist Assistant", "company": "Vision Care Opticals", "location": "Bhandara, Maharashtra", "type": "Full-time", "description": "Assist optometrist in eye examinations and help customers choose frames.", "category": "healthcare" },
  { id: 72, "title": "Scaffolder", "company": "HighRise Builders", "location": "Thane, Maharashtra", "type": "Contract", "description": "Erect and dismantle scaffolding on construction sites safely.", "category": "construction" },
  { id: 73, "title": "DTP Operator", "company": "Priya Graphics", "location": "Sangli, Maharashtra", "type": "Full-time", "description": "Design and create layouts for print materials using CorelDRAW or Photoshop.", "category": "it" },
  { id: 74, "title": "Home Guard", "company": "Home Guard Department", "location": "Various", "type": "Part-time", "isVerified": true, "salary": "Daily allowance", "description": "Auxiliary force to the police for maintaining internal security and helping in emergencies.", "category": "government" },
  { id: 75, "title": "Tailor", "company": "StyleFit Boutique", "location": "Nashik, Maharashtra", "type": "Full-time", "description": "Skilled tailor for stitching blouses, dresses, and trousers.", "category": "retail" },
  { id: 76, "title": "Food Processing Worker", "company": "Mapro Foods", "location": "Satara, Maharashtra", "type": "Full-time", "isVerified": true, "description": "Work on the production line for making jams, jellies, and squashes.", "category": "agriculture" },
  { id: 77, "title": "Physical Education Teacher", "company": "New English School", "location": "Beed, Maharashtra", "type": "Full-time", "description": "Conduct physical education classes and train school teams.", "category": "teaching" },
  { id: 78, "title": "Dialysis Technician", "company": "Kidney Care Center", "location": "Nanded, Maharashtra", "type": "Full-time", "description": "Operate dialysis machines for patients with kidney failure.", "category": "healthcare" },
  { id: 79, "title": "Waterproofing Applicator", "company": "Dr. Fixit Services", "location": "Mumbai, Maharashtra", "type": "Contract", "description": "Apply waterproofing chemicals to roofs and walls.", "category": "construction" },
  { id: 80, "title": "CCTV Technician", "company": "SecureEye Solutions", "location": "Nagpur, Maharashtra", "type": "Full-time", "description": "Install and maintain CCTV surveillance systems.", "category": "it" },
  { id: 81, "title": "Mid-Day Meal Cook", "company": "Zilla Parishad School", "location": "Osmanabad, Maharashtra", "type": "Part-time", "isVerified": true, "description": "Prepare nutritious meals for school children as per the Mid-Day Meal Scheme.", "category": "government" },
  { id: 82, "title": "Bike Mechanic", "company": "Hero Service Center", "location": "Jalna, Maharashtra", "type": "Full-time", "description": "Service and repair Hero motorcycles and scooters.", "category": "retail" },
  { id: 83, "title": "Cold Storage Operator", "company": "Sahyadri Farmers Producer Co.", "location": "Nashik, Maharashtra", "type": "Full-time", "description": "Manage temperature and inventory in a large cold storage facility for fresh produce.", "category": "agriculture" },
  { id: 84, "title": "Dance Instructor", "company": "Rural Cultural Center", "location": "Latur, Maharashtra", "type": "Part-time", "description": "Teach folk dances like Lavani and Gondhal.", "category": "teaching" },
  { id: 85, "title": "Blood Bank Technician", "company": "Red Cross Blood Bank", "location": "Amravati, Maharashtra", "type": "Full-time", "description": "Collect, test, and store blood donations.", "category": "healthcare" },
  { id: 86, "title": "POP False Ceiling Worker", "company": "Interior Designs Co.", "location": "Pune, Maharashtra", "type": "Contract", "description": "Skilled in creating and installing Plaster of Paris (POP) false ceilings.", "category": "construction" },
  { id: 87, "title": "CAD Draughtsman (Civil)", "company": "Infra Consultants", "location": "Aurangabad, Maharashtra", "type": "Full-time", "description": "Prepare detailed civil engineering drawings using AutoCAD.", "category": "it" },
  { id: 88, "title": "Election Booth Level Officer (BLO)", "company": "Election Commission", "location": "Various Villages", "type": "Part-time", "isVerified": true, "description": "Assist in electoral roll management and election-day activities.", "category": "government" },
  { id: 89, "title": "Textile Mill Worker", "company": "Raymond Ltd", "location": "Yavatmal, Maharashtra", "type": "Full-time", "isVerified": true, "description": "Operate spinning or weaving machinery in a textile mill.", "category": "retail" },
  { id: 90, "title": "Veterinary Assistant", "company": "Govt. Veterinary Hospital", "location": "Hingoli, Maharashtra", "type": "Full-time", "description": "Assist the veterinarian in treating livestock and other animals.", "category": "agriculture" },
  { id: 91, "title": "Special Education Teacher", "company": "Inclusive Education Society", "location": "Mumbai, Maharashtra", "type": "Full-time", "description": "Teach children with special needs, adapting curriculum as necessary.", "category": "teaching" },
  { id: 92, "title": "Medical Representative", "company": "Cipla Ltd", "location": "Nagpur, Maharashtra", "type": "Full-time", "isVerified": true, "description": "Promote and sell company's pharmaceutical products to doctors and chemists.", "category": "healthcare" },
  { id: 93, "title": "Road Construction Labour", "company": "National Highways Authority", "location": "Across Maharashtra", "type": "Contract", "description": "General labour for national highway construction and repair projects.", "category": "construction" },
  { id: 94, "title": "Graphic Designer (Marathi)", "company": "Creative Ads Agency", "location": "Pune, Maharashtra", "type": "Part-time", "description": "Create graphics for social media, banners, and pamphlets in Marathi.", "category": "it" },
  { id: 95, "title": "Railway Group D", "company": "Indian Railways", "location": "Various", "type": "Full-time", "isVerified": true, "description": "Posts like track maintainer, helper, pointsman in the Indian Railways.", "category": "government" },
  { id: 96, "title": "Goldsmith", "company": "PNG Jewellers", "location": "Pune, Maharashtra", "type": "Full-time", "isVerified": true, "description": "Skilled artisan for crafting and repairing gold ornaments.", "category": "retail" },
  { id: 97, "title": "Agri-Tourism Guide", "company": "RuralRoots Tours", "location": "Baramati, Maharashtra", "type": "Part-time", "description": "Guide tourists on farm tours, explaining agricultural practices and rural life.", "category": "agriculture" },
  { id: 98, "title": "Computer Hardware Trainer", "company": "Skill Development Center", "location": "Kolhapur, Maharashtra", "type": "Full-time", "description": "Train students in computer assembly, troubleshooting, and networking.", "category": "teaching" },
  { id: 99, "title": "Geriatric Caregiver", "company": "SeniorCare At Home", "location": "Thane, Maharashtra", "type": "Full-time", "description": "Provide compassionate care and assistance to elderly clients at their residence.", "category": "healthcare" },
  { id: 100, "title": "Aluminium Fabricator", "company": "Windows & Doors Co.", "location": "Aurangabad, Maharashtra", "type": "Contract", "description": "Cut, assemble and install aluminum windows, doors, and partitions.", "category": "construction" },
  { id: 101, title: "Seed Processing Technician", company: "Mahabeej", location: "Akola, Maharashtra", type: "Full-time", isVerified: true, description: "Operate machinery for cleaning, grading, and treating seeds.", category: "agriculture" },
  { id: 102, title: "History Teacher (High School)", company: "Zilla Parishad High School", location: "Latur, Maharashtra", type: "Full-time", description: "MA in History and B.Ed required for teaching higher secondary classes.", category: "teaching" },
  { id: 103, title: "ICU Nurse", company: "Apollo Hospital", location: "Nashik, Maharashtra", type: "Full-time", isVerified: true, salary: "30,000", description: "Experienced nurse for critical care unit. Must have relevant certification.", category: "healthcare" },
  { id: 104, title: "Rigger", company: "L&T Construction", location: "Mumbai, Maharashtra", type: "Contract", description: "Assemble and install rigging gear such as cables, ropes, pulleys, and winches.", category: "construction" },
  { id: 105, title: "SAP FICO Consultant", company: "Tech Mahindra", location: "Pune, Maharashtra", type: "Full-time", description: "Experienced SAP consultant for implementation and support projects.", category: "it" },
  { id: 106, title: "Anganwadi Supervisor", company: "ICDS", location: "Jalna, Maharashtra", type: "Full-time", isVerified: true, description: "Supervise the functioning of multiple Anganwadi centers in a block.", category: "government" },
  { id: 107, title: "Logistics Coordinator", company: "Flipkart", location: "Bhiwandi, Maharashtra", type: "Full-time", description: "Coordinate with delivery partners and manage logistics for a fulfillment center.", category: "retail" },
  { id: 108, title: "Floriculturist", company: "Rose Gardens Inc.", location: "Pune, Maharashtra", type: "Full-time", description: "Expert in cultivation of commercial flowers like roses and gerberas in polyhouses.", category: "agriculture" },
  { id: 109, title: "Geography Teacher", company: "Podar International School", location: "Amravati, Maharashtra", type: "Full-time", isVerified: true, description: "Teach geography to middle and high school students in a CBSE school.", category: "teaching" },
  { id: 110, title: "Medical Coder", company: "Omega Healthcare", location: "Nagpur, Maharashtra", type: "Full-time", description: "Certified medical coder to assign codes for medical billing.", category: "healthcare" },
  { id: 111, title: "Tile Mason", company: "Modern Homes", location: "Thane, Maharashtra", type: "Contract", description: "Skilled mason for laying floor and wall tiles in residential apartments.", category: "construction" },
  { id: 112, title: "Network Engineer", company: "Airtel", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Maintain and troubleshoot network infrastructure for a major telecom.", category: "it" },
  { id: 113, title: "Village Development Officer (VDO)", company: "Rural Development Dept", location: "Satara, Maharashtra", type: "Full-time", isVerified: true, description: "Implement government development schemes at the village level.", category: "government" },
  { id: 114, title: "Pharmacist", company: "Wellness Forever", location: "Kolhapur, Maharashtra", type: "Full-time", isVerified: true, description: "Licensed pharmacist to manage a retail pharmacy outlet.", category: "retail" },
  { id: 115, title: "Pesticide Applicator", company: "Krishi Seva Kendra", location: "Sangli, Maharashtra", type: "Full-time", description: "Licensed professional for safe application of pesticides on farms.", category: "agriculture" },
  { id: 116, title: "Abacus Teacher", company: "Brainobrain", location: "Aurangabad, Maharashtra", type: "Part-time", description: "Train children in abacus and mental arithmetic.", category: "teaching" },
  { id: 117, title: "Operation Theatre Technician", company: "Wockhardt Hospital", location: "Nagpur, Maharashtra", type: "Full-time", isVerified: true, description: "Prepare and maintain operation theatres for surgical procedures.", category: "healthcare" },
  { id: 118, title: "Interior Designer", company: "Design Walls", location: "Pune, Maharashtra", type: "Contract", description: "Creative designer for residential and commercial interior projects.", category: "construction" },
  { id: 119, title: "UI/UX Designer", company: "Persistent Systems", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Design user interfaces and experiences for web and mobile applications.", category: "it" },
  { id: 120, title: "Food Inspector", company: "Food and Drug Administration (FDA)", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Inspect food establishments to ensure safety and hygiene standards.", category: "government" },
  { id: 121, title: "Bakery Chef", company: "The Cake Shop", location: "Nashik, Maharashtra", type: "Full-time", description: "Experienced chef for baking cakes, pastries, and other bakery products.", category: "retail" },
  { id: 122, title: "Post-Harvest Technician", company: "Sahyadri Farms", location: "Nashik, Maharashtra", type: "Full-time", isVerified: true, description: "Manage post-harvest activities like sorting, grading, and packing of fruits.", category: "agriculture" },
  { id: 123, title: "Foreign Language Teacher (German)", company: "Goethe-Institut", location: "Pune, Maharashtra", type: "Part-time", description: "Teach German language to students of various levels.", category: "teaching" },
  { id: 124, title: "Ayurvedic Doctor (BAMS)", company: "Patanjali Chikitsalaya", location: "Solapur, Maharashtra", type: "Full-time", description: "Provide Ayurvedic consultations and treatments to patients.", category: "healthcare" },
  { id: 125, title: "Stonemason", company: "Heritage Restorations", location: "Aurangabad, Maharashtra", type: "Contract", description: "Skilled in stone carving and restoration work for historical monuments.", category: "construction" },
  { id: 126, title: "Database Administrator", company: "TCS", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Manage and maintain large databases for corporate clients.", category: "it" },
  { id: 127, title: "Sub-Inspector of Police", company: "Maharashtra Police", location: "Various", type: "Full-time", isVerified: true, description: "Lead investigation teams and maintain law and order.", category: "government" },
  { id: 128, title: "Optical Fiber Splicer", company: "Jio Fiber", location: "Pune, Maharashtra", type: "Contract", description: "Technician for splicing and maintaining optical fiber cables.", category: "it" },
  { id: 129, title: "Veterinary Doctor", company: "Private Clinic", location: "Baramati, Maharashtra", type: "Full-time", description: "Provide medical care to pets and livestock. BVSc degree required.", category: "agriculture" },
  { id: 130, title: "Fashion Designer", company: "Local Boutique", location: "Mumbai, Maharashtra", type: "Full-time", description: "Design and create new clothing lines for a boutique.", category: "retail" },
  { id: 131, title: "Driving Instructor", company: "Maruti Driving School", location: "Nagpur, Maharashtra", type: "Full-time", description: "Licensed instructor to teach driving to new learners.", category: "teaching" },
  { id: 132, title: "Homeopathic Doctor (BHMS)", company: "Dr. Batra's", location: "Thane, Maharashtra", type: "Full-time", isVerified: true, description: "Provide homeopathic treatment for various ailments.", category: "healthcare" },
  { id: 133, title: "Real Estate Agent", company: "PropTiger", location: "Pune, Maharashtra", type: "Full-time", description: "Assist clients in buying, selling, and renting properties.", category: "retail" },
  { id: 134, title: "CNC Machine Operator", company: "Bharat Forge", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Operate and maintain CNC machines in a manufacturing plant.", category: "construction" },
  { id: 135, title: "Drone Pilot (Agriculture)", company: "AgriTech Solutions", location: "Nashik, Maharashtra", type: "Contract", description: "Licensed drone pilot for crop monitoring and pesticide spraying.", category: "agriculture" },
  { id: 136, title: "Bank Probationary Officer (PO)", company: "State Bank of India", location: "Across Maharashtra", type: "Full-time", isVerified: true, description: "Management level position in a leading public sector bank.", category: "government" },
  { id: 137, title: "Blockchain Developer", company: "WazirX", location: "Mumbai, Maharashtra", type: "Full-time", description: "Develop and maintain blockchain-based applications.", category: "it" },
  { id: 138, title: "Robotics Trainer", company: "STEM Academy", location: "Pune, Maharashtra", type: "Part-time", description: "Teach robotics and programming to school students.", category: "teaching" },
  { id: 139, title: "Nutritionist", company: "Gold's Gym", location: "Nagpur, Maharashtra", type: "Full-time", description: "Provide diet and nutrition plans to gym members.", category: "healthcare" },
  { id: 140, title: "Solar Panel Installer", company: "Tata Power Solar", location: "Aurangabad, Maharashtra", type: "Contract", isVerified: true, description: "Install and maintain solar panels for residential and commercial clients.", category: "construction" },
  { id: 141, title: "Jewelry Designer", company: "Tanishq", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Design innovative and traditional jewelry pieces.", category: "retail" },
  { id: 142, title: "Mushroom Cultivator", company: "BioFarms", location: "Lonavala, Maharashtra", type: "Full-time", description: "Manage all aspects of mushroom cultivation from spawn to harvest.", category: "agriculture" },
  { id: 143, title: "State Transport Bus Driver", company: "MSRTC", location: "Various", type: "Full-time", isVerified: true, description: "Drive state transport buses on various routes across Maharashtra.", category: "government" },
  { id: 144, title: "Cloud Engineer", company: "Infosys", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Manage and deploy applications on cloud platforms like AWS, Azure.", category: "it" },
  { id: 145, title: "Career Counselor", company: "IDP Education", location: "Mumbai, Maharashtra", type: "Full-time", description: "Guide students on career paths and university admissions.", category: "teaching" },
  { id: 146, title: "Dental Assistant", company: "Clove Dental", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Assist dentists during procedures and manage clinic appointments.", category: "healthcare" },
  { id: 147, title: "Safety Officer", company: "Reliance Industries", location: "Nagpur, Maharashtra", type: "Full-time", description: "Ensure workplace safety compliance on a large industrial site.", category: "construction" },
  { id: 148, title: "E-commerce Manager", company: "Myntra", location: "Mumbai, Maharashtra", type: "Full-time", description: "Manage online sales, marketing, and operations for a fashion brand.", category: "retail" },
  { id: 149, title: "Aquaculture Farmer", company: "AquaDelight", location: "Ratnagiri, Maharashtra", type: "Full-time", description: "Manage fish and shrimp farming in ponds.", category: "agriculture" },
  { id: 150, title: "Jailor", company: "Prisons Department", location: "Yerwada, Pune", type: "Full-time", isVerified: true, description: "Manage administration and security of a correctional facility.", category: "government" },
  { id: 151, title: "Game Developer", company: "Ubisoft", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Develop and program video games for various platforms.", category: "it" },
  { id: 152, title: "Montessori Teacher", company: "EuroKids", location: "Thane, Maharashtra", type: "Full-time", description: "Certified Montessori teacher for a preschool.", category: "teaching" },
  { id: 153, title: "Radiographer", company: "Metropolis Healthcare", location: "Mumbai, Maharashtra", type: "Full-time", description: "Perform diagnostic imaging examinations like X-rays, CT scans.", category: "healthcare" },
  { id: 154, title: "HVAC Technician", company: "Blue Star", location: "Nagpur, Maharashtra", type: "Full-time", description: "Install, maintain, and repair heating, ventilation, and air conditioning systems.", category: "construction" },
  { id: 155, title: "Retail Buyer", company: "Shoppers Stop", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Select and purchase lines of products for retail stores.", category: "retail" },
  { id: 156, title: "Agricultural Loan Officer", company: "HDFC Bank", location: "Satara, Maharashtra", type: "Full-time", description: "Assess and process loan applications for farmers and agri-businesses.", category: "agriculture" },
  { id: 157, title: "Excise Inspector", company: "State Excise Department", location: "Kolhapur, Maharashtra", type: "Full-time", isVerified: true, description: "Monitor and regulate the production and sale of liquor.", category: "government" },
  { id: 158, title: "Cyber Security Analyst", company: "PwC", location: "Mumbai, Maharashtra", type: "Full-time", description: "Protect company networks and systems from cyber threats.", category: "it" },
  { id: 159, title: "Curriculum Developer", company: "BYJU'S", location: "Pune, Maharashtra", type: "Full-time", description: "Design and develop educational content for online learning platforms.", category: "teaching" },
  { id: 160, title: "Medical Lab Supervisor", company: "Thyrocare", location: "Navi Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Supervise laboratory operations and ensure quality control.", category: "healthcare" },
  { id: 161, title: "Lift Installer", company: "Otis Elevator Co.", location: "Pune, Maharashtra", type: "Full-time", description: "Install and service elevators in new and existing buildings.", category: "construction" },
  { id: 162, title: "Supply Chain Manager", company: "Unilever", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Oversee the entire supply chain process from procurement to delivery.", category: "retail" },
  { id: 163, title: "Sericulturist", company: "Silk India", location: "Bhandara, Maharashtra", type: "Full-time", description: "Engage in the rearing of silkworms for the production of raw silk.", category: "agriculture" },
  { id: 164, title: "Income Tax Officer", company: "Income Tax Department", location: "Nagpur, Maharashtra", type: "Full-time", isVerified: true, description: "Assess and collect income tax from individuals and corporations.", category: "government" },
  { id: 165, title: "DevOps Engineer", company: "Capgemini", location: "Pune, Maharashtra", type: "Full-time", description: "Work on CI/CD pipelines, automation, and cloud infrastructure.", category: "it" },
  { id: 166, title: "Admissions Counselor", company: "Symbiosis University", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Counsel and assist prospective students with the admissions process.", category: "teaching" },
  { id: 167, title: "Clinical Research Coordinator", company: "Serum Institute of India", location: "Pune, Maharashtra", type: "Full-time", description: "Manage clinical trials and ensure compliance with protocols.", category: "healthcare" },
  { id: 168, title: "Fire Safety Officer", company: "MIDC", location: "Aurangabad, Maharashtra", type: "Full-time", description: "Implement and oversee fire safety protocols in industrial estates.", category: "construction" },
  { id: 169, title: "Luxury Brand Manager", company: "LVMH", location: "Mumbai, Maharashtra", type: "Full-time", description: "Manage marketing and branding for a luxury goods company.", category: "retail" },
  { id: 170, title: "Tea Taster", company: "Tata Consumer Products", location: "Mumbai, Maharashtra", type: "Full-time", description: "Professional taster to ensure the quality and consistency of tea blends.", category: "agriculture" },
  { id: 171, title: "IAS Officer (Collector)", company: "Indian Administrative Service", location: "District HQ", type: "Full-time", isVerified: true, description: "Top administrative post managing a district in Maharashtra.", category: "government" },
  { id: 172, title: "AI/ML Engineer", company: "Google", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Develop artificial intelligence and machine learning models.", category: "it" },
  { id: 173, title: "Education Content Creator", company: "Unacademy", location: "Mumbai, Maharashtra", type: "Full-time", description: "Create engaging video and written content for educational courses.", category: "teaching" },
  { id: 174, title: "Hospital Administrator", company: "Fortis Hospital", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Manage the overall operations of a hospital.", category: "healthcare" },
  { id: 175, title: "Architect", company: "Hafeez Contractor", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Design and plan large-scale architectural projects.", category: "construction" },
  { id: 176, title: "VMware Administrator", company: "Infosys", location: "Pune, Maharashtra", type: "Full-time", "description": "Administer and maintain VMware environments. VCP certification is a plus.", "category": "it" },
  { id: 177, title: "Store Visual Merchandiser", company: "Westside", location: "Pune, Maharashtra", type: "Full-time", "description": "Create appealing and eye-catching visual displays and ensure the store's aesthetic standards are met.", "category": "retail" },
  { id: 178, title: "Florist", company: "Ferns N Petals", location: "Mumbai, Maharashtra", type: "Full-time", "description": "Design and create floral arrangements for various occasions.", "category": "retail" },
  { id: 179, title: "Foreign Service Officer (IFS)", company: "Ministry of External Affairs", location: "Mumbai / Delhi", type: "Full-time", isVerified: true, "description": "Represent India in diplomatic missions abroad.", "category": "government" },
  { id: 180, title: "Livestock Development Officer", company: "Animal Husbandry Dept", location: "Various", type: "Full-time", isVerified: true, "description": "Implement schemes for livestock development and disease control.", "category": "agriculture" },
  { id: 181, title: "Corporate Trainer", company: "Dale Carnegie", location: "Mumbai, Maharashtra", type: "Full-time", "description": "Conduct soft skills and leadership training for corporate clients.", "category": "teaching" },
  { id: 182, title: "Speech Therapist", company: "Sound Steps Clinic", location: "Thane, Maharashtra", type: "Part-time", "description": "Provide therapy to children and adults with speech and language disorders.", "category": "healthcare" },
  { id: 183, title: "Quantity Surveyor", company: "Shapoorji Pallonji", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, "description": "Estimate and manage costs for large construction projects.", "category": "construction" },
  { id: 184, title: "Data Scientist", company: "Fractal Analytics", location: "Mumbai, Maharashtra", type: "Full-time", "description": "Analyze large datasets to extract meaningful insights and build predictive models.", "category": "it" },
  { id: 185, title: "Customs Officer", company: "Central Board of Indirect Taxes and Customs", location: "Mumbai Port", type: "Full-time", isVerified: true, "description": "Inspect and clear goods imported and exported through customs.", "category": "government" },
  { id: 186, title: "Wedding Planner", company: "Shaadi.com Events", location: "Pune, Maharashtra", type: "Contract", "description": "Plan and coordinate all aspects of weddings and related events.", "category": "retail" },
  { id: 187, title: "Apiculturist (Bee Keeper)", company: "Madhu Farms", location: "Mahabaleshwar, Maharashtra", type: "Full-time", "description": "Manage bee colonies for honey production and pollination.", "category": "agriculture" },
  { id: 188, title: "School Principal", company: "Delhi Public School", location: "Nagpur, Maharashtra", type: "Full-time", isVerified: true, "description": "Lead the academic and administrative functions of a large CBSE school.", "category": "teaching" },
  { id: 189, title: "Occupational Therapist", company: "NeuroGen Brain & Spine Institute", location: "Navi Mumbai, Maharashtra", type: "Full-time", "description": "Help patients with injuries or disabilities participate in everyday activities.", "category": "healthcare" },
  { id: 190, title: "MEP Engineer", company: "Voltas", location: "Pune, Maharashtra", type: "Full-time", "description": "Design and manage Mechanical, Electrical, and Plumbing systems for buildings.", "category": "construction" },
  { id: 191, title: "Ethical Hacker", company: "Quick Heal", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, "description": "Perform penetration testing to identify and fix security vulnerabilities.", "category": "it" },
  { id: 192, title: "Railway Station Master", company: "Indian Railways", location: "Various Stations", type: "Full-time", isVerified: true, "description": "Manage train operations and passenger services at a railway station.", "category": "government" },
  { id: 193, title: "Sommelier (Wine Steward)", company: "The Taj Mahal Palace Hotel", location: "Mumbai, Maharashtra", type: "Full-time", "description": "Specialist in wine service and pairing in a fine dining restaurant.", "category": "retail" },
  { id: 194, title: "Viticulturist", company: "Sula Vineyards", location: "Nashik, Maharashtra", type: "Full-time", isVerified: true, "description": "Manage grape cultivation for wine production.", "category": "agriculture" },
  { id: 195, title: "Instructional Designer", company: "Tata Interactive Systems", location: "Mumbai, Maharashtra", type: "Full-time", "description": "Create engaging learning experiences and instructional materials.", "category": "teaching" },
  { id: 196, title: "Health Insurance Claims Manager", company: "ICICI Lombard", location: "Mumbai, Maharashtra", type: "Full-time", "description": "Oversee the processing of health insurance claims.", "category": "healthcare" },
  { id: 197, title: "Land Acquisition Officer", company: "NHAI", location: "Various", type: "Full-time", isVerified: true, "description": "Manage the process of acquiring land for national highway projects.", "category": "construction" },
  { id: 198, title: "Full Stack Developer", company: "Mindtree", location: "Pune, Maharashtra", type: "Full-time", "description": "Proficient in both front-end and back-end development (e.g., MERN/MEAN stack).", "category": "it" },
  { id: 199, title: "RBI Grade B Officer", company: "Reserve Bank of India", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, "description": "A prestigious managerial role in India's central bank.", "category": "government" },
  { id: 200, title: "Personal Shopper", company: "Zara", location: "Pune, Maharashtra", type: "Part-time", "description": "Advise customers on fashion trends and help them select outfits.", "category": "retail" }
];

const maharashtraCities = [
  "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati", 
  "Nanded", "Kolhapur", "Thane", "Akola", "Latur", "Dhule", "Jalgaon",
  "Sangli", "Satara", "Wardha", "Yavatmal", "Parbhani", "Chandrapur", "Bhandara",
  "Ratnagiri", "Jalna", "Buldhana", "Beed", "Osmanabad", "Hingoli", "Gondia",
  "Washim", "Gadchiroli", "Raigad", "Sindhudurg", "Ahmednagar", "Bhiwandi", "Baramati"
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");
  const [category, setCategory] = useState("all");

  const filteredJobs = useMemo(() => {
    return dummyJobs.filter((job) => {
      const searchMatch =
        searchQuery.trim() === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());

      const jobTypeMatch = jobType === "all" || job.type.toLowerCase() === jobType;
      
      const locationMatch = location === "all" || job.location.toLowerCase().includes(location);

      const categoryMatch = category === "all" || job.category?.toLowerCase() === category;

      return searchMatch && jobTypeMatch && locationMatch && categoryMatch;
    });
  }, [searchQuery, jobType, location, category]);


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
          <Button size="lg" className="h-12 text-base" onClick={() => { /* Search is now live */ }}>Find Jobs</Button>
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
                {maharashtraCities.sort().map(city => (
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

    