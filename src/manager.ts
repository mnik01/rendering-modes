import { addons, types } from '@storybook/manager-api';
import { ADDON_ID, TOOL_ID } from './constants';
import { Tool } from './Tool';

// @ts-expect-error idk why deprecated
addons.register(ADDON_ID, () => addons.add(TOOL_ID, {
  type: types.TOOL,
  title: 'storybook-addon-render-modes',
  match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
  render: Tool,
}));