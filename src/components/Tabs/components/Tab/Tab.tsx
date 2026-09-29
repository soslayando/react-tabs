import React from "react";
import { cx } from "../../../../utils/cx";
import { useTabsContext } from "../../context";
import type { TabProps } from "./declarations";
import styles from "./Tab.module.scss";

const InternalTab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ id, badge, disabled = false, className, children, onClick, ...restProps }, ref) => {
    const { variant, size, activeId, selectTab, getTabDomId, getPanelDomId } = useTabsContext();
    const selected = activeId === id;

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        selectTab(id);
        onClick?.(event);
      },
      [disabled, id, onClick, selectTab],
    );

    return (
      <button
        {...restProps}
        ref={ref}
        type="button"
        role="tab"
        id={getTabDomId(id)}
        data-tab-id={id}
        aria-selected={selected}
        aria-controls={getPanelDomId(id)}
        aria-disabled={disabled || undefined}
        // Roving tabindex: only the active tab is reachable with Tab; the rest
        // are reached with the arrow keys.
        tabIndex={selected ? 0 : -1}
        disabled={disabled}
        onClick={handleClick}
        className={cx(styles.tab, className)}
        data-variant={variant}
        data-size={size}
        data-selected={selected || undefined}
      >
        <span className={styles.content}>
          <span className={styles.label}>{children}</span>
          {badge != null && <span className={styles.badge}>{badge}</span>}
        </span>
      </button>
    );
  },
);

InternalTab.displayName = "Tabs.Tab";

/** A single tab trigger. Memoized to avoid re-rendering the whole row on select. */
export const Tab = React.memo(InternalTab);
