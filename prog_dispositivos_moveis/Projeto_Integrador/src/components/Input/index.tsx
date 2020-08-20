import React, { useState } from 'react';
import { TextInputProperties, Text } from 'react-native';
import { Container, TextInput, InputIcon, Label } from './styles';
import { shade } from 'polished';

interface InputProps extends TextInputProperties {
  icon?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, icon, editable, value, numberOfLines, ...rest }) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <Container customHeight={60 * (numberOfLines ? numberOfLines : 1)} backgroundColor={editable ? '#4ec5f1' : '#999591'}>
        {icon && (
          <InputIcon name={icon} size={20} color={shade(0.2, editable ? '#4ec5f1' : '#999591')} />
        )}
        {editable ?
          <TextInput
            {...rest}
          />
          :
          <Text>{value}</Text>
        }
      </Container>
    </>
  );
};

export default Input;
