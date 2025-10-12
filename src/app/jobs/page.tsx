
"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobCard, type Job } from "@/components/job-card";

const dummyJobs: Job[] = [
  // Agriculture (71 jobs)
  { id: 1, title: "Tractor Driver", company: "Sharma Farms", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, salary: "18,000", description: "Experienced tractor driver needed for a large farm. Must have a valid license and knowledge of modern farming equipment.", category: "agriculture" },
  { id: 7, title: "Farm Hand", company: "Green Valley Organics", location: "Sangli, Maharashtra", type: "Full-time", description: "General farm duties including planting, harvesting, and livestock care. Hardworking and reliable individuals are welcome.", category: "agriculture" },
  { id: 15, title: "Organic Farm Supervisor", company: "Dharti Organics", location: "Wardha, Maharashtra", type: "Full-time", isVerified: true, salary: "22,000", description: "Supervise farm operations, manage workers, and ensure compliance with organic standards.", category: "agriculture" },
  { id: 21, title: "Dairy Farm Worker", company: "Nanded Milk Union", location: "Nanded, Maharashtra", type: "Full-time", isVerified: true, description: "Duties include milking, feeding, and cleaning of cattle sheds.", category: "agriculture" },
  { id: 29, title: "Soil Testing Assistant", company: "Krishi Vigyan Kendra", location: "Jalgaon, Maharashtra", type: "Contract", isVerified: true, description: "Assist in soil sample collection and basic testing. B.Sc in Agriculture preferred.", category: "agriculture" },
  { id: 36, title: "Poultry Farm Worker", company: "Suguna Foods", location: "Nashik, Maharashtra", type: "Full-time", isVerified: true, description: "Responsible for feeding, watering, and maintaining the health of poultry.", category: "agriculture" },
  { id: 41, title: "Horticulturist", company: "The Green Patch", location: "Ratnagiri, Maharashtra", type: "Full-time", isVerified: true, salary: "25,000", description: "Manage cultivation of fruits and flowers, with a focus on mango and cashew crops.", category: "agriculture" },
  { id: 48, title: "Drip Irrigation Technician", company: "Jain Irrigation Systems", location: "Jalgaon, Maharashtra", type: "Full-time", isVerified: true, description: "Install and maintain drip irrigation systems for agricultural clients.", category: "agriculture" },
  { id: 55, title: "Fisheries Worker", company: "Coastal Fisheries Co-op", location: "Sindhudurg, Maharashtra", type: "Full-time", description: "Work on fishing trawlers, including net handling and fish sorting.", category: "agriculture" },
  { id: 62, title: "Sugarcane Harvester", company: "Local Sugar Factory", location: "Satara, Maharashtra", type: "Contract", description: "Seasonal work for harvesting sugarcane during the crushing season. Paid on a per-ton basis.", category: "agriculture" },
  { id: 69, title: "Greenhouse Worker", company: "Polyhouse Nursery", location: "Pune, Maharashtra", type: "Full-time", description: "Work in a controlled environment for growing high-value vegetables and flowers.", category: "agriculture" },
  { id: 76, title: "Food Processing Worker", company: "Mapro Foods", location: "Satara, Maharashtra", type: "Full-time", isVerified: true, description: "Work on the production line for making jams, jellies, and squashes.", category: "agriculture" },
  { id: 83, title: "Cold Storage Operator", company: "Sahyadri Farmers Producer Co.", location: "Nashik, Maharashtra", type: "Full-time", description: "Manage temperature and inventory in a large cold storage facility for fresh produce.", category: "agriculture" },
  { id: 90, title: "Veterinary Assistant", company: "Govt. Veterinary Hospital", location: "Hingoli, Maharashtra", type: "Full-time", description: "Assist the veterinarian in treating livestock and other animals.", category: "agriculture" },
  { id: 97, title: "Agri-Tourism Guide", company: "RuralRoots Tours", location: "Baramati, Maharashtra", type: "Part-time", description: "Guide tourists on farm tours, explaining agricultural practices and rural life.", category: "agriculture" },
  { id: 101, title: "Seed Processing Technician", company: "Mahabeej", location: "Akola, Maharashtra", type: "Full-time", isVerified: true, description: "Operate machinery for cleaning, grading, and treating seeds.", category: "agriculture" },
  { id: 108, title: "Floriculturist", company: "Rose Gardens Inc.", location: "Pune, Maharashtra", type: "Full-time", description: "Expert in cultivation of commercial flowers like roses and gerberas in polyhouses.", category: "agriculture" },
  { id: 115, title: "Pesticide Applicator", company: "Krishi Seva Kendra", location: "Sangli, Maharashtra", type: "Full-time", description: "Licensed professional for safe application of pesticides on farms.", category: "agriculture" },
  { id: 122, title: "Post-Harvest Technician", company: "Sahyadri Farms", location: "Nashik, Maharashtra", type: "Full-time", isVerified: true, description: "Manage post-harvest activities like sorting, grading, and packing of fruits.", category: "agriculture" },
  { id: 129, title: "Veterinary Doctor", company: "Private Clinic", location: "Baramati, Maharashtra", type: "Full-time", description: "Provide medical care to pets and livestock. BVSc degree required.", category: "agriculture" },
  { id: 135, title: "Drone Pilot (Agriculture)", company: "AgriTech Solutions", location: "Nashik, Maharashtra", type: "Contract", description: "Licensed drone pilot for crop monitoring and pesticide spraying.", category: "agriculture" },
  { id: 142, title: "Mushroom Cultivator", company: "BioFarms", location: "Lonavala, Maharashtra", type: "Full-time", description: "Manage all aspects of mushroom cultivation from spawn to harvest.", category: "agriculture" },
  { id: 149, title: "Aquaculture Farmer", company: "AquaDelight", location: "Ratnagiri, Maharashtra", type: "Full-time", description: "Manage fish and shrimp farming in ponds.", category: "agriculture" },
  { id: 156, title: "Agricultural Loan Officer", company: "HDFC Bank", location: "Satara, Maharashtra", type: "Full-time", description: "Assess and process loan applications for farmers and agri-businesses.", category: "agriculture" },
  { id: 163, title: "Sericulturist", company: "Silk India", location: "Bhandara, Maharashtra", type: "Full-time", description: "Engage in the rearing of silkworms for the production of raw silk.", category: "agriculture" },
  { id: 170, title: "Tea Taster", company: "Tata Consumer Products", location: "Mumbai, Maharashtra", type: "Full-time", description: "Professional taster to ensure the quality and consistency of tea blends.", category: "agriculture" },
  { id: 180, title: "Livestock Development Officer", company: "Animal Husbandry Dept", location: "Various", type: "Full-time", isVerified: true, description: "Implement schemes for livestock development and disease control.", category: "agriculture" },
  { id: 187, title: "Apiculturist (Bee Keeper)", company: "Madhu Farms", location: "Mahabaleshwar, Maharashtra", type: "Full-time", description: "Manage bee colonies for honey production and pollination.", category: "agriculture" },
  { id: 194, title: "Viticulturist", company: "Sula Vineyards", location: "Nashik, Maharashtra", type: "Full-time", isVerified: true, description: "Manage grape cultivation for wine production.", category: "agriculture" },
  { id: 201, title: "Agri Input Sales Officer", company: "Rallis India", location: "Aurangabad, Maharashtra", type: "Full-time", description: "Sales and promotion of seeds, pesticides, and fertilizers to farmers.", category: "agriculture" },
  { id: 202, title: "Farm Equipment Mechanic", company: "John Deere Service", location: "Jalgaon, Maharashtra", type: "Full-time", description: "Repair and maintain tractors, harvesters, and other farm machinery.", category: "agriculture" },
  { id: 203, title: "Micro-Irrigation Engineer", company: "Netafim", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Design and execute micro-irrigation projects for large farms.", category: "agriculture" },
  { id: 204, title: "Cattle Feed Production Supervisor", company: "Godrej Agrovet", location: "Latur, Maharashtra", type: "Full-time", description: "Oversee the production process of cattle feed.", category: "agriculture" },
  { id: 205, title: "Warehouse Manager (Agri)", company: "National Collateral Management", location: "Akola, Maharashtra", type: "Full-time", description: "Manage storage and quality of agricultural commodities in a warehouse.", category: "agriculture" },
  { id: 206, title: "Tissue Culture Lab Technician", company: "Jain Tissue Culture", location: "Jalgaon, Maharashtra", type: "Full-time", description: "Work in a lab for plant propagation through tissue culture.", category: "agriculture" },
  { id: 207, title: "Fisheries Extension Officer", company: "Fisheries Department", location: "Ratnagiri, Maharashtra", type: "Full-time", isVerified: true, description: "Provide technical guidance and support to fish farmers.", category: "agriculture" },
  { id: 208, title: "Goat Farming Manager", company: "Satara Goat Farm", location: "Satara, Maharashtra", type: "Full-time", description: "Manage a commercial goat farm, including breeding and healthcare.", category: "agriculture" },
  { id: 209, title: "Spices Grader", company: "Ramdev Masala", location: "Nagpur, Maharashtra", type: "Full-time", description: "Responsible for grading raw spices based on quality parameters.", category: "agriculture" },
  { id: 210, title: "Cotton Ginning Mill Operator", company: "Manjeet Cotton", location: "Yavatmal, Maharashtra", type: "Full-time", description: "Operate ginning machines to separate cotton fibers from seeds.", category: "agriculture" },
  { id: 211, title: "Agricultural Scientist", company: "ICAR", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Conduct research in crop improvement and plant protection.", category: "agriculture" },
  { id: 212, title: "Agri Finance Manager", company: "ICICI Bank", location: "Kolhapur, Maharashtra", type: "Full-time", description: "Lead the agri-lending portfolio for the region.", category: "agriculture" },
  { id: 213, title: "Farm Auditor", company: "Control Union", location: "Nashik, Maharashtra", type: "Contract", description: "Audit farms for compliance with organic and GlobalG.A.P. standards.", category: "agriculture" },
  { id: 214, title: "Aquatic Veterinarian", company: "Aqua Connect", location: "Sindhudurg, Maharashtra", type: "Full-time", description: "Specialized veterinarian for fish and shrimp health management.", category: "agriculture" },
  { id: 215, title: "Commodity Trader (Agri)", company: "Cargill", location: "Mumbai, Maharashtra", type: "Full-time", description: "Trade agricultural commodities like grains and oilseeds.", category: "agriculture" },
  { id: 216, title: "Farm App Developer", company: "AgroStar", location: "Pune, Maharashtra", type: "Full-time", description: "Develop mobile applications for farmers providing advisory and e-commerce.", category: "agriculture" },
  { id: 217, title: "Plant Breeder", company: "Mahyco", location: "Jalna, Maharashtra", type: "Full-time", isVerified: true, description: "Develop new hybrid seeds for various crops.", category: "agriculture" },
  { id: 218, title: "Food Safety Auditor", company: "SGS India", location: "Mumbai, Maharashtra", type: "Full-time", description: "Audit food processing units for FSSAI and other food safety standards.", category: "agriculture" },
  { id: 219, title: "Dairy Plant Manager", company: "Amul", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Manage the entire operations of a milk processing and packaging plant.", category: "agriculture" },
  { id: 220, title: "Rural Marketing Executive", company: "Dabur", location: "Nagpur, Maharashtra", type: "Full-time", description: "Handle marketing and distribution of FMCG products in rural areas.", category: "agriculture" },
  { id: 221, title: "Weather Analyst (Agriculture)", company: "Skymet", location: "Pune, Maharashtra", type: "Full-time", description: "Analyze weather data and provide forecasts for the agriculture sector.", category: "agriculture" },
  { id: 222, title: "Hydroponics Farm Manager", company: "Future Farms", location: "Mumbai, Maharashtra", type: "Full-time", description: "Manage a commercial hydroponics farm for leafy greens.", category: "agriculture" },
  { id: 223, title: "Agricultural Journalist", company: "Krishak Jagat", location: "Nagpur, Maharashtra", type: "Full-time", description: "Report on news, policies, and events related to the agriculture sector.", category: "agriculture" },
  { id: 224, title: "Bamboo Plantation Supervisor", company: "GreenGold Bamboo", location: "Gadchiroli, Maharashtra", type: "Full-time", description: "Oversee the cultivation and management of bamboo plantations.", category: "agriculture" },
  { id: 225, title: "Fruit Ripening Chamber Operator", company: "Fresh Produce Inc.", location: "Nashik, Maharashtra", type: "Full-time", description: "Operate ethylene-based fruit ripening chambers.", category: "agriculture" },
  { id: 226, title: "Quality Control Officer (Dairy)", company: "Chitale Dairy", location: "Pune, Maharashtra", type: "Full-time", description: "Ensure quality standards of milk and milk products.", category: "agriculture" },
  { id: 227, title: "Agricultural Drone Assembly Technician", company: "Marut Drones", location: "Pune, Maharashtra", type: "Full-time", description: "Assemble and test drones used for agricultural purposes.", category: "agriculture" },
  { id: 228, title: "Soil Scientist", company: "National Bureau of Soil Survey", location: "Nagpur, Maharashtra", type: "Full-time", isVerified: true, description: "Conduct soil surveys and research on soil health.", category: "agriculture" },
  { id: 229, title: "Landscape Gardener", company: "Urban Gardens", location: "Mumbai, Maharashtra", type: "Full-time", description: "Design, create and maintain gardens and landscapes for residential and commercial clients.", category: "agriculture" },
  { id: 230, title: "Land Surveyor (Rural)", company: "Geo Surveys", location: "Satara, Maharashtra", type: "Contract", description: "Conduct land surveys for property demarcation and agricultural planning.", category: "agriculture" },
  { id: 231, title: "Farm Management Consultant", company: "Agri-Connect", location: "Pune, Maharashtra", type: "Full-time", description: "Provide expert advice to farmers on crop management and profitability.", category: "agriculture" },
  { id: 232, title: "JCB Operator", company: "Local Contractors", location: "Beed, Maharashtra", type: "Contract", description: "Operate JCB for various agricultural and construction tasks.", category: "agriculture" },
  { id: 233, title: "Sugar Mill Lab Chemist", company: "Vasantdada Sugar Institute", location: "Pune, Maharashtra", type: "Full-time", description: "Analyze sugarcane and sugar samples in a sugar mill laboratory.", category: "agriculture" },
  { id: 234, title: "Entomologist", company: "Bayer Crop Science", location: "Thane, Maharashtra", type: "Full-time", description: "Study insects and develop solutions for pest control in agriculture.", category: "agriculture" },
  { id: 235, title: "Mushroom Spawn Lab Assistant", company: "MycoLabs", location: "Pune, Maharashtra", type: "Full-time", description: "Assist in the production of mushroom spawn in a sterile lab environment.", category: "agriculture" },
  { id: 236, title: "Coffee Plantation Worker", company: "Chikmagalur Estates", location: "Ratnagiri, Maharashtra", type: "Full-time", description: "Work on a coffee plantation, involved in picking, pruning, and processing.", category: "agriculture" },
  { id: 237, title: "Forestry Consultant", company: "Green Initiatives", location: "Gadchiroli, Maharashtra", type: "Contract", description: "Advise on sustainable forestry practices and carbon credit projects.", category: "agriculture" },
  { id: 238, title: "Animal Nutritionist", company: "Kemin Industries", location: "Pune, Maharashtra", type: "Full-time", description: "Formulate feed for poultry, dairy, and aqua sectors.", category: "agriculture" },
  { id: 239, title: "Agricultural Pump Technician", company: "Kirloskar Brothers", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Install and service agricultural water pumps.", category: "agriculture" },
  { id: 240, title: "Food Technologist", company: "Nestle", location: "Ponda, Goa (near MH)", type: "Full-time", isVerified: true, description: "Involved in product development and quality control of food products.", category: "agriculture" },

  // Teaching (71 jobs)
  { id: 4, title: "Primary School Teacher", company: "Sarvodaya School", location: "Aurangabad, Maharashtra", type: "Full-time", isVerified: true, salary: "12,000", description: "Looking for a teacher for classes 1-4. D.Ed or B.Ed preferred.", category: "teaching" },
  { id: 13, title: "Middle School Science Teacher", company: "Jnana Prabodhini", location: "Solapur, Maharashtra", type: "Full-time", isVerified: true, salary: "18,000", description: "Seeking a science teacher for classes 5-8 with a B.Sc and B.Ed degree.", category: "teaching" },
  { id: 25, title: "English Teacher (High School)", company: "Modern English School", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, salary: "25,000", description: "Experienced English teacher for secondary and higher secondary classes. MA in English required.", category: "teaching" },
  { id: 35, title: "Preschool Teacher", company: "Little Angels Play School", location: "Thane, Maharashtra", type: "Part-time", salary: "9,000", description: "Creative and patient teacher for a preschool. Experience with play-based learning preferred.", category: "teaching" },
  { id: 42, title: "Math Teacher (Secondary)", company: "Vidya Mandir School", location: "Jalna, Maharashtra", type: "Full-time", salary: "20,000", description: "B.Sc in Mathematics and B.Ed required for teaching grades 9 and 10.", category: "teaching" },
  { id: 49, title: "Sports Teacher / Coach", company: "District Sports Academy", location: "Gondia, Maharashtra", type: "Contract", description: "Coach students in various sports like Kabaddi and Kho-Kho for district-level competitions.", category: "teaching" },
  { id: 56, title: "Music Teacher", company: "Sangeet Kala Academy", location: "Kolhapur, Maharashtra", type: "Part-time", description: "Teach vocal or instrumental music (Harmonium, Tabla) to students of all ages.", category: "teaching" },
  { id: 63, title: "Art and Craft Teacher", company: "Zilla Parishad School", location: "Parbhani, Maharashtra", type: "Part-time", description: "Encourage creativity in students through various art and craft activities.", category: "teaching" },
  { id: 70, title: "Librarian Assistant", company: "Public Library", location: "Wardha, Maharashtra", type: "Part-time", description: "Assist with book cataloging, shelving, and helping patrons.", category: "teaching" },
  { id: 77, title: "Physical Education Teacher", company: "New English School", location: "Beed, Maharashtra", type: "Full-time", description: "Conduct physical education classes and train school teams.", category: "teaching" },
  { id: 84, title: "Dance Instructor", company: "Rural Cultural Center", location: "Latur, Maharashtra", type: "Part-time", description: "Teach folk dances like Lavani and Gondhal.", category: "teaching" },
  { id: 91, title: "Special Education Teacher", company: "Inclusive Education Society", location: "Mumbai, Maharashtra", type: "Full-time", description: "Teach children with special needs, adapting curriculum as necessary.", category: "teaching" },
  { id: 98, title: "Computer Hardware Trainer", company: "Skill Development Center", location: "Kolhapur, Maharashtra", type: "Full-time", description: "Train students in computer assembly, troubleshooting, and networking.", category: "teaching" },
  { id: 102, title: "History Teacher (High School)", company: "Zilla Parishad High School", location: "Latur, Maharashtra", type: "Full-time", description: "MA in History and B.Ed required for teaching higher secondary classes.", category: "teaching" },
  { id: 109, title: "Geography Teacher", company: "Podar International School", location: "Amravati, Maharashtra", type: "Full-time", isVerified: true, description: "Teach geography to middle and high school students in a CBSE school.", category: "teaching" },
  { id: 116, title: "Abacus Teacher", company: "Brainobrain", location: "Aurangabad, Maharashtra", type: "Part-time", description: "Train children in abacus and mental arithmetic.", category: "teaching" },
  { id: 123, title: "Foreign Language Teacher (German)", company: "Goethe-Institut", location: "Pune, Maharashtra", type: "Part-time", description: "Teach German language to students of various levels.", category: "teaching" },
  { id: 131, title: "Driving Instructor", company: "Maruti Driving School", location: "Nagpur, Maharashtra", type: "Full-time", description: "Licensed instructor to teach driving to new learners.", category: "teaching" },
  { id: 138, title: "Robotics Trainer", company: "STEM Academy", location: "Pune, Maharashtra", type: "Part-time", description: "Teach robotics and programming to school students.", category: "teaching" },
  { id: 145, title: "Career Counselor", company: "IDP Education", location: "Mumbai, Maharashtra", type: "Full-time", description: "Guide students on career paths and university admissions.", category: "teaching" },
  { id: 152, title: "Montessori Teacher", company: "EuroKids", location: "Thane, Maharashtra", type: "Full-time", description: "Certified Montessori teacher for a preschool.", category: "teaching" },
  { id: 159, title: "Curriculum Developer", company: "BYJU'S", location: "Pune, Maharashtra", type: "Full-time", description: "Design and develop educational content for online learning platforms.", category: "teaching" },
  { id: 166, title: "Admissions Counselor", company: "Symbiosis University", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Counsel and assist prospective students with the admissions process.", category: "teaching" },
  { id: 173, title: "Education Content Creator", company: "Unacademy", location: "Mumbai, Maharashtra", type: "Full-time", description: "Create engaging video and written content for educational courses.", category: "teaching" },
  { id: 181, title: "Corporate Trainer", company: "Dale Carnegie", location: "Mumbai, Maharashtra", type: "Full-time", description: "Conduct soft skills and leadership training for corporate clients.", category: "teaching" },
  { id: 188, title: "School Principal", company: "Delhi Public School", location: "Nagpur, Maharashtra", type: "Full-time", isVerified: true, description: "Lead the academic and administrative functions of a large CBSE school.", category: "teaching" },
  { id: 195, title: "Instructional Designer", company: "Tata Interactive Systems", location: "Mumbai, Maharashtra", type: "Full-time", description: "Create engaging learning experiences and instructional materials.", category: "teaching" },
  { id: 241, title: "Physics Lecturer", company: "Bansal Classes", location: "Nagpur, Maharashtra", type: "Full-time", description: "Teach Physics for competitive exams like JEE and NEET.", category: "teaching" },
  { id: 242, title: "Chemistry Teacher (CBSE)", company: "Ryan International", location: "Mumbai, Maharashtra", type: "Full-time", description: "Experienced Chemistry teacher for grades 11 and 12.", category: "teaching" },
  { id: 243, title: "Biology Teacher (IGCSE)", company: "Dhirubhai Ambani School", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Teach Biology for the IGCSE curriculum.", category: "teaching" },
  { id: 244, title: "Zilla Parishad Teacher", company: "ZP Sangli", location: "Sangli, Maharashtra", type: "Full-time", isVerified: true, description: "Primary school teacher for a rural school. D.T.Ed mandatory.", category: "teaching" },
  { id: 245, title: "Yoga Instructor (School)", company: "Art of Living", location: "Pune, Maharashtra", type: "Part-time", description: "Conduct yoga sessions for students in various schools.", category: "teaching" },
  { id: 246, title: "Vice Principal", company: "VIBGYOR High School", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Assist the principal in school administration and academic supervision.", category: "teaching" },
  { id: 247, title: "Economics Teacher (Jr. College)", company: "Fergusson College", location: "Pune, Maharashtra", type: "Full-time", description: "Lecturer for 11th and 12th grade Economics.", category: "teaching" },
  { id: 248, title: "Marathi Language Teacher", company: "Parle Tilak Vidyalaya", location: "Mumbai, Maharashtra", type: "Full-time", description: "Experienced Marathi teacher for middle school.", category: "teaching" },
  { id: 249, title: "French Language Teacher", company: "Alliance Française", location: "Pune, Maharashtra", type: "Part-time", description: "Native or certified French speaker to teach beginner and intermediate levels.", category: "teaching" },
  { id: 250, title: "Student Counselor", company: "Oakridge International", location: "Pune, Maharashtra", type: "Full-time", description: "Provide academic and emotional counseling to students.", category: "teaching" },
  { id: 251, title: "E-learning Content Reviewer", company: "Toppr", location: "Mumbai, Maharashtra", type: "Full-time", description: "Review and edit educational content for online platforms.", category: "teaching" },
  { id: 252, title: "Coding Instructor for Kids", company: "WhiteHat Jr", location: "Work from Home", type: "Part-time", description: "Teach coding basics to children aged 6-14 online.", category: "teaching" },
  { id: 253, title: "Academic Coordinator", company: "Orchids The International School", location: "Thane, Maharashtra", type: "Full-time", description: "Coordinate curriculum planning and teacher training.", category: "teaching" },
  { id: 254, title: "Civil Services Exam Mentor", company: "Chanakya Mandal", location: "Pune, Maharashtra", type: "Full-time", description: "Guide and mentor students preparing for UPSC/MPSC exams.", category: "teaching" },
  { id: 255, title: "Lab Assistant (School)", company: "St. Vincent's High School", location: "Pune, Maharashtra", type: "Full-time", description: "Maintain science labs and assist teachers during practicals.", category: "teaching" },
  { id: 256, title: "Primary Year Program (PYP) Teacher", company: "Mercedes-Benz International School", location: "Pune, Maharashtra", type: "Full-time", description: "IB-PYP trained teacher for early years.", category: "teaching" },
  { id: 257, title: "Music Academy Manager", company: "Furtados School of Music", location: "Mumbai, Maharashtra", type: "Full-time", description: "Manage the daily operations of a music academy branch.", category: "teaching" },
  { id: 258, title: "Japanese Language Interpreter/Trainer", company: "Fujitsu", location: "Pune, Maharashtra", type: "Full-time", description: "Provide language support and training for corporate teams.", category: "teaching" },
  { id: 259, title: "Vedic Math Trainer", company: "Vedic Maths Forum", location: "Nagpur, Maharashtra", type: "Part-time", description: "Conduct workshops and classes on Vedic Mathematics.", category: "teaching" },
  { id: 260, title: "Accountancy Teacher", company: "Podar Jumbo Kids", location: "Nashik, Maharashtra", type: "Full-time", description: "Teach accountancy for higher secondary commerce students.", category: "teaching" },
  { id: 261, title: "Social Studies Teacher", company: "Kendriya Vidyalaya", location: "Aurangabad, Maharashtra", type: "Full-time", isVerified: true, description: "TGT in Social Studies for a central government school.", category: "teaching" },
  { id: 262, title: "Animation Trainer", company: "MAAC", location: "Pune, Maharashtra", type: "Full-time", description: "Train students in 3D animation software like Maya and Max.", category: "teaching" },
  { id: 263, title: "Online Tutor (Maths & Science)", company: "Vedantu", location: "Work from Home", type: "Part-time", description: "Conduct online classes for students from grade 6 to 10.", category: "teaching" },
  { id: 264, title: "IELTS Trainer", company: "British Council", location: "Mumbai, Maharashtra", type: "Full-time", description: "Certified trainer to prepare students for the IELTS exam.", category: "teaching" },
  { id: 265, title: "Personality Development Coach", company: "Frankfinn Institute", location: "Pune, Maharashtra", type: "Full-time", description: "Train students in soft skills, grooming, and communication.", category: "teaching" },
  { id: 266, title: "Political Science Professor", company: "University of Mumbai", location: "Mumbai, Maharashtra", type: "Full-time", description: "Assistant Professor position in the Political Science department. Ph.D. required.", category: "teaching" },
  { id: 267, title: "Swimming Coach", company: "YMCA", location: "Mumbai, Maharashtra", type: "Part-time", description: "Certified swimming instructor for children and adults.", category: "teaching" },
  { id: 268, title: "Digital Marketing Trainer", company: "NIIT", location: "Pune, Maharashtra", type: "Full-time", description: "Teach concepts of SEO, SEM, and social media marketing to students.", category: "teaching" },
  { id: 269, title: "Handwriting Improvement Teacher", company: "Write Right", location: "Thane, Maharashtra", type: "Part-time", description: "Conduct classes to improve handwriting for school students.", category: "teaching" },
  { id: 270, title: "Subject Matter Expert (Physics)", company: "Chegg Inc.", location: "Work from Home", type: "Contract", description: "Answer academic questions from students online in the field of Physics.", category: "teaching" },
  { id: 271, title: "Librarian", company: "Symbiosis International School", location: "Pune, Maharashtra", type: "Full-time", description: "Manage the school library and promote reading habits. M.Lib.Sc required.", category: "teaching" },
  { id: 272, title: "Drama Teacher", company: "Helen O'Grady Drama Academy", location: "Mumbai, Maharashtra", type: "Part-time", description: "Conduct drama and creative expression classes for children.", category: "teaching" },
  { id: 273, title: "Early Childhood Educator", company: "Kangaroo Kids", location: "Pune, Maharashtra", type: "Full-time", description: "Passionate educator for playgroup and nursery sections.", category: "teaching" },
  { id: 274, title: "Geography Professor", company: "SP College", location: "Pune, Maharashtra", type: "Full-time", description: "Professor for undergraduate and postgraduate geography courses.", category: "teaching" },
  { id: 275, title: "Skating Instructor", company: "Decathlon", location: "Pune, Maharashtra", type: "Part-time", description: "Teach roller skating to kids and adults.", category: "teaching" },
  { id: 276, title: "Mandarin Chinese Tutor", company: "Inchin Closer", location: "Mumbai, Maharashtra", type: "Part-time", description: "Tutor for spoken and written Mandarin for business professionals.", category: "teaching" },
  { id: 277, title: "TOEFL Trainer", company: "Jamboree Education", location: "Pune, Maharashtra", type: "Full-time", description: "Prepare students for the TOEFL exam with targeted strategies and practice.", category: "teaching" },
  { id: 278, title: "B.Ed College Lecturer", company: "Adarsh College of Education", location: "Nanded, Maharashtra", type: "Full-time", description: "Lecturer for various subjects in a B.Ed. training college.", category: "teaching" },
  { id: 279, title: "Archery Coach", company: "Pune District Archery Association", location: "Pune, Maharashtra", type: "Contract", description: "Experienced archery coach to train competitive archers.", category: "teaching" },
  { id: 280, title: "Home Tutor (All Subjects)", company: "UrbanPro", location: "Mumbai, Maharashtra", type: "Part-time", description: "Provide private home tutoring for students of various grades.", category: "teaching" },
  { id: 281, title: "History Professor", company: "Deccan College", location: "Pune, Maharashtra", type: "Full-time", description: "Professor specializing in ancient Indian history and archaeology.", category: "teaching" },

  // Healthcare (71 jobs)
  { id: 3, title: "Healthcare Assistant", company: "Village Clinic", location: "Satara, Maharashtra", type: "Full-time", isVerified: true, description: "Assist doctors and nurses with daily tasks. A compassionate and caring attitude is a must.", category: "healthcare" },
  { id: 10, title: "Nursing Aide", company: "City General Hospital", location: "Amravati, Maharashtra", type: "Full-time", isVerified: true, description: "Support nursing staff with patient care, monitoring vitals, and maintaining hygiene.", category: "healthcare" },
  { id: 17, title: "Pharmacist Assistant", company: "Apna Medicals", location: "Kolhapur, Maharashtra", type: "Full-time", description: "Assist the head pharmacist in dispensing medicines and managing inventory. D.Pharm required.", category: "healthcare" },
  { id: 20, title: "Yoga Instructor", company: "Gramin Arogya Mission", location: "Yavatmal, Maharashtra", type: "Part-time", description: "Conduct yoga and wellness sessions for community groups. Certification is a plus.", category: "healthcare" },
  { id: 28, title: "Lab Technician", company: "HealthFirst Diagnostics", location: "Nashik, Maharashtra", type: "Full-time", description: "Collect and process samples, perform tests, and maintain lab equipment. DMLT required.", category: "healthcare" },
  { id: 37, title: "Physiotherapist", company: "Active Life Clinic", location: "Mumbai, Maharashtra", type: "Contract", description: "Part-time physiotherapist for a private clinic. Must have a Bachelor's degree in Physiotherapy.", category: "healthcare" },
  { id: 43, title: "Pathology Lab Assistant", company: "Precision Labs", location: "Buldhana, Maharashtra", type: "Full-time", description: "Assist in sample processing and report generation in a busy pathology lab.", category: "healthcare" },
  { id: 50, title: "Dental Hygienist", company: "Smile Dental Clinic", location: "Washim, Maharashtra", type: "Part-time", salary: "10,000", description: "Assist the dentist with cleanings, X-rays, and patient education.", category: "healthcare" },
  { id: 57, title: "Ambulance Driver", company: "108 Emergency Services", location: "Ahmednagar, Maharashtra", type: "Full-time", isVerified: true, description: "Safely operate ambulance and provide first aid in emergency situations. Must have a valid heavy vehicle license and first-aid certification.", category: "healthcare" },
  { id: 64, title: "X-Ray Technician", company: "General Hospital", location: "Dhule, Maharashtra", type: "Full-time", isVerified: true, description: "Operate X-ray equipment and prepare patients for radiological procedures.", category: "healthcare" },
  { id: 71, title: "Optometrist Assistant", company: "Vision Care Opticals", location: "Bhandara, Maharashtra", type: "Full-time", description: "Assist optometrist in eye examinations and help customers choose frames.", category: "healthcare" },
  { id: 78, title: "Dialysis Technician", company: "Kidney Care Center", location: "Nanded, Maharashtra", type: "Full-time", description: "Operate dialysis machines for patients with kidney failure.", category: "healthcare" },
  { id: 85, title: "Blood Bank Technician", company: "Red Cross Blood Bank", location: "Amravati, Maharashtra", type: "Full-time", description: "Collect, test, and store blood donations.", category: "healthcare" },
  { id: 92, title: "Medical Representative", company: "Cipla Ltd", location: "Nagpur, Maharashtra", type: "Full-time", isVerified: true, description: "Promote and sell company's pharmaceutical products to doctors and chemists.", category: "healthcare" },
  { id: 99, title: "Geriatric Caregiver", company: "SeniorCare At Home", location: "Thane, Maharashtra", type: "Full-time", description: "Provide compassionate care and assistance to elderly clients at their residence.", category: "healthcare" },
  { id: 103, title: "ICU Nurse", company: "Apollo Hospital", location: "Nashik, Maharashtra", type: "Full-time", isVerified: true, salary: "30,000", description: "Experienced nurse for critical care unit. Must have relevant certification.", category: "healthcare" },
  { id: 110, title: "Medical Coder", company: "Omega Healthcare", location: "Nagpur, Maharashtra", type: "Full-time", description: "Certified medical coder to assign codes for medical billing.", category: "healthcare" },
  { id: 117, title: "Operation Theatre Technician", company: "Wockhardt Hospital", location: "Nagpur, Maharashtra", type: "Full-time", isVerified: true, description: "Prepare and maintain operation theatres for surgical procedures.", category: "healthcare" },
  { id: 124, title: "Ayurvedic Doctor (BAMS)", company: "Patanjali Chikitsalaya", location: "Solapur, Maharashtra", type: "Full-time", description: "Provide Ayurvedic consultations and treatments to patients.", category: "healthcare" },
  { id: 132, title: "Homeopathic Doctor (BHMS)", company: "Dr. Batra's", location: "Thane, Maharashtra", type: "Full-time", isVerified: true, description: "Provide homeopathic treatment for various ailments.", category: "healthcare" },
  { id: 139, title: "Nutritionist", company: "Gold's Gym", location: "Nagpur, Maharashtra", type: "Full-time", description: "Provide diet and nutrition plans to gym members.", category: "healthcare" },
  { id: 146, title: "Dental Assistant", company: "Clove Dental", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Assist dentists during procedures and manage clinic appointments.", category: "healthcare" },
  { id: 153, title: "Radiographer", company: "Metropolis Healthcare", location: "Mumbai, Maharashtra", type: "Full-time", description: "Perform diagnostic imaging examinations like X-rays, CT scans.", category: "healthcare" },
  { id: 160, title: "Medical Lab Supervisor", company: "Thyrocare", location: "Navi Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Supervise laboratory operations and ensure quality control.", category: "healthcare" },
  { id: 167, title: "Clinical Research Coordinator", company: "Serum Institute of India", location: "Pune, Maharashtra", type: "Full-time", description: "Manage clinical trials and ensure compliance with protocols.", category: "healthcare" },
  { id: 174, title: "Hospital Administrator", company: "Fortis Hospital", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Manage the overall operations of a hospital.", category: "healthcare" },
  { id: 182, title: "Speech Therapist", company: "Sound Steps Clinic", location: "Thane, Maharashtra", type: "Part-time", description: "Provide therapy to children and adults with speech and language disorders.", category: "healthcare" },
  { id: 189, title: "Occupational Therapist", company: "NeuroGen Brain & Spine Institute", location: "Navi Mumbai, Maharashtra", type: "Full-time", description: "Help patients with injuries or disabilities participate in everyday activities.", category: "healthcare" },
  { id: 196, title: "Health Insurance Claims Manager", company: "ICICI Lombard", location: "Mumbai, Maharashtra", type: "Full-time", description: "Oversee the processing of health insurance claims.", category: "healthcare" },
  { id: 282, title: "General Duty Medical Officer", company: "Govt District Hospital", location: "Beed, Maharashtra", type: "Full-time", isVerified: true, description: "MBBS doctor for OPD and ward duties in a government hospital.", category: "healthcare" },
  { id: 283, title: "Staff Nurse (GNM/B.Sc)", company: "Lilavati Hospital", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Registered nurse for various departments like Med-Surg, Pediatrics.", category: "healthcare" },
  { id: 284, title: "Phlebotomist", company: "Lal PathLabs", location: "Pune, Maharashtra", type: "Full-time", description: "Collect blood samples from patients at collection centers or homes.", category: "healthcare" },
  { id: 285, title: "Hospital Ward Boy/Aaya", company: "Sahyadri Hospital", location: "Pune, Maharashtra", type: "Full-time", description: "Assist in patient mobility, cleanliness, and other support tasks in hospital wards.", category: "healthcare" },
  { id: 286, title: "Audiologist", company: "HearFon", location: "Nagpur, Maharashtra", type: "Full-time", description: "Diagnose and treat hearing and balance problems.", category: "healthcare" },
  { id: 287, title: "Psychologist/Counselor", company: "Mpower Minds", location: "Mumbai, Maharashtra", type: "Full-time", description: "Provide counseling and therapy for mental health concerns.", category: "healthcare" },
  { id: 288, title: "Medical Transcriptionist", company: "Acusis", location: "Work from Home", type: "Full-time", description: "Transcribe voice-recorded medical reports dictated by physicians.", category: "healthcare" },
  { id: 289, title: "Optician", company: "Lenskart", location: "Mumbai, Maharashtra", type: "Full-time", description: "Dispense and fit eyeglasses and contact lenses.", category: "healthcare" },
  { id: 290, title: "Hospital Billing Executive", company: "Jupiter Hospital", location: "Thane, Maharashtra", type: "Full-time", description: "Handle patient billing, insurance claims, and TPA coordination.", category: "healthcare" },
  { id: 291, title: "Veterinary Nurse", company: "Crown Vet", location: "Mumbai, Maharashtra", type: "Full-time", description: "Assist veterinarians in a small animal practice.", category: "healthcare" },
  { id: 292, title: "MRI Technician", company: "Star Imaging", location: "Pune, Maharashtra", type: "Full-time", description: "Operate Magnetic Resonance Imaging (MRI) scanners.", category: "healthcare" },
  { id: 293, title: "Cath Lab Technician", company: "Ruby Hall Clinic", location: "Pune, Maharashtra", type: "Full-time", description: "Assist cardiologists in cardiac catheterization procedures.", category: "healthcare" },
  { id: 294, title: "Hospital Front Desk Executive", company: "Deenanath Mangeshkar Hospital", location: "Pune, Maharashtra", type: "Full-time", description: "Manage patient registration, appointments, and inquiries.", category: "healthcare" },
  { id: 295, title: "Anesthesiologist", company: "KEM Hospital", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Administer anesthesia for surgical and other medical procedures.", category: "healthcare" },
  { id: 296, title: "Dietitian", company: "VLCC", location: "Pune, Maharashtra", type: "Full-time", description: "Provide nutritional counseling and diet plans for wellness clients.", category: "healthcare" },
  { id: 297, title: "Pharmacovigilance Associate", company: "TCS", location: "Mumbai, Maharashtra", type: "Full-time", description: "Entry-level role in drug safety monitoring.", category: "healthcare" },
  { id: 298, title: "Respiratory Therapist", company: "Global Hospital", location: "Mumbai, Maharashtra", type: "Full-time", description: "Care for patients with breathing disorders.", category: "healthcare" },
  { id: 299, title: "Sonographer/Ultrasound Technician", company: "Dr. Pawar's Imaging Center", location: "Nashik, Maharashtra", type: "Full-time", description: "Perform diagnostic ultrasound procedures.", category: "healthcare" },
  { id: 300, title: "Medical Equipment Technician", company: "Philips Healthcare", location: "Pune, Maharashtra", type: "Full-time", description: "Install, maintain, and repair medical equipment in hospitals.", category: "healthcare" },
  { id: 301, title: "Psychiatric Social Worker", company: "IMH", location: "Thane, Maharashtra", type: "Full-time", isVerified: true, description: "Provide support and counseling to patients with mental illness and their families.", category: "healthcare" },
  { id: 302, title: "EEG/EMG Technician", company: "Bombay Hospital", location: "Mumbai, Maharashtra", type: "Full-time", description: "Perform electroencephalography and electromyography tests.", category: "healthcare" },
  { id: 303, title: "CSSD Technician", company: "Jaslok Hospital", location: "Mumbai, Maharashtra", type: "Full-time", description: "Central Sterile Services Department technician responsible for sterilizing medical equipment.", category: "healthcare" },
  { id: 304, title: "Home Care Nurse", company: "Portea Medical", location: "Pune, Maharashtra", type: "Full-time", description: "Provide nursing care to patients in their homes.", category: "healthcare" },
  { id: 305, title: "Dental Ceramist", company: "Smilekraft Dental Lab", location: "Pune, Maharashtra", type: "Full-time", description: "Fabricate ceramic dental prosthetics like crowns and bridges.", category: "healthcare" },
  { id: 306, title: "Radiology Manager", company: "Hinduja Hospital", location: "Mumbai, Maharashtra", type: "Full-time", description: "Manage the operations of the radiology department.", category: "healthcare" },
  { id: 307, title: "Public Health Officer", company: "WHO", location: "Mumbai, Maharashtra", type: "Contract", description: "Work on public health programs and initiatives.", category: "healthcare" },
  { id: 308, title: "Prosthetist and Orthotist", company: "Endolite India", location: "Pune, Maharashtra", type: "Full-time", description: "Design and fit artificial limbs and braces.", category: "healthcare" },
  { id: 309, title: "Sleep Lab Technician", company: "Grant Medical College", location: "Mumbai, Maharashtra", type: "Full-time", description: "Monitor patients during sleep studies to diagnose sleep disorders.", category: "healthcare" },
  { id: 310, title: "Clinical Psychologist", company: "Mind Temple", location: "Pune, Maharashtra", type: "Full-time", description: "Assess and treat mental and emotional disorders.", category: "healthcare" },
  { id: 311, title: "Telemedicine Coordinator", company: "Apollo TeleHealth", location: "Mumbai, Maharashtra", type: "Full-time", description: "Coordinate virtual consultations between patients and doctors.", category: "healthcare" },
  { id: 312, title: "Healthcare Quality Analyst", company: "NABH", location: "Mumbai, Maharashtra", type: "Full-time", description: "Assess hospitals for quality accreditation.", category: "healthcare" },
  { id: 313, title: "Nuclear Medicine Technologist", company: "Tata Memorial Hospital", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Prepare and administer radioactive drugs for imaging or treatment.", category: "healthcare" },
  { id: 314, title: "Ayurvedic Pharmacy Assistant", company: "Vaidyaratnam", location: "Kolhapur, Maharashtra", type: "Full-time", description: "Dispense Ayurvedic medicines and manage pharmacy stock.", category: "healthcare" },
  { id: 315, title: "Laser Technician (Dermatology)", company: "Kaya Skin Clinic", location: "Pune, Maharashtra", type: "Full-time", description: "Perform laser hair removal and other aesthetic procedures under supervision.", category: "healthcare" },
  { id: 316, title: "Medical Writer", company: "Indegene", location: "Mumbai, Maharashtra", type: "Full-time", description: "Create clinical research documents, regulatory submissions, and medical education materials.", category: "healthcare" },
  { id: 317, title: "Hospital Infection Control Nurse", company: "Breach Candy Hospital", location: "Mumbai, Maharashtra", type: "Full-time", description: "Monitor and implement infection control policies within the hospital.", category: "healthcare" },
  { id: 318, title: "Sports Physiotherapist", company: "Olympic Gold Quest", location: "Pune, Maharashtra", type: "Full-time", description: "Work with elite athletes for injury prevention and rehabilitation.", category: "healthcare" },
  { id: 319, title: "Plaster Technician (Orthopedics)", company: "Sancheti Hospital", location: "Pune, Maharashtra", type: "Full-time", description: "Apply and remove casts and splints for orthopedic patients.", category: "healthcare" },
  { id: 320, title: "Biomedical Engineer", company: "Siemens Healthineers", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Maintain and service biomedical equipment.", category: "healthcare" },
  { id: 321, title: "Endoscopy Technician", company: "Asian Institute of Gastroenterology", location: "Hyderabad (covering MH)", type: "Full-time", description: "Assist in endoscopic procedures and maintain equipment.", category: "healthcare" },
  { id: 322, title: "Clinical Data Manager", company: "Cognizant", location: "Pune, Maharashtra", type: "Full-time", description: "Manage data from clinical trials.", category: "healthcare" },

  // Construction (71 jobs)
  { id: 5, title: "Construction Worker", company: "Local Builders", location: "Mumbai, Maharashtra", type: "Contract", description: "General labor needed for a new housing project. Daily wages. Immediate start.", category: "construction" },
  { id: 9, title: "Electrician", company: "PowerGrid Services", location: "Thane, Maharashtra", type: "Contract", description: "Certified electrician needed for residential and commercial wiring projects. Must have own tools.", category: "construction" },
  { id: 14, title: "Plumber", company: "QuickFix Solutions", location: "Mumbai, Maharashtra", type: "Contract", description: "On-call plumber for maintenance and repair jobs. Experience with residential plumbing is a must.", category: "construction" },
  { id: 22, title: "Mason (Gawandi)", company: "Sunrise Constructions", location: "Chandrapur, Maharashtra", type: "Contract", description: "Skilled mason required for brickwork and plastering in a new building project.", category: "construction" },
  { id: 27, title: "Carpenter", company: "FurniCraft", location: "Aurangabad, Maharashtra", type: "Contract", description: "Skilled carpenter for making custom furniture. Must be able to read designs.", category: "construction" },
  { id: 32, title: "Welder", company: "MetalWorks Inc.", location: "Nagpur, Maharashtra", type: "Full-time", isVerified: true, description: "Experienced welder for manufacturing and repair work. Certification is a plus.", category: "construction" },
  { id: 40, title: "Site Supervisor", company: "Patil Constructions", location: "Kolhapur, Maharashtra", type: "Full-time", isVerified: true, salary: "28,000", description: "Supervise construction activities and ensure safety and quality standards are met.", category: "construction" },
  { id: 44, title: "Surveyor", company: "Landmark Surveys", location: "Beed, Maharashtra", type: "Contract", isVerified: true, description: "Conduct land surveys for infrastructure projects. ITI in Surveying is required.", category: "construction" },
  { id: 51, title: "Crane Operator", company: "Metro Rail Project", location: "Pune, Maharashtra", type: "Contract", isVerified: true, description: "Licensed and experienced crane operator for a major infrastructure project.", category: "construction" },
  { id: 58, title: "Painter", company: "Decor Homes", location: "Solapur, Maharashtra", type: "Contract", description: "Skilled painter for interior and exterior residential projects.", category: "construction" },
  { id: 65, title: "Bar Bending and Steel Fixing", company: "Infra Projects Ltd.", location: "Navi Mumbai, Maharashtra", type: "Contract", description: "Skilled labor for cutting, bending, and fixing reinforcement steel for concrete work.", category: "construction" },
  { id: 72, title: "Scaffolder", company: "HighRise Builders", location: "Thane, Maharashtra", type: "Contract", description: "Erect and dismantle scaffolding on construction sites safely.", category: "construction" },
  { id: 79, title: "Waterproofing Applicator", company: "Dr. Fixit Services", location: "Mumbai, Maharashtra", type: "Contract", description: "Apply waterproofing chemicals to roofs and walls.", category: "construction" },
  { id: 86, title: "POP False Ceiling Worker", company: "Interior Designs Co.", location: "Pune, Maharashtra", type: "Contract", description: "Skilled in creating and installing Plaster of Paris (POP) false ceilings.", category: "construction" },
  { id: 93, title: "Road Construction Labour", company: "National Highways Authority", location: "Across Maharashtra", type: "Contract", description: "General labour for national highway construction and repair projects.", category: "construction" },
  { id: 100, title: "Aluminium Fabricator", company: "Windows & Doors Co.", location: "Aurangabad, Maharashtra", type: "Contract", description: "Cut, assemble and install aluminum windows, doors, and partitions.", category: "construction" },
  { id: 104, title: "Rigger", company: "L&T Construction", location: "Mumbai, Maharashtra", type: "Contract", description: "Assemble and install rigging gear such as cables, ropes, pulleys, and winches.", category: "construction" },
  { id: 111, title: "Tile Mason", company: "Modern Homes", location: "Thane, Maharashtra", type: "Contract", description: "Skilled mason for laying floor and wall tiles in residential apartments.", category: "construction" },
  { id: 118, title: "Interior Designer", company: "Design Walls", location: "Pune, Maharashtra", type: "Contract", description: "Creative designer for residential and commercial interior projects.", category: "construction" },
  { id: 125, title: "Stonemason", company: "Heritage Restorations", location: "Aurangabad, Maharashtra", type: "Contract", description: "Skilled in stone carving and restoration work for historical monuments.", category: "construction" },
  { id: 134, title: "CNC Machine Operator", company: "Bharat Forge", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Operate and maintain CNC machines in a manufacturing plant.", category: "construction" },
  { id: 140, title: "Solar Panel Installer", company: "Tata Power Solar", location: "Aurangabad, Maharashtra", type: "Contract", isVerified: true, description: "Install and maintain solar panels for residential and commercial clients.", category: "construction" },
  { id: 147, title: "Safety Officer", company: "Reliance Industries", location: "Nagpur, Maharashtra", type: "Full-time", description: "Ensure workplace safety compliance on a large industrial site.", category: "construction" },
  { id: 154, title: "HVAC Technician", company: "Blue Star", location: "Nagpur, Maharashtra", type: "Full-time", description: "Install, maintain, and repair heating, ventilation, and air conditioning systems.", category: "construction" },
  { id: 161, title: "Lift Installer", company: "Otis Elevator Co.", location: "Pune, Maharashtra", type: "Full-time", description: "Install and service elevators in new and existing buildings.", category: "construction" },
  { id: 168, title: "Fire Safety Officer", company: "MIDC", location: "Aurangabad, Maharashtra", type: "Full-time", description: "Implement and oversee fire safety protocols in industrial estates.", category: "construction" },
  { id: 175, title: "Architect", company: "Hafeez Contractor", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Design and plan large-scale architectural projects.", category: "construction" },
  { id: 183, title: "Quantity Surveyor", company: "Shapoorji Pallonji", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Estimate and manage costs for large construction projects.", category: "construction" },
  { id: 190, title: "MEP Engineer", company: "Voltas", location: "Pune, Maharashtra", type: "Full-time", description: "Design and manage Mechanical, Electrical, and Plumbing systems for buildings.", category: "construction" },
  { id: 197, title: "Land Acquisition Officer", company: "NHAI", location: "Various", type: "Full-time", isVerified: true, description: "Manage the process of acquiring land for national highway projects.", category: "construction" },
  { id: 323, title: "Civil Engineer (Site)", company: "Larsen & Toubro", location: "Mumbai, Maharashtra", type: "Full-time", description: "Supervise and manage construction activities on-site for infrastructure projects.", category: "construction" },
  { id: 324, title: "Shuttering Carpenter", company: "Afcons Infrastructure", location: "Nagpur, Maharashtra", type: "Contract", description: "Skilled in creating formwork for concrete structures.", category: "construction" },
  { id: 325, title: "Concrete Pump Operator", company: "RMC Readymix", location: "Pune, Maharashtra", type: "Full-time", description: "Operate and maintain concrete pumps on construction sites.", category: "construction" },
  { id: 326, title: "Construction Foreman", company: "PNC Infratech", location: "Aurangabad, Maharashtra", type: "Full-time", description: "Lead a team of construction workers and ensure project milestones are met.", category: "construction" },
  { id: 327, title: "Tower Crane Operator", company: "JMC Projects", location: "Mumbai, Maharashtra", type: "Contract", isVerified: true, description: "Operate tower cranes for high-rise building construction.", category: "construction" },
  { id: 328, title: "AutoCAD Draughtsman (Civil)", company: "Gherzi Consulting", location: "Pune, Maharashtra", type: "Full-time", description: "Prepare detailed civil engineering drawings using AutoCAD.", category: "construction" },
  { id: 329, title: "Structural Engineer", company: "Arup", location: "Mumbai, Maharashtra", type: "Full-time", description: "Design and analyze structural components of buildings and bridges.", category: "construction" },
  { id: 330, title: "Drilling Operator (Piling)", company: "Keller Ground Engineering", location: "Mumbai, Maharashtra", type: "Full-time", description: "Operate hydraulic piling rigs for foundation work.", category: "construction" },
  { id: 331, title: "Quarry Supervisor", company: "ACC Cement", location: "Chandrapur, Maharashtra", type: "Full-time", description: "Oversee operations at a stone quarry.", category: "construction" },
  { id: 332, title: "Building Information Modeling (BIM) Modeler", company: "AECOM", location: "Pune, Maharashtra", type: "Full-time", description: "Create 3D models for construction projects using software like Revit.", category: "construction" },
  { id: 333, title: "Asphalt Plant Operator", company: "IRB Infrastructure", location: "Satara, Maharashtra", type: "Full-time", description: "Operate and maintain an asphalt hot mix plant.", category: "construction" },
  { id: 334, title: "Glazier (Glass Fitter)", company: "Saint-Gobain", location: "Mumbai, Maharashtra", type: "Contract", description: "Install glass in windows, skylights, and storefronts.", category: "construction" },
  { id: 335, title: "Project Manager (Construction)", company: "Tata Projects", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Manage large-scale construction projects from start to finish.", category: "construction" },
  { id: 336, title: "Paver Block Layer", company: "City Landscaping", location: "Nashik, Maharashtra", type: "Contract", description: "Skilled worker for laying paver blocks for pathways and driveways.", category: "construction" },
  { id: 337, title: "Elevator Mechanic", company: "Kone", location: "Mumbai, Maharashtra", type: "Full-time", description: "Install, maintain, and repair elevators and escalators.", category: "construction" },
  { id: 338, title: "Tunnel Boring Machine (TBM) Operator", company: "Mumbai Metro Rail Corp", location: "Mumbai, Maharashtra", type: "Contract", description: "Operate TBM for underground metro tunneling.", category: "construction" },
  { id: 339, title: "Blaster (Mining/Quarry)", company: "Solar Industries", location: "Nagpur, Maharashtra", type: "Full-time", description: "Licensed blaster for controlled explosions in mining and construction.", category: "construction" },
  { id: 340, title: "Geotechnical Engineer", company: "Fugro", location: "Mumbai, Maharashtra", type: "Full-time", description: "Analyze soil and rock to determine their properties for construction projects.", category: "construction" },
  { id: 341, title: "Facade Installer", company: "Schüco", location: "Pune, Maharashtra", type: "Full-time", description: "Install building facades, including curtain walls and cladding.", category: "construction" },
  { id: 342, title: "Construction Equipment Heavy Driver", company: "J. Kumar Infraprojects", location: "Thane, Maharashtra", type: "Full-time", description: "Drive heavy vehicles like dumpers and trailers on construction sites.", category: "construction" },
  { id: 343, title: "Waterproofing Supervisor", company: "Fosroc", location: "Mumbai, Maharashtra", type: "Full-time", description: "Supervise teams for waterproofing application in new construction.", category: "construction" },
  { id: 344, title: "Precast Concrete Worker", company: "Teemage Precast", location: "Pune, Maharashtra", type: "Full-time", description: "Work in a factory to produce precast concrete elements.", category: "construction" },
  { id: 345, title: "Contracts Manager", company: "Godrej Properties", location: "Mumbai, Maharashtra", type: "Full-time", description: "Manage contracts and procurement for real estate projects.", category: "construction" },
  { id: 346, title: "Solar Structural Fitter", company: "Waaree Energies", location: "Aurangabad, Maharashtra", type: "Contract", description: "Assemble and install mounting structures for solar panels.", category: "construction" },
  { id: 347, title: "Grader Operator", company: "Ashoka Buildcon", location: "Nashik, Maharashtra", type: "Full-time", description: "Operate a motor grader for road construction projects.", category: "construction" },
  { id: 348, title: "Construction Planner", company: "KEC International", location: "Nagpur, Maharashtra", type: "Full-time", description: "Plan and schedule construction activities using software like Primavera or MSP.", category: "construction" },
  { id: 349, title: "Pest Control Technician (Pre-Construction)", company: "PCI", location: "Pune, Maharashtra", type: "Full-time", description: "Perform anti-termite treatment for new buildings under construction.", category: "construction" },
  { id: 350, title: "Rebar Detailer", company: "Dowco", location: "Pune, Maharashtra", type: "Full-time", description: "Create detailed drawings for steel reinforcement in concrete structures.", category: "construction" },
  { id: 351, title: "Batching Plant Operator", company: "UltraTech Cement", location: "Mumbai, Maharashtra", type: "Full-time", description: "Operate a computerized concrete batching plant.", category: "construction" },
  { id: 352, title: "Landscaper", company: "GreenScapes", location: "Pune, Maharashtra", type: "Full-time", description: "Install and maintain gardens, lawns, and other outdoor spaces.", category: "construction" },
  { id: 353, title: "Demolition Worker", company: "Edifice Engineering", location: "Mumbai, Maharashtra", type: "Contract", description: "Safely demolish old buildings and structures.", category: "construction" },
  { id: 354, title: "Traffic Marshal", company: "MMRDA", location: "Mumbai, Maharashtra", type: "Contract", description: "Manage traffic flow around large construction sites.", category: "construction" },
  { id: 355, title: "Industrial Painter", company: "Berger Paints", location: "Nagpur, Maharashtra", type: "Full-time", description: "Apply protective coatings and paints on industrial structures.", category: "construction" },
  { id: 356, title: "Rock Breaker Operator", company: "GVPR Engineers", location: "Pune, Maharashtra", type: "Full-time", description: "Operate excavator-mounted rock breakers.", category: "construction" },
  { id: 357, title: "GIS Specialist", company: "RMSI", location: "Thane, Maharashtra", type: "Full-time", description: "Use Geographic Information Systems for infrastructure planning.", category: "construction" },
  { id: 358, title: "Lighting Technician (Exterior)", company: "Signify", location: "Mumbai, Maharashtra", type: "Full-time", description: "Install and maintain architectural and facade lighting.", category: "construction" },
  { id: 359, title: "Concrete Core Cutter", company: "C-Tech Concrete", location: "Pune, Maharashtra", type: "Full-time", description: "Operate core cutting machines to take concrete samples for testing.", category: "construction" },
  { id: 360, title: "Duct Fitter (HVAC)", company: "Zamil Air Conditioners", location: "Pune, Maharashtra", type: "Full-time", description: "Fabricate and install ducting for air conditioning systems.", category: "construction" },
  { id: 361, title: "Estimation Engineer", company: "Kalpataru Power", location: "Mumbai, Maharashtra", type: "Full-time", description: "Prepare cost estimates and bids for construction projects.", category: "construction" },
  { id: 362, title: "Roofer", company: "Monier", location: "Pune, Maharashtra", type: "Contract", description: "Install and repair roofs with tiles, metal sheets, etc.", category: "construction" },
  { id: 363, title: "EHS Manager", company: "SPCL", location: "Mumbai, Maharashtra", type: "Full-time", description: "Manage Environment, Health, and Safety on a major construction project.", category: "construction" },

  // IT (Information Technology) (71 jobs)
  { id: 2, title: "Data Entry Operator", company: "Gramin Suvidha Kendra", location: "Nashik, Maharashtra", type: "Part-time", salary: "8,000", description: "Basic computer knowledge required. Work involves entering data from government forms into our system. Flexible hours.", category: "it" },
  { id: 11, title: "Computer Operator", company: "e-Seva Center", location: "Akola, Maharashtra", type: "Part-time", salary: "7,500", description: "Assist citizens with online services, form filling, and document processing.", category: "it" },
  { id: 19, title: "Web Developer Intern", company: "Web Weavers", location: "Nagpur, Maharashtra", type: "Contract", salary: "5,000 stipend", description: "Internship opportunity for aspiring web developers. Basic knowledge of HTML, CSS, and JS required.", category: "it" },
  { id: 24, title: "Mobile Repair Technician", company: "Mobile Doctor", location: "Parbhani, Maharashtra", type: "Full-time", description: "Technician for repairing smartphones and feature phones. Chip-level repair skills are a bonus.", category: "it" },
  { id: 34, title: "Call Center Executive (Vernacular)", company: "ConnectFirst BPO", location: "Pune, Maharashtra", type: "Full-time", description: "Voice process for a leading telecom company. Fluency in Marathi is required.", category: "it" },
  { id: 39, title: "Office Assistant", company: "Chopra & Associates", location: "Aurangabad, Maharashtra", type: "Full-time", description: "General office duties including filing, answering phones, and managing correspondence.", category: "it" },
  { id: 45, title: "IT Hardware Technician", company: "CompuCare", location: "Osmanabad, Maharashtra", type: "Full-time", salary: "14,000", description: "Assemble, repair, and maintain desktop computers and peripherals.", category: "it" },
  { id: 52, title: "CSC Operator", company: "Common Service Centre", location: "Gadchiroli, Maharashtra", type: "Full-time", description: "Deliver various G2C (Government to Citizen) services to rural citizens.", category: "it" },
  { id: 59, title: "Tally Operator", company: "Gupta Traders", location: "Akola, Maharashtra", type: "Full-time", salary: "11,000", description: "Manage accounts, GST filing, and inventory using Tally ERP 9.", category: "it" },
  { id: 66, title: "Social Media Handler (Marathi)", company: "Digital Marathi", location: "Aurangabad, Maharashtra", type: "Part-time", description: "Manage and create content for Facebook and Instagram pages for local businesses.", category: "it" },
  { id: 73, title: "DTP Operator", company: "Priya Graphics", location: "Sangli, Maharashtra", type: "Full-time", description: "Design and create layouts for print materials using CorelDRAW or Photoshop.", category: "it" },
  { id: 80, title: "CCTV Technician", company: "SecureEye Solutions", location: "Nagpur, Maharashtra", type: "Full-time", description: "Install and maintain CCTV surveillance systems.", category: "it" },
  { id: 87, title: "CAD Draughtsman (Civil)", company: "Infra Consultants", location: "Aurangabad, Maharashtra", type: "Full-time", description: "Prepare detailed civil engineering drawings using AutoCAD.", category: "it" },
  { id: 94, title: "Graphic Designer (Marathi)", company: "Creative Ads Agency", location: "Pune, Maharashtra", type: "Part-time", description: "Create graphics for social media, banners, and pamphlets in Marathi.", category: "it" },
  { id: 105, title: "SAP FICO Consultant", company: "Tech Mahindra", location: "Pune, Maharashtra", type: "Full-time", description: "Experienced SAP consultant for implementation and support projects.", category: "it" },
  { id: 112, title: "Network Engineer", company: "Airtel", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Maintain and troubleshoot network infrastructure for a major telecom.", category: "it" },
  { id: 119, title: "UI/UX Designer", company: "Persistent Systems", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Design user interfaces and experiences for web and mobile applications.", category: "it" },
  { id: 126, title: "Database Administrator", company: "TCS", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Manage and maintain large databases for corporate clients.", category: "it" },
  { id: 128, title: "Optical Fiber Splicer", company: "Jio Fiber", location: "Pune, Maharashtra", type: "Contract", description: "Technician for splicing and maintaining optical fiber cables.", category: "it" },
  { id: 137, title: "Blockchain Developer", company: "WazirX", location: "Mumbai, Maharashtra", type: "Full-time", description: "Develop and maintain blockchain-based applications.", category: "it" },
  { id: 144, title: "Cloud Engineer", company: "Infosys", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Manage and deploy applications on cloud platforms like AWS, Azure.", category: "it" },
  { id: 151, title: "Game Developer", company: "Ubisoft", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Develop and program video games for various platforms.", category: "it" },
  { id: 158, title: "Cyber Security Analyst", company: "PwC", location: "Mumbai, Maharashtra", type: "Full-time", description: "Protect company networks and systems from cyber threats.", category: "it" },
  { id: 165, title: "DevOps Engineer", company: "Capgemini", location: "Pune, Maharashtra", type: "Full-time", description: "Work on CI/CD pipelines, automation, and cloud infrastructure.", category: "it" },
  { id: 172, title: "AI/ML Engineer", company: "Google", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Develop artificial intelligence and machine learning models.", category: "it" },
  { id: 176, title: "VMware Administrator", company: "Infosys", location: "Pune, Maharashtra", type: "Full-time", description: "Administer and maintain VMware environments. VCP certification is a plus.", category: "it" },
  { id: 184, title: "Data Scientist", company: "Fractal Analytics", location: "Mumbai, Maharashtra", type: "Full-time", description: "Analyze large datasets to extract meaningful insights and build predictive models.", category: "it" },
  { id: 191, title: "Ethical Hacker", company: "Quick Heal", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Perform penetration testing to identify and fix security vulnerabilities.", category: "it" },
  { id: 198, title: "Full Stack Developer", company: "Mindtree", location: "Pune, Maharashtra", type: "Full-time", description: "Proficient in both front-end and back-end development (e.g., MERN/MEAN stack).", category: "it" },
  { id: 364, title: "Software Tester (Manual)", company: "QualiTest", location: "Pune, Maharashtra", type: "Full-time", description: "Manual testing of web and mobile applications, writing test cases.", category: "it" },
  { id: 365, title: "Technical Support Executive", company: "Wipro", location: "Pune, Maharashtra", type: "Full-time", description: "Provide L1 technical support to international clients over the phone.", category: "it" },
  { id: 366, title: "Java Developer", company: "HCL Tech", location: "Nagpur, Maharashtra", type: "Full-time", description: "Entry-level Java developer for enterprise application development.", category: "it" },
  { id: 367, title: "System Administrator (Windows)", company: "LTIMindtree", location: "Mumbai, Maharashtra", type: "Full-time", description: "Manage and maintain Windows server environments.", category: "it" },
  { id: 368, title: "SEO Analyst", company: "Sokrati", location: "Pune, Maharashtra", type: "Full-time", description: "Perform keyword research, on-page and off-page optimization.", category: "it" },
  { id: 369, title: "WordPress Developer", company: "Small Business Agency", location: "Nashik, Maharashtra", type: "Contract", description: "Develop and maintain websites for small businesses using WordPress.", category: "it" },
  { id: 370, title: ".NET Developer", company: "Amdocs", location: "Pune, Maharashtra", type: "Full-time", description: "Develop applications using the .NET framework, C#.", category: "it" },
  { id: 371, title: "Business Analyst (IT)", company: "Barclays", location: "Pune, Maharashtra", type: "Full-time", description: "Bridge the gap between business needs and technical solutions.", category: "it" },
  { id: 372, title: "Technical Writer", company: "BMC Software", location: "Pune, Maharashtra", type: "Full-time", description: "Create technical documentation, user manuals, and API guides.", category: "it" },
  { id: 373, title: "Android Developer", company: "Swiggy", location: "Pune, Maharashtra", type: "Full-time", description: "Develop and maintain the Swiggy Android application.", category: "it" },
  { id: 374, title: "iOS Developer", company: "Zomato", location: "Mumbai, Maharashtra", type: "Full-time", description: "Develop and maintain the Zomato iOS application.", category: "it" },
  { id: 375, title: "Salesforce Administrator", company: "Accenture", location: "Mumbai, Maharashtra", type: "Full-time", description: "Administer and customize Salesforce CRM for clients.", category: "it" },
  { id: 376, title: "Python Developer (Django/Flask)", company: "Startup", location: "Pune, Maharashtra", type: "Full-time", description: "Backend developer with experience in Python frameworks.", category: "it" },
  { id: 377, title: "IT Recruiter", company: "TeamLease", location: "Pune, Maharashtra", type: "Full-time", description: "Source and recruit candidates for various IT roles.", category: "it" },
  { id: 378, title: "QA Automation Engineer (Selenium)", company: "Cybage", location: "Pune, Maharashtra", type: "Full-time", description: "Automate web application testing using Selenium.", category: "it" },
  { id: 379, title: "React.js Developer", company: "Pubmatic", location: "Pune, Maharashtra", type: "Full-time", description: "Frontend developer with strong skills in React.js and its ecosystem.", category: "it" },
  { id: 380, title: "Data Analyst (SQL, Excel)", company: "eClerx", location: "Pune, Maharashtra", type: "Full-time", description: "Analyze data and create reports using SQL and advanced Excel.", category: "it" },
  { id: 381, title: "Linux System Administrator", company: "Red Hat", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Manage and maintain Linux server infrastructure.", category: "it" },
  { id: 382, title: "Cloud Support Associate", company: "Amazon Web Services", location: "Mumbai, Maharashtra", type: "Full-time", description: "Provide technical support for AWS customers.", category: "it" },
  { id: 383, title: "Scrum Master", company: "Mastercard", location: "Pune, Maharashtra", type: "Full-time", description: "Facilitate agile development processes for a software team.", category: "it" },
  { id: 384, title: "GIS Developer", company: "HERE Technologies", location: "Mumbai, Maharashtra", type: "Full-time", description: "Develop applications using geographic information systems.", category: "it" },
  { id: 385, title: "IT Helpdesk Technician", company: "Atos Syntel", location: "Pune, Maharashtra", type: "Full-time", description: "First level IT support for internal employees.", category: "it" },
  { id: 386, title: "Embedded Systems Engineer", company: "KPIT", location: "Pune, Maharashtra", type: "Full-time", description: "Develop software for automotive embedded systems.", category: "it" },
  { id: 387, title: "Power BI Developer", company: "Deloitte", location: "Mumbai, Maharashtra", type: "Full-time", description: "Create interactive dashboards and reports using Power BI.", category: "it" },
  { id: 388, title: "Game Tester", company: "Rockstar Games", location: "Mumbai, Maharashtra", type: "Contract", description: "Play video games to find and report bugs.", category: "it" },
  { id: 389, title: "Oracle DBA", company: "Wipro", location: "Pune, Maharashtra", type: "Full-time", description: "Oracle Database Administrator for managing enterprise databases.", category: "it" },
  { id: 390, title: "RPA Developer (UiPath/Automation Anywhere)", company: "EY", location: "Mumbai, Maharashtra", type: "Full-time", description: "Develop robotic process automation bots.", category: "it" },
  { id: 391, title: "Digital Marketing Executive", company: "Schbang", location: "Mumbai, Maharashtra", type: "Full-time", description: "Execute digital marketing campaigns across various channels.", category: "it" },
  { id: 392, title: "IT Project Coordinator", company: "Cognizant", location: "Pune, Maharashtra", type: "Full-time", description: "Assist project managers in coordinating IT projects.", category: "it" },
  { id: 393, title: "Node.js Developer", company: "Veritas", location: "Pune, Maharashtra", type: "Full-time", description: "Backend developer focused on building scalable services using Node.js.", category: "it" },
  { id: 394, title: "Angular Developer", company: "Infosys", location: "Pune, Maharashtra", type: "Full-time", description: "Frontend developer with expertise in the Angular framework.", category: "it" },
  { id: 395, title: "Mainframe Developer", company: "Capgemini", location: "Mumbai, Maharashtra", type: "Full-time", description: "Developer with experience in COBOL, JCL on mainframe systems.", category: "it" },
  { id: 396, title: "Performance Tester (JMeter/LoadRunner)", company: "Infosys", location: "Pune, Maharashtra", type: "Full-time", description: "Conduct performance and load testing of applications.", category: "it" },
  { id: 397, title: "Tableau Developer", company: "ZS Associates", location: "Pune, Maharashtra", type: "Full-time", description: "Create data visualizations and dashboards using Tableau.", category: "it" },
  { id: 398, title: "Backend Developer (Go)", company: "ThoughtWorks", location: "Pune, Maharashtra", type: "Full-time", description: "Software developer with experience in the Go programming language.", category: "it" },
  { id: 399, title: "Shopify Developer", company: "eCommerce Agency", location: "Mumbai, Maharashtra", type: "Contract", description: "Develop and customize Shopify stores for clients.", category: "it" },
  { id: 400, title: "ServiceNow Developer", company: "KPMG", location: "Mumbai, Maharashtra", type: "Full-time", description: "Develop and configure applications on the ServiceNow platform.", category: "it" },
  { id: 401, title: "MIS Executive", company: "Bajaj Finserv", location: "Pune, Maharashtra", type: "Full-time", description: "Manage Management Information Systems and generate reports.", category: "it" },
  { id: 402, title: "IT Auditor", company: "PwC", location: "Mumbai, Maharashtra", type: "Full-time", description: "Audit IT systems and processes for compliance and security.", category: "it" },
  { id: 403, title: "Unity 3D Developer", company: "Juego Studios", location: "Pune, Maharashtra", type: "Full-time", description: "Develop games and simulations using the Unity engine.", category: "it" },
  { id: 404, title: "Desktop Support Engineer", company: "TCS", location: "Nagpur, Maharashtra", type: "Full-time", description: "Provide in-person IT support for desktops, laptops, and peripherals.", category: "it" },

  // Government (71 jobs)
  { id: 8, title: "Anganwadi Worker", company: "Govt. of Maharashtra", location: "Latur, Maharashtra", type: "Full-time", isVerified: true, salary: "As per govt. norms", description: "Provide health and nutrition education and support to women and children in the community.", category: "government" },
  { id: 16, title: "Government Clerk", company: "District Collector Office", location: "Jalgaon, Maharashtra", type: "Full-time", isVerified: true, salary: "As per pay scale", description: "Clerical duties including file management, data entry, and official correspondence.", category: "government" },
  { id: 23, title: "Police Constable", company: "Maharashtra Police", location: "Dhule, Maharashtra", type: "Full-time", isVerified: true, salary: "As per govt. rules", description: "Recruitment for the post of Police Constable. Requires passing physical and written tests.", category: "government" },
  { id: 33, title: "Primary Health Worker (ASHA)", company: "National Health Mission", location: "Various Rural", type: "Full-time", isVerified: true, salary: "Honorarium", description: "Community health activist to serve as a link between the community and the public health system.", category: "government" },
  { id: 46, title: "Panchayat Secretary", company: "Gram Panchayat Office", location: "Hingoli, Maharashtra", type: "Full-time", isVerified: true, salary: "As per govt. scale", description: "Administrative head of the Panchayat office, responsible for records and meetings.", category: "government" },
  { id: 53, title: "Talathi", company: "Revenue Department", location: "Raigad, Maharashtra", type: "Full-time", isVerified: true, salary: "As per govt. rules", description: "Maintain village revenue accounts and land records.", category: "government" },
  { id: 60, title: "Forest Guard", company: "Forest Department", location: "Chandrapur, Maharashtra", type: "Full-time", isVerified: true, salary: "As per govt. scale", description: "Patrol and protect forest areas, prevent illegal activities, and assist in wildlife management.", category: "government" },
  { id: 67, title: "MSRTC Bus Conductor", company: "Maharashtra State Road Transport", location: "Various", type: "Full-time", isVerified: true, salary: "As per govt. scale", description: "Issue tickets to passengers and manage bus operations.", category: "government" },
  { id: 74, title: "Home Guard", company: "Home Guard Department", location: "Various", type: "Part-time", isVerified: true, salary: "Daily allowance", description: "Auxiliary force to the police for maintaining internal security and helping in emergencies.", category: "government" },
  { id: 81, title: "Mid-Day Meal Cook", company: "Zilla Parishad School", location: "Osmanabad, Maharashtra", type: "Part-time", isVerified: true, description: "Prepare nutritious meals for school children as per the Mid-Day Meal Scheme.", category: "government" },
  { id: 88, title: "Election Booth Level Officer (BLO)", company: "Election Commission", location: "Various Villages", type: "Part-time", isVerified: true, description: "Assist in electoral roll management and election-day activities.", category: "government" },
  { id: 95, title: "Railway Group D", company: "Indian Railways", location: "Various", type: "Full-time", isVerified: true, description: "Posts like track maintainer, helper, pointsman in the Indian Railways.", category: "government" },
  { id: 106, title: "Anganwadi Supervisor", company: "ICDS", location: "Jalna, Maharashtra", type: "Full-time", isVerified: true, description: "Supervise the functioning of multiple Anganwadi centers in a block.", category: "government" },
  { id: 113, title: "Village Development Officer (VDO)", company: "Rural Development Dept", location: "Satara, Maharashtra", type: "Full-time", isVerified: true, description: "Implement government development schemes at the village level.", category: "government" },
  { id: 120, title: "Food Inspector", company: "Food and Drug Administration (FDA)", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Inspect food establishments to ensure safety and hygiene standards.", category: "government" },
  { id: 127, title: "Sub-Inspector of Police", company: "Maharashtra Police", location: "Various", type: "Full-time", isVerified: true, description: "Lead investigation teams and maintain law and order.", category: "government" },
  { id: 136, title: "Bank Probationary Officer (PO)", company: "State Bank of India", location: "Across Maharashtra", type: "Full-time", isVerified: true, description: "Management level position in a leading public sector bank.", category: "government" },
  { id: 143, title: "State Transport Bus Driver", company: "MSRTC", location: "Various", type: "Full-time", isVerified: true, description: "Drive state transport buses on various routes across Maharashtra.", category: "government" },
  { id: 150, title: "Jailor", company: "Prisons Department", location: "Yerwada, Pune", type: "Full-time", isVerified: true, description: "Manage administration and security of a correctional facility.", category: "government" },
  { id: 157, title: "Excise Inspector", company: "State Excise Department", location: "Kolhapur, Maharashtra", type: "Full-time", isVerified: true, description: "Monitor and regulate the production and sale of liquor.", category: "government" },
  { id: 164, title: "Income Tax Officer", company: "Income Tax Department", location: "Nagpur, Maharashtra", type: "Full-time", isVerified: true, description: "Assess and collect income tax from individuals and corporations.", category: "government" },
  { id: 171, title: "IAS Officer (Collector)", company: "Indian Administrative Service", location: "District HQ", type: "Full-time", isVerified: true, description: "Top administrative post managing a district in Maharashtra.", category: "government" },
  { id: 179, title: "Foreign Service Officer (IFS)", company: "Ministry of External Affairs", location: "Mumbai / Delhi", type: "Full-time", isVerified: true, description: "Represent India in diplomatic missions abroad.", category: "government" },
  { id: 185, title: "Customs Officer", company: "Central Board of Indirect Taxes and Customs", location: "Mumbai Port", type: "Full-time", isVerified: true, description: "Inspect and clear goods imported and exported through customs.", category: "government" },
  { id: 192, title: "Railway Station Master", company: "Indian Railways", location: "Various Stations", type: "Full-time", isVerified: true, description: "Manage train operations and passenger services at a railway station.", category: "government" },
  { id: 199, title: "RBI Grade B Officer", company: "Reserve Bank of India", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "A prestigious managerial role in India's central bank.", category: "government" },
  { id: 405, title: "Stenographer", company: "High Court of Bombay", location: "Mumbai, Maharashtra", type: "Full-time", description: "Shorthand and typing duties for court proceedings.", category: "government" },
  { id: 406, title: "Gram Sevak", company: "Zilla Parishad", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Multi-purpose government functionary at the village level.", category: "government" },
  { id: 407, title: "Bank Clerk", company: "Bank of Maharashtra", location: "Across Maharashtra", type: "Full-time", isVerified: true, description: "Clerical and customer service role in a public sector bank.", category: "government" },
  { id: 408, title: "SSC CGL (Various Posts)", company: "Staff Selection Commission", location: "Various", type: "Full-time", isVerified: true, description: "Group B and C posts in various central government ministries.", category: "government" },
  { id: 409, title: "Lineman", company: "MSEDCL", location: "Various Rural", type: "Full-time", isVerified: true, description: "Maintain and repair electricity supply lines.", category: "government" },
  { id: 410, title: "Patwari", company: "Revenue Department", location: "Nashik, Maharashtra", type: "Full-time", isVerified: true, description: "Also known as Talathi, maintains land records.", category: "government" },
  { id: 411, title: "Junior Engineer (Civil)", company: "Public Works Department", location: "Aurangabad, Maharashtra", type: "Full-time", isVerified: true, description: "Supervise civil construction and maintenance work for PWD.", category: "government" },
  { id: 412, title: "Ticket Collector (TC)", company: "Indian Railways", location: "Major Stations", type: "Full-time", isVerified: true, description: "Check tickets on trains and at stations.", category: "government" },
  { id: 413, title: "Krushi Sevak", company: "Agriculture Department", location: "Satara, Maharashtra", type: "Full-time", isVerified: true, description: "Provide agricultural extension services to farmers.", category: "government" },
  { id: 414, title: "Section Officer (Mantralaya)", company: "Govt. of Maharashtra", location: "Mumbai, Maharashtra", type: "Full-time", description: "Administrative role in the state government secretariat.", category: "government" },
  { id: 415, title: "Postman", company: "India Post", location: "Various", type: "Full-time", isVerified: true, description: "Deliver mail and provide other postal services.", category: "government" },
  { id: 416, title: "LIC Assistant", company: "Life Insurance Corporation", location: "Various", type: "Full-time", isVerified: true, description: "Clerical staff for various roles in LIC offices.", category: "government" },
  { id: 417, title: "IPS Officer (ASP/DSP)", company: "Indian Police Service", location: "District HQ", type: "Full-time", isVerified: true, description: "Leadership role in the state police force.", category: "government" },
  { id: 418, title: "Fireman", company: "Municipal Fire Brigade", location: "Pune, Maharashtra", type: "Full-time", description: "Respond to fires and other emergencies.", category: "government" },
  { id: 419, title: "Court Clerk", company: "District Court", location: "Nagpur, Maharashtra", type: "Full-time", description: "Maintain court records and assist judges.", category: "government" },
  { id: 420, title: "Water Pump Operator", company: "Municipal Water Supply", location: "Thane, Maharashtra", type: "Full-time", description: "Operate and maintain water pumps for city water supply.", category: "government" },
  { id: 421, title: "Tax Assistant", company: "CBDT/CBIC", location: "Mumbai, Maharashtra", type: "Full-time", description: "Clerical role in the Income Tax or GST department.", category: "government" },
  { id: 422, title: "Food Corporation of India (FCI) Manager", company: "FCI", location: "Various", type: "Full-time", isVerified: true, description: "Manage procurement, storage, and distribution of food grains.", category: "government" },
  { id: 423, title: "Deputy Collector", company: "MPSC State Services", location: "Sub-Division HQ", type: "Full-time", isVerified: true, description: "Key administrative role in state civil services.", category: "government" },
  { id: 424, title: "Sales Tax Inspector (STI)", company: "GST Department", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Inspector role in the state GST department.", category: "government" },
  { id: 425, title: "Air Force Group Y", company: "Indian Air Force", location: "Various Airbases", type: "Full-time", isVerified: true, description: "Technical and non-technical airmen roles.", category: "government" },
  { id: 426, title: "Army Soldier (General Duty)", company: "Indian Army", location: "Various", type: "Full-time", isVerified: true, description: "General infantry and other roles in the army.", category: "government" },
  { id: 427, title: "Navy Sailor (SSR/AA)", company: "Indian Navy", location: "Various Naval Bases", type: "Full-time", isVerified: true, description: "Sailor roles in various branches of the navy.", category: "government" },
  { id: 428, title: "Tehsildar", company: "Revenue Department", location: "Taluka HQ", type: "Full-time", isVerified: true, description: "Administrative head of a tehsil or taluka.", category: "government" },
  { id: 429, title: "Block Development Officer (BDO)", company: "Panchayat Samiti", location: "Block HQ", type: "Full-time", isVerified: true, description: "Chief executive officer of a Panchayat Samiti.", category: "government" },
  { id: 430, title: "RTO Inspector", company: "Transport Department", location: "RTO Office", type: "Full-time", isVerified: true, description: "Motor Vehicle Inspector at the Regional Transport Office.", category: "government" },
  { id: 431, title: "Sub-Registrar", company: "Registration Dept", location: "SRO Office", type: "Full-time", description: "Responsible for property registration.", category: "government" },
  { id: 432, title: "ESIC UDC/Steno", company: "ESIC", location: "Various", type: "Full-time", isVerified: true, description: "Upper Division Clerk or Stenographer in Employees' State Insurance Corporation.", category: "government" },
  { id: 433, title: "IBPS Clerk", company: "Various Public Sector Banks", location: "Various", type: "Full-time", isVerified: true, description: "Clerical positions in banks like PNB, Canara Bank, etc.", category: "government" },
  { id: 434, title: "Indian Forest Service (IFS) Officer", company: "Ministry of Environment, Forest and Climate Change", location: "Various", type: "Full-time", isVerified: true, description: "Manage and conserve forests and wildlife.", category: "government" },
  { id: 435, title: "Central Armed Police Forces (CAPF) Constable", company: "BSF, CRPF, CISF, etc.", location: "Various", type: "Full-time", isVerified: true, description: "Constable roles in central paramilitary forces.", category: "government" },
  { id: 436, title: "Junior Statistical Officer", company: "SSC", location: "Various", type: "Full-time", description: "Statistical analysis role in central government ministries.", category: "government" },
  { id: 437, title: "ISRO Technical Assistant", company: "ISRO", location: "Sriharikota/Bengaluru", type: "Full-time", isVerified: true, description: "Technical support roles in India's space agency.", category: "government" },
  { id: 438, title: "Archaeological Survey of India (ASI) Conservation Assistant", company: "ASI", location: "Various Sites", type: "Full-time", description: "Assist in the conservation of historical monuments.", category: "government" },
  { id: 439, title: "DRDO MTS", company: "DRDO", location: "Various Labs", type: "Full-time", description: "Multi-Tasking Staff in Defence Research and Development Organisation.", category: "government" },
  { id: 440, title: "Airport Authority of India (AAI) Junior Executive", company: "AAI", location: "Various Airports", type: "Full-time", isVerified: true, description: "Executive roles in airport operations and air traffic control.", category: "government" },
  { id: 441, "title": "Central Warehouse Corporation Superintendent", "company": "CWC", "location": "Various", "type": "Full-time", "description": "Manage warehousing and logistics for government stocks.", "category": "government" },
  { id: 442, "title": "NABARD Development Assistant", "company": "NABARD", "location": "Mumbai, Maharashtra", "type": "Full-time", "description": "Clerical and assistant roles in the National Bank for Agriculture and Rural Development.", "category": "government" },
  { id: 443, "title": "Intelligence Bureau (IB) ACIO", "company": "Ministry of Home Affairs", "location": "Various", "type": "Full-time", "isVerified": true, "description": "Assistant Central Intelligence Officer role in the domestic intelligence agency.", "category": "government" },
  { id: 444, "title": "NHB Assistant Manager", "company": "National Housing Bank", "location": "Mumbai, Maharashtra", "type": "Full-time", "description": "Managerial roles in the apex bank for housing finance.", "category": "government" },
  { id: 445, "title": "EPFO SSA/Stenographer", "company": "EPFO", "location": "Various", "type": "Full-time", "description": "Social Security Assistant or Stenographer in Employees' Provident Fund Organisation.", "category": "government" },
  { id: 446, "title": "Survey of India Motor Driver-cum-Mechanic", "company": "Survey of India", "location": "Pune, Maharashtra", "type": "Full-time", "description": "Drive and maintain vehicles for the national survey and mapping organization.", "category": "government" },
  { id: 447, "title": "Public Prosecutor", "company": "Law & Judiciary Dept", "location": "Various Courts", "type": "Full-time", "description": "Represent the state in criminal proceedings.", "category": "government" },
  { id: 448, "title": "Municipal Corporation Junior Engineer", "company": "Pune Municipal Corporation", "location": "Pune, Maharashtra", "type": "Full-time", "description": "Engineering roles in a city's municipal corporation.", "category": "government" },
  { id: 449, "title": "State Secretariat Assistant Section Officer (ASO)", "company": "MPSC", "location": "Mumbai, Maharashtra", "type": "Full-time", "description": "Assistant Section Officer in Mantralaya.", "category": "government" },
  { id: 450, "title": "Indian Economic Service (IES) Officer", "company": "Ministry of Finance", "location": "Delhi/Mumbai", "type": "Full-time", "description": "Formulate economic policy and conduct analysis for the central government.", "category": "government" },
  { id: 451, "title": "CIDCO Planning Assistant", "company": "CIDCO", "location": "Navi Mumbai, Maharashtra", "type": "Full-time", "description": "Assist in town planning and development projects for the City and Industrial Development Corporation.", "category": "government" },

  // Retail (71 jobs)
  { id: 6, title: "Retail Sales Associate", company: "Kisan Retail Store", location: "Nagpur, Maharashtra", type: "Full-time", isVerified: true, description: "Customer service and sales role in a busy retail environment. Previous experience is a plus.", category: "retail" },
  { id: 12, title: "Security Guard", company: "SecureCorp", location: "Pune, Maharashtra", type: "Full-time", description: "Night shift security guard for a corporate office. Prior experience is preferred.", category: "retail" },
  { id: 18, title: "Warehouse Packer", company: "InstaLogistics", location: "Bhandara, Maharashtra", type: "Part-time", description: "Packing and sorting goods in a large warehouse. Physical fitness is required.", category: "retail" },
  { id: 26, title: "Store Manager", company: "Reliance Smart Point", location: "Satara, Maharashtra", type: "Full-time", isVerified: true, description: "Manage store operations, inventory, and staff. Previous retail management experience needed.", category: "retail" },
  { id: 30, title: "Delivery Partner", company: "Gramin Express", location: "Kolhapur, Maharashtra", type: "Part-time", salary: "Per-delivery basis", description: "Deliver packages within the city limits. Must have a two-wheeler and a valid license.", category: "retail" },
  { id: 31, title: "Beautician", company: "Sunder Salon", location: "Solapur, Maharashtra", type: "Part-time", description: "Looking for a beautician skilled in threading, waxing, and facials.", category: "retail" },
  { id: 38, title: "Cashier", company: "DMart", location: "Amravati, Maharashtra", type: "Full-time", isVerified: true, description: "Handle cash transactions and customer service at checkout counters.", category: "retail" },
  { id: 47, title: "Visual Merchandiser", company: "Big Bazaar", location: "Nagpur, Maharashtra", type: "Full-time", description: "Design and implement appealing and eye-catching visual displays for the store.", category: "retail" },
  { id: 54, title: "E-commerce Packer", company: "Amazon Warehouse", location: "Bhiwandi, Maharashtra", type: "Full-time", description: "Picking, packing, and shipping orders in a large fulfillment center.", category: "retail" },
  { id: 61, title: "Inventory Assistant", company: "More Supermarket", location: "Latur, Maharashtra", type: "Full-time", description: "Manage stock levels, receive goods, and maintain inventory records.", category: "retail" },
  { id: 68, title: "Customer Service Executive", company: "Local Supermart", location: "Yavatmal, Maharashtra", type: "Full-time", description: "Handle customer queries, complaints, and provide information about products.", category: "retail" },
  { id: 75, title: "Tailor", company: "StyleFit Boutique", location: "Nashik, Maharashtra", type: "Full-time", description: "Skilled tailor for stitching blouses, dresses, and trousers.", category: "retail" },
  { id: 82, title: "Bike Mechanic", company: "Hero Service Center", location: "Jalna, Maharashtra", type: "Full-time", description: "Service and repair Hero motorcycles and scooters.", category: "retail" },
  { id: 89, title: "Textile Mill Worker", company: "Raymond Ltd", location: "Yavatmal, Maharashtra", type: "Full-time", isVerified: true, description: "Operate spinning or weaving machinery in a textile mill.", category: "retail" },
  { id: 96, title: "Goldsmith", company: "PNG Jewellers", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, description: "Skilled artisan for crafting and repairing gold ornaments.", category: "retail" },
  { id: 107, title: "Logistics Coordinator", company: "Flipkart", location: "Bhiwandi, Maharashtra", type: "Full-time", description: "Coordinate with delivery partners and manage logistics for a fulfillment center.", category: "retail" },
  { id: 114, title: "Pharmacist", company: "Wellness Forever", location: "Kolhapur, Maharashtra", type: "Full-time", isVerified: true, description: "Licensed pharmacist to manage a retail pharmacy outlet.", category: "retail" },
  { id: 121, title: "Bakery Chef", company: "The Cake Shop", location: "Nashik, Maharashtra", type: "Full-time", description: "Experienced chef for baking cakes, pastries, and other bakery products.", category: "retail" },
  { id: 130, title: "Fashion Designer", company: "Local Boutique", location: "Mumbai, Maharashtra", type: "Full-time", description: "Design and create new clothing lines for a boutique.", category: "retail" },
  { id: 133, title: "Real Estate Agent", company: "PropTiger", location: "Pune, Maharashtra", type: "Full-time", description: "Assist clients in buying, selling, and renting properties.", category: "retail" },
  { id: 141, title: "Jewelry Designer", company: "Tanishq", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Design innovative and traditional jewelry pieces.", category: "retail" },
  { id: 148, title: "E-commerce Manager", company: "Myntra", location: "Mumbai, Maharashtra", type: "Full-time", description: "Manage online sales, marketing, and operations for a fashion brand.", category: "retail" },
  { id: 155, title: "Retail Buyer", company: "Shoppers Stop", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Select and purchase lines of products for retail stores.", category: "retail" },
  { id: 162, title: "Supply Chain Manager", company: "Unilever", location: "Mumbai, Maharashtra", type: "Full-time", isVerified: true, description: "Oversee the entire supply chain process from procurement to delivery.", category: "retail" },
  { id: 169, title: "Luxury Brand Manager", company: "LVMH", location: "Mumbai, Maharashtra", type: "Full-time", description: "Manage marketing and branding for a luxury goods company.", category: "retail" },
  { id: 177, title: "Store Visual Merchandiser", company: "Westside", location: "Pune, Maharashtra", type: "Full-time", description: "Create appealing and eye-catching visual displays and ensure the store's aesthetic standards are met.", category: "retail" },
  { id: 178, title: "Florist", company: "Ferns N Petals", location: "Mumbai, Maharashtra", type: "Full-time", description: "Design and create floral arrangements for various occasions.", category: "retail" },
  { id: 186, title: "Wedding Planner", company: "Shaadi.com Events", location: "Pune, Maharashtra", type: "Contract", description: "Plan and coordinate all aspects of weddings and related events.", category: "retail" },
  { id: 193, title: "Sommelier (Wine Steward)", company: "The Taj Mahal Palace Hotel", location: "Mumbai, Maharashtra", type: "Full-time", description: "Specialist in wine service and pairing in a fine dining restaurant.", category: "retail" },
  { id: 200, title: "Personal Shopper", company: "Zara", location: "Pune, Maharashtra", type: "Part-time", description: "Advise customers on fashion trends and help them select outfits.", category: "retail" },
  { id: 452, "title": "Department Manager", "company": "Lifestyle", "location": "Pune, Maharashtra", "type": "Full-time", "description": "Manage a specific department within a large format retail store.", "category": "retail" },
  { id: 453, "title": "Warehouse Associate", "company": "Delhivery", "location": "Bhiwandi, Maharashtra", "type": "Full-time", "description": "Involved in sorting, scanning, and moving packages in a logistics hub.", "category": "retail" },
  { id: 454, "title": "Customer Relationship Manager", "company": "Croma", "location": "Mumbai, Maharashtra", "type": "Full-time", "description": "Handle post-sales support and build customer loyalty.", "category": "retail" },
  { id: 455, "title": "Category Manager", "company": "BigBasket", "location": "Pune, Maharashtra", "type": "Full-time", "description": "Manage a specific category of products for online retail, including sourcing and pricing.", "category": "retail" },
  { id: 456, "title": "Showroom Sales Executive", "company": "Maruti Suzuki Arena", "location": "Nagpur, Maharashtra", "type": "Full-time", "description": "Sell cars and assist customers at an automobile showroom.", "category": "retail" },
  { id: 457, "title": "Last-Mile Delivery Executive", "company": "Swiggy Instamart", "location": "Pune, Maharashtra", "type": "Part-time", "description": "Deliver groceries and essentials from dark stores to customers.", "category": "retail" },
  { id: 458, "title": "Loss Prevention Officer", "company": "H&M", "location": "Mumbai, Maharashtra", "type": "Full-time", "description": "Prevent theft and loss of merchandise in a retail store.", "category": "retail" },
  { id: 459, "title": "Furniture Assembly Technician", "company": "IKEA", "location": "Mumbai, Maharashtra", "type": "Contract", "description": "Assemble furniture for customers at their homes.", "category": "retail" },
  { id: 460, "title": "E-commerce Catalog Executive", "company": "AJIO", "location": "Mumbai, Maharashtra", "type": "Full-time", "description": "Create and manage product listings on the e-commerce platform.", "category": "retail" },
  { id: 461, "title": "Makeup Artist", "company": "MAC Cosmetics", "location": "Pune, Maharashtra", "type": "Full-time", "description": "Provide makeup services and product recommendations to customers.", "category": "retail" },
  { id: 462, "title": "Gym Manager", "company": "Talwalkars", "location": "Nashik, Maharashtra", "type": "Full-time", "description": "Manage the daily operations of a fitness center.", "category": "retail" },
  { id: 463, "title": "Petrol Pump Attendant", "company": "Indian Oil", "location": "Various", "type": "Full-time", "description": "Dispense fuel and handle payments at a petrol pump.", "category": "retail" },
  { id: 464, "title": "Hotel Front Office Manager", "company": "Marriott", "location": "Mumbai, Maharashtra", "type": "Full-time", "description": "Manage the front desk operations of a large hotel.", "category": "retail" },
  { id: 465, "title": "Chef de Partie (Continental)", "company": "Hyatt Regency", "location": "Pune, Maharashtra", "type": "Full-time", "description": "Manage a specific section of a professional kitchen.", "category": "retail" },
  { id: 466, "title": "Restaurant Manager", "company": "McDonald's", "location": "Nagpur, Maharashtra", "type": "Full-time", "description": "Oversee the daily operations of a quick-service restaurant.", "category": "retail" },
  { id: 467, "title": "Car Detailer", company: "3M Car Care", location: "Pune, Maharashtra", type: "Full-time", description: "Provide professional car cleaning, polishing, and detailing services.", category: "retail" },
  { id: 468, "title": "Travel Agent", company: "Thomas Cook", location: "Mumbai, Maharashtra", type: "Full-time", description: "Plan and sell transportation, accommodations, and other travel services.", category: "retail" },
  { id: 469, "title": "Butcher", company: "Licious", location: "Pune, Maharashtra", type: "Full-time", description: "Cut, prepare, and package meat and poultry products.", category: "retail" },
  { id: 470, "title": "Event Manager", company: "Wizcraft", location: "Mumbai, Maharashtra", type: "Full-time", description: "Plan and execute large-scale corporate events and exhibitions.", category: "retail" },
  { id: 471, "title": "Watchmaker/Technician", company: "Titan Service Center", location: "Pune, Maharashtra", type: "Full-time", description: "Repair and service watches.", category: "retail" },
  { id: 472, "title": "Property Manager", company: "Jones Lang LaSalle", location: "Mumbai, Maharashtra", type: "Full-time", description: "Manage residential or commercial properties on behalf of owners.", category: "retail" },
  { id: 473, "title": "Spa Therapist", company: "The O Hotel", location: "Pune, Maharashtra", type: "Full-time", description: "Provide massages, body treatments, and other spa services.", category: "retail" },
  { id: 474, "title": "Car Rental Agent", company: "Avis", location: "Mumbai Airport", type: "Full-time", description: "Rent cars and handle customer service at an airport location.", category: "retail" },
  { id: 475, "title": "Movie Theater Staff", company: "PVR Cinemas", location: "Pune, Maharashtra", type: "Part-time", description: "Work in ticketing, concessions, or as an usher.", category: "retail" },
  { id: 476, "title": "Dry Cleaning Presser", company: "Pressto", location: "Mumbai, Maharashtra", type: "Full-time", description: "Operate pressing machines for clothes in a premium dry cleaning service.", category: "retail" },
  { id: 477, "title": "Pet Groomer", company: "Heads Up For Tails", location: "Pune, Maharashtra", type: "Full-time", description: "Groom dogs and cats, including bathing, clipping, and styling.", category: "retail" },
  { id: 478, "title": "Bicycle Mechanic", company: "Starkenn", location: "Pune, Maharashtra", type: "Full-time", description: "Assemble, repair, and service high-end bicycles.", category: "retail" },
  { id: 479, "title": "Appliance Repair Technician", company: "Urban Company", location: "Mumbai, Maharashtra", type: "Contract", description: "Repair home appliances like ACs, refrigerators, and washing machines.", category: "retail" },
  { id: 480, "title": "Tyre Fitter", company: "MRF Tyres", location: "Nagpur, Maharashtra", type: "Full-time", description: "Fit, balance, and align tyres for cars and trucks.", category: "retail" },
  { id: 481, "title": "Retail Operations Manager", company: "Future Group", location: "Mumbai, Maharashtra", type: "Full-time", description: "Oversee the operations of multiple retail stores in a region.", category: "retail" },
  { id: 482, "title": "Banquet Manager", company: "The Westin", location: "Pune, Maharashtra", type: "Full-time", description: "Manage all aspects of banquets and events in a hotel.", category: "retail" },
  { id: 483, "title": "Housekeeping Supervisor", company: "Lemon Tree Hotels", location: "Aurangabad, Maharashtra", type: "Full-time", description: "Supervise the housekeeping staff and ensure cleanliness standards.", category: "retail" },
  { id: 484, "title": "Barista", company: "Starbucks", location: "Mumbai, Maharashtra", type: "Full-time", description: "Prepare and serve coffee and other beverages.", category: "retail" },
  { id: 485, "title": "Phone Sales Executive", company: "Samsung Store", location: "Pune, Maharashtra", type: "Full-time", description: "Sell mobile phones and accessories at an exclusive brand store.", category: "retail" },
  { id: 486, "title": "Courier Hub Sorter", company: "Blue Dart", location: "Bhiwandi, Maharashtra", type: "Full-time", description: "Sort packages based on destination pin codes at a major logistics hub.", category: "retail" },
  { id: 487, "title": "Print Shop Operator", company: "VistaPrint", location: "Mumbai, Maharashtra", type: "Full-time", description: "Operate digital printing machines for business cards, flyers, etc.", category: "retail" },
  { id: 488, "title": "Shoe Salesperson", company: "Bata", location: "Kolhapur, Maharashtra", type: "Full-time", description: "Assist customers in selecting and trying on footwear.", category: "retail" },
  { id: 489, "title": "Mystery Shopper", company: "Bare International", location: "Various", type: "Contract", description: "Pose as a real customer to evaluate customer service and store standards.", category: "retail" },
  { id: 490, "title": "Forklift Operator", company: "DB Schenker", location: "Chakan, Pune", type: "Full-time", description: "Operate forklifts to move goods within a warehouse.", category: "retail" },
  { id: 491, "title": "Customer Greeter", company: "IKEA", location: "Mumbai, Maharashtra", type: "Part-time", description: "Welcome customers to the store and provide initial assistance.", category: "retail" },
  { id: 492, "title": "Loan Sales Executive", company: "Bajaj Finance", location: "Pune, Maharashtra", type: "Full-time", description: "Sell personal loans and other financial products.", category: "retail" },
  { id: 493, "title": "Tattoo Artist", company: "Kraayonz Tattoo Studios", location: "Pune, Maharashtra", type: "Full-time", description: "Professional artist to design and create tattoos.", category: "retail" },
  { id: 494, "title": "Cook (Cloud Kitchen)", company: "Rebel Foods", location: "Pune, Maharashtra", type: "Full-time", description: "Prepare food for various online brands from a single kitchen.", category: "retail" },
  { id: 495, "title": "Sports Goods Sales Advisor", company: "Decathlon", location: "Pune, Maharashtra", type: "Full-time", description: "Advise customers on sports equipment and apparel.", category: "retail" },
  { id: 496, "title": "Home Painter", company: "Asian Paints", location: "Mumbai, Maharashtra", type: "Contract", description: "Provide professional home painting services.", category: "retail" },
  { id: 497, "title": "Bookseller", company: "Crossword", location: "Pune, Maharashtra", type: "Full-time", description: "Assist customers in a bookstore, manage inventory, and recommend books.", category: "retail" },
  { id: 498, "title": "Warehouse Auditor", company: "TVS Logistics", location: "Bhiwandi, Maharashtra", type: "Full-time", description: "Conduct stock audits and cycle counts in a warehouse.", category: "retail" },
  { id: 499, "title": "Salon Manager", company: "Lakmé Salon", location: "Nagpur, Maharashtra", type: "Full-time", description: "Manage staff, appointments, and operations of a beauty salon.", category: "retail" },
  { id: 500, "title": "Event Security Guard", company: "Topsgrup", location: "Mumbai, Maharashtra", type: "Contract", description: "Provide security for concerts, exhibitions, and private events.", category: "retail" }

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

    
    