import { StatusBar, View } from 'react-native';
import React from 'react';
import Routes from './tarefa_3/routes';
import Map from './tarefa_5/pages/map';
import ValidadorCpfCnpj from './tarefa_6/pages';
import RoutesProva from './prova/routes';


const App = () => {

  return (
    <View style={{ backgroundColor: '#346FEF', flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#346FEF"/>
      <RoutesProva />
    </View>
  );
}


export default App;
