// app/dashboard/create/page.tsx
import { handleSubmission } from "@/app/actions";
import { Submitbutton } from "@/components/general/Submitbutton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function createBlogRoute() {
  return (
    <div>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>
            Create a new post to share (Markdown supported for code blocks,
            e.g., ```typescript, for bold text **bold**, emojis supported too,
            see markdown formatting for more)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={handleSubmission}>
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <input name="title" required type="text" placeholder="Title" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Content</Label>
              <Textarea
                name="content"
                required
                placeholder="Write your content here. Use ```typescript for code blocks."
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Image URL</Label>
              <input name="url" required type="url" placeholder="Image url" />
            </div>
            <Submitbutton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
