import React, { useState, useCallback } from 'react';
import { View, Text, KeyboardAvoidingView, SafeAreaView, FlatList, RefreshControl, Platform } from 'react-native';
import api from '../../services/api';
import Header from '../../components/Header';
import { Container } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { TelaListagemRequisitosProps } from '../../routes/app.routes';
import Requisito from '../../components/Requisito';
import { ActivityIndicator } from 'react-native-paper';
import NoContentView from '../../components/NoContentView';

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
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            api.get(`/requisito?id_projeto=${id_projeto}`)
                .then(response => setRequisitos(response.data))
                .catch(error => console.log({ error }))
                .finally(() => setIsLoading(false));

        }, [isLoading]));

    const addNovoRequisito = useCallback(() => {
        navigation.navigate('CadastroRequisitos', {
            manutencao: 'novo',
            id_projeto,
        });
        setIsLoading(true);
    }, [navigation]);

    const editaRequisito = useCallback((requisito: RequisitoData) => {
        navigation.navigate('CadastroRequisitos', {
            ...requisito,
            // data_registro: moment(requisito.data_registro,'DD/MM/YYYY').toDate(),
            manutencao: 'editar',
        });
        setIsLoading(true);
    }, [navigation]);

    const deletaRequisito = useCallback(async (id: number) => {
        setRequisitos(requisitos.filter(req => req.id !== id));
        api.delete(`/requisito/${id}`)
            .then(response => console.log({ response }))
            .catch(response => console.log({ response }));
        setIsLoading(true);
    }, [requisitos])

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
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
                    <SafeAreaView style={{ marginTop: 20, flex: 1 }}>
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
                                refreshControl={<RefreshControl
                                    refreshing={isLoading}
                                    onRefresh={() => setIsLoading(true)} />}

                                ListFooterComponent={<View />}
                                ListFooterComponentStyle={{ height: 80 }}
                            />
                            :
                            isLoading ?

                                <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <ActivityIndicator style={{ marginBottom: 12 }} />
                                    <Text>Carregando...</Text>
                                </View>
                                :
                                <NoContentView
                                    title="Ops, não há nenhum requisito cadastrado"
                                    showFooterButton={true}
                                    showRefreshButton={false}
                                    footerButtonText="Novo Requisito"
                                    footerButtonOnPress={addNovoRequisito}
                                />
                        }

                    </SafeAreaView>
                </Container>
            </KeyboardAvoidingView>
        </>
    )
}

export default ListagemRequisitos;