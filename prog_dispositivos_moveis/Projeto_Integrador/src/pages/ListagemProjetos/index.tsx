/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-nested-ternary */
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Platform,
  Text,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import moment from 'moment';
import api from '../../services/api';
import Projeto from '../../components/Projeto';
import Header from '../../components/Header';
import { Container, TotalBadge } from './styles';
import { TelaListagemProjetosProps } from '../../routes/app.routes';
import { RequisitoData } from '../ListagemRequisitos';
import NoContentView from '../../components/NoContentView';
import ListItem from '../../components/ListItem';

export interface ProjetoData {
  id: number;
  descricao: string;
  data_ini: Date;
  data_fim: Date;
}

const ListagemProjetos: React.FC<TelaListagemProjetosProps> = ({
  navigation,
}) => {
  const [projetos, setProjetos] = useState<ProjetoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get('/projeto')
      .then(response => setProjetos(response.data))
      .catch(error => console.log({ error }))
      .finally(() => setIsLoading(false));
  }, [isLoading]);

  const addNovoProjeto = useCallback(
    async ({ id, descricao, data_fim, data_ini }: ProjetoData) => {
      try {
        const response = await api.post('/projeto', {
          id,
          descricao,
          data_ini: moment(data_ini, 'DD/MM/YYYY').format('DD/MM/YYYY'),
          data_fim: moment(data_fim, 'DD/MM/YYYY').format('DD/MM/YYYY'),
        });
        console.log({ projetos });
        setProjetos([...projetos, response.data]);
      } catch (error) {
        console.log({ error });
      }
    },
    [projetos],
  );

  const editaProjeto = useCallback(
    async ({ id, descricao, data_fim, data_ini }: ProjetoData) => {
      console.log({ id, descricao, data_fim, data_ini });
      try {
        const response = await api.put(`/projeto/${id}`, {
          descricao,
          data_ini: moment(data_ini, 'DD/MM/YYYY').format('DD/MM/YYYY'),
          data_fim: moment(data_fim, 'DD/MM/YYYY').format('DD/MM/YYYY'),
        });

        const newProjetosArray = projetos.map(projeto =>
          projeto.id === id ? { ...response.data } : projeto,
        );

        console.log({ newProjetosArray });

        setProjetos(newProjetosArray);
      } catch (error) {
        console.log({ error });
      }
    },
    [projetos],
  );

  const listaRequisitos = useCallback(
    (id_projeto: number) => {
      navigation.navigate('ListagemRequisitos', {
        id_projeto,
      });
    },
    [navigation],
  );

  const deletaProjeto = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/projeto/${id}`);
        setProjetos(projetos.filter(projeto => projeto.id !== id));

        const response = await api.get(`/requisito?id_projeto=${id}`);
        const requisitosDoProjeto = response.data;
        Promise.all(
          requisitosDoProjeto.map(async (requisito: RequisitoData) =>
            api.delete(`/requisito/${requisito.id}`),
          ),
        );
      } catch (error) {
        console.log({ error });
      }
    },
    [projetos],
  );

  const handleNovoProjeto = useCallback(() => {
    navigation.navigate('CadastroProjetos', {
      onSubmit: addNovoProjeto,
    });
  }, [addNovoProjeto, navigation]);

  const handleEditaProjeto = useCallback(
    (projeto: ProjetoData) => {
      const { id, descricao, data_ini, data_fim } = projeto;
      navigation.navigate('CadastroProjetos', {
        onSubmit: editaProjeto,
        id,
        descricao,
        data_fim,
        data_ini,
      });
    },
    [editaProjeto, navigation],
  );
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
            onPress: handleNovoProjeto,
          }}
        />
        <Container>
          <SafeAreaView style={{ marginTop: 20, flex: 1 }}>
            {projetos.length > 0 ? (
              <FlatList
                contentContainerStyle={{ alignSelf: 'stretch' }}
                data={projetos}
                renderItem={({ item }) => (
                  <ListItem
                    id={item.id}
                    descricao={item.descricao}
                    badges={[
                      `Data inicial: ${item.data_ini}`,
                      `Data final: ${item.data_fim}`,
                    ]}
                    onLook={() => listaRequisitos(item.id)}
                    onEdit={() => handleEditaProjeto(item)}
                    onDelete={() => deletaProjeto(item.id)}
                  />
                )}
                keyExtractor={projeto => projeto.id.toString()}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={() => setIsLoading(true)}
                  />
                }
                ListFooterComponent={<View />}
                ListFooterComponentStyle={{ height: 20 }}
              />
            ) : isLoading ? (
              <View
                style={{
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ActivityIndicator style={{ marginBottom: 12 }} />
                <Text>Carregando...</Text>
              </View>
            ) : (
              <NoContentView
                title="Ops, não há nenhum projeto cadastrado"
                showFooterButton
                showRefreshButton
                footerButtonText="Novo Projeto"
                refreshButtonText="Atualizar"
                footerButtonOnPress={handleNovoProjeto}
                refreshButtonOnPress={() => setIsLoading(true)}
              />
            )}
          </SafeAreaView>
        </Container>
        <TotalBadge key="total" visible={projetos.length > 0}>
          {`Total de projetos: ${projetos.length}`}
        </TotalBadge>
      </KeyboardAvoidingView>
    </>
  );
};

export default ListagemProjetos;
