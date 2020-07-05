import { getCssPropertyValue } from './utils';

const colors = {
  richBlack: getCssPropertyValue('--rich-black'),
  gunmetal: getCssPropertyValue('--gunmetal'),
  charcoal: getCssPropertyValue('--charcoal'),
  eggshell: getCssPropertyValue('--eggshell'),
  babyBlue: getCssPropertyValue('--baby-blue'),
  blizzardBlue: getCssPropertyValue('--blizzard-blue'),
  peach: getCssPropertyValue('--peach'),
  grannySmithApple: getCssPropertyValue('--granny-smith-apple'),
};

export const theme = {
  colors,
}
