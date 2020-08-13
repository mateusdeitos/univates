import React from 'react';
import { Route } from 'react-native';
import ListagemProdutos from '../pages/ListagemProdutos';
import EditarProdutos from '../pages/EditarProdutos';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
    return (<NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
                name="Listagem" 
                component={ListagemProdutos}
                options={{
                    title: 'Listagem de Produtos',
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen 
                name="Detalhes" 
                component={EditarProdutos} 
                options={{
                    title: 'Detalhes do Produto',
                    headerTitleAlign: 'center'
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>)
};

export default Routes;