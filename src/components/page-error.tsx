import { AlertTriangleIcon } from "lucide-react";

interface PageErrorProps {
  message: string;
}

export const PageError = ({ message }: PageErrorProps) => {
  return (
    <div className="flex items-center justify-center h-full">
      <AlertTriangleIcon className="size-5 text-destructive" />
      <div className="text-sm text-muted-foreground">{message}</div>
    </div>
  );
};
