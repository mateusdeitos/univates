import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native';
import styles from './styles';
import { db } from '../../database/db';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native';

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

    const deleteItem = useCallback((id: number) => {
        db.transaction(tr => {
            tr.executeSql('delete from item where id = ?', [id]);
            tr.executeSql('select * from item', [], (_, { rows }) => {
                const rowsReturned: any = rows;
                const { _array } = rowsReturned;
                setData(_array);
            });
        });

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
                            onDelete={() => deleteItem(item.id)}
                            onEdit={() => editItem(item)}
                        />
                    )}
                    // numColumns={2}
                    keyExtractor={item => item.id.toString()}
                    ListFooterComponent={<View />}
                    ListFooterComponentStyle={{ height: 80 }}
                />

                {/* {data.map(item => (
                    <ItemComponent
                        id={item.id}
                        key={item.id}
                        descricao={item.descricao}
                        quantidade={item.quantidade}
                    />
                ))} */}

            </SafeAreaView>
        </View>
    )
}

export default ListagemProdutos;