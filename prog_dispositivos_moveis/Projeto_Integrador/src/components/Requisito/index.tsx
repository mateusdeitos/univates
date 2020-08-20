import React, { useState, useEffect } from 'react';
import { View, ViewProps, Text } from 'react-native';
import { Container, IdText, IdTextContainer, DescricaoText, DescricaoTextContainer, TagContainer, TagText, ButtonContainer, CustomButton } from './styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { options } from '../../defaults/options';
interface Props extends ViewProps {
    id: number;
    descricao: string;
    dataRegistro: Date;
    nivelImportancia: number;
    nivelDificuldade: number;
    tipoRequisito: number;
    tempo: number;
    onLook?(): void;
    onEdit?(): void;
    onDelete?(): void;
}

interface Options {
    label: string;
    value: number;
    activeColor: string;
}


const Requisito: React.FC<Props> = ({ id, descricao, dataRegistro, nivelImportancia, nivelDificuldade, tempo, tipoRequisito, onLook, onEdit, onDelete, ...rest }) => {
    const [tipoRequisitoObject, setTipoRequisitoObject] = useState<Options>({} as Options);
    const [nivelImportanciaObject, setNivelImportanciaObject] = useState<Options>({} as Options);
    const [nivelDificuldadeObject, setNivelDificuldadeObject] = useState<Options>({} as Options);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const { tiposRequisitos, niveisDificuldade, niveisImportancia } = options;
        const tipo = tiposRequisitos.find(tipo => tipo.value === tipoRequisito);
        const nivelDificuldadeReq = niveisDificuldade.find(nivel => nivel.value === nivelDificuldade);
        const nivelImportanciaReq = niveisImportancia.find(nivel => nivel.value === nivelImportancia);
        if (tipo) {
            setTipoRequisitoObject({
                activeColor: tipo.activeColor,
                label: tipo.label,
                value: tipo.value
            });
        }
        if (nivelImportanciaReq) {
            setNivelImportanciaObject({
                activeColor: nivelImportanciaReq.activeColor,
                label: nivelImportanciaReq.label,
                value: nivelImportanciaReq.value
            });
        }
        if (nivelDificuldadeReq) {
            setNivelDificuldadeObject({
                activeColor: nivelDificuldadeReq.activeColor,
                label: nivelDificuldadeReq.label,
                value: nivelDificuldadeReq.value
            });
        }

        setIsLoading(false);
    }, [])

    return (
        <>
            <Container {...rest} style={{
                shadowOffset: { width: 5, height: 5 },
                shadowColor: 'gray',
                shadowOpacity: 0.5,
                elevation: 4,
            }}>
                < IdTextContainer>
                    <IdText>#{id}</IdText>
                </IdTextContainer>
                <DescricaoTextContainer>
                    <DescricaoText>{descricao}</DescricaoText>
                </DescricaoTextContainer>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignContent: 'flex-end', flexWrap: 'wrap', maxWidth: '80%' }}>
                        <TagContainer backgroundColor="#346FEF" >
                            <TagText color="#FFF">Registro: {dataRegistro}</TagText>
                        </TagContainer>
                        <TagContainer backgroundColor="#346FEF" >
                            <TagText color="#FFF">Tempo estimado: {tempo} hH</TagText>
                        </TagContainer>
                        {!isLoading && <TagContainer backgroundColor={`${tipoRequisitoObject.activeColor}`} >
                            <TagText color="#FFF">{tipoRequisitoObject.label}</TagText>
                        </TagContainer>}
                        {!isLoading && <TagContainer backgroundColor={`${nivelDificuldadeObject.activeColor}`} >
                            <TagText color="#FFF">Dificuldade: {nivelDificuldadeObject.label}</TagText>
                        </TagContainer>}
                        {!isLoading && <TagContainer backgroundColor={`${nivelImportanciaObject.activeColor}`} >
                            <TagText color="#FFF">Importância: {nivelImportanciaObject.label}</TagText>
                        </TagContainer>}

                    </View>
                    <ButtonContainer>
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

export default Requisito;
