import styled from 'styled-components/native';
import {lighten} from 'polished';
import Icon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  customHeight: number;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: ${(props) => (props.customHeight > 0 ? props.customHeight : 60)}px;
  padding-top: ${(props) => (props.customHeight > 0 ? 8 : 0)}px;
  padding-bottom: ${(props) => (props.customHeight > 0 ? 8 : 0)}px;
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
  height: 100%;
  font-size: 16px;
  padding: 8px;
  /* font-family: 'Roboto-Regular'; */
`;

export const InputIcon = styled(Icon)`
  margin-right: 8px;
`;

export const Label = styled.Text`
  align-self: flex-start;
  margin-bottom: 4px;
  color: #a6a6a6;
`;
