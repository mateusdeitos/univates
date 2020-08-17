import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { Container, IdText, IdTextContainer, DescricaoText, DescricaoTextContainer, DataContainer, DataIniText, DataFimText } from './styles';

interface Props extends Omit<RectButtonProperties, 'id'> {
    id: number;
    descricao: string;
    dataIni?: Date;
    dataFim?: Date;
}


const Projeto: React.FC<Props> = ({ id, descricao, dataFim, dataIni, ...rest }) => {
    return (
        <Container {...rest} key={id}>
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
        </Container>
    );
};

export default Projeto;
