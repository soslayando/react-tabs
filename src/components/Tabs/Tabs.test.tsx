import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type React from "react";
import { vi } from "vitest";
import { Badge } from "../Badge";
import { Tabs } from "./Tabs";

function renderTabs(props?: Partial<React.ComponentProps<typeof Tabs>>) {
  return render(
    <Tabs defaultActiveId="a" {...props}>
      <Tabs.List aria-label="Sections">
        <Tabs.Tab id="a">First</Tabs.Tab>
        <Tabs.Tab id="b" badge={<Badge variant="positive">2</Badge>}>
          Second
        </Tabs.Tab>
        <Tabs.Tab id="c" disabled>
          Third
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel tabId="a">Panel A</Tabs.Panel>
      <Tabs.Panel tabId="b">Panel B</Tabs.Panel>
      <Tabs.Panel tabId="c">Panel C</Tabs.Panel>
    </Tabs>,
  );
}

describe("Tabs", () => {
  it("renders a labelled tablist and shows the active panel", () => {
    renderTabs();
    expect(screen.getByRole("tablist", { name: "Sections" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "First" })).toHaveTextContent("Panel A");
  });

  it("wires each tab to its panel via aria attributes", () => {
    renderTabs();
    const tab = screen.getByRole("tab", { name: "First" });
    const panel = screen.getByRole("tabpanel", { name: "First" });
    expect(tab).toHaveAttribute("aria-controls", panel.id);
    expect(panel).toHaveAttribute("aria-labelledby", tab.id);
  });

  it("switches the active panel on click", async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole("tab", { name: /Second/ }));
    expect(screen.getByRole("tab", { name: /Second/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: /Second/ })).toHaveTextContent("Panel B");
  });

  it("navigates with arrow keys and skips disabled tabs", async () => {
    const user = userEvent.setup();
    renderTabs();
    const first = screen.getByRole("tab", { name: "First" });
    first.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: /Second/ })).toHaveFocus();
    // Next enabled after "Second" wraps around to "First" (disabled "Third" is skipped).
    await user.keyboard("{ArrowRight}");
    expect(first).toHaveFocus();
  });

  it("applies roving tabindex", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("tab", { name: /Second/ })).toHaveAttribute("tabindex", "-1");
  });

  it("supports controlled mode via activeId + onActiveChange", async () => {
    const user = userEvent.setup();
    const onActiveChange = vi.fn();
    renderTabs({ activeId: "a", onActiveChange });
    await user.click(screen.getByRole("tab", { name: /Second/ }));
    expect(onActiveChange).toHaveBeenCalledWith("b");
    // Still controlled by the parent, which has not updated activeId.
    expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute("aria-selected", "true");
  });
});
