import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import Listagem from '../pages/Listagem';
import Cadastro from '../pages/Cadastro';

const Stack = createStackNavigator();

const RoutesProva: React.FC = () => {

    return (<NavigationContainer>
        <Stack.Navigator headerMode="none">
            <Stack.Screen
                name="Listagem"
                component={Listagem}

            />
            <Stack.Screen
                name="Cadastro"
                component={Cadastro}
            />
        </Stack.Navigator>
    </NavigationContainer >)
};

export default RoutesProva;