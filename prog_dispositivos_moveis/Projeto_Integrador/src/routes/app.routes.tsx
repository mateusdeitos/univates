/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import ProjetoStack from './projeto.routes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface CadastroProjetoProps {
  id: number;
  descricao?: string;
  data_ini?: Date;
  data_fim?: Date;
  manutencao: 'novo' | 'editar';
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
  manutencao: 'novo' | 'editar';
}

type ListagemProjetosPropsType = RouteProp<RootParamList, 'ListagemProjetos'>;
type ListagemProjetosPropsNavigationType = DrawerNavigationProp<RootParamList, 'ListagemProjetos'> & StackNavigationProp<RootParamList, 'ListagemProjetos'>;

type CadastroProjetosPropsType = RouteProp<RootParamList, 'CadastroProjetos'>;
type CadastroProjetosPropsNavigationType = StackNavigationProp<RootParamList, 'CadastroProjetos'>;
type CadastroRequisitosPropsType = RouteProp<RootParamList, 'CadastroRequisitos'>;
type CadastroRequisitosPropsNavigationType = StackNavigationProp<RootParamList, 'CadastroRequisitos'>;
type ListagemRequisitosPropsType = RouteProp<RootParamList, 'ListagemRequisitos'>;
type ListagemRequisitosPropsNavigationType = StackNavigationProp<RootParamList, 'ListagemRequisitos'>;

export type TelaCadastroProjetosProps = {
    route: CadastroProjetosPropsType;
    navigation: CadastroProjetosPropsNavigationType;
}
export type TelaListagemRequisitosProps = {
    route: ListagemRequisitosPropsType;
    navigation: ListagemRequisitosPropsNavigationType;
}
export type TelaCadastroRequisitosProps = {
    route: CadastroRequisitosPropsType;
    navigation: CadastroRequisitosPropsNavigationType;
}
export type TelaListagemProjetosProps = {
  route: ListagemProjetosPropsType;
  navigation: ListagemProjetosPropsNavigationType;
}

type RootParamList = {
  ListagemProjetos: undefined;
  CadastroProjetos: CadastroProjetoProps;
  ListagemRequisitos: ListagemRequisitosProps;
  CadastroRequisitos: CadastroRequisitosProps;
};


const App = createDrawerNavigator<RootParamList>();

const AppRoutes: React.FC = () => {
  return (
    <>
      <App.Navigator
        drawerType="front"
        drawerStyle={{ backgroundColor: '#F4F4F4' }}>
        <App.Screen name="ListagemProjetos" options={{ title: 'Projetos' }} component={ProjetoStack} />
      </App.Navigator>
    </>
  );
};

export default AppRoutes;
