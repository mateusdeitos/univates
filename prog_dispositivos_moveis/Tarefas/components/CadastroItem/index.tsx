import React from 'react';
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons';
import styles from "./styles";


export interface Item {
    id: number;
    nome: string;
    idade: number;
    endereco: string;
    email: string;

}

interface Cadastro {
    item: Item;
    onDelete(): void;
}


const Cadastro: React.FC<Cadastro> = (itemComponent) => {
    const { item, onDelete } = itemComponent;
    const { id, email, endereco, idade, nome } = item;
    return (
        <View style={styles.item}>
            <View style={styles.itemId}>
                <Text style={styles.itemIdText}>Id: {id}</Text>
            </View>
            <View style={styles.itemDescricao}>
                <Text style={styles.itemDescricaoText}>{nome}</Text>
            </View>
            <View style={styles.itemDescricao}>
                <Text style={styles.itemDescricaoText}>{email}</Text>
            </View>
            <View style={styles.itemDescricao}>
                <Text style={styles.itemDescricaoText}>{endereco}</Text>
            </View>
            <View style={styles.itemQuantidade}>
                <Text style={styles.itemQuantidadeText}>Idade: {idade}</Text>
            </View>
            <View style={styles.rodape}>
                <TouchableOpacity style={styles.rodapeButton} onPress={onDelete}>
                    <Feather name="x-circle" size={20} color="#eb0000" />
                    <Text style={{ marginHorizontal: 8 }}>Deletar</Text>
                </TouchableOpacity>
            </View>
        </View>);
};

export default Cadastro;