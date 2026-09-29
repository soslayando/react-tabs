import React from "react";
import { cx } from "../../../../utils/cx";
import { useTabsContext } from "../../context";
import { useTabsKeyboard } from "../../hooks";
import styles from "../../Tabs.module.scss";

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible label for the tablist. Provide this or `aria-labelledby`. */
  "aria-label"?: string;
  children: React.ReactNode;
}

const InternalTabList = React.forwardRef<HTMLDivElement, TabListProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    const { variant, size, selectTab } = useTabsContext();
    const innerRef = React.useRef<HTMLDivElement | null>(null);

    // Keep both the internal ref (for keyboard queries) and the forwarded ref.
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef],
    );

    const onKeyDown = useTabsKeyboard({ listRef: innerRef, onActivate: selectTab });

    return (
      <div
        {...restProps}
        ref={setRefs}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className={cx(styles.tablist, className)}
        data-variant={variant}
        data-size={size}
      >
        {children}
      </div>
    );
  },
);

InternalTabList.displayName = "Tabs.List";

export const TabList = InternalTabList;
