type Props = {
  message: string;
  className?: string;
};

export const FieldError = ({ message, className = "" }: Props) => {
  return <p className={`text-red-400 text-sm ${className}`}>{message}</p>;
};
