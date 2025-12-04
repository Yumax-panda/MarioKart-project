import { ArticleLayout } from "@/app/(main)/_components/Markdown/ArticleLayout";
import { MarkdownPreview } from "@/app/(main)/_components/Markdown/MarkdownPreview";

const aboutContent = `
東工大マリオカートサークルはチーム「TT」という名前で日々活動に励んでいます。

本サイトはチームTTのサークルブログです。サークル内の活動を不定期で発信します。

## 活動内容

- 交流戦 ★メイン活動
- 模擬戦（基本的に模擬と呼びます）
- ラウンジ（ガチ勢のレート戦です）
- 大会（MKC, 大学対抗戦など）
- 内戦・イベント（年に数回企画しています)
- Discord bot開発

サークルの雰囲気は、友達と集まってマリカで遊んでいる感じに近いと思います。

もちろん、大会では勝利を目指して真剣に取り組みます。

また、年齢関係なく（タメ口で）メンバー同士の仲が良いのは弊サークルの良いところだと思っています。

## Copyright

マリオカートおよび関連する商標は任天堂が所有します。本サークルは任天堂とは一切の関係はありません。
`;

export default function Page() {
  return (
    <div className="min-h-screen pb-16">
      <ArticleLayout title="About TT">
        <MarkdownPreview markdown={aboutContent} />
      </ArticleLayout>
    </div>
  );
}
