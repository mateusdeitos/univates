import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { shade, lighten } from 'polished';
import { colors } from '../../styles/global';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.primaryColor};
  align-items: center;
  justify-content: center;
  margin-top: -40px;
`;
export const LandingImage = styled.Image`
  flex: 1;
  width: 100%;
  ${css`
    resize-mode: contain;
  `}
`;
export const ContentContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 0 30px 120px;
`;
export const ContentText = styled.Text`
  font-family: Archivo_700Bold;
  font-size: 32px;
  color: #fff;
`;

export const LoginButton = styled(RectButton)`
  background-color: ${shade(0.2, colors.primaryColor)};
  padding: 10px;
  border-radius: 10px;
  width: 200px;
  align-items: center;
  margin: 20px 0 0 0;
`;

export const SignUpButton = styled(RectButton)`
  background-color: ${lighten(0.2, colors.primaryColor)};
  padding: 10px;
  border-radius: 10px;
  width: 200px;
  align-items: center;
  margin: 20px 0 0 0;
`;

export const ButtonText = styled.Text`
  font-family: Poppins_600SemiBold;
  color: #fff;
  font-size: 16px;
`;
