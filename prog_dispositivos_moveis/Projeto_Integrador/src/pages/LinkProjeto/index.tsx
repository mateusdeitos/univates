import * as React from 'react';
import { WebView } from 'react-native-webview';
import {
  LinkProjetoProps,
  TelaLinkProjetoProps,
} from '../../routes/app.routes';
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
      <WebView source={{ uri }} />
    </>
  );
};

export default LinkProjeto;
