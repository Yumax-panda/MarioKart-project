import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Editor } from "./Editor";

const meta = {
  component: Editor,
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    initialMarkdown: "# Editor \n```javascript\nconst app = new Hono();\n```",
    onSave: () => alert("saved!"),
  },
};
