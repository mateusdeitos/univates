import React from 'react';
import { Label as StyledLabel } from './styles';

interface LabelProps {
  text: string;
  labelColor: string;
}

const Label: React.FC<LabelProps> = ({ text, labelColor, ...rest }) => (
  <StyledLabel color={labelColor}>{text}</StyledLabel>
);

export default Label;
