import { NextResponse } from "next/server";

export async function GET(
  request: { url: string },
  { params }: { params: Promise<{ videoId: string }> }
) {
  const { videoId } = await params;
  const url = new URL(request.url);
  const flickrHash = url.searchParams.get("hash");
  url.searchParams.delete("hash"); // Remove hash from query params to avoid duplication
  const queryParams = url.searchParams.toString();
  const flickrUrl = `https://live.staticflickr.com/video/${videoId}/${flickrHash}/1080p.mp4${
    queryParams ? `?${queryParams}` : ""
  }`;

  console.log("Proxy: Request URL:", request.url);
  console.log("Proxy: Fetching Flickr URL:", flickrUrl);

  try {
    const response = await fetch(flickrUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "video/mp4",
        Referer: "https://www.flickr.com/",
        "Cache-Control": "no-cache",
      },
    });
    console.log("Proxy: Fetch status:", response.status, response.statusText);
    console.log("Proxy: Fetch headers:", Object.fromEntries(response.headers));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Proxy: Fetch error details:", errorText);
      return NextResponse.json(
        {
          error: `Failed to fetch video: ${response.statusText}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    const videoBuffer = await response.arrayBuffer();
    return new NextResponse(videoBuffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error: any) {
    console.error("Proxy: Error fetching video:", error.message, error.stack);
    return NextResponse.json(
      { error: "Error fetching video", details: error.message },
      { status: 500 }
    );
  }
}
