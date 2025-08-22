// src/ai/flows/resume-builder.ts
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
    .describe('The job seeker