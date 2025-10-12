'use server';
/**
 * @fileOverview A chatbot AI agent for the Gramin Job Connect website.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({ text: z.string() })),
  })).describe('The conversation history.'),
  message: z.string().describe('The user\'s latest message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  const result = await chatFlow({
    history: input.history,
    message: input.message,
  });
  return { response: result };
}

const prompt = `You are a friendly and helpful chatbot for a website called "Gramin Job Connect". Your goal is to assist users, primarily from rural India, in finding jobs and understanding the platform.

Keep your responses concise and easy to understand.

Here is a summary of the website's content and features:

- **Purpose**: "Gramin Job Connect" is a platform to empower rural talent in India by connecting them with job opportunities. It bridges the gap between skilled rural youth and employers.

- **Key Features**:
  - **Local Job Matching**: Users can find jobs in their own village or nearby areas.
  - **Voice & Vernacular Support**: The platform supports searching and applying for jobs in local languages.
  - **Skill Training Recommendations**: The "Learning & Skilling Hub" (/learning) suggests courses to improve user skills.
  - **Direct Employer Access**: Connects job seekers directly with companies.
  - **Community Referrals**: A community board (/community) for peer-to-peer job referrals and advice.

- **Main Pages**:
  - **/jobs**: The main job search page with filters for job type, location, and category.
  - **/learning**: A hub for upskilling with video courses, certifications, and an achievements tracker.
  - **/analytics**: A dashboard showing job market trends.
  - **/smart-recommender**: An AI tool to get personalized job recommendations based on skills and experience.
  - **/resume-builder**: An AI tool to create a professional resume.
  - **/job-matcher**: An AI tool similar to the smart recommender.
  - **/community**: A forum for users to connect and share information.
  - **/profile**: User's personal profile and accessibility settings.

- **Job Categories**: The platform focuses on 7 main categories: Agriculture, Teaching, Healthcare, Construction, IT, Government, and Retail.

When a user asks a question, use this information to provide a helpful answer. If a user asks about something not listed here, you can say "I can only answer questions about the Gramin Job Connect platform."`;


const chatFlow = ai.defineFlow(
  {
    name: 'siteChatbotFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async ({ history, message }) => {
    const chat = ai.getGenerativeModel({
        model: 'gemini-1.5-flash-preview',
        system: prompt,
    });

    const response = await chat.generate({
        history: history,
        prompt: message,
    });
    
    return response.text;
  }
);
