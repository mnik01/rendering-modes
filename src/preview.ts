import * as options from "./options";
/**
 * A decorator is a way to wrap a story in extra “rendering” functionality. Many addons define decorators
 * in order to augment stories:
 * - with extra rendering
 * - gather details about how a story is rendered
 *
 * When writing stories, decorators are typically used to wrap stories with extra markup or context mocking.
 *
 * https://storybook.js.org/docs/react/writing-stories/decorators
 */
import type { Renderer, ProjectAnnotations, GlobalTypes } from "storybook/internal/types";
import { PARAM_KEY } from "./constants";
import { withGlobals } from "./withGlobals";
import { withRoundTrip } from "./withRoundTrip";

/**
 * Note: if you want to use JSX in this file, rename it to `preview.tsx`
 * and update the entry prop in tsup.config.ts to use "src/preview.tsx",
 */

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withGlobals, withRoundTrip],
  initialGlobals: {
    [PARAM_KEY]: false,
  },
};

export default preview;

export const globalTypes = Object.entries(options.features).reduce(
  (globalTypes: GlobalTypes, [name, value]) =>
    Object.assign(globalTypes, {
      [name]: {
        name,
        type: {
          name: "enum",
          value,
        },
      },
    } as unknown as GlobalTypes),
  {}
);