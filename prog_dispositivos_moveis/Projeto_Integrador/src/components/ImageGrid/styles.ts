import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { shade } from 'polished';

export const Label = styled.Text`
  align-self: flex-start;
  margin-bottom: 4px;
  color: #a6a6a6;
  font-family: Poppins_400Regular;
`;

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 4px;
  padding-right: 4px;
  border-width: 2px;
  border-color: #346fef;
  border-radius: 10px;
`;
export const ImageContainer = styled.View`
  height: 110px;
  width: 110px;
  margin: 2px;
`;
export const ImageAction = styled(RectButton)`
  position: absolute;
  background: #ff6060;
  height: 30px;
  width: 30px;
  border-radius: 4px;
  bottom: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;
export const ImageActionIcon = styled(Icon)`
  color: ${shade(0.4, '#ff6060')};
`;

export const ImageItem = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 8px;
`;
