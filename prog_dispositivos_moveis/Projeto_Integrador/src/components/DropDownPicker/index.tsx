/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { lighten } from 'polished';
import DropDownPicker from 'react-native-dropdown-picker';
import DropDownPickerProps from 'react-native-dropdown-picker';
import { Label } from './styles';

interface PickerProps extends DropDownPickerProps {
  label?: string;
  searchablePlaceholder?: string;
}

const Picker: React.FC<PickerProps> = ({
  label,
  searchablePlaceholder,
  ...rest
}) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <DropDownPicker
        {...rest}
        searchablePlaceholder={searchablePlaceholder || 'Pesquise um item'}
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderWidth: 2,
          borderColor: '#346fef',
          backgroundColor: lighten(0.2, '#346fef'),
          width: '100%',
          height: 60,
        }}
        containerStyle={{ height: 60, marginBottom: 8 }}
        labelStyle={{ color: '#000000' }}
        selectedLabelStyle={{ color: '#000000' }}
        activeItemStyle={{ fontWeight: 'bold' }}
        dropDownStyle={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderWidth: 2,
          borderColor: '#346fef',
          backgroundColor: lighten(0.2, '#346fef'),
        }}
        arrowSize={20}
        arrowColor="#346fef"
        searchable
      />
    </>
  );
};
export default Picker;
