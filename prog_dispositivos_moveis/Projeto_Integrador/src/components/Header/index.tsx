import React from 'react';
import { View, Platform } from 'react-native';
import { Container, HeaderText, HeaderIcon } from './styles';

interface HeaderIcon {
  iconName: string;
  onPress?(): void;
}

interface HeaderProps {
  texto: string;
  backgroundColor?: string;
  iconLeft?: HeaderIcon;
  iconRight?: HeaderIcon;
}

const Header: React.FC<HeaderProps> = ({
  texto,
  backgroundColor,
  iconLeft,
  iconRight,
}) => {
  return (
    <>
      {Platform.OS === 'ios' && (
        <View
          style={{ height: 18, backgroundColor: backgroundColor || '#346FEF' }}
        />
      )}
      <Container backgroundColor={backgroundColor || '#346FEF'}>
        {iconLeft && (
          <HeaderIcon
            onPress={iconLeft.onPress}
            icon={iconLeft.iconName}
            size={20}
            color="#fff"
          />
        )}

        <HeaderText>{texto}</HeaderText>
        {/* Se não informou o iconRight, cria um ícone da mesma cor do fundo
        para que o texto no header fique centralizado
      */}
        {iconRight ? (
          <HeaderIcon
            onPress={iconRight.onPress}
            icon={iconRight.iconName}
            size={20}
            color="#fff"
          />
        ) : (
          <HeaderIcon
            icon="menu"
            color={backgroundColor || '#346FEF'}
            size={20}
          />
        )}
      </Container>
      {/* <Container backgroundColor={backgroundColor || '#346FEF'}> */}
      {/* </Container> */}
    </>
  );
};

export default Header;
