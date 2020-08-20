import React from 'react';
import {  Text } from 'react-native';
import Slider, { SliderProps } from '@react-native-community/slider';
import { Container, Label } from './styles';
import { shade } from 'polished';

interface InputProps  {
  label?: string;
  value: number;
  step?: number;
  minimumValue?: number;
  maximumValue?: number;
  onValueChange?(value: number): void;
}


const SliderInput: React.FC<InputProps> = ({ label, value, step, minimumValue, maximumValue, onValueChange}) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <Container backgroundColor={'#4ec5f1'}>
        <Slider
          style={{flex: 1}}
          step={step}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          onValueChange={onValueChange}
          value={value}
        />
        <Text>{value}</Text>
      </Container>
    </>
  );
};

export default SliderInput;

