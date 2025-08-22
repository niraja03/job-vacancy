
'use server';
/**
 * @fileOverview A resume builder AI agent.
 *
 * - buildResume - A function that handles the resume building process.
 * - ResumeBuilderInput - The input type for the buildResume function.
 * - ResumeBuilderOutput - The return type for the buildResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeBuilderInputSchema = z.object({
  name: z.string().describe('The full name of the person.'),
  contactInformation: z
    .string()
    .describe(
      'Contact information including phone number and email address.'
    ),
  skills: z.string().describe('A list of skills.'),
  experience: z.string().describe('A description of work experience.'),
  education: z.string().describe('A description of education history.'),
  objective: z
    .string()
    .optional()
    .describe("The job seeker's career objective."),
});
export type ResumeBuilderInput = z.infer<typeof ResumeBuilderInputSchema>;

const ResumeBuilderOutputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The full, formatted resume content as a single string.'),
});
export type ResumeBuilderOutput = z.infer<typeof ResumeBuilderOutputSchema>;

export async function buildResume(
  input: ResumeBuilderInput
): Promise<ResumeBuilderOutput> {
  return buildResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'buildResumePrompt',
  input: {schema: ResumeBuilderInputSchema},
  output: {schema: ResumeBuilderOutputSchema},
  prompt: `You are a professional resume writer. Create a well-formatted, professional resume based on the following information. The output should be a single string.

Name: {{{name}}}
Contact: {{{contactInformation}}}
{{#if objective}}
Objective: {{{objective}}}
{{/if}}

---
SKILLS
---
{{{skills}}}

---
EXPERIENCE
---
{{{experience}}}

---
EDUCATION
---
{{{education}}}`,
});

const buildResumeFlow = ai.defineFlow(
  {
    name: 'buildResumeFlow',
    inputSchema: ResumeBuilderInputSchema,
    outputSchema: ResumeBuilderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
