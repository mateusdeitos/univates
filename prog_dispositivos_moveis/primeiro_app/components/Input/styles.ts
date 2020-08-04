import styled from 'styled-components/native';
import {lighten} from 'polished';
import Icon from 'react-native-vector-icons/Feather';

interface InputProps {
  isMultiLine: boolean;
}

export const Container = styled.View<InputProps>`
  width: 100%;
  height: ${(props) => (props.isMultiLine ? 120 : 60)}px;
  background: ${lighten(0.2, '#4ec5f1')};
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #4ec5f1;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  /* color: #312e38; */
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;

export const InputIcon = styled(Icon)`
  margin-right: 8px;
`;

export const Label = styled.Text`
  align-self: flex-start;
  margin-bottom: 4px;
  color: #a6a6a6;
`;
