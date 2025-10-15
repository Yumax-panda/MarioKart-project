import { useState } from "react";
import { cn } from "@/lib/css";
import { EditorInput } from "./EditorInput";
import { MarkdownPreview } from "./MarkdownPreview";

type Props = {
  initialMarkdown: string;
  onSave: (markdown: string) => void;
};

export const Editor = ({ initialMarkdown, onSave }: Props) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [markdown, setMarkdown] = useState(initialMarkdown);

  return (
    <div className={cn("bg-[#0d1117]")}>
      <button type="button" onClick={() => setShowPreview((before) => !before)}>
        toggle
      </button>
      {showPreview ? (
        <MarkdownPreview markdown={markdown} />
      ) : (
        <EditorInput currentInputValue={markdown} onChange={setMarkdown} />
      )}
    </div>
  );
};
