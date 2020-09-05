/* eslint-disable no-console */
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import ProjetoStack from './projeto.routes';
import { useAuth } from '../hooks/login';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }
  console.log(user);
  // return <ProjetoStack />;
  return user ? <ProjetoStack /> : <AuthRoutes />;
};

export default Routes;
