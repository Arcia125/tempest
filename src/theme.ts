import getCssPropertyValue from './getCssPropertyValue';

const colors = {
  richBlack: getCssPropertyValue('--rich-black'),
  gunmetal: getCssPropertyValue('--gunmetal'),
  charcoal: getCssPropertyValue('--charcoal'),
  eggshell: getCssPropertyValue('--eggshell'),
  babyBlue: getCssPropertyValue('--baby-blue'),
  peach: getCssPropertyValue('--peach'),
};

console.log(colors);

export const theme = {
  colors,
}
