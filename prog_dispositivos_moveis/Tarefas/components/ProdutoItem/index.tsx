import React from 'react';
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Feather} from '@expo/vector-icons';
import styles from "./styles";


export interface Item {
    id: number;
    descricao: string;
    quantidade: number;

}

interface Produto {
    item: Item;
    onDelete(): void;
    onEdit(): void;
}


const Produto: React.FC<Produto> = (itemComponent) => {
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
};

export default Produto;