import React from "react";
import { cx } from "../../utils/cx";
import styles from "./Badge.module.scss";
import type { BadgeProps } from "./declarations";

const InternalBadge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "neutral", size = "md", className, children, ...restProps }, ref) => {
    return (
      <span
        {...restProps}
        ref={ref}
        className={cx(styles.badge, className)}
        data-variant={variant}
        data-size={size}
      >
        {children}
      </span>
    );
  },
);

InternalBadge.displayName = "Badge";

/**
 * Badge — a small, non-interactive status/count chip.
 *
 * Memoized because badges are frequently rendered inside lists of tabs and
 * their props rarely change between renders.
 */
export const Badge = React.memo(InternalBadge);
