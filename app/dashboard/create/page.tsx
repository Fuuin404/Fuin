"use client";

import { handleSubmission } from "@/app/actions";
import { Submitbutton } from "@/components/general/Submitbutton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateBlogRoute() {
  return (
    <div>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>Create and Share a post today:</CardDescription>
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
                placeholder="Add content (Markdown supported: **bold**, ```javascript yourcode```)"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Image URL</Label>
              <input
                name="imageUrl"
                required
                type="url"
                placeholder="Image host sites we use: flickr, pixabay, pinterest."
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Video URL (Optional)</Label>
              <input
                name="videoUrl"
                type="url"
                placeholder="Enter a video URL from Flickr (e.g., https://live.staticflickr.com/video/.../1080p.mp4)"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>p5.js Embed Code</Label>
              <Textarea
                name="sketchEmbedCode"
                placeholder='To get the embed code, go to your sketch in p5, click "Share", and copy the "Embed" code. It should look like: <iframe src="https://editor.p5js.org/username/full/sketchID"></iframe>'
              />
            </div>

            <Submitbutton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
