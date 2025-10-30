import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" color="#00c951" />,
        info: <InfoIcon className="size-4" color="#ff6900" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" color="#fb2c36" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={{
        "--normal-bg": "white",
        "--normal-text": "#0f1419",
        "--normal-border": "#e2e8f0",
        "--border-radius": "7px",
      }}
      {...props}
    />
  );
};

export { Toaster };
