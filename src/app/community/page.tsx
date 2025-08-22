import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp } from "lucide-react";

const communityPosts = [
  {
    id: 1,
    author: "Ramesh Kumar",
    avatar: "RK",
    content: "Found a great opportunity for tractor drivers near Ludhiana. Contact Mr. Singh at 987XXXXXXX. They are verified and offer good pay.",
    likes: 15,
    comments: 4,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    author: "Sunita Devi",
    avatar: "SD",
    content: "Does anyone have experience with the new government skill training for computer basics? Is it helpful for finding data entry jobs?",
    likes: 8,
    comments: 12,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    author: "Amit Patel",
    avatar: "AP",
    content: "Warning: A company called 'Quick Jobs Pvt Ltd' is asking for money upfront. This is a scam, please be careful and report them.",
    likes: 45,
    comments: 20,
    timestamp: "1 day ago",
  },
];

export default function CommunityPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Community Board</h1>
        <p className="mt-2 text-lg text-muted-foreground">Share referrals, tips, and ask for help from your peers.</p>
      </header>

      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create a new post</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="What's on your mind? Share something with the community..." className="min-h-[100px]" />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Post</Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          {communityPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="flex flex-row items-start gap-4 p-4 bg-muted/50">
                <Avatar>
                  <AvatarImage src={`https://placehold.co/40x40.png?text=${post.avatar}`} />
                  <AvatarFallback>{post.avatar}</AvatarFallback>
                </Avatar>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-foreground/90">{post.content}</p>
              </CardContent>
              <CardFooter className="p-4 border-t flex items-center gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{post.likes} Likes</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.comments} Comments</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
