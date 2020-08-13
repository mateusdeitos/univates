import React, { useCallback, useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Snackbar } from 'react-native-paper'
import { TelaDetalhesProps } from '../../routes/types';
import { db } from '../../database/db';
import Header from '../../../components/Header';



const EditarProdutos: React.FC<TelaDetalhesProps> = ({ navigation, route }) => {
    // const navigation = useNavigation();
    const { id, descricao, quantidade } = route.params;
    const [novoId, setNovoId] = useState(id);
    const [novaDescricao, setNovaDescricao] = useState(descricao);
    const [novaQuantidade, setNovaQuantidade] = useState(quantidade);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarText, setSnackbarText] = useState('');

    useEffect(() => {
        if (!id || id === 0) {
            db.transaction(tr => {
                tr.executeSql('select id as maxId from item order by id desc limit 1', [], (_, { rows }) => {
                    const rowsReturned: any = rows;
                    const { _array } = rowsReturned;
                    const [newId] = _array;
                    const { maxId } = newId;
                    setNovoId(maxId + 1);
                })
            })
        } else {
            setNovoId(id);
        }
    }, [id]);

    const salvaProduto = useCallback(() => {

        if (novaDescricao && novaQuantidade) {
            if (id !== 0) {
                db.transaction(tr => {
                    tr.executeSql("UPDATE item SET quantidade = ?, descricao = ? where id = ?", [novaQuantidade, novaDescricao, id]);
                });
                setSnackbarText(`Item atualizado!`);
            } else {
                db.transaction(tr => {
                    tr.executeSql('insert into item (descricao, quantidade) values (?, ?)', [novaDescricao, novaQuantidade]);
                });
                setSnackbarText(`Item inserido!`);
            }
            setShowSnackbar(true);
        }

    }, [navigation, novaDescricao, novaQuantidade, id]);

    const voltarTelaAnterior = useCallback(() => {

        // Limpa o state da tela ao sair
        navigation.setParams({ id: 0, quantidade: 0, descricao: '' });
        navigation.navigate('Listagem')

    }, [navigation]);


    return (
        <>
            <Header
                texto="Detalhes do Produto"
                icon={{
                    iconName: 'arrow-left',
                    onPress: voltarTelaAnterior,
                }}
            />
            <View style={styles.container}>
                <Input
                    label="Id"
                    editable={false}
                    value={novoId?.toString()} />
                <Input
                    label="Descrição"
                    defaultValue={descricao}
                    onChangeText={(value) => setNovaDescricao(value)}
                />
                <Input
                    label="Quantidade"
                    keyboardType="number-pad"
                    defaultValue={quantidade?.toString()}
                    onChangeText={(value) => setNovaQuantidade(Number(value))} />
                <Button onPress={salvaProduto}>Salvar</Button>
            </View>
            {showSnackbar &&
                <Snackbar
                    visible={showSnackbar}
                    onDismiss={voltarTelaAnterior}
                    duration={2000}
                    action={{
                        label: 'Ok',
                        onPress: voltarTelaAnterior
                    }}
                >{snackbarText}
                </Snackbar>
            }
        </>
    );
};

export default EditarProdutos;