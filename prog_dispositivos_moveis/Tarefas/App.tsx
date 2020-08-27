import { StatusBar, View } from 'react-native';
import React from 'react';
import Routes from './tarefa_3/routes';
import Map from './tarefa_4/pages/map';


const App = () => {

  return (
    <View style={{ backgroundColor: '#EBEEF8', flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Map />
    </View>
  );
}


export default App;
