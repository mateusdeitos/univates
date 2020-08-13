import React, { useState, useCallback, useEffect } from 'react';
import { View, FlatList, SafeAreaView, Alert } from 'react-native';
import styles from './styles';
import { db } from '../../database/db';
import { useFocusEffect } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Produto, { Item } from '../../../components/ProdutoItem';
import { sendNotification } from '../../notifications/notification';

const ListagemProdutos: React.FC = ({ navigation }: any) => {
    // const navigation = useNavigation();
    const [data, setData] = useState<Item[]>([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarDescricao, setSnackbarDescricao] = useState('');

    // Utilizei UseFocusEffect para que ao retornar da tela de Edição atualize a listagem
    // É necessário utilizar o useCallback para evitar um loop infinito
    useFocusEffect(
        useCallback(() => {
            db.transaction(tr => {
                tr.executeSql('select * from item', [], (_, { rows }) => {
                    const rowsReturned: any = rows;
                    const { _array } = rowsReturned;
                    setData(_array);
                });
            });
        }, [navigation])
    )

    const deleteItem = useCallback(({ descricao, id, quantidade }: Item) => {
        db.transaction(tr => {
            tr.executeSql('delete from item where id = ?', [id]);
            tr.executeSql('select * from item', [], (_, { rows }) => {
                const rowsReturned: any = rows;
                const { _array } = rowsReturned;
                setData(_array);
                sendNotification({
                    title: 'Item excluído!',
                    body: `Produto: ${descricao}`
                })
            });
        });
    }, []);

    useEffect(useCallback(() => {
        if (data.length % 10 === 0) {
            setSnackbarDescricao(`Quantidade de itens é multiplo de 10`);
            setShowSnackbar(true);
        }
    }, [data]), [data])

    const editItem = useCallback(({ descricao, id, quantidade }: Item) => {
        navigation.navigate('Detalhes', {
            id,
            descricao,
            quantidade,
        })
    }, [])

    return (
        <>
            <Header
                texto="Produtos"
                icon={{
                    iconName: 'menu',
                    onPress: () => navigation.toggleDrawer(),
                }}
            />
            <View style={styles.container}>
                <SafeAreaView>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <Produto
                                item={item}
                                onDelete={() => deleteItem(item)}
                                onEdit={() => editItem(item)}
                            />
                        )}
                        keyExtractor={item => item.id.toString()}
                        ListFooterComponent={<View />}
                        ListFooterComponentStyle={{ height: 80 }}

                    />


                </SafeAreaView>

            </ View>
            {showSnackbar &&
                <Snackbar
                    visible={showSnackbar}
                    onDismiss={() => setShowSnackbar(false)}
                    duration={2000}
                    action={{
                        label: 'Ok',
                        onPress: () => setShowSnackbar(false)
                    }}
                >{snackbarDescricao}
                </Snackbar>
            }
            <Footer texto={`Total de registros: ${data.length}`} />


        </>
    )
}

export default ListagemProdutos;