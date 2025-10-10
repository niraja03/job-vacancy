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
        description: 'Search for live job listings based on a query and location.',
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
        // In a real application, this would call a job board API like Indeed, Naukri, etc.
        // For now, we'll return some dummy data.
        console.log(`Searching for jobs with query: "${input.query}" in location: "${input.location}"`);
        
        const dummyJobs = [
            { title: 'Software Developer', company: 'Tech Solutions', location: 'Hyderabad', salary: '₹25,000/month', url: 'https://example.com/job1' },
            { title: 'Junior Web Developer', company: 'Web Weavers', location: 'Vijayawada', salary: '₹18,000/month', url: 'https://example.com/job2' },
            { title: 'Tractor Driver', company: 'Sharma Farms', location: 'Pune', salary: '₹17,000/month', url: 'https://example.com/job3' },
            { title: 'Data Entry Operator', company: 'Digital Services', location: 'Nagpur', salary: '₹12,000/month', url: 'https://example.com/job4' }
        ];
        
        return { jobs: dummyJobs.filter(job => job.title.toLowerCase().includes(input.query.toLowerCase()) || job.location.toLowerCase().includes(input.query.toLowerCase())) };
    }
);


const chatbotPrompt = ai.definePrompt({
  name: 'graminChatbotPrompt',
  input: {schema: GraminChatbotInputSchema},
  output: {schema: GraminChatbotOutputSchema},
  tools: [searchJobs],
  prompt: `You are a smart and friendly job assistant for "Gramin Jobs Connect", a platform connecting rural job seekers with employers. 

Your tasks:

1. Provide **live job updates** from the website AND external sources like Indeed, Naukri, Remotive, Adzuna, or other legal job APIs.
2. Help users **search jobs by location, category, or skill**.
3. Show **job details** including:
   - Job Title
   - Company Name
   - Location
   - Salary (if available)
   - Link to apply
4. Guide users on **how to apply** for jobs.
5. Answer **common FAQs** about registration, login, profiles, deadlines, and salaries.
6. Only provide jobs **from live and legal sources**. If a job is not available, politely suggest alternatives or similar positions.
7. Respond in **simple, clear, and polite language** suitable for rural users.
8. Always keep the conversation **friendly, helpful, and professional**.

When a user asks for jobs, use the 'searchJobs' tool to find relevant listings.

Example conversation:

- User: "Any software jobs in Andhra Pradesh?"
- Bot: "Here are some live software jobs in Andhra Pradesh:
  1. Software Developer at XYZ Corp, Hyderabad, ₹25,000/month. [Apply here](https://example.com)
  2. Junior Web Developer at ABC Pvt Ltd, Vijayawada, ₹18,000/month. [Apply here](https://example.com)
You can apply directly via the links provided or check our website for more jobs."

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
