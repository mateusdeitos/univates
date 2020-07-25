import React from 'react';
import {TextInputProperties} from 'react-native';
import {Container, TextInput} from './styles';

const Input: React.FC<TextInputProperties> = ({...rest}) => {
  return (
    <Container>
      <TextInput {...rest} />
    </Container>
  );
};

export default Input;
