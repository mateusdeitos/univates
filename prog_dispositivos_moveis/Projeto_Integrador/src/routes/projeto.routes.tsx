import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import ListagemProjetos, { ProjetoData } from '../pages/ListagemProjetos';
import CadastroProjetos from '../pages/CadastroProjetos';
import ListagemRequisitos, { RequisitoData } from '../pages/ListagemRequisitos';
import CadastroRequisitos from '../pages/CadastroRequisitos';
import LinkProjeto from '../pages/LinkProjeto';
import Home from '../pages/Home';
import Login from '../pages/Login';

export interface CadastroProjetoProps {
  id?: number;
  descricao?: string;
  link_externo?: string;
  data_ini?: Date;
  data_fim?: Date;
  onSubmit(projeto: ProjetoData): void;
}

export interface HomeProps {
  usuario: {
    id: number;
    nome: string;
    email: string;
  };
}

export interface LinkProjetoProps {
  uri: string;
}

interface ListagemRequisitosProps {
  id_projeto: number;
}

export interface CadastroRequisitosProps {
  id?: number;
  id_projeto: number;
  descricao?: string;
  data_registro?: Date;
  nivel_importancia?: number;
  nivel_dificuldade?: number;
  tempo?: number;
  tipo_requisito?: number;
  coordenadas?: string;
  fotos_uri?: string[];
  onSubmit(requisito: RequisitoData): void;
}

type HomePropsType = RouteProp<RootParamList, 'Home'>;
type HomePropsNavigationType = StackNavigationProp<RootParamList, 'Home'>;
type LoginPropsType = RouteProp<RootParamList, 'Login'>;
type LoginPropsNavigationType = StackNavigationProp<RootParamList, 'Login'>;
type ListagemProjetosPropsType = RouteProp<RootParamList, 'ListagemProjetos'>;
type ListagemProjetosPropsNavigationType = StackNavigationProp<
  RootParamList,
  'ListagemProjetos'
>;

type CadastroProjetosPropsType = RouteProp<RootParamList, 'CadastroProjetos'>;
type LinkProjetoPropsType = RouteProp<RootParamList, 'TelaLinkProjeto'>;
type CadastroProjetosPropsNavigationType = StackNavigationProp<
  RootParamList,
  'CadastroProjetos'
>;
type LinkProjetoPropsNavigationType = StackNavigationProp<
  RootParamList,
  'TelaLinkProjeto'
>;
type CadastroRequisitosPropsType = RouteProp<
  RootParamList,
  'CadastroRequisitos'
>;
type CadastroRequisitosPropsNavigationType = StackNavigationProp<
  RootParamList,
  'CadastroRequisitos'
>;
type ListagemRequisitosPropsType = RouteProp<
  RootParamList,
  'ListagemRequisitos'
>;
type ListagemRequisitosPropsNavigationType = StackNavigationProp<
  RootParamList,
  'ListagemRequisitos'
>;

export type TelaCadastroProjetosProps = {
  route: CadastroProjetosPropsType;
  navigation: CadastroProjetosPropsNavigationType;
};
export type TelaLinkProjetoProps = {
  route: LinkProjetoPropsType;
  navigation: LinkProjetoPropsNavigationType;
};
export type TelaListagemRequisitosProps = {
  route: ListagemRequisitosPropsType;
  navigation: ListagemRequisitosPropsNavigationType;
};
export type TelaCadastroRequisitosProps = {
  route: CadastroRequisitosPropsType;
  navigation: CadastroRequisitosPropsNavigationType;
};
export type TelaListagemProjetosProps = {
  route: ListagemProjetosPropsType;
  navigation: ListagemProjetosPropsNavigationType;
};
export type TelaHomeProps = {
  route: HomePropsType;
  navigation: HomePropsNavigationType;
};
export type TelaLoginProps = {
  route: LoginPropsType;
  navigation: LoginPropsNavigationType;
};

type RootParamList = {
  Login: undefined;
  Home: HomeProps;
  ListagemProjetos: undefined;
  CadastroProjetos: CadastroProjetoProps;
  TelaLinkProjeto: LinkProjetoProps;
  ListagemRequisitos: ListagemRequisitosProps;
  CadastroRequisitos: CadastroRequisitosProps;
};

const { Navigator, Screen } = createStackNavigator<RootParamList>();

const ProjetoStack: React.FC = () => {
  return (
    <Navigator headerMode="none" initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="ListagemProjetos" component={ListagemProjetos} />
      <Screen name="CadastroProjetos" component={CadastroProjetos} />
      <Screen name="TelaLinkProjeto" component={LinkProjeto} />
      <Screen name="ListagemRequisitos" component={ListagemRequisitos} />
      <Screen name="CadastroRequisitos" component={CadastroRequisitos} />
    </Navigator>
  );
};

export default ProjetoStack;
