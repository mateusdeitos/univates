import React, {useState} from 'react';
import Input from '../Input';
import {TextInputProperties} from 'react-native';
import DateTimePickerModal, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import moment from 'moment';

interface InputProps extends TextInputProperties {
  icon?: string;
  label?: string;
}

interface DatePickerProps extends DateTimePickerProps {
  input: InputProps;
  dataInicial?: Date;
  display?: 'spinner' | 'default' | 'clock' | 'calendar' | undefined;
}

const DatePicker: React.FC<DatePickerProps> = ({
  input,
  onCancel,
  onConfirm,
  dataInicial,
  locale,
  display,
  isVisible,
}) => {
  return (
    <>
      <Input
        icon={input.icon}
        label={input.label}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        placeholder={input.placeholder}
        value={moment(dataInicial || new Date()).format('DD/MM/YYYY')}
        {...input}
      />
      <DateTimePickerModal
        date={new Date()}
        display={display}
        isVisible={isVisible}
        onConfirm={onConfirm}
        onCancel={onCancel}
        locale={locale}
      />
    </>
  );
};

export default DatePicker;
