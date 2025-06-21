import type { Renderer, PartialStoryFn as StoryFunction, StoryContext, Globals } from 'storybook/internal/types';
import { processCSS } from "./processCSS";
import { useEffect, useGlobals } from 'storybook/preview-api';
import { PARAM_KEY } from './constants';

export const withGlobals = (StoryFn: StoryFunction<Renderer>, context: StoryContext<Renderer>) => {
  const [globals, updateGlobals] = useGlobals();

  const isActive = [true, 'true'].includes(globals[PARAM_KEY]);

  // Is the addon being used in the docs panel
  const isInDocs = context.viewMode === 'docs';

  // apply user parameter overrides
  const overrides = Object.assign({}, context.parameters[PARAM_KEY]) as Globals
  let feature: keyof Globals;
  for (feature in overrides) {
    if (globals[feature] === undefined && overrides[feature] !== undefined) {
      updateGlobals(overrides)
      break
    }
  }


  useEffect(() => {
    processCSS(document.styleSheets, globals);
  }, Object.values(globals));

  return StoryFn();
};