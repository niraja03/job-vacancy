"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { buildResume } from "@/ai/flows/resume-builder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  contactInformation: z.string().min(10, "Contact information is required"),
  objective: z.string().optional(),
  skills: z.string().min(2, "Please list at least one skill"),
  experience: z.string().min(10, "Please describe your experience"),
  education: z.string().min(5, "Please describe your education"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ResumeBuilderPage() {
  const [generatedResume, setGeneratedResume] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contactInformation: "",
      objective: "",
      skills: "",
      experience: "",
      education: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setGeneratedResume("");
    try {
      const result = await buildResume(values);
      // In a real app, this would be a PDF. Here we display the text content.
      setGeneratedResume(result.resumeContent); 
      toast({
        title: "Resume Generated!",
        description: "Your resume has been created successfully.",
      });
    } catch (error) {
      console.error("Error building resume:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate resume. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">AI Resume Builder</h1>
        <p className="mt-2 text-lg text-muted-foreground">Fill the form or speak your details, and we'll create a professional resume for you.</p>
      </header>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
            <CardDescription>Provide your details to build your resume.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="e.g., Jhon Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="contactInformation" render={({ field }) => (
                  <FormItem><FormLabel>Contact (Phone/Email)</FormLabel><FormControl><Input placeholder="e.g., 9876543210, jhon.d@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="objective" render={({ field }) => (
                  <FormItem><FormLabel>Career Objective (Optional)</FormLabel><FormControl><Textarea placeholder="e.g., Seeking a challenging role in agriculture..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="skills" render={({ field }) => (
                  <FormItem><FormLabel>Skills</FormLabel><FormControl><Textarea placeholder="e.g., Tractor operation, data entry, customer service" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="experience" render={({ field }) => (
                  <FormItem><FormLabel>Work Experience</FormLabel><FormControl><Textarea placeholder="e.g., Worked at Sharma Farms for 2 years..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="education" render={({ field }) => (
                  <FormItem><FormLabel>Education</FormLabel><FormControl><Textarea placeholder="e.g., 10th Pass from ABC School" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : <><FileText className="mr-2 h-4 w-4" /> Generate Resume</>}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Generated Resume</CardTitle>
            <CardDescription>Your generated resume will appear here. You can then download it as a PDF.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
             {isLoading && (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Building your resume...</p>
              </div>
            )}
            {generatedResume ? (
              <div className="relative h-full">
                <pre className="whitespace-pre-wrap font-sans text-sm bg-muted p-4 rounded-md h-full overflow-auto border">
                  {generatedResume}
                </pre>
                 <Button className="absolute top-2 right-2" size="sm" variant="outline">
                   <Download className="mr-2 h-4 w-4" /> Download PDF
                 </Button>
              </div>
            ) : (
              !isLoading && <div className="flex items-center justify-center h-full text-center text-muted-foreground"><p>Your resume will be shown here after generation.</p></div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
