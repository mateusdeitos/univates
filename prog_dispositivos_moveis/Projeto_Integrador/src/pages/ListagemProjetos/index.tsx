import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, KeyboardAvoidingView, SafeAreaView, FlatList } from 'react-native';
import api from '../../services/api';
import Projeto from '../../components/Projeto';
import Header from '../../components/Header';
import { Container } from './styles';
import { TelaProjetosProps } from '../../routes/app.routes';
import FABButton from '../../components/FloatingActionButton';
import { useFocusEffect } from '@react-navigation/native';

interface ProjetoData {
    id: number;
    descricao: string;
    data_ini: Date;
    data_fim: Date;
}

const ListagemProjetos: React.FC<TelaProjetosProps> = ({ navigation }) => {
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
        console.log({projeto});
        navigation.navigate('CadastroProjetos', {
            ...projeto,
            manutencao: 'editar',
        });
    }, [navigation]);

    const deletaProjeto = useCallback(async (id: number) => {
        await api.delete(`/projeto/${id}`);
        const projetosFiltrados = projetos.filter(projeto => projeto.id !== id);
        setProjetos(projetosFiltrados);
    }, [projetos])

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={undefined}
                enabled={false}>
                <Header
                    texto="Listagem de projetos"
                    backgroundColor="#346FEF"
                    icon={{
                        iconName: 'menu',
                        onPress: () => navigation.toggleDrawer(),
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
                <FABButton icon="plus" color="#346FEF" onPress={addNovoProjeto} />
            </KeyboardAvoidingView>
        </>
    )
}

export default ListagemProjetos;