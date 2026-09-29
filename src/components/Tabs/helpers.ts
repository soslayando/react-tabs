import React from "react";
import { Tab } from "./components/Tab";

/** Builds the DOM id for a tab trigger. */
export const buildTabDomId = (baseId: string, id: string): string => `${baseId}-tab-${id}`;

/** Builds the DOM id for a tab panel. */
export const buildPanelDomId = (baseId: string, id: string): string => `${baseId}-panel-${id}`;

/**
 * Walks the children tree to find the id of the first enabled `<Tabs.Tab>`.
 * Used to pick a sensible initial active tab when the consumer does not
 * provide `defaultActiveId`/`activeId`.
 */
export function getFirstEnabledTabId(children: React.ReactNode): string | undefined {
  let found: string | undefined;

  const walk = (nodes: React.ReactNode): void => {
    React.Children.forEach(nodes, (child) => {
      if (found || !React.isValidElement(child)) return;

      if (child.type === Tab) {
        const { id, disabled } = child.props as { id: string; disabled?: boolean };
        if (!disabled) {
          found = id;
          return;
        }
      }

      const nested = (child.props as { children?: React.ReactNode }).children;
      if (nested) walk(nested);
    });
  };

  walk(children);
  return found;
}
