import React from 'react';
import { View, ViewProps } from 'react-native';
import { Container, IdText, IdTextContainer, DescricaoText, DescricaoTextContainer, DataContainer, DataIniText, DataFimText, ButtonContainer, ButtonText } from './styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
interface Props extends ViewProps {
    id: number;
    descricao: string;
    dataIni?: Date;
    dataFim?: Date;
    onLook?(): void;
    onEdit?(): void;
    onDelete?(): void;
}


const Projeto: React.FC<Props> = ({ id, descricao, dataFim, dataIni, onLook, onEdit, onDelete, ...rest }) => {
    return (
        <>

            <Container {...rest}>
                <IdTextContainer>
                    <IdText>Id: {id}</IdText>
                </IdTextContainer>
                <DescricaoTextContainer>
                    <DescricaoText>{descricao}</DescricaoText>
                </DescricaoTextContainer>
                <DataContainer>
                    <DataIniText>Data de início: {dataIni}</DataIniText>
                    <DataFimText>Data prevista: {dataFim}</DataFimText>
                </DataContainer>
                <ButtonContainer>
                    <Button onPress={onLook}>
                        <FontAwesome5 name="search" size={20} color="blu" />
                        <ButtonText> Requisitos</ButtonText>
                    </Button>
                    <Button onPress={onEdit}>
                        <FontAwesome5 name="edit" size={20} color="green" />
                        <ButtonText> Editar</ButtonText>
                    </Button>
                    <Button onPress={onDelete}>
                        <FontAwesome5 name="trash" size={20} color="red" />
                        <ButtonText> Deletar</ButtonText>
                    </Button>
                </ButtonContainer>
            </Container>
        </>
    );
};

export default Projeto;
