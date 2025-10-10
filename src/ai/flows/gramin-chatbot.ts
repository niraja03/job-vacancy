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
  query: z.string().describe('The user\'s question about the Gramin Jobs Connect platform.'),
});
export type GraminChatbotInput = z.infer<typeof GraminChatbotInputSchema>;

const GraminChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s answer to the user\'s question.'),
});
export type GraminChatbotOutput = z.infer<typeof GraminChatbotOutputSchema>;

export async function graminChatbot(input: GraminChatbotInput): Promise<GraminChatbotOutput> {
  return graminChatbotFlow(input);
}

const chatbotPrompt = ai.definePrompt({
  name: 'graminChatbotPrompt',
  input: {schema: GraminChatbotInputSchema},
  output: {schema: GraminChatbotOutputSchema},
  prompt: `You are a helpful and friendly AI assistant for "Gramin Jobs Connect", a web platform designed to connect rural talent with job opportunities. Your goal is to answer user questions clearly and concisely about how to use the platform.

Here are the key features of the Gramin Jobs Connect platform you should be an expert on:
- **Find Jobs (/jobs)**: Users can search for jobs from verified employers in their local area. They can filter by job type, location, and category.
- **AI Resume Builder (/resume-builder)**: A tool that helps users create a professional resume by filling out a simple form.
- **Smart Job Recommender (/smart-recommender)**: An AI-powered tool that suggests jobs based on a user's skills, location, and past experience.
- **AI Chatbot (/chatbot)**: That's you! An assistant to help users navigate the site.
- **Community Board (/community)**: A place for users to share job referrals, tips, and ask for help from their peers.
- **Learning & Skilling Hub (/learning)**: A section with free micro-learning video courses to help users learn new skills and get certified.
- **Policy & Trends Dashboard (/analytics)**: Shows insights and trends in the rural job market.
- **User Profile (/profile)**: Where users can manage their personal information, accessibility settings, and view their achievements.

When a user asks a question, provide a helpful response based on the features above. Be encouraging and clear. If a user asks a general question, try to relate it back to how Gramin Jobs Connect can help them.

User Question: {{{query}}}

Your Response:`,
});

const graminChatbotFlow = ai.defineFlow(
  {
    name: 'graminChatbotFlow',
    inputSchema: GraminChatbotInputSchema,
    outputSchema: GraminChatbotOutputSchema,
  },
  async input => {
    const {output} = await chatbotPrompt(input);
    if (!output) {
        throw new Error("The AI failed to generate a response.");
    }
    return output;
  }
);
