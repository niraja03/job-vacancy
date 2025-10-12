
'use server';

/**
 * @fileOverview A dedicated chatbot for the Gramin Jobs Connect platform.
 *
 * - graminChatbot - A function that answers user questions about the platform.
 * - GraminChatbotInput - The input type for the graminChatbot function.
 * - GraminChatbotOutput - The return type for the graminChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GraminChatbotInputSchema = z.object({
  query: z.string().describe("The user's question about the Gramin Jobs Connect platform."),
});
export type GraminChatbotInput = z.infer<typeof GraminChatbotInputSchema>;

const GraminChatbotOutputSchema = z.object({
  response: z.string().describe("The chatbot's answer to the user's question."),
});
export type GraminChatbotOutput = z.infer<typeof GraminChatbotOutputSchema>;

export async function graminChatbot(input: GraminChatbotInput): Promise<GraminChatbotOutput> {
  return graminChatbotFlow(input);
}

const searchJobs = ai.defineTool(
    {
        name: 'searchJobs',
        description: 'Search for live job listings based on a query and location from job portals like Naukri.com.',
        inputSchema: z.object({
            query: z.string().describe('The job title, skill, or keyword to search for.'),
            location: z.string().optional().describe('The location to search for jobs in.'),
        }),
        outputSchema: z.object({
            jobs: z.array(z.object({
                title: z.string(),
                company: z.string(),
                location: z.string(),
                salary: z.string().optional(),
                url: z.string(),
            }))
        }),
    },
    async (input) => {
        // In a real application, this would call a job board API. For now, we simulate it.
        console.log(`Simulating a search for jobs with query: "${input.query}" in location: "${input.location}" on Naukri.com`);
        
        const dummyJobs = [
            { id: 1, title: "Tractor Driver", company: "Sharma Farms", location: "Pune, Maharashtra", type: "Full-time", isVerified: true, salary: "₹15,000 - ₹20,000", description: "Experienced tractor driver needed for a large farm. Must have a valid license and knowledge of modern farming equipment.", category: "agriculture", url: 'https://example.com/job1' },
            { id: 2, title: "Data Entry Operator", company: "Gramin Suvidha Kendra", location: "Nashik, Maharashtra", type: "Part-time", salary: "₹8,000", description: "Basic computer knowledge required. Work involves entering data from government forms into our system. Flexible hours.", category: "it", url: 'https://example.com/job2' },
            { id: 3, title: "Healthcare Assistant", company: "Village Clinic", location: "Satara, Maharashtra", type: "Full-time", isVerified: true, description: "Assist doctors and nurses with daily tasks. A compassionate and caring attitude is a must.", category: "healthcare", url: 'https://example.com/job3' },
            { id: 4, title: "Primary School Teacher", company: "Sarvodaya School", location: "Aurangabad, Maharashtra", type: "Full-time", isVerified: true, salary: "₹12,000", description: "Looking for a teacher for classes 1-4. D.Ed or B.Ed preferred. Passion for teaching young children is essential.", category: "teaching", url: 'https://example.com/job4' },
            { id: 5, title: "Construction Worker", company: "Local Builders", location: "Mumbai, Maharashtra", type: "Contract", description: "General labor needed for a new housing project. Daily wages. Immediate start.", category: "construction", url: 'https://example.com/job5' },
            { id: 6, title: "Retail Sales Associate", company: "Kisan Retail Store", location: "Nagpur, Maharashtra", type: "Full-time", isVerified: true, description: "Customer service and sales role in a busy retail environment. Previous experience is a plus.", category: "retail", url: 'https://example.com/job6' },
            { id: 7, title: "Farm Hand", company: "Green Valley Organics", location: "Sangli, Maharashtra", type: "Full-time", description: "General farm duties including planting, harvesting, and livestock care. Hardworking and reliable individuals are welcome.", category: "agriculture", url: 'https://example.com/job7' },
            { id: 8, title: "Anganwadi Worker", company: "Govt. of Maharashtra", location: "Latur, Maharashtra", type: "Full-time", isVerified: true, salary: "As per govt. norms", description: "Provide health and nutrition education and support to women and children in the community.", category: "government", url: 'https://example.com/job8' },
            { id: 9, title: "Electrician", company: "PowerGrid Services", location: "Thane, Maharashtra", type: "Contract", description: "Certified electrician needed for residential and commercial wiring projects. Must have own tools.", category: "construction", url: 'https://example.com/job9' },
            { id: 10, title: "Nursing Aide", company: "City General Hospital", location: "Amravati, Maharashtra", type: "Full-time", isVerified: true, description: "Support nursing staff with patient care, monitoring vitals, and maintaining hygiene.", category: "healthcare", url: 'https://example.com/job10' },
            { id: 11, title: "Computer Operator", company: "e-Seva Center", location: "Akola, Maharashtra", type: "Part-time", salary: "₹7,500", description: "Assist citizens with online services, form filling, and document processing.", category: "it", url: 'https://example.com/job11' },
            { id: 12, title: "Security Guard", company: "SecureCorp", location: "Pune, Maharashtra", type: "Full-time", description: "Night shift security guard for a corporate office. Prior experience is preferred.", category: "retail", url: 'https://example.com/job12' },
        ];
        
        let filteredJobs = dummyJobs;
        
        if (input.query) {
            const queryLower = input.query.toLowerCase();
            filteredJobs = filteredJobs.filter(job => 
                job.title.toLowerCase().includes(queryLower) ||
                job.description.toLowerCase().includes(queryLower) ||
                job.category.toLowerCase().includes(queryLower)
            );
        }

        if (input.location) {
            const locationLower = input.location.toLowerCase();
            filteredJobs = filteredJobs.filter(job => 
                job.location.toLowerCase().includes(locationLower)
            );
        }

        return { jobs: filteredJobs.slice(0, 5) }; // Return top 5 matches
    }
);


const chatbotPrompt = ai.definePrompt({
  name: 'graminChatbotPrompt',
  input: {schema: GraminChatbotInputSchema},
  output: {schema: GraminChatbotOutputSchema},
  tools: [searchJobs],
  prompt: `You are a smart and friendly job assistant for "Gramin Jobs Connect", a platform connecting rural job seekers with employers. Your main source of jobs is a direct integration with Naukri.com.

Your tasks:

1. Provide **live job updates** by using the 'searchJobs' tool, which queries Naukri.com.
2. Help users **search jobs by location, category, or skill**.
3. When showing job details, you **MUST** include:
   - Job Title
   - Company Name
   - Location
   - Salary (if available)
   - A direct link to apply using the 'url' field. Format it as a markdown link, like [Apply here](URL).
4. Guide users on **how to apply** for jobs using the links provided.
5. Answer **common FAQs** about registration, login, profiles, deadlines, and salaries.
6. Only provide jobs returned by the 'searchJobs' tool. If the tool returns no jobs, politely inform the user and suggest they try different keywords or a broader location.
7. Respond in **simple, clear, and polite language** suitable for rural users.
8. Always keep the conversation **friendly, helpful, and professional**.

When a user asks for jobs, you **MUST** use the 'searchJobs' tool to find relevant listings.

Example conversation:

- User: "Any software jobs in Andhra Pradesh?"
- Bot: (The bot calls the searchJobs tool with query="software" and location="Andhra Pradesh"). "Here are some live software jobs in Andhra Pradesh I found on Naukri.com:
  1. Software Developer at XYZ Corp, Hyderabad, ₹25,000. [Apply here](https://example.com/job1)
  2. Junior Web Developer at ABC Pvt Ltd, Vijayawada, ₹18,000. [Apply here](https://example.com/job2)
You can apply directly via the links provided."

- User: "How can I register?"
- Bot: "To register, click the ‘Sign Up’ button on the homepage, fill in your details, and submit. You will then have access to all current job postings."

User Question: {{{query}}}`,
});

const graminChatbotFlow = ai.defineFlow(
  {
    name: 'graminChatbotFlow',
    inputSchema: GraminChatbotInputSchema,
    outputSchema: GraminChatbotOutputSchema,
  },
  async input => {
    const response = await chatbotPrompt(input);
    const output = response.output();
    if (!output) {
        throw new Error("The AI failed to generate a response.");
    }
    return output;
  }
);

    