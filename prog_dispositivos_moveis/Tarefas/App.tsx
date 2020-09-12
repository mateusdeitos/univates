import { StatusBar, View } from 'react-native';
import React from 'react';
import Routes from './tarefa_3/routes';
import Map from './tarefa_5/pages/map';
import ValidadorCpfCnpj from './tarefa_6/pages';


const App = () => {

  return (
    <View style={{ backgroundColor: '#EBEEF8', flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <ValidadorCpfCnpj />
    </View>
  );
}


export default App;
