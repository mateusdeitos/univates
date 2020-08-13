import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { TelaDetalhesProps } from '../../routes/types';
import { db } from '../../database/db';



const EditarProdutos: React.FC<TelaDetalhesProps> = ({ route }) => {
    const navigation = useNavigation();
    const { id, descricao, quantidade } = route.params;
    const [novaDescricao, setNovaDescricao] = useState(descricao);
    const [novaQuantidade, setNovaQuantidade] = useState(quantidade);

    const salvaProduto = useCallback(() => {
        db.transaction(tr => {
            tr.executeSql("UPDATE item SET quantidade = ?, descricao = ? where id = ?", [novaQuantidade, novaDescricao, id]);
        });
        navigation.goBack();
    }, [navigation, novaDescricao, novaQuantidade, id])

    return (
        <View style={styles.container}>
            <Input 
                label="Id" 
                editable={false} 
                value={id.toString()} />
            <Input 
                label="Descrição" 
                defaultValue={descricao} 
                onChangeText={(value) => setNovaDescricao(value)}/>
            <Input 
                label="Quantidade" 
                keyboardType="number-pad" 
                defaultValue={quantidade.toString()} 
                onChangeText={(value) => setNovaQuantidade(Number(value))} />
            <Button onPress={salvaProduto}>Salvar</Button>
        </View>);
};

export default EditarProdutos;