/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Alert, KeyboardAvoidingView, ScrollView} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import RadioButton from '../../components/RadioButton/index';
import opcoes from './config/opcoesGenero.json';
import {Container} from './styles';
import moment from 'moment';

interface switchOptions {
  label: string;
  value: number;
  activeColor: string;
}

const App = () => {
  const [generos, setGeneros] = useState<switchOptions[]>([]);
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState(new Date(2000, 0, 1));
  const [exibirDatePicker, setExibirDatePicker] = useState(false);
  const [generoSelecionado, setGeneroSelecionado] = useState('Masculino');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  useEffect(() => {
    const opcoesGeneros: switchOptions[] = opcoes;
    setGeneros(opcoesGeneros);
  }, [generos]);

  function realizaCadastro() {
    const mensagem = `Nome: ${nome} \nData de Nascimento: ${moment(
      dataNascimento,
    ).format(
      'DD/MM/YYYY',
    )} \nGênero: ${generoSelecionado} \nRua: ${rua} \nBairro: ${bairro} \nCidade: ${cidade}`;
    Alert.alert('Sucesso', mensagem);
  }

  function mostraDatePicker() {
    setExibirDatePicker(true);
  }

  function mudaData(data: any) {
    setExibirDatePicker(false);
    const dataSelecionada = data || new Date();
    setDataNascimento(dataSelecionada);
  }

  function mudaGenero(data: any) {
    setGeneroSelecionado(data === 0 ? 'Masculino' : 'Feminino');
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={undefined}
        enabled={false}>
        <ScrollView style={{marginTop: 48}}>
          <Container>
            <Input
              icon="user"
              placeholder="Nome Completo"
              onChangeText={(value) => setNome(value)}
            />
            <RadioButton
              options={generos}
              initial={0}
              onPress={(value) => mudaGenero(value)}
            />
            <Input
              icon="calendar"
              onFocus={mostraDatePicker}
              placeholder="Data de Nascimento"
              value={moment(dataNascimento).format('DD/MM/YYYY')}
            />
            <DateTimePickerModal
              date={new Date(2000, 1, 1)}
              display="spinner"
              isVisible={exibirDatePicker}
              onConfirm={mudaData}
              onCancel={() => setExibirDatePicker(false)}
              locale="pt_BR"
            />

            <Input
              icon="map"
              placeholder="Rua"
              onChangeText={(value) => setRua(value)}
            />
            <Input
              icon="map-pin"
              placeholder="Bairro"
              onChangeText={(value) => setBairro(value)}
            />
            <Input
              icon="home"
              placeholder="Cidade"
              onChangeText={(value) => setCidade(value)}
            />

            <Button onPress={realizaCadastro}>Cadastrar</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default App;
