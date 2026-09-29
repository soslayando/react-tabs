import type React from "react";
import type { TTabsSize, TTabsVariant } from "./components";
import { Badge, Tabs } from "./components";

const panelStyle: React.CSSProperties = {
  padding: "16px 4px",
  fontSize: 14,
  lineHeight: 1.5,
  color: "#1b2134",
};

function Showcase({ variant, size }: { variant: TTabsVariant; size: TTabsSize }) {
  return (
    <Tabs variant={variant} size={size} defaultActiveId="overview">
      <Tabs.List aria-label={`${variant} tabs`}>
        <Tabs.Tab id="overview">Overview</Tabs.Tab>
        <Tabs.Tab
          id="activity"
          badge={
            <Badge variant="positive" size={size}>
              3
            </Badge>
          }
        >
          Activity
        </Tabs.Tab>
        <Tabs.Tab
          id="reports"
          badge={
            <Badge variant="negative" size={size}>
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
        Overview content — switch tabs with the mouse or the arrow keys.
      </Tabs.Panel>
      <Tabs.Panel tabId="activity" style={panelStyle}>
        Activity content.
      </Tabs.Panel>
      <Tabs.Panel tabId="reports" style={panelStyle}>
        Reports content.
      </Tabs.Panel>
      <Tabs.Panel tabId="settings" style={panelStyle}>
        Settings content.
      </Tabs.Panel>
    </Tabs>
  );
}

export function App() {
  return (
    <main
      style={{
        fontFamily: '"Inter", sans-serif',
        color: "#1b2134",
        maxWidth: 720,
        margin: "0 auto",
        padding: "48px 24px",
        display: "grid",
        gap: 40,
      }}
    >
      <header style={{ display: "grid", gap: 4 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>react-tabs</h1>
        <p style={{ margin: 0, fontSize: 14, color: "#595d6a" }}>
          Storybook is the primary showcase — run <code>pnpm storybook</code>.
        </p>
      </header>

      <section style={{ display: "grid", gap: 8 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Pill</h2>
        <Showcase variant="pill" size="md" />
      </section>

      <section style={{ display: "grid", gap: 8 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Underline</h2>
        <Showcase variant="underline" size="md" />
      </section>
    </main>
  );
}
