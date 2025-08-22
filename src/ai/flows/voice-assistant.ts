'use server';

/**
 * @fileOverview An AI Voice Assistant that guides users in Hindi, Telugu, Marathi, etc.
 *
 * - voiceAssistant - A function that handles the voice assistant process.
 * - VoiceAssistantInput - The input type for the voiceAssistant function.
 * - VoiceAssistantOutput - The return type for the voiceAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const VoiceAssistantInputSchema = z.object({
  query: z.string().describe('The user query in text format.'),
  language: z
    .enum(['en', 'hi', 'te', 'mr'])
    .describe('The language of the user query (en: English, hi: Hindi, te: Telugu, mr: Marathi).')
});

export type VoiceAssistantInput = z.infer<typeof VoiceAssistantInputSchema>;

const VoiceAssistantOutputSchema = z.object({
  response: z.string().describe('The text response to the user query.'),
  audio: z.string().describe('The audio response in base64 encoded WAV format.'),
});

export type VoiceAssistantOutput = z.infer<typeof VoiceAssistantOutputSchema>;

export async function voiceAssistant(input: VoiceAssistantInput): Promise<VoiceAssistantOutput> {
  return voiceAssistantFlow(input);
}

const voiceAssistantPrompt = ai.definePrompt({
  name: 'voiceAssistantPrompt',
  input: {schema: VoiceAssistantInputSchema},
  output: {schema: z.string().describe('Response to user query.')},
  prompt: `You are a helpful voice assistant that guides users to find jobs.
Respond to the user query in {{{language}}} language.

Query: {{{query}}}`,
});

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const voiceAssistantFlow = ai.defineFlow(
  {
    name: 'voiceAssistantFlow',
    inputSchema: VoiceAssistantInputSchema,
    outputSchema: VoiceAssistantOutputSchema,
  },
  async input => {
    const {output: response} = await voiceAssistantPrompt(input);

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: 'Algenib'},
          },
        },
      },
      prompt: response!,
    });

    if (!media) {
      throw new Error('no media returned');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const audio = 'data:audio/wav;base64,' + (await toWav(audioBuffer));

    return {response: response!, audio};
  }
);
