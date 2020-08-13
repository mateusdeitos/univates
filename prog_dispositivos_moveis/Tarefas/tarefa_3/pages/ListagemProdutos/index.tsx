import React, { useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native';
import styles from './styles';
import { db } from '../../database/db';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Snackbar, ThemeProvider } from 'react-native-paper'

interface Item {
    id: number;
    descricao: string;
    quantidade: number;

}

interface ItemComponent {
    item: Item;
    onDelete(): void;
    onEdit(): void;
}


const ItemComponent: React.FC<ItemComponent> = (itemComponent) => {
    const { item, onDelete, onEdit } = itemComponent;
    const { id, quantidade, descricao } = item;
    return (
        <View style={styles.item}>
            <View style={styles.itemId}>
                <Text style={styles.itemIdText}>Id: {id}</Text>
            </View>
            <View style={styles.itemDescricao}>
                <Text style={styles.itemDescricaoText}>{descricao}</Text>
            </View>
            <View style={styles.itemQuantidade}>
                <Text style={styles.itemQuantidadeText}>Quantidade: {quantidade}</Text>
            </View>
            <View style={styles.rodape}>
                <TouchableOpacity style={styles.rodapeButton} onPress={onEdit}>
                    <Feather name="edit" size={20} color="#3a6f02" />
                    <Text style={{ marginHorizontal: 8 }}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rodapeButton} onPress={onDelete}>
                    <Feather name="x-circle" size={20} color="#eb0000" />
                    <Text style={{ marginHorizontal: 8 }}>Deletar</Text>
                </TouchableOpacity>
            </View>
        </View>);
}

const ListagemProdutos: React.FC = () => {
    const navigation = useNavigation();
    const [data, setData] = useState<Item[]>([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [deletedItem, setDeletedItem] = useState<Item>();

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
            });
        });
        setDeletedItem({ id, descricao, quantidade });
        setShowSnackbar(true);
    }, []);

    const editItem = useCallback(({ descricao, id, quantidade }: Item) => {
        navigation.navigate('Detalhes', {
            id,
            descricao,
            quantidade,
        })
    }, [])

    return (
        <View style={styles.container}>
            <SafeAreaView>

                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <ItemComponent
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

            {showSnackbar &&
                <View style={{flex: 1, justifyContent: "space-between"}}>
                    <Snackbar
                        visible={showSnackbar}
                        onDismiss={() => setShowSnackbar(false)}
                        duration={2000}
                        action={{
                            label: 'Ok',
                            
                            onPress: () => setShowSnackbar(false)
                        }}
                    >
                        {deletedItem?.descricao} foi deletado
                    </Snackbar>
                </View>}
        </ View>
    )
}

export default ListagemProdutos;