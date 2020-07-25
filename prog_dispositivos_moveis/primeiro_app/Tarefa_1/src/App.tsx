/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import usersFile from '../src/database/users.json';
import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import {Container} from './styles';

interface UserData {
  name: string;
  login: string;
  pass: string;
  tip: string;
}

const App = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    const usersData = usersFile;
    setUsers(usersData);
  }, []);

  const realizaLogin = () => {
    const user = users.find((u) => u.login === login);
    if (!user) {
      Alert.alert('Erro', 'Usuário inexistente.');
      return;
    }

    const verificaSenha = user.pass === pass;
    if (!verificaSenha) {
      Alert.alert('Erro', 'Senha incorreta! Gostaria de ver a dica de senha?', [
        {
          text: 'Sim',
          onPress: () => Alert.alert('Dica:', user.tip),
          style: 'default',
        },
        {
          text: 'Não',
          style: 'cancel',
        },
      ]);
      return;
    }

    Alert.alert('Sucesso', `Olá ${user.name}, seja bem-vindo.`);
  };

  return (
    <>
      <Container>
        <Input
          placeholder="Usuário"
          onChangeText={(event) => setLogin(event)}
        />
        <Input
          secureTextEntry
          placeholder="Senha"
          onChangeText={(event) => setPass(event)}
        />
        <Button onPress={realizaLogin}>Entrar</Button>
      </Container>
    </>
  );
};

export default App;
