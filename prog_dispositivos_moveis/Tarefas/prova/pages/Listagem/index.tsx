import React, { useState, useCallback, useEffect } from 'react';
import { View, FlatList, SafeAreaView, Alert } from 'react-native';
import styles from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Cadastro, { Item } from '../../../components/CadastroItem';
import api from '../../services/api';

const Listagem: React.FC = () => {
    // const navigation = useNavigation();
    const [data, setData] = useState<Item[]>([]);
    const { navigate } = useNavigation();

    useEffect(() => {
        api.get('/usuarios').then(response => {
            setData(response.data);
        }).catch(error => {
            Alert.alert(error.message);
        });
    }, []);


    const salvar = useCallback(async ({ nome,
        idade,
        email,
        endereco, }) => {
        try {
            const response = await api.post('/usuarios', {
                nome,
                idade,
                email,
                endereco,
            });
            setData([...data, response.data]);
        } catch (error) {
            Alert.alert(error.message);
        }
    }, [data])

    const deleteItem = useCallback(async (id: number) => {
        await api.delete(`/usuarios/${id}`);
        setData(data.filter(usuario => usuario.id !== id));
    }, [data]);

    return (
        <>
            <Header
                texto="Listagem"
                icon={{
                    iconName: 'plus',
                    onPress: () => navigate('Cadastro', {
                        onSubmit: salvar,
                    }),
                }}
            />
            <View style={styles.container}>
                <SafeAreaView>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <Cadastro
                                item={item}
                                onDelete={() => deleteItem(item.id)}
                            />
                        )}
                        keyExtractor={item => item.id.toString()}
                        ListFooterComponent={<View />}
                        ListFooterComponentStyle={{ height: 80 }}

                    />


                </SafeAreaView>

            </ View>


        </>
    )
}

export default Listagem;