import { cn } from "@/lib/css";

type Props = {
  published: boolean;
  onToggle: () => void;
};

export const PublishToggle = ({ published, onToggle }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">公開:</span>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "h-6 w-12 rounded-full p-1 transition-colors",
          published ? "justify-end bg-green-500" : "justify-start bg-gray-500",
          "flex items-center",
        )}
      >
        <span className="block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform" />
      </button>
    </div>
  );
};
