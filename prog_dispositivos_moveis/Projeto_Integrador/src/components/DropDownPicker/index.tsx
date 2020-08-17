/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Label} from './styles';
import {lighten} from 'polished';
import DropDownPicker from 'react-native-dropdown-picker';
import DropDownPickerProps from 'react-native-dropdown-picker';

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
          borderColor: '#4ec5f1',
          backgroundColor: lighten(0.2, '#4ec5f1'),
          width: '100%',
          height: 60,
        }}
        containerStyle={{height: 60, marginBottom: 8}}
        labelStyle={{color: '#000000'}}
        selectedLabelStyle={{color: '#000000'}}
        activeItemStyle={{fontWeight: 'bold'}}
        dropDownStyle={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderWidth: 2,
          borderColor: '#4ec5f1',
          backgroundColor: lighten(0.2, '#4ec5f1'),
        }}
        arrowSize={20}
        arrowColor="#4ec5f1"
        searchable
      />
    </>
  );
};

/**
 *
 *   width: 100%;
  height: 60px;
  background: ${lighten(0.2, '#4ec5f1')};
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #4ec5f1;
 *
 *
*/
export default Picker;
