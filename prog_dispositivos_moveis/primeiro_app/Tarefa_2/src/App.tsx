/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import RadioButton from '../../components/RadioButton/index';
// import SwitchSelector from 'react-native-switch-selector';
import opcoes from './config/opcoesGenero.json';
import {Container} from './styles';

interface switchOptions {
  label: string;
  value: number;
  activeColor: string;
}

const App = () => {
  const [generos, setGeneros] = useState<switchOptions[]>([]);
  const [nome, setNome] = useState('');
  const [generoSelecionado, setGeneroSelecionado] = useState(0);
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  useEffect(() => {
    const opcoesGeneros: switchOptions[] = opcoes;
    setGeneros(opcoesGeneros);
  }, [generos]);

  function realizaCadastro() {
    const mensagem = `Nome: ${nome} \nGênero: ${generoSelecionado} \nRua: ${rua} \nBairro: ${bairro} \nCidade: ${cidade}`;
    Alert.alert('Sucesso', mensagem);
  }

  return (
    <>
      <Container>
        <Input
          placeholder="Nome Completo"
          onChangeText={(value) => setNome(value)}
        />
        <RadioButton
          options={generos}
          initial={0}
          onPress={(value) => setGeneroSelecionado(value)}
        />
        <Input placeholder="Data de Nascimento" />
        <Input placeholder="Rua" onChangeText={(value) => setRua(value)} />
        <Input
          placeholder="Bairro"
          onChangeText={(value) => setBairro(value)}
        />
        <Input
          placeholder="Cidade"
          onChangeText={(value) => setCidade(value)}
        />
        <Button onPress={realizaCadastro}>Cadastrar</Button>
      </Container>
    </>
  );
};

export default App;
