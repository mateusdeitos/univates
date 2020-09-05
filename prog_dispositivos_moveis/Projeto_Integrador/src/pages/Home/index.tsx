/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import landingImage from '../../../assets/landing.png';
import Header from '../../components/Header';
import {
  Container,
  LandingImage,
  WelcomeText,
  ButtonText,
  RouteButton,
  ContentContainer,
  LogOffButton,
} from './styles';
import { TelaHomeProps } from '../../routes/projeto.routes';
import { useAuth } from '../../hooks/login';

const Home: React.FC<TelaHomeProps> = ({ navigation }) => {
  const { signOut, user } = useAuth();
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Header texto="" backgroundColor="#346FEF" />
        <SafeAreaView style={{ marginTop: 20, flex: 1 }}>
          <Container>
            <LandingImage source={landingImage} />
            <ContentContainer>
              <WelcomeText>Seja bem-vindo</WelcomeText>
              <WelcomeText>{user.nome}!</WelcomeText>
              <RouteButton
                onPress={() => navigation.navigate('ListagemProjetos')}
              >
                <ButtonText>Ir para Projetos...</ButtonText>
              </RouteButton>
              <LogOffButton onPress={signOut}>
                <Icon name="log-out" size={20} />
                <ButtonText>Sair...</ButtonText>
              </LogOffButton>
            </ContentContainer>
          </Container>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};
export default Home;
