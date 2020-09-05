import React from 'react';
import SwitchSelector from 'react-native-switch-selector';
import Label from '../Label';
import { colors } from '../../styles/global';

export interface OptionsProps {
  label: string;
  value: number;
  selected?: boolean;
  activeColor: string;
  customIcon?: JSX.Element;
}

export interface SelectProps {
  label?: string;
  options: OptionsProps[];
  propsStyles?: {};
  initial: number;
  onPress(value: any): void;
}

const RadioButton: React.FC<SelectProps> = ({
  label,
  initial,
  options,
  ...rest
}) => {
  return (
    <>
      {label && <Label text={label} labelColor={colors.primaryColor} />}
      <SwitchSelector
        style={{ marginBottom: 8 }}
        borderRadius={10}
        initial={initial}
        options={options}
        {...rest}
      />
    </>
  );
};

export default RadioButton;
