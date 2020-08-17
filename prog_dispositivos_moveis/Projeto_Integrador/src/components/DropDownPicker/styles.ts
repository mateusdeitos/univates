import styled from 'styled-components/native';
import {lighten} from 'polished';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  background: ${lighten(0.2, '#4ec5f1')};
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #4ec5f1;
`;

export const Label = styled.Text`
  align-self: flex-start;
  margin-bottom: 4px;
  color: #a6a6a6;
`;
