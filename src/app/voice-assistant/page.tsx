
"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { voiceAssistant, VoiceAssistantOutput } from "@/ai/flows/voice-assistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Send, Bot, User, Volume2, Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const formSchema = z.object({
  query: z.string().min(1, "Please enter a question."),
  language: z.enum(["en", "hi", "te", "mr"]),
});

type FormValues = z.infer<typeof formSchema>;

type Message = {
  role: "user" | "assistant";
  text: string;
  audio?: string;
};

export default function VoiceAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
      language: "en",
    },
  });

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
             viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const userMessage: Message = { role: "user", text: values.query };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const result: VoiceAssistantOutput = await voiceAssistant(values);
      const assistantMessage: Message = {
        role: "assistant",
        text: result.response,
        audio: result.audio,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      
      if (result.audio && audioRef.current) {
        audioRef.current.src = result.audio;
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }

    } catch (error) {
      console.error("Error with voice assistant:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response from the assistant. Please try again.",
      });
      setMessages(prev => prev.slice(0, -1)); // Remove user message on error
    } finally {
      setIsLoading(false);
      form.reset({ ...values, query: "" });
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">AI Voice Assistant</h1>
        <p className="mt-2 text-lg text-muted-foreground">Ask me anything about jobs in your language!</p>
      </header>
      <Card className="max-w-3xl mx-auto flex flex-col h-[70vh]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot /> Chat with our Assistant</CardTitle>
          <CardDescription>Get instant help finding jobs, preparing for interviews, and more.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground pt-12">
                  <Bot className="mx-auto h-12 w-12" />
                  <p className="mt-2">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'assistant' && (
                      <Avatar>
                        <AvatarFallback><Bot /></AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg p-3 max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <p>{message.text}</p>
                      {message.role === 'assistant' && message.audio && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 -ml-2"
                          onClick={() => {
                            if (audioRef.current) {
                              audioRef.current.src = message.audio!;
                              audioRef.current.play();
                            }
                          }}
                        >
                          <Volume2 className="mr-2 h-4 w-4" /> Listen
                        </Button>
                      )}
                    </div>
                    {message.role === 'user' && (
                       <Avatar>
                        <AvatarFallback><User /></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))
              )}
               {isLoading && (
                  <div className="flex items-start gap-4">
                     <Avatar>
                        <AvatarFallback><Bot /></AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg p-3 bg-muted flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Typing...</span>
                      </div>
                  </div>
                )}
            </div>
          </ScrollArea>
        </CardContent>
        <div className="p-4 border-t">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem className="w-40">
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                       <FormControl>
                         <SelectTrigger>
                          <Languages className="mr-2 h-4 w-4 text-muted-foreground" />
                           <SelectValue placeholder="Language" />
                         </SelectTrigger>
                       </FormControl>
                       <SelectContent>
                         <SelectItem value="en">English</SelectItem>
                         <SelectItem value="hi">हिन्दी</SelectItem>
                         <SelectItem value="te">తెలుగు</SelectItem>
                         <SelectItem value="mr">मराठी</SelectItem>
                       </SelectContent>
                     </Select>
                  </FormItem>
                )}
              />
              <div className="flex-1 relative">
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Type your question here..." {...field} className="pr-12" autoComplete="off" />
                      </FormControl>
                      <FormMessage className="absolute"/>
                    </FormItem>
                  )}
                />
                 <Button type="submit" size="icon" disabled={isLoading} className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Card>
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}
