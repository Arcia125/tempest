import { getCssPropertyValue } from './utils';

const colors = {
  background: getCssPropertyValue('--background'),
  fg0: getCssPropertyValue('--fg0'),
  fg1: getCssPropertyValue('--fg1'),
  text: getCssPropertyValue('--text'),
  accent0: getCssPropertyValue('--accent0'),
  accent4: getCssPropertyValue('--accent4'),
  important0: getCssPropertyValue('--important0'),
  important4: getCssPropertyValue('--important4'),
  success0: getCssPropertyValue('--success0'),
};

export const theme = {
  colors,
}
