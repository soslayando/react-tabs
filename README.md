# react-tabs

An accessible, reusable **Tabs** component (with a **Badge** subcomponent) built as
a design-system building block. React + TypeScript, styling in SCSS Modules written
from scratch. Each component ships a rich **Storybook Docs page** (MDX) with usage
guidance, an accessibility reference, design-decision notes and a live playground.

## Install and run

Requires Node `>=24` and `pnpm`.

```bash
pnpm install

pnpm storybook   # primary showcase at http://localhost:6006
pnpm dev         # minimal demo page (Vite)
pnpm test        # unit + accessibility tests (Vitest + Testing Library)
pnpm check       # Biome lint + format
pnpm tsc         # type-check
```

## What it implements

Following the brief's acceptance criteria:

- **Variants** — `pill` and `underline`, in two sizes (`md` desktop, `sm` mobile).
- **Badge via the Tab API** — `<Tabs.Tab badge={...}>` renders any node after the label.
- **Badge variants** — `neutral` | `positive` | `negative`.

## Usage

```tsx
import { Tabs, Badge } from "./components";

<Tabs variant="pill" defaultActiveId="overview">
  <Tabs.List aria-label="Account sections">
    <Tabs.Tab id="overview">Overview</Tabs.Tab>
    <Tabs.Tab id="activity" badge={<Badge variant="positive">3</Badge>}>
      Activity
    </Tabs.Tab>
    <Tabs.Tab id="settings" disabled>
      Settings
    </Tabs.Tab>
  </Tabs.List>

  <Tabs.Panel tabId="overview">Overview content</Tabs.Panel>
  <Tabs.Panel tabId="activity">Activity content</Tabs.Panel>
  <Tabs.Panel tabId="settings">Settings content</Tabs.Panel>
</Tabs>;
```

`Tabs` is **uncontrolled by default** (`defaultActiveId`, falling back to the first
enabled tab) and can be **controlled** with `activeId` + `onActiveChange`.

## Public API

### `<Tabs>`

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `"pill" \| "underline"` | `"pill"` | Visual style |
| `size` | `"md" \| "sm"` | `"md"` | `md` desktop, `sm` mobile |
| `activeId` | `string` | – | Controlled active tab id |
| `defaultActiveId` | `string` | first enabled tab | Uncontrolled initial tab |
| `onActiveChange` | `(id: string) => void` | – | Fires on every change |

### `<Tabs.Tab>`

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `id` | `string` | – (required) | Links the tab to its panel |
| `badge` | `React.ReactNode` | – | Rendered after the label |
| `disabled` | `boolean` | `false` | Skipped by keyboard nav |

### `<Tabs.Panel>`

| Prop | Type | Notes |
| --- | --- | --- |
| `tabId` | `string` | Must match a `<Tabs.Tab id>` |

### `<Badge>`

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"neutral" \| "positive" \| "negative"` | `"neutral"` |
| `size` | `"md" \| "sm"` | `"md"` |

## Accessibility

Implements the [WAI-ARIA Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/):

- `role="tablist"` / `role="tab"` / `role="tabpanel"` with `aria-selected`,
  `aria-controls` and `aria-labelledby` wired via stable `useId` ids.
- **Roving tabindex**: only the active tab is in the tab order; the rest are
  reached with **Arrow keys**, plus **Home**/**End** (with wrap-around).
- Automatic activation on focus; disabled tabs are skipped.
- Focus is shown with `:focus-visible` only, matching the design's focus ring.

## Architecture

The folder layout follows a consistent component style: a folder per component
with an `index.ts` barrel, `declarations.ts` (`I*` interfaces + `T*` unions),
`helpers.ts`, `context.ts`, `hooks/` and nested `components/`; compound components
assembled with the `Internal* as typeof Internal* & { ... }` cast plus per-part
`displayName`.

```
src/
  components/
    Badge/            Badge.tsx · Badge.module.scss · declarations.ts · stories · docs (mdx) · test
    Tabs/
      Tabs.tsx        compound root, controlled/uncontrolled state
      context.ts      shared state + presentation
      declarations.ts types
      helpers.ts      id builders + first-enabled-tab lookup
      hooks/          useTabsKeyboard (arrow/home/end)
      components/     Tab · TabList · TabPanel
      Tabs.stories.tsx / Tabs.mdx  stories + rich Docs page
  styles/
    design-tokens.css themeable tokens as CSS custom properties (from Figma)
    _tokens.scss      SCSS aliases → var(--*) + calc() derivations
  utils/cx.ts         className joiner
```

### Notable choices

- **SCSS Modules instead of a CSS framework.** The brief forbids CSS frameworks
  and asks for CSS written from scratch; `sass` ships in the base repo. Variants
  are driven by `data-*` attributes styled with attribute selectors.
- **Two-layer tokens.** Values live as CSS custom properties in `design-tokens.css`
  (runtime-themeable — dark mode, density, per-instance overrides need no rebuild);
  `_tokens.scss` only aliases them to SCSS variables so component styles stay terse
  while emitting `var(--*)`. Derived values (e.g. the badge `min-width`) use `calc()`
  so they recompute at runtime when a token is re-themed.
- **Primitive → semantic spacing.** A base t-shirt scale (`--spacing-3xs` … `--spacing-xl`,
  base-4 from Figma) is the single source; the semantic gap/padding tokens
  (`--tab-content-gap`, `--tablist-gap-*`, `--badge-padding-*`) reference it, so the
  whole layout rescales from one place.
- **Self-contained state and a11y.** `Tabs` owns the active state, ships integrated
  keyboard navigation, and renders real `tabpanel`s for full accessibility — the
  consumer only declares the structure.
- **Standard roving tabindex** (active tab = `0`).

## Design fidelity

All colors, sizes, spacing and typography come from the Figma file; see
[`src/styles/design-tokens.css`](src/styles/design-tokens.css) for the annotated values.
Three things are intentionally **not** from the design and are flagged in code:
transition timing (a tasteful default), the `disabled` state (added for
design-system completeness — the design has no disabled tab), and the badge
`min-width` (keeps short content from looking squashed; derived from the tokens).
