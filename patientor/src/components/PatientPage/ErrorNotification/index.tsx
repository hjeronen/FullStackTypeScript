import { Alert } from "@mui/material";

interface ErrorNotificationProps {
  error?: string;
}

const ErrorNotification = ({ error }: ErrorNotificationProps) => {
  return error ? <Alert severity='error'>{error}</Alert> : null;
};

export default ErrorNotification;
