import styled from 'styled-components/native';
import { Badge } from 'react-native-paper';

export const Container = styled.View`
  flex: 1;
  margin-top: -40px;
  /* padding: 0 30px 120px; */
`;

export const TotalBadge = styled(Badge)`
  font-family: Poppins_600SemiBold;
  position: absolute; 
  bottom: 0px;
  left: 0px;
  margin: 32px;
  font-size: 12px;
  padding: 0 12px;

`;
