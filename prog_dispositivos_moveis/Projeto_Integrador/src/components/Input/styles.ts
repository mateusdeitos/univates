import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';
import { colors } from '../../styles/global';

interface ContainerProps {
  customHeight: number;
  enabled: boolean;
}

interface InputButtonProps {
  enabled: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: ${props => (props.customHeight > 0 ? props.customHeight : 60)}px;
  background: ${props =>
    props.enabled
      ? colors.inputEnabledBackground
      : colors.inputDisabledBackground};
  flex-direction: row;
  align-items: center;
  padding: 8px;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: ${props =>
    props.enabled ? colors.inputEnabledBorder : colors.inputDisabledBorder};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  font-size: 12px;
  padding: 8px;
  font-family: Poppins_400Regular;
`;

export const InputIcon = styled(Icon)`
  margin-right: 8px;
`;

export const Label = styled.Text`
  align-self: flex-start;
  margin-bottom: 4px;
  color: ${colors.labelColor};
  font-family: Poppins_400Regular;
`;

export const InputButton = styled(RectButton)<InputButtonProps>`
  width: 48px;
  height: 100%;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background: ${props =>
    props.enabled
      ? colors.inputButtonEnabledBackground
      : colors.inputButtonDisabledBackground};
`;
