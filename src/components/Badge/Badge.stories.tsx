import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Badge", variant: "neutral", size: "md" },
  argTypes: {
    variant: { control: "inline-radio", options: ["neutral", "positive", "negative"] },
    size: { control: "inline-radio", options: ["md", "sm"] },
    children: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Neutral: Story = { args: { variant: "neutral", children: "Draft" } };
export const Positive: Story = { args: { variant: "positive", children: "New" } };
export const Negative: Story = { args: { variant: "negative", children: "3" } };

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Badge {...args} variant="neutral">
        Neutral
      </Badge>
      <Badge {...args} variant="positive">
        Positive
      </Badge>
      <Badge {...args} variant="negative">
        Negative
      </Badge>
    </div>
  ),
};
