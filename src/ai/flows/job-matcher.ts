// Implemented Genkit flow for job matching based on user skills and location.

'use server';

/**
 * @fileOverview An AI agent for matching job seekers with relevant job listings.
 *
 * - jobMatcher - A function that recommends jobs based on user skills and location.
 * - JobMatcherInput - The input type for the jobMatcher function.
 * - JobMatcherOutput - The return type for the jobMatcher function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobMatcherInputSchema = z.object({
  skills: z
    .string()
    .describe('A comma-separated list of the job seeker\'s skills.'),
  location: z.string().describe('The job seeker\'s preferred location.'),
  jobHistory: z
    .string()
    .optional()
    .describe('A brief summary of the job seeker\'s job history.'),
});
export type JobMatcherInput = z.infer<typeof JobMatcherInputSchema>;

const JobMatcherOutputSchema = z.object({
  jobRecommendations: z
    .string()
    .describe(
      'A list of job recommendations based on the user\'s skills and location.'
    ),
});
export type JobMatcherOutput = z.infer<typeof JobMatcherOutputSchema>;

export async function jobMatcher(input: JobMatcherInput): Promise<JobMatcherOutput> {
  return jobMatcherFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobMatcherPrompt',
  input: {schema: JobMatcherInputSchema},
  output: {schema: JobMatcherOutputSchema},
  prompt: `You are a job recommendation expert. Based on the job seeker's skills, location, and job history, provide a list of relevant job recommendations.

Skills: {{{skills}}}
Location: {{{location}}}
Job History: {{{jobHistory}}}

Job Recommendations:`,
});

const jobMatcherFlow = ai.defineFlow(
  {
    name: 'jobMatcherFlow',
    inputSchema: JobMatcherInputSchema,
    outputSchema: JobMatcherOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
