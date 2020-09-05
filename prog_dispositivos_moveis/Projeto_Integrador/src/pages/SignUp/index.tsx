/* eslint-disable no-console */
import React, { useState, useCallback } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Input from '../../components/Input';
import {
  Container,
  LandingImage,
  ContentContainer,
  ContentText,
  SignUpButton,
  ButtonText,
  GoBackButton,
} from './styles';
import signupImage from '../../../assets/signup.png';
import { TelaSignUpProps } from '../../routes/projeto.routes';
import api from '../../services/api';
import { User } from '../../hooks/login';

export interface UserData extends User {
  senha: string;
}

const SignUp: React.FC<TelaSignUpProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');

  const handleCadastro = useCallback(async () => {
    api
      .get(`/users`)
      .then(response => {
        const users: UserData[] = response.data;
        const maiorId: number =
          users.length === 0
            ? 0
            : users
                .map((user: UserData) => user.id)
                .sort((x, y) => {
                  if (x < y) return 1;
                  if (x > y) return -1;
                  return 0;
                })[0];
        api.post('/users', {
          nome,
          email,
          senha,
          id: maiorId + 1,
        });
      })
      .catch(error => console.log({ error }))
      .finally(() => navigation.navigate('Login'));
  }, [email, navigation, nome, senha]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <SafeAreaView style={{ marginTop: 20, flex: 1 }}>
          <Container>
            <LandingImage source={signupImage} />
            <ContentContainer>
              <ContentText>Faça seu cadastro</ContentText>
              <Input
                editable
                label="Nome completo"
                labelColor="#fff"
                keyboardType="default"
                onChangeText={data => setNome(data)}
              />
              <Input
                editable
                label="E-mail"
                labelColor="#fff"
                keyboardType="email-address"
                onChangeText={data => setEmail(data)}
              />
              <Input
                editable
                label="Senha"
                secureTextEntry
                labelColor="#fff"
                keyboardType="default"
                returnKeyType="send"
                returnKeyLabel="send"
                onSubmitEditing={handleCadastro}
                onChangeText={data => setSenha(data)}
              />
              <SignUpButton onPress={handleCadastro}>
                <Icon name="check" size={20} color="#fff" />
                <ButtonText>Finalizar Cadastro</ButtonText>
              </SignUpButton>
              <GoBackButton onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={20} color="#fff" />
                <ButtonText>Retornar ao Login</ButtonText>
              </GoBackButton>
            </ContentContainer>
          </Container>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
