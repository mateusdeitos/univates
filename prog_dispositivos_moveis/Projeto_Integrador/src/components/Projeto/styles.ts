import styled, { css } from 'styled-components/native';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Button, Badge } from 'react-native-paper';

export const Container = styled.View`
  align-self: center;
  flex-grow: 1;
  flex-basis: 0;
  margin-bottom: 8px;
  background: #fff;
  border-radius: 24px;
  padding: 8px;
  width: 90%;
`;
export const IdTextContainer = styled.View`
  flex-direction: column;
  position: absolute;
  align-self: flex-start;
  left: 0;
  top: 0;
  justify-content: flex-end;
  align-items: flex-end;
  height: 30px;
  border-top-left-radius: 24px;
  border-bottom-right-radius: 8px;
  background-color: #346fef;
`;
export const IdText = styled.Text`
  font-family: Archivo_400Regular;
  font-size: 12px;
  color: #fff;
  margin: 0 16px 8px 16px;
`;

export const DescricaoTextContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;
export const DescricaoText = styled.Text`
  font-size: 16px;
  color: #346fef;
  font-family: Archivo_700Bold;
`;
export const DataContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
`;

export const DataIniBadge = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
  height: 24px;
  border-radius: 20px;
  background: #346fef;
  padding: 4px;
`;

export const BadgeText = styled.Text`
  color: #fff;
`;
export const ButtonContainer = styled.View`
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: -10px;
`;

export const CustomButton = styled(Button)`
  margin-right: 16px;
`;

export const ButtonText = styled.Text`
  font-size: 12px;
  margin-left: 16px;
  font-weight: bold;
  color: #d0cece;
`;
