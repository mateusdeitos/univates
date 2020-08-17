/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ListagemProjetos from '../pages/ListagemProjetos';
import CadastroRequisitos from '../pages/CadastroRequisitos';

const App = createDrawerNavigator();

const AppRoutes: React.FC = () => {
  return (
    <>
      <App.Navigator
        drawerType="front"
        drawerStyle={{backgroundColor: '#F4F4F4'}}>
        <App.Screen name="Projetos" component={ListagemProjetos} />
        <App.Screen name="Requisitos" component={CadastroRequisitos} />
      </App.Navigator>
    </>
  );
};

export default AppRoutes;
