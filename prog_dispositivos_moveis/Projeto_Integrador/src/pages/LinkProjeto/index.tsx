/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import {
  TelaLinkProjetoProps,
} from '../../routes/projeto.routes';
import Header from '../../components/Header';

const LinkProjeto: React.FC<TelaLinkProjetoProps> = ({ route, navigation }) => {
  const { uri } = route.params;
  return (
    <>
      <Header
        texto="Link Externo"
        backgroundColor="#346FEF"
        iconLeft={{
          iconName: 'arrow-left',
          onPress: () => navigation.goBack(),
        }}
      />
      <WebView
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        startInLoadingState
        source={{ uri }}
      />

    </>
  );
};

export default LinkProjeto;
