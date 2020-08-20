import styled from 'styled-components/native';
import { Button } from 'react-native-paper';

interface TagProps {
    backgroundColor: string;
}

interface TagTextProps {
    color: string;
}

export const Container = styled.View`
    align-self: center;
    flex-grow: 1;
    flex-basis: 0;
    margin-bottom: 8px;
    background: #fff;
    border-radius: 24px;
    padding: 8px;
    width: 80%;
`;
export const IdTextContainer = styled.View`

    flex-direction: column;
    position: absolute;
    align-self: flex-start;
    left: 0;
    top: 0;
    justify-content: flex-end;
    align-items: flex-end;
    height: 30px;
    border-top-left-radius: 24px;
    border-bottom-right-radius: 8px;
    background-color: #346FEF;
`;
export const IdText = styled.Text`
    font-family: Archivo_400Regular;
    font-size: 12px;
    color: #fff;
    margin: 0 16px 8px 16px;
`;

export const DescricaoTextContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px;
    margin: 24px auto 24px auto;

`;
export const DescricaoText = styled.Text`
    font-size: 16px;
    color: #346FEF;
    font-family: Archivo_700Bold;
`;
export const TagContainer = styled.View<TagProps>`
    flex-direction: column;
    align-self: flex-end;
    align-items: center;
    justify-content: center;
    height: 30px;
    margin: auto 8px 8px 0;    
    border-radius: 10px;
    background: ${props => props.backgroundColor};
    padding: 6px;
`;
export const TagText = styled.Text<TagTextProps>`
    font-size: 12px;
    color: ${props => props.color};
`;
export const ButtonContainer = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
`;

export const CustomButton = styled(Button)`
    margin-right: 16px;
`;

export const ButtonText = styled.Text`
    font-size: 12px;
    margin-left: 16px;
    color: #d0cece;
`;