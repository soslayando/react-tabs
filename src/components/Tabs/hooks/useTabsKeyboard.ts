import React from "react";

/** Only enabled tabs participate in keyboard navigation. */
const ENABLED_TAB_SELECTOR = '[role="tab"]:not([aria-disabled="true"])';

export interface UseTabsKeyboardParams {
  /** Ref to the element carrying `role="tablist"`. */
  listRef: React.RefObject<HTMLDivElement | null>;
  /** Called with the id of the tab that should become active. */
  onActivate: (id: string) => void;
}

/**
 * WAI-ARIA keyboard navigation for a horizontal tablist:
 * ArrowRight/ArrowLeft move (with wrap-around), Home/End jump to the edges.
 * Uses automatic activation: moving focus also activates the tab, which is
 * the recommended pattern when switching tabs is cheap.
 */
export function useTabsKeyboard({ listRef, onActivate }: UseTabsKeyboardParams) {
  return React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const handledKeys = ["ArrowRight", "ArrowLeft", "Home", "End"];
      if (!handledKeys.includes(event.key)) return;

      const list = listRef.current;
      if (!list) return;

      const tabs = Array.from(list.querySelectorAll<HTMLElement>(ENABLED_TAB_SELECTOR));
      if (tabs.length === 0) return;

      const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
      let nextIndex = currentIndex;

      switch (event.key) {
        case "ArrowRight":
          nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % tabs.length;
          break;
        case "ArrowLeft":
          nextIndex = currentIndex <= 0 ? tabs.length - 1 : currentIndex - 1;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = tabs.length - 1;
          break;
      }

      event.preventDefault();
      const nextTab = tabs[nextIndex];
      nextTab.focus();

      const nextId = nextTab.dataset.tabId;
      if (nextId) onActivate(nextId);
    },
    [listRef, onActivate],
  );
}
