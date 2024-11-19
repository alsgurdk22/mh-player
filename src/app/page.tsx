import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-4xl">
        <VideoPlayer src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
      </div>
    </div>
  );
}
