import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArticleCard } from "./ArticleCard";

const meta = {
  component: ArticleCard,
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstStory: Story = {
  args: {
    category: "Web開発",
    title: "React 19の新機能完全ガイド",
    description:
      "最新のReact 19で導入された革新的な機能とパフォーマンス改善について詳しく解説します。",
    date: "2025年10月8日",
    gradient: "from-purple-500 to-purple-700",
  },
};
