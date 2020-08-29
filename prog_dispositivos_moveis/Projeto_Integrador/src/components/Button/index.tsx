import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { shade } from 'polished';
import { Container, ButtonText, InputIcon } from './styles';

interface ButtonProps extends RectButtonProperties {
  text: string;
  backgroundColor?: string;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  backgroundColor = '#346fef',
  icon,
  ...rest
}) => {
  return (
    <Container backgroundColor={backgroundColor} {...rest}>
      {icon && (
        <InputIcon name={icon} size={25} color={shade(0.4, backgroundColor)} />
      )}
      <ButtonText>{text}</ButtonText>
    </Container>
  );
};

export default Button;
