import React from 'react';
import { Container, FooterText } from './styles';


interface FooterProps {
  texto: string;
  backgroundColor?: string;
}

const Footer: React.FC<FooterProps> = ({ texto, backgroundColor }) => {
  return (
    <Container backgroundColor={backgroundColor || '#346FEF'}>
      <FooterText>{texto}</FooterText>
    </Container>
  );
};

export default Footer;
