import React from 'react';
import { TextInputProperties, Text } from 'react-native';
import { shade, lighten } from 'polished';
import Icon from 'react-native-vector-icons/Feather';
import { Container, TextInput, InputIcon, InputButton } from './styles';
import { colors } from '../../styles/global';
import Label from '../Label';

interface ButtonInputProps {
  icon: string;
  enabled: boolean;
  onPress(): void;
}

interface InputProps extends TextInputProperties {
  icon?: string;
  label?: string;
  labelColor?: string;
  editable: boolean;
  button?: ButtonInputProps;
}

const Input: React.FC<InputProps> = ({
  label,
  labelColor,
  icon,
  editable,
  value,
  numberOfLines,
  button,
  ...rest
}) => {
  return (
    <>
      {label && (
        <Label text={label} labelColor={labelColor || colors.primaryColor} />
      )}
      <Container customHeight={60 * (numberOfLines || 1)} enabled={editable}>
        {icon && (
          <InputIcon
            name={icon}
            size={20}
            color={shade(
              0.2,
              editable ? colors.primaryColor : colors.inputDisabledBackground,
            )}
          />
        )}
        {editable ? <TextInput {...rest} /> : <Text>{value}</Text>}
        {button && (
          <InputButton onPress={button.onPress} enabled={button.enabled}>
            <Icon
              name={button.icon}
              size={15}
              color={lighten(
                0.2,
                editable ? colors.primaryColor : colors.inputDisabledBackground,
              )}
            />
          </InputButton>
        )}
      </Container>
    </>
  );
};

export default Input;
