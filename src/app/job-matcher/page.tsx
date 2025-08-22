"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { jobMatcher } from "@/ai/flows/job-matcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  skills: z.string().min(2, { message: "Please enter at least one skill." }),
  location: z.string().min(2, { message: "Please enter your location." }),
  jobHistory: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function JobMatcherPage() {
  const [recommendations, setRecommendations] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: "",
      location: "",
      jobHistory: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setRecommendations("");
    try {
      const result = await jobMatcher(values);
      setRecommendations(result.jobRecommendations);
    } catch (error) {
      console.error("Error matching jobs:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get job recommendations. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">AI Job Matcher</h1>
        <p className="mt-2 text-lg text-muted-foreground">Let our AI find the perfect job for you based on your skills.</p>
      </header>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Tell us about yourself</CardTitle>
            <CardDescription>Fill in the details below to get personalized job recommendations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Skills</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., farming, driving, data entry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Pune, Maharashtra" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Past Jobs (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., farm worker, shop assistant" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Matching...
                    </>
                  ) : (
                    <>
                     <Sparkles className="mr-2 h-4 w-4" />
                     Find My Job
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Your Job Recommendations</CardTitle>
            <CardDescription>Jobs matched by our AI will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Finding the best jobs for you...</p>
              </div>
            )}
            {recommendations ? (
              <pre className="whitespace-pre-wrap font-sans text-sm bg-muted p-4 rounded-md h-full overflow-auto">
                {recommendations}
              </pre>
            ) : (
              !isLoading && (
                <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                  <p>Your recommended jobs will be shown here.</p>
                </div>
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
