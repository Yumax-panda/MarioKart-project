// https://github.com/remarkjs/react-markdown/tree/website
// https://github.com/wooorm/starry-night

import { createStarryNight } from "@wooorm/starry-night";
import sourceCss from "@wooorm/starry-night/source.css";
import sourceJs from "@wooorm/starry-night/source.js";
import sourceTs from "@wooorm/starry-night/source.ts";
import sourceTsx from "@wooorm/starry-night/source.tsx";
import textHtmlBasic from "@wooorm/starry-night/text.html.basic";
import textMd from "@wooorm/starry-night/text.md";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/css";
import styles from "./EditorInput.module.css";

const grammars = [
  sourceCss,
  sourceJs,
  sourceTsx,
  sourceTs,
  textHtmlBasic,
  textMd,
];

type StarryNight = Awaited<ReturnType<typeof createStarryNight>>;

type Props = {
  currentInputValue: string;
  onChange: (text: string) => void;
  hasError?: boolean;
};

export const EditorInput = ({
  currentInputValue,
  onChange,
  hasError,
}: Props) => {
  const [starryNight, setStarryNight] = useState<StarryNight | null>(null);

  useEffect(() => {
    createStarryNight(grammars).then(setStarryNight);
  }, []);

  return (
    <div
      className={cn(
        "bg-transparent",
        hasError && "rounded ring-2 ring-red-500",
      )}
    >
      <div className={styles.inner}>
        <div className={styles.draw}>
          {starryNight !== null
            ? toJsxRuntime(
                starryNight.highlight(currentInputValue, "text.md"),
                {
                  Fragment,
                  jsx,
                  jsxs,
                },
              )
            : undefined}
          {/* Trailing whitespace in a `textarea` is shown, but not in a `div`
          with `white-space: pre-wrap`.
          Add a `br` to make the last newline explicit. */}
          {/\n[ \t]*$/.test(currentInputValue) ? <br /> : undefined}
        </div>
        <textarea
          spellCheck="false"
          className={cn(styles.write)}
          value={currentInputValue}
          rows={currentInputValue.split("\n").length + 1}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
      </div>
    </div>
  );
};
