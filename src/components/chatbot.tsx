"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, Loader2, Send, X, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { chat } from "@/ai/flows/site-chatbot";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        { role: 'model', content: "Hello! I'm the Gramin Job Connect assistant. How can I help you today?" }
      ]);
    } else {
      setMessages([]);
    }
  }, [isOpen]);

  useEffect(() => {
    // Auto-scroll to the bottom
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if(viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Format history for Genkit
      const historyForApi = messages.map(msg => ({
        role: msg.role as 'user' | 'model',
        content: [{ text: msg.content }]
      }));
      
      const result = await chat({ history: historyForApi, message: input });
      const modelMessage: Message = { role: 'model', content: result.response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "The chatbot is currently unavailable. Please try again later.",
      });
       setMessages(prev => prev.slice(0, -1)); // Remove user message on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-4 z-50"
          >
            <Card className="w-[350px] h-[500px] shadow-2xl flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between border-b p-4">
                <div className="flex items-center gap-3">
                  <Bot className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg font-headline">Gramin Helper</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[350px] p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                                {message.role === 'model' && (
                                    <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                                        <AvatarFallback><Bot size={18}/></AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={`rounded-lg px-3 py-2 max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                    <p className="text-sm">{message.content}</p>
                                </div>
                                {message.role === 'user' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback><User size={18}/></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-3">
                                <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                                    <AvatarFallback><Bot size={18}/></AvatarFallback>
                                </Avatar>
                                <div className="rounded-lg px-3 py-2 bg-muted">
                                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    disabled={isLoading}
                    autoComplete="off"
                  />
                  <Button type="submit" size="icon" disabled={isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        className="fixed bottom-4 right-4 rounded-full w-16 h-16 shadow-lg hover:scale-105 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
      </Button>
    </>
  );
}
