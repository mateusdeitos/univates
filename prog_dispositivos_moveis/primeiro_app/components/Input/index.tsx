import React from 'react';
import {TextInputProperties} from 'react-native';
import {Container, TextInput, InputIcon, Label} from './styles';
import {shade} from 'polished';

interface InputProps extends TextInputProperties {
  icon?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({label, icon, ...rest}) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <Container>
        {icon && (
          <InputIcon name={icon} size={20} color={shade(0.2, '#4ec5f1')} />
        )}

        <TextInput {...rest} />
      </Container>
    </>
  );
};

export default Input;
