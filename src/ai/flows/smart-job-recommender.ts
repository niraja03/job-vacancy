'use server';
/**
 * @fileOverview AI flow to recommend jobs based on user skills, location, and job history.
 *
 * - recommendJobs - A function that handles the job recommendation process.
 * - RecommendJobsInput - The input type for the recommendJobs function.
 * - RecommendJobsOutput - The return type for the recommendJobs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendJobsInputSchema = z.object({
  skills: z.string().describe('Comma-separated list of job seeker skills.'),
  location: z.string().describe('Job seeker location.'),
  jobHistory: z.string().describe('Comma-separated list of past job titles.'),
});
export type RecommendJobsInput = z.infer<typeof RecommendJobsInputSchema>;

const RecommendJobsOutputSchema = z.object({
  jobRecommendations: z
    .string()
    .describe('A list of recommended jobs based on the provided skills, location, and job history.'),
});
export type RecommendJobsOutput = z.infer<typeof RecommendJobsOutputSchema>;

export async function recommendJobs(input: RecommendJobsInput): Promise<RecommendJobsOutput> {
  return recommendJobsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendJobsPrompt',
  input: {schema: RecommendJobsInputSchema},
  output: {schema: RecommendJobsOutputSchema},
  prompt: `You are a job recommendation expert.

Based on the job seeker's skills, location, and job history, provide a list of recommended jobs.

Skills: {{{skills}}}
Location: {{{location}}}
Job History: {{{jobHistory}}}

Recommended Jobs:`,
});

const recommendJobsFlow = ai.defineFlow(
  {
    name: 'recommendJobsFlow',
    inputSchema: RecommendJobsInputSchema,
    outputSchema: RecommendJobsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
