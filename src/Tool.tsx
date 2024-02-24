import React, { memo } from 'react';
import * as options from "./options";
import type { WithHideFn } from "./types";
import { useGlobals, useStorybookApi } from '@storybook/manager-api';
import { IconButton, WithTooltip } from '@storybook/components';
import { ADDON_ID, PARAM_KEY, TOOL_ID } from './constants';
import { TooltipList } from "./components/TooltipList";
import { Globals } from '@storybook/types';

export const Tool = memo(function MyAddonSelector() {
  const [globals, updateGlobals] = useGlobals();

  const toggle = 
    (id: keyof Globals, value: Globals[typeof id]) =>
      updateGlobals({
        [id]: value ? value : undefined,
      });

  const createItems = ({ onHide }: WithHideFn) =>
    options.keys.map((id) => ({
      id,
      title: id,
      right: (
        <select
          defaultValue={globals[id]}
          onChange={(event) => {
            onHide();
            toggle(id, event.currentTarget.value);
          }}
        >
          <option value="">{options.defaultOption}</option>
          {Object.values(options.features[id]).map((option) => (
            <option value={option} key={option}>{option}</option>
          ))}
        </select>
      ),
    }));

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={(props) => <TooltipList items={createItems(props)} />}
    >
      <IconButton key={TOOL_ID} title={options.title}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={{
          width: '16px',
          height: '16px',
        }}>
          <path fillRule="evenodd" d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm4.78 1.97a.75.75 0 0 1 0 1.06L5.81 8l.97.97a.75.75 0 1 1-1.06 1.06l-1.5-1.5a.75.75 0 0 1 0-1.06l1.5-1.5a.75.75 0 0 1 1.06 0Zm2.44 1.06a.75.75 0 0 1 1.06-1.06l1.5 1.5a.75.75 0 0 1 0 1.06l-1.5 1.5a.75.75 0 1 1-1.06-1.06l.97-.97-.97-.97Z" clipRule="evenodd" />
        </svg>
      </IconButton>
    </WithTooltip>
  );
});