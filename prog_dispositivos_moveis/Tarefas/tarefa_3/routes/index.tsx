import React, { useEffect } from 'react';
import { Route } from 'react-native';
import ListagemProdutos from '../pages/ListagemProdutos';
import EditarProdutos from '../pages/EditarProdutos';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
// import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from './types';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Feather} from '@expo/vector-icons';
import { db } from '../database/db';
// const Stack = createStackNavigator<RootStackParamList>();

const Drawer = createDrawerNavigator<RootParamList>();

const Routes: React.FC = () => {

    useEffect(() => {
        db.transaction(tr => {
          tr.executeSql("create table if not exists item (id integer primary key autoincrement, descricao text, quantidade integer);");
          tr.executeSql('delete from item');
          tr.executeSql('insert into item (descricao, quantidade) values (?, ?)', ['Produto A', Math.ceil(Math.random() * 100)]);
          tr.executeSql('insert into item (descricao, quantidade) values (?, ?)', ['Produto B', Math.ceil(Math.random() * 100)]);
          tr.executeSql('insert into item (descricao, quantidade) values (?, ?)', ['Produto C', Math.ceil(Math.random() * 100)]);
          tr.executeSql('insert into item (descricao, quantidade) values (?, ?)', ['Produto D', Math.ceil(Math.random() * 100)]);
          tr.executeSql('insert into item (descricao, quantidade) values (?, ?)', ['Produto E', Math.ceil(Math.random() * 100)]);
          tr.executeSql('insert into item (descricao, quantidade) values (?, ?)', ['Produto F', Math.ceil(Math.random() * 100)]);
    
        });
    
      }, []);

    return (<NavigationContainer>
        <Drawer.Navigator>
            <Drawer.Screen
                name="Listagem"
                component={ListagemProdutos}
                options={{ 
                    title: 'Produtos',
                    drawerIcon: () => 
                        <Feather 
                            name="list" 
                            size={20}
                            color="#270052"
                        />
                }}
            />
            <Drawer.Screen
                name="Detalhes"
                component={EditarProdutos}
                options={{
                    unmountOnBlur: true,
                    title: 'Novo Produto',
                    drawerIcon: () => 
                        <Feather 
                            name="plus"  
                            size={20}
                            color="#270052"
                        />
                }}
                initialParams={{
                    id: 0,
                    quantidade: 0,
                    descricao: '',
                }}
            />
        </Drawer.Navigator>
    </NavigationContainer>)
};

export default Routes;