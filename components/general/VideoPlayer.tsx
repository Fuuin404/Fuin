"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoPlayerProps {
  url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  const [retryCount, setRetryCount] = useState(0);
  const [videoUrl, setVideoUrl] = useState(url);
  const maxRetries = 3;

  console.log("VideoPlayer URL:", videoUrl, "Retry count:", retryCount);

  useEffect(() => {
    if (retryCount > 0 && retryCount <= maxRetries) {
      console.log("Retrying video load, attempt:", retryCount);
      setVideoUrl(`${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`);
    }
  }, [retryCount, url]);

  return (
    <div className="mt-6">
      <Suspense fallback={<div>Loading video...</div>}>
        <ReactPlayer
          url={videoUrl}
          controls
          width="100%"
          height="360px"
          className="rounded-lg"
          onError={(e, data, hlsInstance, hlsGlobal) => {
            console.error("ReactPlayer error:", {
              error: e,
              data,
              hlsInstance,
              hlsGlobal,
              retryCount,
            });
            if (retryCount < maxRetries) {
              setRetryCount((prev) => prev + 1);
            }
          }}
          onReady={() => console.log("ReactPlayer ready")}
          onStart={() => console.log("ReactPlayer started")}
          fallback={<div>Error loading video. Please try again.</div>}
        />
      </Suspense>
    </div>
  );
}
