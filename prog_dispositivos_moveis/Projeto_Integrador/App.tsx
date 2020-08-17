import React from 'react';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

const App: React.FC = () => {

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
