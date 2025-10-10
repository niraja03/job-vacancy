"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { graminChatbot, GraminChatbotOutput } from "@/ai/flows/gramin-chatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, Bot, User, MessageSquare, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  query: z.string().min(1, "Please enter a message."),
});

type FormValues = z.infer<typeof formSchema>;

type Message = {
  role: "user" | "assistant";
  text: string;
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: "" },
  });

  useEffect(() => {
    if (isOpen && scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
             viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages, isOpen]);

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const userMessage: Message = { role: "user", text: values.query };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();

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
    }
  }

  return (
    <>
      <div className={cn("fixed bottom-5 right-5 z-50 transition-transform duration-300 ease-in-out", 
        isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
      )}>
        <Button size="lg" className="rounded-full shadow-lg h-16 w-16" onClick={() => setIsOpen(true)}>
          <MessageSquare className="h-8 w-8" />
        </Button>
      </div>

      <div className={cn(
          "fixed bottom-5 right-5 z-50 w-[350px] h-[500px] bg-card border-2 border-primary/20 rounded-lg shadow-2xl flex flex-col font-sans transition-all duration-300 ease-in-out origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
      )}>
        <header className="p-4 border-b flex items-center justify-between bg-primary/5 text-primary">
          <h3 className="font-bold flex items-center gap-2"><Bot /> Gramin AI Assistant</h3>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </header>
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
          {messages.length === 0 ? (
                <div className="text-center text-muted-foreground pt-12">
                  <Bot className="mx-auto h-10 w-10" />
                  <p className="mt-2 text-sm">Ask a question to get started. For example: "How can I find a job?"</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'assistant' && (
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Bot className="h-5 w-5 text-primary"/>
                      </div>
                    )}
                    <div className={`rounded-lg p-3 text-sm max-w-[85%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    </div>
                    {message.role === 'user' && (
                       <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                         <User className="h-5 w-5 text-muted-foreground" />
                       </div>
                    )}
                  </div>
                ))
              )}
               {isLoading && (
                  <div className="flex items-start gap-3">
                     <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Bot className="h-5 w-5 text-primary"/>
                      </div>
                      <div className="rounded-lg p-3 bg-muted flex items-center gap-2 text-sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Thinking...</span>
                      </div>
                  </div>
                )}
          </div>
        </ScrollArea>
        <div className="p-3 border-t bg-background">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
            <Input
              {...form.register("query")}
              placeholder="Ask a question..."
              className="flex-1"
              autoComplete="off"
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
