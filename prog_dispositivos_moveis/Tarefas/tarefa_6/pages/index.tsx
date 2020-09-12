import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './home/home';
import Cnpj from './cnpj/cnpj';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
    return (<NavigationContainer>
        <Navigator>
            <Screen name="Home" component={Home} />
            <Screen name="CNPJ" component={Cnpj} />
        </Navigator>

    </NavigationContainer>
    )
};

export default Routes;