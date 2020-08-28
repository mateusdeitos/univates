import React from 'react';
import { View, ViewProps } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import {
  Container,
  IdTextContainer,
  IdText,
  DescricaoText,
  DescricaoTextContainer,
  ButtonContainer,
  CustomButton,
  ButtonText,
  FooterContainer,
  ItemIcon,
  ListBadge,
  BadgeList,
} from './styles';

interface Props extends ViewProps {
  id: number;
  descricao: string;
  badges?: string[];
  onLook?(): void;
  onEdit?(): void;
  onDelete?(): void;
  buttonEditBackgroundColor?: string;
  buttonEditTextColor?: string;
  buttonEditBorderColor?: string;
  buttonDeleteBackgroundColor?: string;
  buttonDeleteTextColor?: string;
  buttonDeleteBorderColor?: string;
}

const ListItem: React.FC<Props> = ({
  id,
  descricao,
  badges,
  onLook,
  onEdit,
  onDelete,
  buttonEditBackgroundColor = '#22b800',
  buttonEditTextColor = '#1a4012',
  buttonEditBorderColor = '#1a4012',
  buttonDeleteBackgroundColor = '#f20202',
  buttonDeleteTextColor = '#4d0000',
  buttonDeleteBorderColor = '#4d0000',
  ...rest
}) => {
  return (
    <>
      <Container
        {...rest}
        onPress={onLook}
        style={{
          shadowOffset: { width: 5, height: 5 },
          shadowColor: 'gray',
          shadowOpacity: 0.5,
          elevation: 4,
        }}
      >
        <IdTextContainer>
          <IdText>{`#${id}`}</IdText>
        </IdTextContainer>

        <DescricaoTextContainer>
          <ItemIcon name="chevron-left" size={20} color="transparent" />
          <DescricaoText>{descricao}</DescricaoText>
          <ItemIcon name="chevron-right" size={10} color="#346fef" />
        </DescricaoTextContainer>

        <BadgeList
          contentContainerStyle={{ alignSelf: 'stretch' }}
          horizontal
          data={badges}
          renderItem={({ item }) => (
            <ListBadge key={item} visible>
              {item}
            </ListBadge>
          )}
          keyExtractor={item => item}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: 20 }}
        />

        <FooterContainer>
          <ButtonContainer>
            <CustomButton
              onPress={onEdit}
              backgroundColor={buttonEditBackgroundColor}
              borderColor={buttonEditBorderColor}
            >
              <FontAwesome5 name="edit" size={30} color="#1a4012" />
              <ButtonText textColor={buttonEditTextColor}>Editar</ButtonText>
            </CustomButton>
            <CustomButton
              onPress={onDelete}
              backgroundColor={buttonDeleteBackgroundColor}
              borderColor={buttonDeleteBorderColor}
            >
              <FontAwesome5 name="trash" size={30} color="#ff6060" />
              <ButtonText textColor={buttonDeleteTextColor}>Apagar</ButtonText>
            </CustomButton>
          </ButtonContainer>
        </FooterContainer>
      </Container>
    </>
  );
};

export default ListItem;
