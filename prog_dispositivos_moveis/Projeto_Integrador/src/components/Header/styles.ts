import styled from 'styled-components/native';
import { IconButton } from 'react-native-paper';

interface HeaderProps {
  backgroundColor: string;
}

export const Container = styled.View<HeaderProps>`
  width: 100%;
  height: 90px;
  background: ${props => props.backgroundColor};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderText = styled.Text`
  font-family: Archivo_700Bold;
  font-weight: bold;
  color: #fff;
  font-size: 24px;
  align-self: center;
  /* margin-bottom: 60px; */
  margin-left: auto;
  margin-right: auto;
`;

export const HeaderIcon = styled(IconButton)`
  margin-left: 16px;
  margin-right: 16px;
`;
