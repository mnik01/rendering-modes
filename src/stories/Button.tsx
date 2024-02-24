import React from 'react';
import './button.css';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  console.log()
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  
  const hasRuleWithMedia = (sheet: CSSStyleSheet): boolean => {
    const rules = Array.from(sheet?.cssRules);
    // @ts-expect-error 
    return rules.some(r => r?.media);
  }
  
  const handleClick = () => {
    const allSheets = Array.from(document.styleSheets);
    const sheetsWithMedia = allSheets.filter(hasRuleWithMedia);
    
    // Extract media objects from each stylesheet with media rules
    const medias: MediaList[] = sheetsWithMedia.flatMap(sheet => {
      return Array.from(
        sheet.cssRules,
        // @ts-expect-error 
    rule => rule.type === CSSRule.MEDIA_RULE ? rule.media : undefined
  );
}).filter(Boolean);


    const toggleMotionMedia = () => {
      const reduced: MediaList[] = [];
      const safed: MediaList[] = [];

      medias.forEach(m => {
        if (m.mediaText === '(prefers-reduced-motion: no-preference)') {
            safed.push(m);
          } else if (m.mediaText === '(prefers-reduced-motion: reduce)') {
          reduced.push(m);
        }
      });
        
      safed.forEach(m => {
        m.mediaText = '(prefers-reduced-motion: reduce)'
      });
      reduced.forEach(m => {
        m.mediaText = '(prefers-reduced-motion: no-preference)'
      });
    }
    toggleMotionMedia();
  }
  return (
    <button
      onClick={handleClick}
      type="button"
      className={['motion-safe:animate-pulse', 'storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={{ backgroundColor }}
    >
      {label}
    </button>
  );
};
