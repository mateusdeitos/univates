import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListagemProjetos from '../pages/ListagemProjetos';
import CadastroProjetos from '../pages/CadastroProjetos';
import ListagemRequisitos from '../pages/ListagemRequisitos';
import CadastroRequisitos from '../pages/CadastroRequisitos';
import LinkProjeto from '../pages/LinkProjeto';

const { Navigator, Screen } = createStackNavigator();

const ProjetoStack: React.FC = () => {
  return (
    <Navigator headerMode="none">
      <Screen name="ListagemProjetos" component={ListagemProjetos} />
      <Screen name="CadastroProjetos" component={CadastroProjetos} />
      <Screen name="TelaLinkProjeto" component={LinkProjeto} />
      <Screen name="ListagemRequisitos" component={ListagemRequisitos} />
      <Screen name="CadastroRequisitos" component={CadastroRequisitos} />
    </Navigator>
  );
};

export default ProjetoStack;
