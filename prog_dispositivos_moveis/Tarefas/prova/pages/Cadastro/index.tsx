import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';



const Cadastro: React.FC = ({ route }: any) => {
    const routeParams = route.params;
    const { onSubmit } = routeParams;
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState(0);
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const { goBack } = useNavigation();

    const handleSalvarNovoCadastro = useCallback(async () => {
        onSubmit({
            nome,
            idade,
            email,
            endereco,
        });
        goBack();
    }, [nome, idade, email, endereco, goBack])

    return (
        <>
            <Header
                texto="Novo Cadastro"
                icon={{ iconName: 'chevron-left', onPress: () => goBack() }}
            />
            <View style={styles.container}>
                <Input
                    label="Nome"
                    defaultValue={nome}
                    onChangeText={(value) => setNome(value)}
                />
                <Input
                    label="E-mail"
                    defaultValue={email}
                    onChangeText={(value) => setEmail(value)}
                />
                <Input
                    label="Endereco"
                    defaultValue={endereco}
                    onChangeText={(value) => setEndereco(value)}
                />
                <Input
                    label="Idade"
                    keyboardType="number-pad"
                    defaultValue={idade?.toString()}
                    onChangeText={(value) => setIdade(Number(value))} />
                <Button onPress={handleSalvarNovoCadastro}>Salvar</Button>
            </View>
        </>
    );
};

export default Cadastro;