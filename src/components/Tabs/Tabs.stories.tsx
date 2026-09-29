import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Badge } from "../Badge";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  subcomponents: { "Tabs.List": Tabs.List, "Tabs.Tab": Tabs.Tab, "Tabs.Panel": Tabs.Panel },
  args: { variant: "pill", size: "md", defaultActiveId: "overview" },
  argTypes: {
    variant: { control: "inline-radio", options: ["pill", "underline"] },
    size: { control: "inline-radio", options: ["md", "sm"] },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const panelStyle: React.CSSProperties = { padding: "8px 4px", fontSize: 14, color: "#1b2134" };

const Demo: Story["render"] = (args) => (
  <Tabs {...args}>
    <Tabs.List aria-label="Account sections">
      <Tabs.Tab id="overview">Overview</Tabs.Tab>
      <Tabs.Tab
        id="activity"
        badge={
          <Badge variant="positive" size={args.size}>
            3
          </Badge>
        }
      >
        Activity
      </Tabs.Tab>
      <Tabs.Tab
        id="reports"
        badge={
          <Badge variant="negative" size={args.size}>
            !
          </Badge>
        }
      >
        Reports
      </Tabs.Tab>
      <Tabs.Tab id="settings" disabled>
        Settings
      </Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel tabId="overview" style={panelStyle}>
      Overview content
    </Tabs.Panel>
    <Tabs.Panel tabId="activity" style={panelStyle}>
      Activity content
    </Tabs.Panel>
    <Tabs.Panel tabId="reports" style={panelStyle}>
      Reports content
    </Tabs.Panel>
    <Tabs.Panel tabId="settings" style={panelStyle}>
      Settings content
    </Tabs.Panel>
  </Tabs>
);

export const Pill: Story = { render: Demo, args: { variant: "pill", size: "md" } };

export const Underline: Story = { render: Demo, args: { variant: "underline", size: "md" } };

export const Mobile: Story = { render: Demo, args: { variant: "pill", size: "sm" } };

export const WithBadges: Story = { render: Demo, args: { variant: "underline", size: "md" } };

export const Controlled: Story = {
  render: (args) => {
    const [active, setActive] = React.useState("overview");
    return (
      <Tabs {...args} activeId={active} onActiveChange={setActive}>
        <Tabs.List aria-label="Controlled sections">
          <Tabs.Tab id="overview">Overview</Tabs.Tab>
          <Tabs.Tab id="activity">Activity</Tabs.Tab>
          <Tabs.Tab id="reports">Reports</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel tabId="overview" style={panelStyle}>
          Active tab id: <strong>{active}</strong>
        </Tabs.Panel>
        <Tabs.Panel tabId="activity" style={panelStyle}>
          Active tab id: <strong>{active}</strong>
        </Tabs.Panel>
        <Tabs.Panel tabId="reports" style={panelStyle}>
          Active tab id: <strong>{active}</strong>
        </Tabs.Panel>
      </Tabs>
    );
  },
  args: { variant: "pill", size: "md" },
};

/** Live playground — tweak the controls to update the component in real time. */
export const Playground: Story = { render: Demo, args: { variant: "pill", size: "md" } };
