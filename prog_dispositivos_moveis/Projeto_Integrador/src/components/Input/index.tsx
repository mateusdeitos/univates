import React, { useState } from 'react';
import { TextInputProperties, Text } from 'react-native';
import { Container, TextInput, InputIcon, Label } from './styles';
import { shade } from 'polished';

interface InputProps extends TextInputProperties {
  icon?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, icon, editable, value, ...rest }) => {
  const [customHeight, setCustomHeight] = useState(60);
  return (
    <>
      {label && <Label>{label}</Label>}
      <Container customHeight={customHeight} backgroundColor={editable ? '#4ec5f1' : '#999591'}>
        {icon && (
          <InputIcon name={icon} size={20} color={shade(0.2, editable ? '#4ec5f1' : '#999591')} />
        )}
        {editable ?
          <TextInput
            {...rest}
            onContentSizeChange={(event) =>
              setCustomHeight(Math.max(60, event.nativeEvent.contentSize.height))
            }
          />
          :
          <Text>{value}</Text>
        }
      </Container>
    </>
  );
};

export default Input;




// import React, { useState } from 'react';
// import { TextInputProps } from 'react-native';
// import { Input as StyledInput, Container } from './styles';

// interface Props extends TextInputProps {
//   label: string;
// }

// export type InputProps = Omit<Props, 'selectionColor'>;

// const Input: React.FC<InputProps> = ({ label, ...rest }) => {
//   const [customHeight, setCustomHeight] = useState(60);
//   return (
//     <>
//       <Container
//         customHeight={customHeight}>
//         <StyledInput
//           mode="outlined"
//           multiline={true}
//           label={label}
//           onContentSizeChange={(event) =>
//             setCustomHeight(60 * Math.floor(event.nativeEvent.contentSize.height / 60) + 1)
//           }
//           numberOfLines={1}
//           {...rest}

//         />
//       </Container>
//     </>
//   );
// };

// export default Input;
