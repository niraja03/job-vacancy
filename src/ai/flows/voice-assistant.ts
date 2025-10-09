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
    .describe(
      'The language of the user query (en: English, hi: Hindi, te: Telugu, mr: Marathi).'
    ),
});

export type VoiceAssistantInput = z.infer<typeof VoiceAssistantInputSchema>;

const VoiceAssistantOutputSchema = z.object({
  response: z.string().describe('The text response to the user query.'),
  audio: z.string().describe('The audio response in base64 encoded WAV format.'),
});

export type VoiceAssistantOutput = z.infer<typeof VoiceAssistantOutputSchema>;

export async function voiceAssistant(
  input: VoiceAssistantInput
): Promise<VoiceAssistantOutput> {
  return voiceAssistantFlow(input);
}

const voiceAssistantPrompt = ai.definePrompt({
  name: 'voiceAssistantPrompt',
  input: {schema: z.object({query: z.string()})},
  output: {schema: z.string().describe('Response to user query.')},
  prompt: `You are a helpful voice assistant that guides users to find jobs.
Respond to the user query.

Query: {{{query}}}`,
});

const translatePrompt = ai.definePrompt({
  name: 'translatePrompt',
  input: {
    schema: z.object({text: z.string(), language: z.string()}),
  },
  output: {schema: z.string()},
  prompt: `Translate the following text to {{language}}: {{{text}}}`,
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

    let bufs: Buffer[] = [];
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
    // 1. Get initial response in English
    const {output: englishResponse} = await voiceAssistantPrompt({
      query: input.query,
    });

    if (!englishResponse) {
      throw new Error('Failed to get a response from the assistant.');
    }

    let translatedResponse = englishResponse;

    // 2. Translate if the language is not English
    if (input.language !== 'en') {
      const languageMap: {[key: string]: string} = {
        hi: 'Hindi',
        te: 'Telugu',
        mr: 'Marathi',
      };
      const targetLanguage = languageMap[input.language];

      const {output} = await translatePrompt({
        text: englishResponse,
        language: targetLanguage,
      });
      if (output) {
        translatedResponse = output;
      }
    }

    // 3. Generate audio from the (potentially translated) response
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: 'Algenib'}, // This voice supports multiple languages
          },
        },
      },
      prompt: translatedResponse,
    });

    if (!media || !media.url) {
      throw new Error('No media returned from TTS model');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const audio = 'data:audio/wav;base64,' + (await toWav(audioBuffer));

    return {response: translatedResponse, audio};
  }
);
