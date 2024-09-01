# Storybook Addon Render Modes

This addon adds the ability to emulate user CSS rendering preferences such as `prefers-reduced-motion` and others.
This addon has support for Storybook v8+

<img width="682" alt="image" src="https://github.com/mnik01/rendering-modes/assets/39025497/d2d0662d-02b8-49c2-a21d-0cf3e157899f">

> Initially fork of [storybook-addon-css-user-prefs](https://github.com/jonathantneal/storybook-addon-css-user-prefs) to support sb@^8.0.0
> And it's also a replacement for [@jeysal/storybook-addon-css-user-preferences](https://www.npmjs.com/package/@jeysal/storybook-addon-css-user-preferences)

List of supported modes:
- prefers-color-scheme
- prefers-contrast
- prefers-reduced-data
- prefers-reduced-motion
- prefers-reduced-transparency
- ~~print~~ (todo)
- ~~noscript~~ (todo)


## Installation

1. Package installation
`pnpm add -D storybook-addon-render-modes`

2. Addon registration
```ts
const config: StorybookConfig = {
  // ...yourOtherSettings
  addons: [
    'storybook-addon-render-modes',
  ],
};

export default config;
```

## Caveats

This addon doesnt force changing of rendering mode in browser level (seems impossible).
But instead it uses hacky approach: we go through `document.styleSheets` via JS and manually rewriting media style rules.

This approach may work not as expected in some cases. Feel fre to create an issue for such cases.
