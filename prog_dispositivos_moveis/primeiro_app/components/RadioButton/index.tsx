/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import SwitchSelector from 'react-native-switch-selector';
interface OptionsProps {
  label: string;
  value: number;
  activeColor: string;
}

interface SelectProps {
  options: OptionsProps[];
  propsStyles?: {};
  initial: number;
  onPress(value: any): void;
}

const RadioButton: React.FC<SelectProps> = ({initial, options, ...rest}) => {
  return (
    <SwitchSelector
      style={{marginBottom: 8}}
      borderRadius={10}
      initial={initial}
      options={options}
      {...rest}
    />
  );
};

export default RadioButton;
