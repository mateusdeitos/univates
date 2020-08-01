import React from 'react';
import {TextInputProperties} from 'react-native';
import {Container, TextInput, InputIcon} from './styles';
import {shade} from 'polished';

interface InputProps extends TextInputProperties {
  icon?: string;
}

const Input: React.FC<InputProps> = ({icon, ...rest}) => {
  return (
    <Container>
      {icon && (
        <InputIcon name={icon} size={20} color={shade(0.2, '#4ec5f1')} />
      )}

      <TextInput {...rest} />
    </Container>
  );
};

export default Input;
