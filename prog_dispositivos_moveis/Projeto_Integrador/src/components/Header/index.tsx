import React from 'react';
import {Container, HeaderText, HeaderIcon} from './styles';

interface HeaderIcon {
  iconName: string;
  onPress(): void;
}

interface HeaderProps {
  texto: string;
  backgroundColor?: string;
  icon?: HeaderIcon;
}

const Header: React.FC<HeaderProps> = ({texto, backgroundColor, icon}) => {
  return (
    <Container backgroundColor={backgroundColor || '#346FEF'}>
      {icon && (
        <HeaderIcon
          onPress={icon.onPress}
          icon={icon.iconName}
          size={20}
          color={'#fff'}
        />
      )}
      <HeaderText>{texto}</HeaderText>
    </Container>
  );
};

export default Header;
