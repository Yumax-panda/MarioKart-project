import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PostCard } from "./PostCard";

const meta = {
  component: PostCard,
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    postId: "a",
    tags: ["Web開発"],
    title: "React 19の新機能完全ガイド",
    date: new Date(),
    thumbnailUrl: "https://picsum.photos/id/10/2500/1667",
  },
};
