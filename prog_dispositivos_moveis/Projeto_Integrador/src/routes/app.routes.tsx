import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ProjetoStack from './projeto.routes';
import Home from '../pages/Home';
import { ProjetoData } from '../pages/ListagemProjetos';
import { RequisitoData } from '../pages/ListagemRequisitos';

export interface CadastroProjetoProps {
  id?: number;
  descricao?: string;
  link_externo?: string;
  data_ini?: Date;
  data_fim?: Date;
  onSubmit(projeto: ProjetoData): void;
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
type HomePropsNavigationType = DrawerNavigationProp<RootParamList, 'Home'>;
type ListagemProjetosPropsType = RouteProp<RootParamList, 'ListagemProjetos'>;
type ListagemProjetosPropsNavigationType = DrawerNavigationProp<
  RootParamList,
  'ListagemProjetos'
> &
  StackNavigationProp<RootParamList, 'ListagemProjetos'>;

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

type RootParamList = {
  Home: undefined;
  ListagemProjetos: undefined;
  CadastroProjetos: CadastroProjetoProps;
  TelaLinkProjeto: LinkProjetoProps;
  ListagemRequisitos: ListagemRequisitosProps;
  CadastroRequisitos: CadastroRequisitosProps;
};

const App = createDrawerNavigator<RootParamList>();

const AppRoutes: React.FC = () => {
  return (
    <>
      <App.Navigator
        drawerType="front"
        initialRouteName="Home"
        drawerStyle={{ backgroundColor: '#F4F4F4' }}
      >
        <App.Screen name="Home" options={{ title: 'Home' }} component={Home} />
        <App.Screen
          name="ListagemProjetos"
          options={{ title: 'Projetos' }}
          component={ProjetoStack}
        />
      </App.Navigator>
    </>
  );
};

export default AppRoutes;
