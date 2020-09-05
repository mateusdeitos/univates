import styled from 'styled-components/native';
import { colors } from '../../styles/global';

interface LabelProps {
  color?: string;
}
export const Label = styled.Text<LabelProps>`
  align-self: flex-start;
  margin-bottom: 4px;
  color: ${props => (props.color ? props.color : colors.labelColor)};
  font-family: Poppins_400Regular;
`;
