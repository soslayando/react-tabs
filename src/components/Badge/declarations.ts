import type React from "react";

/** Visual tone of the Badge, mapped to the design's background colors. */
export type TBadgeVariant = "neutral" | "positive" | "negative";

/** Badge size. `md` matches desktop tabs, `sm` matches mobile tabs. */
export type TBadgeSize = "md" | "sm";

/** Domain options owned by the Badge component. */
export interface IBadge {
  /** Visual tone. @default "neutral" */
  variant?: TBadgeVariant;
  /** Size scale. @default "md" */
  size?: TBadgeSize;
}

export interface BadgeProps extends IBadge, Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  /** Short content — usually a count or a 1-2 char label. */
  children: React.ReactNode;
}
