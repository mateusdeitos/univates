import React from 'react';
import {FloatingActionButton} from './styles';

import {RectButtonProperties} from 'react-native-gesture-handler';
import { ViewStyle, StyleProp } from 'react-native';

interface Props  {
  icon: string;
  acessibilityLabel?: string;
  small?: boolean;
  color?: string;
  disabled?: boolean;  
  visible?: boolean;  
  loading?: boolean;  
  onPress(): void;
  onLongPress?(): void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const FABButton: React.FC<Props> = ({children, ...rest}) => {
  return (
    <FloatingActionButton {...rest}/>
  );
};

export default FABButton;
