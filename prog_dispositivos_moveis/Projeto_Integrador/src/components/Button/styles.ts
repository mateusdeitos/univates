import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  backgroundColor?: string;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  flex-direction: row;
  height: 60px;
  background: ${props =>
    props.backgroundColor ? props.backgroundColor : '#346fef'};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export const InputIcon = styled(Icon)`
  margin-right: 8px;
`;
