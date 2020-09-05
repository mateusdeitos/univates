import React, { useState, useCallback } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
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
              <ContentText>Faça seu Login</ContentText>
              <Input
                editable
                label="E-mail"
                labelColor="#fff"
                keyboardType="email-address"
                onChangeText={data => setEmail(data)}
                returnKeyType="next"
                returnKeyLabel="next"
              />
              <Input
                editable
                label="Senha"
                secureTextEntry
                labelColor="#fff"
                keyboardType="default"
                returnKeyType="send"
                returnKeyLabel="send"
                onSubmitEditing={handleLogin}
                onChangeText={data => setSenha(data)}
              />
              <LoginButton onPress={handleLogin}>
                <Icon name="log-in" size={20} color="#fff" />
                <ButtonText>Login</ButtonText>
              </LoginButton>
              <SignUpButton onPress={() => navigation.navigate('SignUp')}>
                <Icon name="file-text" size={20} color="#fff" />
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
