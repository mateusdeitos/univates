import React from 'react';
import { View, ViewProps } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Badge } from 'react-native-paper';
import Timeline, { TimelineProps } from 'react-native-timeline-flatlist';
import moment from 'moment';
import {
  Container,
  IdTextContainer,
  IdText,
  DescricaoText,
  DescricaoTextContainer,
  ButtonContainer,
  CustomButton,
  ButtonText,
} from './styles';

interface Props extends ViewProps {
  id: number;
  descricao: string;
  dataIni?: Date;
  dataFim?: Date;
  onLook?(): void;
  onEdit?(): void;
  onDelete?(): void;
}

const Projeto: React.FC<Props> = ({
  id,
  descricao,
  dataFim,
  dataIni,
  onLook,
  onEdit,
  onDelete,
  ...rest
}) => {
  return (
    <>
      <Container
        {...rest}
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

        <View style={{ flexDirection: 'row' }}>
          <Timeline
            data={[
              { time: dataFim?.toString(), title: `Estimativa` },
              { time: dataIni?.toString(), title: `Início` },
            ]}
            detailContainerStyle={{
              marginTop: -10,
              marginBottom: 20,
              paddingLeft: 5,
              paddingRight: 5,
              backgroundColor: '#fff',
              marginRight: 32,
            }}
            descriptionStyle={{ color: '#fff' }}
            titleStyle={{
              color: '#4271ffd9',
              fontSize: 16,
              fontFamily: 'Archivo_700Bold',
            }}
            timeContainerStyle={{
              backgroundColor: '#4271ffd9',
              borderRadius: 16,
              padding: 4,
            }}
            timeStyle={{
              color: '#fff',
              fontSize: 12,
              fontFamily: 'Archivo_400Regular',
            }}
          />

          <ButtonContainer>
            <CustomButton onPress={onLook} mode="text">
              <FontAwesome5 name="list" size={15} color="blue" />
            </CustomButton>
            <CustomButton onPress={onEdit} mode="text">
              <FontAwesome5 name="edit" size={15} color="green" />
            </CustomButton>
            <CustomButton onPress={onDelete} mode="text">
              <FontAwesome5 name="trash" size={15} color="red" />
            </CustomButton>
          </ButtonContainer>
        </View>
      </Container>
    </>
  );
};

export default Projeto;
