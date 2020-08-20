import React from 'react';
import { Image } from 'react-native';
import img from '../../../assets/no-content.png';
import { Container, FooterButton, RefreshButton, TitleText, FooterButtonText, RefreshButtonText } from './styles';
import { FontAwesome5 } from '@expo/vector-icons'
interface Props {
    title: string;
    showFooterButton: boolean;
    showRefreshButton: boolean;
    footerButtonText?: string;
    refreshButtonText?: string;
    footerButtonOnPress?(): void;
    refreshButtonOnPress?(): void;
}

const NoContentView: React.FC<Props> = ({
    title,
    showFooterButton,
    footerButtonText,
    footerButtonOnPress,
    showRefreshButton,
    refreshButtonText,
    refreshButtonOnPress,
    children }) => {
    return (
        <Container >
            <TitleText>{title}</TitleText>
            <Image style={{ marginTop: 20 }} source={img}></Image>

            {showFooterButton &&
                <FooterButton onPress={footerButtonOnPress}>
                    <FontAwesome5 name="plus" color="#fff" />
                    <FooterButtonText>{footerButtonText}</FooterButtonText>
                </FooterButton>
            }
            {showRefreshButton &&

                <RefreshButton onPress={refreshButtonOnPress}>
                    <FontAwesome5 name="redo-alt" color="#346FEF" />
                    <RefreshButtonText>{refreshButtonText}</RefreshButtonText>
                </RefreshButton>
            }
            {children}
        </Container>
    )
};

export default NoContentView;