import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, SafeAreaView, FlatList } from 'react-native';
import api from '../../services/api';
import Projeto from '../../components/Projeto';
import Header from '../../components/Header';
import { Container } from './styles';
import { TelaProjetosProps } from '../../routes/app.routes';

interface ProjetoData {
    id: number;
    descricao: string;
    data_ini: Date;
    data_fim: Date;
}

const ListagemProjetos: React.FC<TelaProjetosProps> = ({ navigation }) => {
    const [projetos, setProjetos] = useState<ProjetoData[]>([]);

    useEffect(() => {
        api.get('/projeto')
            .then(response => setProjetos(response.data))
            .catch(error => console.log({ error }));

    }, [])

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