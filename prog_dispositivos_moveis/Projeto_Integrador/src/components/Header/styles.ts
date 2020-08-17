import styled, { css } from 'styled-components/native';
import { IconButton } from 'react-native-paper';

interface HeaderProps {
  backgroundColor: string;
}

export const Container = styled.View<HeaderProps>`
  width: 100%;
  height: 60px;
  position: relative;
  background: ${(props) => props.backgroundColor};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderText = styled.Text`
  /* font-family: 'Roboto-Medium'; */
  font-weight: bold;
  color: #fff;
  font-size: 18px;
`;

export const HeaderIcon = styled(IconButton)`
  margin-right: 8px;
  position: absolute;
  left: 15px;
`;
