
import { Globals } from "@storybook/types";
import * as options from "./options";

/** Recursively process CSS and transform media queries based on feature flags. */
export function processCSS(
  containers,
  features,
) {
  for (const target of containers) {
    if (target instanceof CSSMediaRule) {
      /** Initial value, regardless of present transformations. */
      let initialMediaText = getMediaText(target);

      /** Current value, to be transformed */
      let currentMediaText = initialMediaText;

      let feature;
      for (feature in features) {
        const value = features[feature];

        // only transform conditions when a feature is defined and detected
        if (value !== undefined && currentMediaText.includes(feature)) {
          // replace boolean uses of the feature
          // @ts-expect-error idk
          for (const alternate of options.features[feature]) {
            if (value === alternate) {
              currentMediaText = currentMediaText.replace(
                `(${feature}: ${alternate})`,
                "all"
              );
            } else {
              currentMediaText = currentMediaText.replace(
                `(${feature}: ${alternate})`,
                "not all"
              );
            }
          }

          // replace boolean uses of the feature
          currentMediaText = currentMediaText.replace(
            `(${feature})`,
            value === "no-preference" ? "not all" : "all"
          );
        }
      }

      // update the media text if the value has changed
      if (currentMediaText !== target.media.mediaText) {
        console.log(1)
        target.media.mediaText = currentMediaText;
      }
    } else if ("cssRules" in target) {
      processCSS(target.cssRules, features);
    }
  }
}

/** Returns the initial text of a Media Rule, regardless of transformations. */
const getMediaText = (target) => {
  let conditionText = conditionTextMap.get(target);

  if (conditionText) return conditionText;

  conditionTextMap.set(target, (conditionText = target.media.mediaText));

  return conditionText;
};

/** WeakMap used to store initial text of Media Rules. */
const conditionTextMap = new WeakMap<CSSRule, string>();

export type CSSContainer = CSSStyleSheet | CSSMediaRule | CSSRule;