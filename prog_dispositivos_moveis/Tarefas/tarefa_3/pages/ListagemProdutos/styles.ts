import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    item: {
        backgroundColor: "#fff",
        borderColor: "#000a47",
        borderWidth: 1,
        borderRadius: 16,
        flexGrow: 1,
        flexBasis: 0,
        margin: 4,
        padding: 10
    },
    itemId: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 8

    },
    itemIdText: {
        fontSize: 12,
        color: '#616161',
    },
    itemDescricao: {
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemDescricaoText: {
        fontSize: 16,
        color: '#000a47',
        fontWeight: 'bold',
    },
    itemQuantidade: {
        marginTop: 12,
        alignItems: 'baseline',
        justifyContent: 'flex-start'
    },
    itemQuantidadeText: {
        fontSize: 12,
        padding: 12,
        color: '#32264d',
    },
    rodape: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rodapeButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default styles;