import { useState, useEffect } from "react";
import Image from "next/image";

export default function TrackCover({ trackID }: { trackID: string }) {
  const [cover, setCover] = useState("/music-note.png");

  useEffect(() => {
    const fetchTrackCover = async () => {
      try {
        const res = await fetch(`/api/track?track=${trackID}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setCover(
          data.images.length > 0 ? data.images[0].url : "/music-note.png"
        );
      } catch {
        setCover("/music-note.png");
      }
    };

    fetchTrackCover();
  }, [trackID]);

  return <Image src={cover} alt="track cover" width={150} height={150} />;
}
