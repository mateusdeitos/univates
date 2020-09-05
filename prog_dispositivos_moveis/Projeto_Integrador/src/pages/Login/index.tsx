import React, { useState, useCallback } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import Input from '../../components/Input';
import {
  Container,
  LandingImage,
  ContentContainer,
  ContentText,
  LoginButton,
  SignUpButton,
  ButtonText,
} from './styles';
import loginImage from '../../../assets/login.png';
import { TelaLoginProps } from '../../routes/projeto.routes';
import Button from '../../components/Button';
import api from '../../services/api';
import { useAuth } from '../../hooks/login';

const Login: React.FC<TelaLoginProps> = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { signIn } = useAuth();

  const handleLogin = useCallback(async () => {
    await signIn({
      email,
      password: senha,
    });
  }, [email, senha, signIn]);
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <SafeAreaView style={{ marginTop: 20, flex: 1 }}>
          <Container>
            <LandingImage source={loginImage} />
            <ContentContainer>
              <ContentText>Faça o Login</ContentText>
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
                labelColor="#fff"
                keyboardType="default"
                onChangeText={data => setSenha(data)}
              />
              <LoginButton onPress={handleLogin}>
                <ButtonText>Login</ButtonText>
              </LoginButton>
              <SignUpButton onPress={handleLogin}>
                <ButtonText>Cadastre-se</ButtonText>
              </SignUpButton>
            </ContentContainer>
          </Container>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
