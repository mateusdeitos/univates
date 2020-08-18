import React, { useState, useCallback } from 'react';
import { View, KeyboardAvoidingView, SafeAreaView, FlatList, Platform, StatusBar } from 'react-native';
import api from '../../services/api';
import Projeto from '../../components/Projeto';
import Header from '../../components/Header';
import { Container } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { TelaListagemProjetosProps } from '../../routes/app.routes';
import { RequisitoData } from '../ListagemRequisitos';

export interface ProjetoData {
    id: number;
    descricao: string;
    data_ini: Date;
    data_fim: Date;
}

const ListagemProjetos: React.FC<TelaListagemProjetosProps> = ({ navigation }) => {
    const [projetos, setProjetos] = useState<ProjetoData[]>([]);

    useFocusEffect(
        useCallback(() => {
            api.get('/projeto')
                .then(response => setProjetos(response.data))
                .catch(error => console.log({ error }));

        }, []));

    const addNovoProjeto = useCallback(() => {
        api.get(`/projeto`)
            .then(response => {
                const projetos: ProjetoData[] = response.data;
                console.log({ projetos })

                const maiorId: number = projetos.length === 0 ? 1 :
                    projetos
                        .map(projeto => projeto.id)
                        .sort((x, y) => {
                            if (x < y) return 1;
                            if (x > y) return -1;
                            return 0;
                        })[0];

                navigation.navigate('CadastroProjetos', { id: maiorId + 1, manutencao: 'novo' });
            });
    }, [navigation]);

    const editaProjeto = useCallback((projeto: ProjetoData) => {
        console.log({ projeto });
        navigation.navigate('CadastroProjetos', {
            ...projeto,
            manutencao: 'editar',
        });
    }, [navigation]);

    const listaRequisitos = useCallback((id_projeto: number) => {
        navigation.navigate('ListagemRequisitos', {
            id_projeto,
        });
    }, [navigation]);



    const deletaProjeto = useCallback(async (id: number) => {
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
        const projetosFiltrados = projetos.filter(projeto => projeto.id !== id);
        setProjetos(projetosFiltrados);
    }, [projetos]);

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1  }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled={false}>
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
                    <SafeAreaView style={{ marginTop: 12 }}>
                        <FlatList
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

                            ListFooterComponent={<View />}
                            ListFooterComponentStyle={{ height: 80 }}
                        />
                    </SafeAreaView>
                </Container>
            </KeyboardAvoidingView>
        </>
    )
}

export default ListagemProjetos;