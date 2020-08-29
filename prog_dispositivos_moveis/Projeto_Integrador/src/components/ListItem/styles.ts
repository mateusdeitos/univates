import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { RectButton, FlatList } from 'react-native-gesture-handler';

interface ButtonProps {
  backgroundColor?: string;
}
interface ButtonTextProps {
  textColor?: string;
}

export const Container = styled(RectButton)`
  align-self: center;
  flex-grow: 1;
  flex-basis: 0;
  margin-bottom: 8px;
  background: #fff;
  border-radius: 12px;
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
  border-top-left-radius: 12px;
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
  height: 160px;
  padding: 16px;
`;

export const DescricaoText = styled.Text`
  /* flex: 1; */
  font-size: 24px;
  color: #346fef;
  font-family: Archivo_700Bold;
`;

export const ItemIcon = styled(FontAwesome5)`
  margin-left: auto;
`;

export const FooterContainer = styled.View`
  flex: 1;
  align-items: center;
  border-radius: 24px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CustomButton = styled(RectButton)<ButtonProps>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 12px;
  margin-right: 8px;
  height: 64px;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : '#fff'};
`;

export const ButtonText = styled.Text<ButtonTextProps>`
  font-family: Poppins_600SemiBold;
  font-size: 16px;
  margin-right: 16px;
  color: ${props => (props.textColor ? props.textColor : '#d0cece')};
`;

export const BadgeList = styled(FlatList as new () => FlatList<string>)`
  height: 24px;
  margin-bottom: 16px;
`;

export const ListBadge = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 12px;
  border-radius: 12px;
  margin-right: 4px;
  align-content: center;
  background: #346fef;
`;

export const BadgeText = styled.Text`
  font-family: Poppins_600SemiBold;
  font-size: 12px;
  color: #fff;
`;
