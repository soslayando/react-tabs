import type React from "react";

/** Domain options owned by a single Tab. */
export interface ITab {
  /** Unique id within the Tabs group. Links the tab to its `<Tabs.Panel>`. */
  id: string;
  /** Optional node rendered after the label — typically a `<Badge>`. */
  badge?: React.ReactNode;
  /**
   * Disables the tab. Not part of the Figma design; added for design-system
   * completeness. Disabled tabs are skipped by keyboard navigation.
   */
  disabled?: boolean;
}

export interface TabProps
  extends ITab,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "id" | "type"> {
  /** The tab label. */
  children: React.ReactNode;
}
