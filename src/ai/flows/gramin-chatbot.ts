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
  prompt: `You are a friendly and helpful assistant for "Gramin Jobs Connect", a platform connecting rural job seekers with employers.
Your tasks:
1. Help users find job opportunities based on their skills or location.
2. Guide users to register, login, or update their profile.
3. Answer common FAQs about job types, salaries, and the application process.
4. Provide clear, concise, and polite responses.
5. If unsure about a question, politely suggest contacting support.

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
