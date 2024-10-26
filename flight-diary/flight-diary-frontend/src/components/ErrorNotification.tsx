interface ErrorNotificationProps {
  message: string;
}

interface Style {
  color: string;
}

const ErrorNotification = ({ message }: ErrorNotificationProps) => {
  const errorStyle: Style = {
    color: "red",
  };
  return (
    message && (
      <div style={errorStyle}>
        <p>{message}</p>
      </div>
    )
  );
};

export default ErrorNotification;
