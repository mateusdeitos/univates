import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { shade } from 'polished';

export const Container = styled.View`
  margin-top: 40px;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const TitleText = styled.Text`
  font-family: Poppins_600SemiBold;
  color: #fff;
  font-size: 16px;
`;

export const FooterButton = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
  background-color: ${shade(0.2, '#346fef')};
  padding: 10px;
  border-radius: 12px;
`;
export const RefreshButton = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
  background-color: #fff;
  padding: 10px;
  border-radius: 12px;
`;

export const FooterButtonText = styled.Text`
  margin-left: 8px;
  font-family: Poppins_600SemiBold;
  font-size: 16px;
  color: #fff;
`;
export const RefreshButtonText = styled.Text`
  margin-left: 8px;
  font-family: Poppins_600SemiBold;
  font-size: 16px;
  color: #346fef;
`;
