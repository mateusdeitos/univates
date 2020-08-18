/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListagemProjetos from '../pages/ListagemProjetos';
import CadastroProjetos from '../pages/CadastroProjetos';
import CadastroRequisitos from '../pages/CadastroRequisitos';
import { RouteProp } from "@react-navigation/native";
import { DrawerNavigationProp } from '@react-navigation/drawer';


interface ProjetosProps {
  id?: number;
  descricao?: string;
  data_ini: Date;
  data_fim: Date;
}
interface RequisitosProps {
  id: number;
}
interface CadastroProjetoProps {
  id: number;
  descricao?: string;
  data_ini?: Date;
  data_fim?: Date;
  manutencao: 'novo' | 'editar';
}

type RootParamList = {
  Requisitos: RequisitosProps;
  Projetos: ProjetosProps;
  CadastroProjetos: CadastroProjetoProps;
};

type ProjetosPropsType = RouteProp<RootParamList, 'Projetos'>;
type ProjetosPropsNavigationType = DrawerNavigationProp<RootParamList, 'Projetos'>;
type RequisitosPropsType = RouteProp<RootParamList, 'Requisitos'>;
type RequisitosPropsNavigationType = DrawerNavigationProp<RootParamList, 'Requisitos'>;
type CadastroProjetosPropsType = RouteProp<RootParamList, 'CadastroProjetos'>;
type CadastroProjetosPropsNavigationType = DrawerNavigationProp<RootParamList, 'CadastroProjetos'>;

export type TelaProjetosProps = {
  route: ProjetosPropsType;
  navigation: ProjetosPropsNavigationType;
}
export type TelaRequisitosProps = {
  route: RequisitosPropsType;
  navigation: RequisitosPropsNavigationType;
}
export type TelaCadastroProjetosProps = {
  route: CadastroProjetosPropsType;
  navigation: CadastroProjetosPropsNavigationType;
}
const App = createDrawerNavigator<RootParamList>();

const AppRoutes: React.FC = () => {
  return (
    <>
      <App.Navigator
        drawerType="front"
        drawerStyle={{ backgroundColor: '#F4F4F4' }}>
        <App.Screen name="Projetos" component={ListagemProjetos} />
        <App.Screen name="Requisitos" component={CadastroRequisitos} />
        <App.Screen name="CadastroProjetos" component={CadastroProjetos} />
      </App.Navigator>
    </>
  );
};

export default AppRoutes;
