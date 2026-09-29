import React from "react";
import { cx } from "../../../../utils/cx";
import { useTabsContext } from "../../context";
import styles from "../../Tabs.module.scss";

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Id of the tab this panel is controlled by (matches `<Tabs.Tab id>`). */
  tabId: string;
  children: React.ReactNode;
}

const InternalTabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ tabId, className, children, ...restProps }, ref) => {
    const { activeId, getTabDomId, getPanelDomId } = useTabsContext();
    const selected = activeId === tabId;

    return (
      <div
        {...restProps}
        ref={ref}
        role="tabpanel"
        id={getPanelDomId(tabId)}
        aria-labelledby={getTabDomId(tabId)}
        hidden={!selected}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a tabpanel is intentionally focusable (tabindex=0) so keyboard users can reach panel content that has no focusable children — per the WAI-ARIA APG tabs pattern.
        tabIndex={0}
        className={cx(styles.panel, className)}
      >
        {/* Only render the active panel's children to avoid mounting hidden trees. */}
        {selected ? children : null}
      </div>
    );
  },
);

InternalTabPanel.displayName = "Tabs.Panel";

export const TabPanel = InternalTabPanel;
