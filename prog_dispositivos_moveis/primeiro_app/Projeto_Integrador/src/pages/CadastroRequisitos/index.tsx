/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Header from '../../../../components/Header';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import {Container} from './styles';
import {KeyboardAvoidingView, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Picker from '../../../../components/DropDownPicker';
import moment from 'moment';
import RadioButton from '../../../../components/RadioButton';

const CadastroRequisitos: React.FC = ({navigation}: any) => {
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [idRequisito, setIdRequisito] = useState(1);
  const [dataRegistro] = useState(new Date());
  const [nivelDificuldade, setNivelDificuldade] = useState(0);
  const [nivelImportancia, setNivelImportancia] = useState(0);
  const [horasHomem, setHorasHomem] = useState(0);
  const [descricaoRequisito, setDescricaoRequisito] = useState('');
  const [tipoRequisito, setTipoRequisito] = useState(0);

  function realizaCadastro() {
    const mensagem =
      `Projeto selecionado: ${projetoSelecionado}\n` +
      `Id do requisito: ${idRequisito}\n` +
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
    setIdRequisito(idRequisito + 1);
    setTipoRequisito(0);
    setNivelDificuldade(0);
    setNivelImportancia(0);
    setDescricaoRequisito('');
    setHorasHomem(0);
  }
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={undefined}
        enabled={false}>
        <Header
          texto="Cadastro de requisitos"
          backgroundColor="#346FEF"
          icon={{
            iconName: 'menu',
            onPress: () => navigation.toggleDrawer(),
          }}
        />
        <ScrollView style={{marginTop: 12}}>
          <Container>
            <Picker
              label="Projeto"
              searchablePlaceholder="Pesquise um projeto"
              placeholder="Selecione um projeto"
              onChangeItem={({value}) => setProjetoSelecionado(value)}
              items={[
                {
                  label: 'Projeto A',
                  value: '1',
                },
                {
                  label: 'Projeto B',
                  value: '2',
                },
              ]}
            />
            <Input
              icon="hash"
              label="Id do Requisito"
              editable={false}
              value={idRequisito.toString()}
            />
            <Input
              icon="calendar"
              label="Data do registro"
              editable={false}
              defaultValue={moment(dataRegistro).format('DD/MM/YYYY')}
            />
            <RadioButton
              label="Tipo do requisito"
              options={[
                {
                  label: 'Funcional',
                  value: 0,
                  activeColor: '#4EC5F1',
                },
                {
                  label: 'Não Funcional',
                  value: 1,
                  activeColor: '#14ad00',
                },
              ]}
              initial={tipoRequisito}
              onPress={(value) => setTipoRequisito(value)}
            />
            <RadioButton
              label="Nível de Dificuldade"
              options={[
                {
                  label: 'Baixo',
                  value: 0,
                  activeColor: '#4EC5F1',
                },
                {
                  label: 'Médio',
                  value: 1,
                  activeColor: '#cb6506',
                },
                {
                  label: 'Alto',
                  value: 2,
                  activeColor: '#ff0000',
                },
              ]}
              initial={nivelDificuldade}
              onPress={(value) => setNivelDificuldade(value)}
            />
            <RadioButton
              label="Nível de Importância"
              options={[
                {
                  label: 'Baixo',
                  value: 0,
                  activeColor: '#4EC5F1',
                },
                {
                  label: 'Médio',
                  value: 1,
                  activeColor: '#cb6506',
                },
                {
                  label: 'Alto',
                  value: 2,
                  activeColor: '#ff0000',
                },
              ]}
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
        </ScrollView>

        <Button onPress={realizaCadastro}>Cadastrar</Button>
      </KeyboardAvoidingView>
    </>
  );
};
export default CadastroRequisitos;
