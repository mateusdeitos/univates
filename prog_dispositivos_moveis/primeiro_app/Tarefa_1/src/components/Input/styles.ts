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

export const TextInput = styled.TextInput`
  flex: 1;
  color: #312e38;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;
