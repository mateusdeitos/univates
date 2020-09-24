import React from 'react';
import { Container, HeaderText, HeaderIcon } from './styles';

interface HeaderIcon {
  iconName: string;
  onPress(): void;
}

interface HeaderProps {
  texto: string;
  backgroundColor?: string;
  icon?: HeaderIcon;
}

const Header: React.FC<HeaderProps> = ({ texto, backgroundColor, icon }) => {
  return (
    <Container backgroundColor={backgroundColor || '#346FEF'}>
      <HeaderIcon
        onPress={() => { }}
        icon='plus'
        size={20}
        color={'#346FEF'}
      />
      <HeaderText>{texto}</HeaderText>
      {icon && (
        <HeaderIcon
          onPress={icon.onPress}
          icon={icon.iconName}
          size={20}
          color={'#fff'}
        />
      )}
    </Container>
  );
};

export default Header;
