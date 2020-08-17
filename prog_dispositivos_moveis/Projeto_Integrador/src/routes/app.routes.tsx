/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListagemProjetos from '../pages/ListagemProjetos';
import CadastroRequisitos from '../pages/CadastroRequisitos';
import { RouteProp } from "@react-navigation/native";
import { DrawerNavigationProp } from '@react-navigation/drawer';


interface ProjetosProps {
  id?: number;
  descricao?: string;
  data_ini: Date;
  data_fim: Date;
}

type RootParamList = {
  Requisitos: undefined;
  Projetos: ProjetosProps;
};

type PropsType = RouteProp<RootParamList, 'Projetos'>;
type PropsNavigationType = DrawerNavigationProp<RootParamList, 'Projetos'>;

export type TelaProjetosProps = {
  route: PropsType;
  navigation: PropsNavigationType;
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
      </App.Navigator>
    </>
  );
};

export default AppRoutes;
