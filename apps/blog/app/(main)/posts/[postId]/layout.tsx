// EditorInputとPreviewは以下のlinkからCSSを読み込むためここで指定している

export default function PostDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        href="//esm.sh/@wooorm/starry-night@3/style/dark.css"
        rel="stylesheet"
      />
      <link
        href="//esm.sh/github-markdown-css@5/github-markdown.css"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
