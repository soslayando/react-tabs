import React from "react";
import { cx } from "../../utils/cx";
import { Tab } from "./components/Tab";
import { TabList } from "./components/TabList";
import { TabPanel } from "./components/TabPanel";
import { TabsContext, type TabsContextValue } from "./context";
import type { TabsProps } from "./declarations";
import { buildPanelDomId, buildTabDomId, getFirstEnabledTabId } from "./helpers";
import styles from "./Tabs.module.scss";

const InternalTabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      variant = "pill",
      size = "md",
      activeId: controlledActiveId,
      defaultActiveId,
      onActiveChange,
      className,
      children,
      ...restProps
    },
    ref,
  ) => {
    const reactId = React.useId();
    // useId returns ":r0:"-style ids; strip the colons so the value is a valid
    // id fragment for tab/panel DOM ids.
    const baseId = React.useMemo(() => `tabs-${reactId.replace(/:/g, "")}`, [reactId]);

    const isControlled = controlledActiveId !== undefined;
    const [uncontrolledActiveId, setUncontrolledActiveId] = React.useState<string | undefined>(
      () => defaultActiveId ?? getFirstEnabledTabId(children),
    );
    const activeId = isControlled ? controlledActiveId : uncontrolledActiveId;

    const selectTab = React.useCallback(
      (id: string) => {
        if (!isControlled) setUncontrolledActiveId(id);
        onActiveChange?.(id);
      },
      [isControlled, onActiveChange],
    );

    const contextValue = React.useMemo<TabsContextValue>(
      () => ({
        baseId,
        variant,
        size,
        activeId,
        selectTab,
        getTabDomId: (id) => buildTabDomId(baseId, id),
        getPanelDomId: (id) => buildPanelDomId(baseId, id),
      }),
      [baseId, variant, size, activeId, selectTab],
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          {...restProps}
          ref={ref}
          className={cx(styles.tabs, className)}
          data-variant={variant}
          data-size={size}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);

InternalTabs.displayName = "Tabs";

/**
 * Tabs — an accessible, reusable tabs component.
 *
 * Compound API:
 * - `<Tabs>` owns the active-tab state (controlled via `activeId` or
 *   uncontrolled via `defaultActiveId`).
 * - `<Tabs.List>` is the `role="tablist"` container with arrow-key navigation.
 * - `<Tabs.Tab>` is a `role="tab"` trigger that accepts a `badge`.
 * - `<Tabs.Panel>` is the `role="tabpanel"` content, wired via aria attributes.
 */
export const Tabs = InternalTabs as typeof InternalTabs & {
  List: typeof TabList;
  Tab: typeof Tab;
  Panel: typeof TabPanel;
};

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
