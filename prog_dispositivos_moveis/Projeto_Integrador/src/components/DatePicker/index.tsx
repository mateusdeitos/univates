import React from 'react';
import { TextInputProperties, Keyboard } from 'react-native';
import DateTimePickerModal, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import Input from '../Input';

interface InputProps extends TextInputProperties {
  icon?: string;
  label?: string;
}

interface DatePickerProps extends DateTimePickerProps {
  input: InputProps;
  display?: 'spinner' | 'default' | 'clock' | 'calendar' | undefined;
}

const DatePicker: React.FC<DatePickerProps> = ({
  input,
  onCancel,
  onConfirm,
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
        value={input.value}
        onKeyPress={() => Keyboard.dismiss()}
        {...input}
      />
      <DateTimePickerModal
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
