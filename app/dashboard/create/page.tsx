"use client";

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

export default function CreateBlogRoute() {
  return (
    <div>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>
            Share a p5.js sketch by pasting its embed code from the p5.js
            editor. To get the embed code, go to your sketch, click "Share", and
            copy the "Embed" code. It should look like: &lt;iframe
            src="https://editor.p5js.org/username/full/sketchID"&gt;&lt;/iframe&gt;
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
                placeholder="Describe your sketch or add notes (Markdown supported)"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Image URL</Label>
              <input
                name="imageUrl"
                required
                type="url"
                placeholder="Image url"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>p5.js Embed Code</Label>
              <Textarea
                name="sketchEmbedCode"
                required
                placeholder='Paste the entire iframe code, e.g., <iframe src="https://editor.p5js.org/username/full/sketchID"></iframe>'
              />
            </div>

            <Submitbutton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
