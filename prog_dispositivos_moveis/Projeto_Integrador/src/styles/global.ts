import { lighten, shade } from 'polished';

export const colors = {
  primaryColor: '#346FEF',
  inputEnabledBackground: lighten(0.2, '#346FEF'),
  inputEnabledBorder: '#346FEF',
  inputDisabledBackground: lighten(0.2, '#999591'),
  inputDisabledBorder: '#999591',
  inputButtonEnabledBackground: shade(0.2, '#346FEF'),
  inputButtonDisabledBackground: shade(0.2, '#999591'),
  labelColor: '#346FEF',
};
