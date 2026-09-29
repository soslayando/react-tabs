import type React from "react";

/** Visual style of the whole Tabs group. */
export type TTabsVariant = "pill" | "underline";

/** Size scale. `md` matches the desktop design, `sm` the mobile one. */
export type TTabsSize = "md" | "sm";

/** Presentation options shared with children through context. */
export interface ITabs {
  /** Visual style. @default "pill" */
  variant?: TTabsVariant;
  /** Size scale. @default "md" */
  size?: TTabsSize;
}

export interface TabsProps extends ITabs, Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Controlled active tab id. When set, the component is controlled. */
  activeId?: string;
  /**
   * Uncontrolled initial active tab id. Ignored when `activeId` is provided.
   * Falls back to the first enabled tab when omitted.
   */
  defaultActiveId?: string;
  /** Called with the new tab id whenever the active tab changes. */
  onActiveChange?: (id: string) => void;
  children: React.ReactNode;
}
