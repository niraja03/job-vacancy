"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { graminChatbot, GraminChatbotOutput } from "@/ai/flows/gramin-chatbot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const formSchema = z.object({
  query: z.string().min(1, "Please enter a message."),
});

type FormValues = z.infer<typeof formSchema>;

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  useEffect(() => {
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
      const result: GraminChatbotOutput = await graminChatbot({ query: values.query });
      const assistantMessage: Message = {
        role: "assistant",
        text: result.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);

    } catch (error) {
      console.error("Error with chatbot:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response from the assistant. Please try again.",
      });
      // Do not remove the user's message on error, so they can retry.
    } finally {
      setIsLoading(false);
      form.reset();
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Gramin AI Assistant</h1>
        <p className="mt-2 text-lg text-muted-foreground">Your personal guide to the Gramin Jobs Connect platform.</p>
      </header>
      <Card className="max-w-3xl mx-auto flex flex-col h-[70vh]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot /> Chat with our Assistant</CardTitle>
          <CardDescription>Ask about finding jobs, building a resume, learning new skills, and more.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground pt-12">
                  <Bot className="mx-auto h-12 w-12" />
                  <p className="mt-2">Ask a question to get started. For example: "How can I find a job?"</p>
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
                      <p className="whitespace-pre-wrap">{message.text}</p>
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
                        <span>Thinking...</span>
                      </div>
                  </div>
                )}
            </div>
          </ScrollArea>
        </CardContent>
        <div className="p-4 border-t">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4">
              <div className="flex-1 relative">
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Ask anything about Gramin Jobs Connect..." {...field} className="pr-12" autoComplete="off" />
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
    </div>
  );
}
