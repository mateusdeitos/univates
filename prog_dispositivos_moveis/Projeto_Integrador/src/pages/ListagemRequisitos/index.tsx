import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, KeyboardAvoidingView, SafeAreaView, FlatList } from 'react-native';
import api from '../../services/api';
import Projeto from '../../components/Projeto';
import Header from '../../components/Header';
import { Container } from './styles';
import FABButton from '../../components/FloatingActionButton';
import { useFocusEffect } from '@react-navigation/native';
import { TelaListagemRequisitosProps } from '../../routes/app.routes';
import Requisito from '../../components/Requisito';
import moment from 'moment';

export interface RequisitoData {
    id: number;
    id_projeto: number;
    descricao: string;
    data_registro: Date;
    nivel_importancia: 1 | 2 | 3;
    nivel_dificuldade: 1 | 2 | 3;
    tempo: number;
    tipo_requisito: 1 | 2;
}

const ListagemRequisitos: React.FC<TelaListagemRequisitosProps> = ({ route, navigation }) => {
    const { id_projeto } = route.params;
    const [requisitos, setRequisitos] = useState<RequisitoData[]>([]);

    useFocusEffect(
        useCallback(() => {
            api.get(`/requisito?id_projeto=${id_projeto}`)
                .then(response => setRequisitos(response.data))
                .catch(error => console.log({ error }));

        }, []));

    const addNovoRequisito = useCallback(() => {
        navigation.navigate('CadastroRequisitos', {
            manutencao: 'novo',
            id_projeto,
        });
    }, [navigation]);

    const editaRequisito = useCallback((requisito: RequisitoData) => {
        console.log({ requisito });
        navigation.navigate('CadastroRequisitos', {
            ...requisito,
            data_registro: moment(new Date(), 'DD/MM/YYYY').toDate(),
            manutencao: 'editar',
        });
    }, [navigation]);

    const deletaRequisito = useCallback(async (id: number) => {
        api.delete(`/requisito/${id}`)
            .then(response => console.log({ response }))
            .catch(response => console.log({ response }));
        const requisitosFiltrados = requisitos.filter(requisito => requisito.id !== id);
        setRequisitos(requisitosFiltrados);
    }, [requisitos])

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={undefined}
                enabled={false}>
                <Header
                    texto="Requisitos cadastrados"
                    backgroundColor="#346FEF"
                    iconLeft={{
                        iconName: 'arrow-left',
                        onPress: () => navigation.goBack(),
                    }}
                    iconRight={{
                        iconName: 'plus',
                        onPress: addNovoRequisito,
                    }}
                />
                <Container>
                    <SafeAreaView style={{ marginTop: 12 }}>
                        {requisitos.length > 0 ?
                            <FlatList
                                data={requisitos}
                                renderItem={({ item }) => (
                                    <Requisito
                                        id={item.id}
                                        descricao={item.descricao}
                                        dataRegistro={item.data_registro}
                                        nivelDificuldade={item.nivel_dificuldade}
                                        nivelImportancia={item.nivel_importancia}
                                        tempo={item.tempo}
                                        tipoRequisito={item.tipo_requisito}
                                        onEdit={() => editaRequisito(item)}
                                        onDelete={() => deletaRequisito(item.id)}
                                    />
                                )}
                                keyExtractor={requisito => requisito.id.toString()}

                                ListFooterComponent={<View />}
                                ListFooterComponentStyle={{ height: 80 }}
                            />
                            :
                            <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text>Ops, nenhum requisito cadastrado</Text>
                            </View>}
                    </SafeAreaView>
                </Container>
            </KeyboardAvoidingView>
        </>
    )
}

export default ListagemRequisitos;