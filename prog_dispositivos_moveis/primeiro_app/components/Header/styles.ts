import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

interface HeaderProps {
  backgroundColor: string;
}

export const Container = styled.View<HeaderProps>`
  width: 100%;
  height: 60px;
  background: ${(props) => props.backgroundColor};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderText = styled.Text`
  font-family: 'Roboto-Medium';
  font-weight: bold;
  color: #fff;
  font-size: 18px;
`;

export const HeaderIcon = styled(Icon)`
  margin-right: 8px;
  position: absolute;
  left: 15px;
`;
