import * as React from 'react';
import { WebView } from 'react-native-webview';

const Webview: React.FC = () => {
  return <WebView source={{ uri: 'https://reactnative.dev/' }} />;
};

export default Webview;
