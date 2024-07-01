import { useRef, useEffect, forwardRef, useImperativeHandle, Ref } from "react";
import Button from "./Button";

interface CameraProps {
  onChange: (dataUrl: string | null) => void;
}

const Camera = forwardRef<HTMLVideoElement, CameraProps>(
  ({ onChange }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref as Ref<{ takePhoto: () => void }>, () => ({
      takePhoto: () => takePhoto(),
    }));

    useEffect(() => {
      getVideo();
    }, []);

    const getVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          const video = videoRef.current;

          if (video) {
            video.srcObject = stream;
            video.play();
          } else {
            console.error("Video element not found.");
          }
        })
        .catch((err) => {
          console.error("Error accessing the camera:", err);
        });
    };

    const takePhoto = () => {
      if (canvasRef.current && videoRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (context) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/png");
          onChange(dataUrl);
        }
      }
    };

    return (
      <div className="flex flex-col items-center space-y-4 w-full">
        <div className="relative w-full pb-[100%] h-0">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover bg-black border border-white border-opacity-25 rounded-3xl"
            playsInline
          />
        </div>
        <Button onClick={takePhoto}>Take Photo</Button>
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
    );
  }
);

export default Camera;
