import React from 'react';
import { View, ViewProps } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { shade } from 'polished';
import {
  Container,
  IdTextContainer,
  IdText,
  DescricaoText,
  DescricaoTextContainer,
  ButtonContainer,
  CustomButton,
  FooterContainer,
  ListBadge,
  BadgeList,
  BadgeText,
} from './styles';

export interface BadgeProps {
  text: string;
  backgroundColor?: string;
}

interface Props extends ViewProps {
  id: number;
  descricao: string;
  badges?: BadgeProps[];
  onLink?(): void;
  onLook?(): void;
  onEdit?(): void;
  onDelete?(): void;
  buttonEditBackgroundColor?: string;
  buttonLinkBackgroundColor?: string;
  buttonDeleteBackgroundColor?: string;
}

const ListItem: React.FC<Props> = ({
  id,
  descricao,
  badges,
  onLook,
  onEdit,
  onDelete,
  onLink,
  buttonLinkBackgroundColor = '#343EFE',
  buttonEditBackgroundColor = '#22b800',
  buttonDeleteBackgroundColor = '#ff6060',
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
          <DescricaoText>{descricao}</DescricaoText>
        </DescricaoTextContainer>

        <BadgeList
          contentContainerStyle={{
            alignSelf: 'stretch',
          }}
          horizontal
          data={badges}
          renderItem={({ item }) => (
            <ListBadge key={item.text} backgroundColor={item.backgroundColor}>
              <BadgeText>{item.text}</BadgeText>
            </ListBadge>
          )}
          keyExtractor={item => item.text}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: 20 }}
        />

        <FooterContainer>
          <ButtonContainer>
            {onLink && (
              <CustomButton
                onPress={onLink}
                backgroundColor={buttonLinkBackgroundColor}
              >
                <FontAwesome5
                  name="external-link-alt"
                  size={20}
                  color={shade(0.4, buttonLinkBackgroundColor)}
                />
              </CustomButton>
            )}
            <CustomButton
              onPress={onEdit}
              backgroundColor={buttonEditBackgroundColor}
            >
              <FontAwesome5
                name="pen"
                size={20}
                color={shade(0.4, buttonEditBackgroundColor)}
              />
            </CustomButton>
            <CustomButton
              onPress={onDelete}
              backgroundColor={buttonDeleteBackgroundColor}
            >
              <FontAwesome5
                name="trash"
                size={20}
                color={shade(0.4, buttonDeleteBackgroundColor)}
              />
            </CustomButton>
          </ButtonContainer>
        </FooterContainer>
      </Container>
    </>
  );
};

export default ListItem;
