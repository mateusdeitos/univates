/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, Alert} from 'react-native';
import usersFile from '../src/database/users.json';
import Button from '../src/components/Button/index';
import Input from '../src/components/Input/index';
import {Container} from './styles';

interface UserData {
  name: string;
  login: string;
  pass: string;
}

const App = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    const usersData = usersFile;
    setUsers(usersData);
  }, []);

  const handleLogin = () => {
    const user = users.find((u) => u.login === login);
    if (!user) {
      Alert.alert('Usuário incorreto.');
      return;
    }

    const verificaSenha = user.pass === pass;
    if (!verificaSenha) {
      Alert.alert('senha incorreta.');
      return;
    }

    Alert.alert(`Olá ${user.name}, seja bem-vindo.`);
  };

  return (
    <>
      <KeyboardAvoidingView style={{flex: 1}} behavior={undefined} enabled>
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
          <Button onPress={handleLogin}>Entrar</Button>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

export default App;
