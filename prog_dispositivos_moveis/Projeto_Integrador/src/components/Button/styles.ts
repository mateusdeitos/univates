import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #346fef;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  /* font-family: 'Roboto-Medium'; */
  color: #fff;
  font-size: 18px;
`;
