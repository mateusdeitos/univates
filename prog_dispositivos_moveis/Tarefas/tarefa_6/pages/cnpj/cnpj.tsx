import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, TextInput, List, DataTable, ActivityIndicator } from 'react-native-paper';
import validaCNPJ from '../../services/validaCNPJ';

interface AtividadePrincipal {
    text: string;
    code: string;
}

interface AtividadeSecundaria {
    text: string;
    code: string;
}

interface QSA {
    qual: string;
    nome: string;
}

type DadosGerais = {

    data_situacao: string;
    complemento: string;
    tipo: string;
    nome: string;
    uf: string;
    telefone: string;
    email: string;
    situacao: string;
    bairro: string;
    logradouro: string;
    numero: string;
    cep: string;
    municipio: string;
    porte: string;
    abertura: string;
    natureza_juridica: string;
    cnpj: string;
    ultima_atualizacao: string;
    status: string;
    fantasia: string;
    efr: string;
    motivo_situacao: string;
    situacao_especial: string;
    data_situacao_especial: string;
    capital_social: string;
    billing: {
        free: boolean;
        database: boolean;
    }

}

interface Dados {
    atividade_principal: AtividadePrincipal[];
    data_situacao: string;
    complemento: string;
    tipo: string;
    nome: string;
    uf: string;
    telefone: string;
    email: string;
    atividades_secundarias: AtividadeSecundaria[];
    qsa: QSA[];
    situacao: string;
    bairro: string;
    logradouro: string;
    numero: string;
    cep: string;
    municipio: string;
    porte: string;
    abertura: string;
    natureza_juridica: string;
    cnpj: string;
    ultima_atualizacao: string;
    status: string;
    fantasia: string;
    efr: string;
    motivo_situacao: string;
    situacao_especial: string;
    data_situacao_especial: string;
    capital_social: string;
    billing: {
        free: boolean;
        database: boolean;
    }
}

const Cnpj: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [cnpj, setCnpj] = useState('');
    const [dados, setDados] = useState<Dados>({} as Dados);
    const [atividadePrincipal, setAtividadePrincipal] = useState<AtividadePrincipal[]>([]);
    const [atividadeSecundaria, setAtividadeSecundaria] = useState<AtividadeSecundaria[]>([]);
    const [qsa, setQsa] = useState<QSA[]>([]);
    const [dadosGerais, setDadosGerais] = useState<DadosGerais>({} as DadosGerais);
    const { setOptions } = useNavigation();
    const handleValidaCNPJ = async () => {
        try {
            setIsLoading(true);
            console.log(cnpj);
            const { data } = await validaCNPJ.get(`/${cnpj}`);
            setDados(data);
            const { atividade_principal, atividades_secundarias, qsa } = data;
            setAtividadePrincipal(atividade_principal);
            setAtividadeSecundaria(atividades_secundarias);
            setQsa(qsa);
            setDadosGerais(data);
        } catch (error) {
            Alert.alert(`Erro ao validar cnpj: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useLayoutEffect(() => {
        setOptions({
            headerRight: () => <Button mode="text" onPress={handleValidaCNPJ}>Validar</Button>
        });
    }, [setOptions])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={{ width: '100%' }}
                mode="outlined"
                label="Digite o CNPJ (apenas números)"
                keyboardType="number-pad"
                onSubmitEditing={handleValidaCNPJ}
                maxLength={14}
                value={cnpj}
                onChangeText={(data) => setCnpj(data)}
            />
            {isLoading ? (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="large" style={{marginBottom: 16}}/>
                    <Text>Carregando...</Text>
                </View>
            ) : (
                    <DataTable>
                        <DataTable.Title>Dados da empresa</DataTable.Title>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Data situação: {dadosGerais.data_situacao}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Abertura: {dadosGerais.abertura}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                CNPJ: {dadosGerais.cnpj}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Capital Social: {dadosGerais.capital_social}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Data_situacao: {dadosGerais.data_situacao}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Complemento: {dadosGerais.complemento}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Tipo: {dadosGerais.tipo}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Nome: {dadosGerais.nome}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Uf: {dadosGerais.uf}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Telefone: {dadosGerais.telefone}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Email: {dadosGerais.email}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Situacao: {dadosGerais.situacao}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Bairro: {dadosGerais.bairro}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Logradouro: {dadosGerais.logradouro}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Numero: {dadosGerais.numero}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Cep: {dadosGerais.cep}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Municipio: {dadosGerais.municipio}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Porte: {dadosGerais.porte}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Abertura: {dadosGerais.abertura}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Natureza_juridica: {dadosGerais.natureza_juridica}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Cnpj: {dadosGerais.cnpj}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Ultima_atualizacao: {dadosGerais.ultima_atualizacao}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Status: {dadosGerais.status}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Fantasia: {dadosGerais.fantasia}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Efr: {dadosGerais.efr}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Motivo_situacao: {dadosGerais.motivo_situacao}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Situacao_especial: {dadosGerais.situacao_especial}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Data_situacao_especial: {dadosGerais.data_situacao_especial}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                Capital_social: {dadosGerais.capital_social}
                            </DataTable.Cell>
                        </DataTable.Row>

                        {atividadePrincipal && (
                            atividadePrincipal.map(({ text, code }, index) => (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell>
                                        Atividade Principal: {text}/{code}
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ))
                        )}
                        {qsa && (
                            qsa.map(({ nome, qual }, index) => (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell>
                                        Qsa: {nome}/{qual}
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ))
                        )}
                        {atividadeSecundaria && (
                            atividadeSecundaria.map(({ code, text }, index) => (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell>
                                        Atividade Secundária: {text}/{code}
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ))
                        )}

                    </DataTable>
                )}

        </ScrollView >
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 16,
    }
})

export default Cnpj;