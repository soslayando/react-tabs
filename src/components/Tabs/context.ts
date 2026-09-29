import { createContext, useContext } from "react";
import type { TTabsSize, TTabsVariant } from "./declarations";

/**
 * Shared state and presentation flags passed from `<Tabs>` down to its
 * children. Consumers never build this by hand — it is created by `<Tabs>`.
 */
export interface TabsContextValue {
  /** Stable prefix used to build tab/panel DOM ids. */
  baseId: string;
  variant: TTabsVariant;
  size: TTabsSize;
  /** Currently active tab id (undefined until one is selected). */
  activeId: string | undefined;
  /** Activates a tab by id. */
  selectTab: (id: string) => void;
  /** Builds the DOM id for a tab trigger. */
  getTabDomId: (id: string) => string;
  /** Builds the DOM id for a tab panel. */
  getPanelDomId: (id: string) => string;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

/** Reads the Tabs context, throwing a helpful error when used outside `<Tabs>`. */
export function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs.List, Tabs.Tab and Tabs.Panel must be used inside a <Tabs> component.");
  }
  return context;
}
