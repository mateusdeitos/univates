import styled from 'styled-components/native';
import {lighten} from 'polished';
import Icon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  background: ${(props) => lighten(0.2, props.backgroundColor)};
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: ${(props) => props.backgroundColor};
`;

export const Label = styled.Text`
  align-self: flex-start;
  margin-bottom: 4px;
  color: #a6a6a6;
  font-family: Poppins_400Regular;
`;
