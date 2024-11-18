import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";

const ErrorAlert = ({
  errorText,
  locationError,
  onClick,
  icon,
  btnText = "Enable Location",
}: {
  errorText: string;
  locationError: string;
  onClick: () => void;
  icon: React.ReactNode;
  btnText?: string;
}) => {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>{errorText}</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{locationError}</p>
        <Button onClick={onClick} variant={"outline"} className="w-fit">
          {icon}
          {btnText}
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
