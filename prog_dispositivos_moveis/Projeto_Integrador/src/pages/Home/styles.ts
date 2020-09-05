import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: #346fef;
  align-items: center;
  margin-top: -40px;
`;

export const ContentContainer = styled.View`
  flex-direction: column;
  margin-top: 80px;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
`;

export const WelcomeText = styled.Text`
  font-family: Archivo_700Bold;
  font-size: 32px;
  color: #fff;
`;

export const RouteButton = styled(RectButton)`
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  width: 200px;
  align-items: center;
  margin: 20px 0;
`;

export const LogOffButton = styled(RectButton)`
  background-color: #999591;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
  width: 200px;
  align-items: center;
  margin: 20px 0;
`;

export const ButtonText = styled.Text`
  font-family: Poppins_600SemiBold;
  font-size: 16px;
  margin: 0 auto;
`;

export const LandingImage = styled.Image`
  flex: 1;
  width: 100%;
  ${css`
    resize-mode: contain;
  `}
`;
