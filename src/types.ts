import type { WithTooltip } from "storybook/internal/components";

export type WithHideFn = Parameters<
  Extract<Parameters<typeof WithTooltip>[0]["tooltip"], Function>
>[0];