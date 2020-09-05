/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Platform,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import moment from 'moment';
import api from '../../services/api';
import Header from '../../components/Header';
import { Container } from './styles';
import { TelaListagemRequisitosProps } from '../../routes/projeto.routes';
import NoContentView from '../../components/NoContentView';
import ListItem from '../../components/ListItem';
import { options } from '../../defaults/options';

export interface RequisitoData {
  id: number;
  id_projeto: number;
  descricao: string;
  data_registro: Date;
  nivel_importancia: number;
  nivel_dificuldade: number;
  tempo: number;
  tipo_requisito: number;
  coordenadas: string;
  fotos_uri: string[];
}

const ListagemRequisitos: React.FC<TelaListagemRequisitosProps> = ({
  route,
  navigation,
}) => {
  const { id_projeto } = route.params;
  const [requisitos, setRequisitos] = useState<RequisitoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/requisito?id_projeto=${id_projeto}`)
      .then(response => setRequisitos(response.data))
      .catch(error => console.log({ error }))
      .finally(() => setIsLoading(false));
  }, [id_projeto, isLoading]);

  const addNovoRequisito = useCallback(
    async (requisito: RequisitoData) => {
      try {
        const response = await api.post(`/requisito`, {
          ...requisito,
          id_projeto,
        });
        setRequisitos([...requisitos, response.data]);
      } catch (error) {
        console.log({ error });
      }
    },
    [id_projeto, requisitos],
  );

  const editaRequisito = useCallback(
    async (requisito: RequisitoData) => {
      try {
        const { id } = requisito;
        const response = await api.put(`/requisito/${id}`, {
          ...requisito,
          id_projeto,
        });
        const novosRequisitos = requisitos.map(req =>
          req.id === id ? { ...response.data } : req,
        );
        setRequisitos(novosRequisitos);
      } catch (error) {
        console.log({ error });
      }
    },
    [id_projeto, requisitos],
  );

  const deletaRequisito = useCallback(
    async (id: number) => {
      setRequisitos(requisitos.filter(req => req.id !== id));
      api
        .delete(`/requisito/${id}`)
        .then(response => console.log({ response }))
        .catch(response => console.log({ response }));
    },
    [requisitos],
  );

  const handleNovoRequisito = useCallback(() => {
    navigation.navigate('CadastroRequisitos', {
      onSubmit: addNovoRequisito,
      id_projeto,
    });
  }, [addNovoRequisito, id_projeto, navigation]);

  const handleEditRequisito = useCallback(
    (requisito: RequisitoData) => {
      navigation.navigate('CadastroRequisitos', {
        ...requisito,
        onSubmit: editaRequisito,
        id_projeto,
      });
    },
    [editaRequisito, id_projeto, navigation],
  );

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
            onPress: handleNovoRequisito,
          }}
        />
        <Container>
          <SafeAreaView style={{ marginTop: 20, flex: 1 }}>
            {requisitos.length > 0 ? (
              <FlatList
                data={requisitos}
                renderItem={({ item }) => (
                  <ListItem
                    id={item.id}
                    descricao={item.descricao}
                    onEdit={() => handleEditRequisito(item)}
                    onDelete={() => deletaRequisito(item.id)}
                    badges={[
                      {
                        text: `Registro: ${moment(item.data_registro).format(
                          'DD/MM/YYYY',
                        )}`,
                      },
                      {
                        text: `Tempo estimado: ${item.tempo} Hora Homem`,
                      },
                      {
                        text: `${
                          options.tiposRequisitos[item.tipo_requisito].label
                        }`,
                        backgroundColor: `${
                          options.tiposRequisitos[item.tipo_requisito]
                            .activeColor
                        }`,
                      },
                      {
                        text: `Dificuldade: ${
                          options.niveisDificuldade[item.nivel_dificuldade]
                            .label
                        }`,
                        backgroundColor: `${
                          options.niveisDificuldade[item.nivel_dificuldade]
                            .activeColor
                        }`,
                      },
                      {
                        text: `Importância: ${
                          options.niveisImportancia[item.nivel_importancia]
                            .label
                        }`,
                        backgroundColor: `${
                          options.niveisImportancia[item.nivel_importancia]
                            .activeColor
                        }`,
                      },
                    ]}
                  />
                )}
                keyExtractor={requisito => requisito.id.toString()}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={() => setIsLoading(true)}
                  />
                }
                ListFooterComponent={<View />}
                ListFooterComponentStyle={{ height: 80 }}
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
                title="Ops, não há nenhum requisito cadastrado"
                showFooterButton
                showRefreshButton={false}
                footerButtonText="Novo Requisito"
                footerButtonOnPress={handleNovoRequisito}
              />
            )}
          </SafeAreaView>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

export default ListagemRequisitos;
