/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container } from './styles';
import { KeyboardAvoidingView, Alert, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Picker from '../../components/DropDownPicker';
import moment from 'moment';
import RadioButton, { OptionsProps } from '../../components/RadioButton';
import { TelaCadastroRequisitosProps } from '../../routes/app.routes';
import api from '../../services/api';
import { ProjetoData } from '../ListagemProjetos';
import { RequisitoData } from '../ListagemRequisitos';
import { ProjetoOptions } from '../../dtos/ProjetoDTO';
import { options } from '../../defaults/options';

interface TipoRequisitoData {
  tipo: string;
  id: number;
}


const CadastroRequisitos: React.FC<TelaCadastroRequisitosProps> = ({ route, navigation }) => {
  const {
    id,
    id_projeto,
    data_registro,
    descricao,
    manutencao,
    nivel_dificuldade,
    nivel_importancia,
    tempo,
    tipo_requisito } = route.params;

  const { niveisDificuldade, niveisImportancia, tiposRequisitos } = options;
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
        });
    } else {
      if (id) setIdRequisito(id);
      if (descricao) setDescricaoRequisito(descricao);
      if (data_registro) setDataRegistro(moment(data_registro, 'DD/MM/YYYY').toDate());
      if (nivel_dificuldade) setNivelDificuldade(nivel_dificuldade);
      if (nivel_importancia) setNivelImportancia(nivel_importancia);
      if (tempo) setHorasHomem(tempo);
      if (tipo_requisito) setTipoRequisito(tipo_requisito);
    }

  }, []);

  useEffect(() => {
    api.get('/projeto').then(response => {
      const projetos: ProjetoData[] = response.data;
      setOpcoesProjetos(projetos.map(({ id, descricao }) => (
        {
          label: descricao,
          value: id,
          selected: id === id_projeto,
        }
      )));
    })

    setIsLoading(false);
  }, []);
  const salvaRequisito = useCallback(async () => {

    if (manutencao === 'editar') {

      api.put(`/requisito/${idRequisito}`, {
        descricao: descricao,
        id_projeto: projetoSelecionado,
        tipo_requisito: tipoRequisito,
        nivel_dificuldade: nivelDificuldade,
        nivel_importancia: nivelImportancia,
        tempo: horasHomem,
        data_registro: moment(dataRegistro, 'DD/MM/YYYY').format('DD/MM/YYYY'),
      })
        .then(response => console.log({ response }))
        .catch(response => console.log({ response }));

    } else {

      api.post(`/requisito`, {
        id: idRequisito,
        id_projeto: projetoSelecionado,
        descricao: descricaoRequisito,
        tipo_requisito: tipoRequisito,
        nivel_dificuldade: nivelDificuldade,
        nivel_importancia: nivelImportancia,
        tempo: horasHomem,
        data_registro: moment(dataRegistro, 'DD/MM/YYYY').format('DD/MM/YYYY'),
      })
        .then(response => console.log({ response }))
        .catch(response => console.log({ response }));
    }
    inicializaForm();
    navigation.goBack();
  }, [inicializaForm, idRequisito, projetoSelecionado, descricao, tipoRequisito, nivelDificuldade, nivelImportancia, horasHomem, dataRegistro]);

  function realizaCadastro() {
    const mensagem =
      `Projeto selecionado: ${projetoSelecionado}\n` +
      `Id do requisito: ${id}\n` +
      `Data do registro: ${dataRegistro}\n` +
      `Tipo do requisito: ${tipoRequisito}\n` +
      `Nível de dificuldade: ${nivelDificuldade}\n` +
      `Nível de Importância: ${nivelImportancia}\n` +
      `Horas/Homem: ${horasHomem}\n` +
      `Descrição: ${descricaoRequisito}\n`;
    Alert.alert('Sucesso', mensagem);
    inicializaForm();
  }
  function inicializaForm() {
    setTipoRequisito(0);
    setNivelDificuldade(1);
    setNivelImportancia(1);
    setDescricaoRequisito('');
    setHorasHomem(0);
  }
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={undefined}
        enabled={false}>
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
                options={tiposRequisitos}
                initial={tipoRequisito}
                onPress={(value) => setTipoRequisito(value)}
              />
              <RadioButton
                label="Nível de Dificuldade"
                options={niveisDificuldade}
                initial={nivelDificuldade}
                onPress={(value) => setNivelDificuldade(value)}
              />
              <RadioButton
                label="Nível de Importância"
                options={niveisImportancia}
                initial={nivelImportancia}
                onPress={(value) => setNivelImportancia(value)}
              />
              <Input
                icon="clock"
                label="Horas/Homem estimado"
                editable={true}
                keyboardType="number-pad"
                defaultValue={horasHomem.toString()}
                onChangeText={(value) => setHorasHomem(Number(value))}
              />
              <Input
                icon="file-text"
                label="Descrição do Requisito"
                editable
                maxLength={255}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={descricaoRequisito}
                onChangeText={(value) => setDescricaoRequisito(value)}
              />
            </Container>
          }
        </ScrollView>

        {/* <Button onPress={realizaCadastro}>Cadastrar</Button> */}
      </KeyboardAvoidingView>
    </>
  );
};
export default CadastroRequisitos;
