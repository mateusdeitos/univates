import React, { useCallback } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Home: React.FC = () => {
    const {navigate} = useNavigation();
    const handleValidaCPF = useCallback(() => {
        Linking.openURL('https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp')
            .catch(error => console.log({ error }));
    }, []);
    return (
        <View style={styles.container}>
            <Button style={styles.button} color="#4EC5F1" mode="contained" onPress={()=>navigate('CNPJ')}>Validar CNPJ</Button>
            <Button style={styles.button} color="#0df2c8" mode="contained" onPress={handleValidaCPF}>Validar CPF</Button>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',        
    },
    button: {
        marginRight: 8,
    }
})

export default Home;