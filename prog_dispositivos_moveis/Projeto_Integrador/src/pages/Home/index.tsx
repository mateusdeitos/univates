import React from 'react';
import { View, Text, KeyboardAvoidingView, SafeAreaView, Platform } from 'react-native';
import landingImage from '../../../assets/landing.png'
import { RectButton } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import { Container, LandingImage, WelcomeText, ButtonText, RouteButton, ContentContainer } from './styles';
import { TelaHomeProps } from '../../routes/app.routes';

const Home: React.FC<TelaHomeProps> = ({ navigation }) => {
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Header
          texto=""
          backgroundColor="#346FEF"
          iconLeft={{
            iconName: 'menu',
            onPress: () => navigation.toggleDrawer(),
          }}
        />
        <SafeAreaView style={{ marginTop: 20, flex: 1 }}>
          <Container>
            <LandingImage source={landingImage} />
            <ContentContainer >
              <WelcomeText >Seja bem-vindo!</WelcomeText>
              <RouteButton onPress={() => navigation.navigate('ListagemProjetos')}>
                <ButtonText>Ir para Projetos...</ButtonText>
              </RouteButton>
            </ContentContainer>
          </Container>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};
export default Home;
