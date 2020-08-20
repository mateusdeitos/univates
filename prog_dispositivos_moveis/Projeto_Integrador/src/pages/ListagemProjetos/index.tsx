import React, { useState, useCallback, useEffect } from 'react';
import { View, KeyboardAvoidingView, SafeAreaView, FlatList, RefreshControl, Platform, Text, Pressable } from 'react-native';
import api from '../../services/api';
import Projeto from '../../components/Projeto';
import Header from '../../components/Header';
import { Container, TotalBadge } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { TelaListagemProjetosProps } from '../../routes/app.routes';
import { RequisitoData } from '../ListagemRequisitos';
import { Badge, ActivityIndicator } from 'react-native-paper';
import NoContentView from '../../components/NoContentView';
import { RectButton } from 'react-native-gesture-handler';

export interface ProjetoData {
    id: number;
    descricao: string;
    data_ini: Date;
    data_fim: Date;
}

const ListagemProjetos: React.FC<TelaListagemProjetosProps> = ({ navigation }) => {
    const [projetos, setProjetos] = useState<ProjetoData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(useCallback(() => {
        api.get('/projeto')
            .then(response => setProjetos(response.data))
            .catch(error => console.log({ error }))
            .finally(() => setIsLoading(false));
    }, [isLoading]));

    const addNovoProjeto = useCallback(() => {
        navigation.navigate('CadastroProjetos', { manutencao: 'novo' });
        setIsLoading(true);
    }, [navigation]);

    const editaProjeto = useCallback((projeto: ProjetoData) => {
        console.log({ projeto });
        navigation.navigate('CadastroProjetos', {
            ...projeto,
            manutencao: 'editar',
        });
        setIsLoading(true);
    }, [navigation]);

    const listaRequisitos = useCallback((id_projeto: number) => {
        navigation.navigate('ListagemRequisitos', {
            id_projeto,
        });
    }, [navigation]);

    const deletaProjeto = useCallback(async (id: number) => {
        setProjetos(projetos.filter(projeto => projeto.id !== id));
        api.delete(`/projeto/${id}`)
            .then(response => console.log({ response }))
            .catch(response => console.log({ response }));
        api.get(`/requisito?id_projeto=${id}`)
            .then(response => {
                const requisitosDoProjeto = response.data;
                Promise.all(requisitosDoProjeto.map(async ({ id }: RequisitoData) => (
                    await api.delete(`/requisito/${id}`)
                )))
            })
            .catch(response => console.log({ response }))
            .finally(() => setIsLoading(true))

    }, [projetos]);

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <Header
                    texto="Listagem de projetos"
                    backgroundColor="#346FEF"
                    iconLeft={{
                        iconName: 'menu',
                        onPress: () => navigation.toggleDrawer(),
                    }}
                    iconRight={{
                        iconName: 'plus',
                        onPress: addNovoProjeto,
                    }}
                />
                <Container>
                    <SafeAreaView style={{ marginTop: 20, flex: 1 }}>
                        {projetos.length > 0 ?
                            <FlatList
                                contentContainerStyle={{ alignSelf: 'stretch' }}
                                data={projetos}
                                renderItem={({ item }) => (
                                    <Projeto
                                        id={item.id}
                                        descricao={item.descricao}
                                        dataIni={item.data_ini}
                                        dataFim={item.data_fim}
                                        onLook={() => listaRequisitos(item.id)}
                                        onEdit={() => editaProjeto(item)}
                                        onDelete={() => deletaProjeto(item.id)}
                                    />
                                )}
                                keyExtractor={projeto => projeto.id.toString()}
                                refreshControl={<RefreshControl
                                    refreshing={isLoading}
                                    onRefresh={() => setIsLoading(true)} />}
                                ListFooterComponent={<View />}
                                ListFooterComponentStyle={{ height: 20 }}
                            />
                            :
                            isLoading ?

                                <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <ActivityIndicator style={{ marginBottom: 12 }} />
                                    <Text>Carregando...</Text>
                                </View>
                                :
                                <NoContentView
                                    title="Ops, não há nenhum projeto cadastrado"
                                    showFooterButton={true}
                                    showRefreshButton={true}
                                    footerButtonText="Novo Projeto"
                                    refreshButtonText="Atualizar"
                                    footerButtonOnPress={addNovoProjeto}
                                    refreshButtonOnPress={() => setIsLoading(true)}
                                />
                        }
                    </SafeAreaView>
                </Container>
                <TotalBadge
                    key='total'
                    visible={projetos.length > 0}
                >
                    {`Total de projetos: ${projetos.length}`}
                </TotalBadge>
            </KeyboardAvoidingView>
        </>
    )
}

export default ListagemProjetos;