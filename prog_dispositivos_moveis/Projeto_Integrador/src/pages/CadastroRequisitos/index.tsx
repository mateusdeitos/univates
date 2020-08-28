/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { Container } from './styles';
import { KeyboardAvoidingView, Alert, Text, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import RadioButton, { OptionsProps } from '../../components/RadioButton';
import { TelaCadastroRequisitosProps } from '../../routes/app.routes';
import api from '../../services/api';
import { ProjetoData } from '../ListagemProjetos';
import { RequisitoData } from '../ListagemRequisitos';
import { ProjetoOptions } from '../../dtos/ProjetoDTO';
import { options } from '../../defaults/options';
import Slider from '@react-native-community/slider'
import SliderInput from '../../components/SliderInput';

interface TipoRequisitoData {
  tipo: string;
  id: number;
}


const CadastroRequisitos: React.FC<TelaCadastroRequisitosProps> = ({ route, navigation }) => {
  const {
    id,
    id_projeto,
    descricao,
    manutencao,
    data_registro,
    nivel_dificuldade,
    nivel_importancia,
    tempo,
    tipo_requisito } = route.params;

  const { niveisDificuldade, niveisImportancia, tiposRequisitos } = options;
  const [listaTiposRequisitos, setListaTiposRequisitos] = useState<OptionsProps[]>([]);
  const [listaNiveisDificuldade, setListaNiveisDificuldade] = useState<OptionsProps[]>([]);
  const [listaNiveisImportancia, setListaNiveisImportancia] = useState<OptionsProps[]>([]);
  const [idRequisito, setIdRequisito] = useState(0);
  const [projetoSelecionado, setProjetoSelecionado] = useState(id_projeto);
  const [opcoesProjetos, setOpcoesProjetos] = useState<ProjetoOptions[]>([])
  const [dataRegistro, setDataRegistro] = useState(new Date());
  const [nivelDificuldade, setNivelDificuldade] = useState(0);
  const [nivelImportancia, setNivelImportancia] = useState(0);
  const [horasHomem, setHorasHomem] = useState(0);
  const [descricaoRequisito, setDescricaoRequisito] = useState('');
  const [tipoRequisito, setTipoRequisito] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setListaTiposRequisitos(tiposRequisitos);
    setListaNiveisDificuldade(niveisDificuldade);
    setListaNiveisImportancia(niveisImportancia);
  }, []);

  const inicializaForm = useCallback(() => {
    setTipoRequisito(0);
    setNivelDificuldade(1);
    setNivelImportancia(1);
    setDescricaoRequisito('');
    setHorasHomem(0);
  }, []);

  useEffect(() => {
    if (manutencao === 'novo') {
      api.get(`/requisito`)
        .then(response => {
          const requisitos: RequisitoData[] = response.data;
          const maiorId: number = requisitos.length === 0 ? 0 :
            requisitos
              .map(requisito => requisito.id)
              .sort((x, y) => {
                if (x < y) return 1;
                if (x > y) return -1;
                return 0;
              })[0];
          setIdRequisito(maiorId + 1);
        })
        .catch(error => console.log({ error }))
        .finally(() => setIsLoading(false));
    } else {
      if (id) setIdRequisito(id);
      if (descricao) setDescricaoRequisito(descricao);
      if (nivel_dificuldade) setNivelDificuldade(nivel_dificuldade);
      if (nivel_importancia) setNivelImportancia(nivel_importancia);
      if (data_registro) setDataRegistro(moment(data_registro, 'DD/MM/YYYY').toDate());
      if (tempo) setHorasHomem(tempo);
      if (tipo_requisito) setTipoRequisito(tipo_requisito);
      setIsLoading(false)
    }

  }, []);
  const salvaRequisito = useCallback(async () => {

    if (manutencao === 'editar') {

      const data = moment(dataRegistro, 'DD/MM/YYYY').format('DD/MM/YYYY');

      api.put(`/requisito/${idRequisito}`, {
        descricao: descricaoRequisito,
        id_projeto: projetoSelecionado,
        tipo_requisito: tipoRequisito,
        nivel_dificuldade: nivelDificuldade,
        nivel_importancia: nivelImportancia,
        tempo: horasHomem,
        data_registro: data,
      })
        .then(response => console.log({ response }))
        .catch(response => console.log({ response }));

    } else {

      const data = moment(dataRegistro, 'DD/MM/YYYY').format('DD/MM/YYYY');

      api.post(`/requisito`, {
        id: idRequisito,
        id_projeto: projetoSelecionado,
        descricao: descricaoRequisito,
        tipo_requisito: tipoRequisito,
        nivel_dificuldade: nivelDificuldade,
        nivel_importancia: nivelImportancia,
        tempo: horasHomem,
        data_registro: data,
      })
        .then(response => console.log({ response }))
        .catch(response => console.log({ response }));
    }
    inicializaForm();
    navigation.goBack();
  }, [inicializaForm, idRequisito, projetoSelecionado, descricaoRequisito, tipoRequisito, nivelDificuldade, nivelImportancia, horasHomem, dataRegistro]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={32}
      >
        <Header
          texto="Cadastro de requisitos"
          backgroundColor="#346FEF"
          iconLeft={{
            iconName: 'arrow-left',
            onPress: () => navigation.goBack(),
          }}
          iconRight={{
            iconName: 'floppy',
            onPress: salvaRequisito,
          }}
        />
        <ScrollView style={{ marginTop: 12 }}>
          {isLoading ? <Container><Text>Carregando</Text></Container> :

            <Container>
              <Input
                icon="hash"
                label="Id do Projeto"
                editable={false}
                accessible={false}
                value={projetoSelecionado.toString()}
              />
              <Input
                icon="hash"
                label="Id do Requisito"
                editable={false}
                accessible={false}
                value={idRequisito.toString()}
              />
              <Input
                icon="calendar"
                label="Data do registro"
                editable={false}
                accessible={false}
                value={moment(dataRegistro).format('DD/MM/YYYY')}
              />
              <RadioButton
                label="Tipo do requisito"
                options={listaTiposRequisitos}
                initial={tipoRequisito}
                onPress={(value) => setTipoRequisito(value)}
              />
              <RadioButton
                label="Nível de Dificuldade"
                options={listaNiveisDificuldade}
                initial={nivelDificuldade}
                onPress={(value) => setNivelDificuldade(value)}
              />
              <RadioButton
                label="Nível de Importância"
                options={listaNiveisImportancia}
                initial={nivelImportancia}
                onPress={(value) => setNivelImportancia(value)}
              />
              <SliderInput
                label="Horas/Homem"
                value={horasHomem}
                step={1}
                minimumValue={0}
                maximumValue={50}
                onValueChange={(value: number) => setHorasHomem(value)}
              />
              <Input
                icon="file-text"
                label="Descrição do Requisito"
                editable
                maxLength={255}
                numberOfLines={3}
                multiline
                textAlignVertical="top"
                defaultValue={descricaoRequisito}
                onChangeText={(value) => setDescricaoRequisito(value)}
              />
            </Container>
          }
        </ScrollView>

      </KeyboardAvoidingView>
    </>
  );
};
export default CadastroRequisitos;
