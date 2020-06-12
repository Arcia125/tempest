import getCssPropertyValue from './getCssPropertyValue';

const colors = {
  richBlack: getCssPropertyValue('--rich-black'),
  gunmetal: getCssPropertyValue('--gunmetal'),
  charcoal: getCssPropertyValue('--charcoal'),
  eggshell: getCssPropertyValue('--eggshell'),
  babyBlue: getCssPropertyValue('--baby-blue'),
  blizzardBlue: getCssPropertyValue('--blizzard-blue'),
  peach: getCssPropertyValue('--peach'),
};

export const theme = {
  colors,
}
