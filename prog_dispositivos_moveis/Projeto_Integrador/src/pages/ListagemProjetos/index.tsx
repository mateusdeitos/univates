import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import api from '../../services/api';
import {RectButton} from 'react-native-gesture-handler';

interface Projeto {
    id: number;
    descricao: string;
    data_ini: Date;
    data_fim: Date;
}

const ListagemProjetos: React.FC = () => {
    const [projetos, setProjetos] = useState<Projeto[]>([]);

    useEffect(() => {
        api.get('/projeto')
            .then(response => setProjetos(response.data))
            .catch(error => console.log({ error }));
    }, [])

    return (
        <RectButton>
            <Text>id: 1</Text>
            <Text>descricao: Projeto bonito</Text>
            <Text>Data de início: 01/08/2020</Text>
            <Text>Data fim: 01/08/2020</Text>
        </RectButton>
    )
}

export default ListagemProjetos;