import React, {useState} from 'react';
import {TextInputProperties} from 'react-native';
import {Container, TextInput, InputIcon, Label} from './styles';
import {shade} from 'polished';

interface InputProps extends TextInputProperties {
  icon?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({label, icon, ...rest}) => {
  const [customHeight, setCustomHeight] = useState(60);
  return (
    <>
      {label && <Label>{label}</Label>}
      <Container customHeight={customHeight}>
        {icon && (
          <InputIcon name={icon} size={20} color={shade(0.2, '#4ec5f1')} />
        )}

        <TextInput
          {...rest}
          onContentSizeChange={(event) =>
            setCustomHeight(Math.max(60, event.nativeEvent.contentSize.height))
          }
        />
      </Container>
    </>
  );
};

export default Input;
