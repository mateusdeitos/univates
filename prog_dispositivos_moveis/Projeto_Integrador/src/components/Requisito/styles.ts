import styled, { css } from 'styled-components/native';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';


export const Container = styled.View`
    align-self: center;
    flex-grow: 1;
    flex-basis: 0;
    margin-bottom: 8px;
    background: #fff;
    border-color: #4EC5F1;
    border-width: 1px;
    border-radius: 8px;
    padding: 8px;
    width: 100%;
    ${css`
        elevation: 8;
    `}
`;
export const IdTextContainer = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 8px;
`;
export const IdText = styled.Text`
    font-size: 12px;
    color: #616161;
`;

export const DescricaoTextContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px;

`;
export const DescricaoText = styled.Text`
    font-size: 16px;
    color: #346FEF;
    font-weight: bold;
`;
export const DataContainer = styled.View`
    flex-direction: column;
    justify-content: space-between;
    padding: 8px;
`;
export const DataIniText = styled.Text`
    font-size: 16px;
    color: #999591;
`;
export const DataFimText = styled.Text`
    font-size: 16px;
    color: #999591;
`;
export const ButtonContainer = styled.View`
    flex-direction: row;
    align-items: center;
    border-color: #d0cece;
    border-width: 1px;
    border-radius: 8px;
    justify-content: space-around;
`;

export const ButtonText = styled.Text`
    font-size: 12px;
    margin-left: 16px;
    color: #d0cece;
`;