import { RouteProp } from "@react-navigation/native";
import { DrawerNavigationProp } from '@react-navigation/drawer';


interface DetalhesProps {
    id?: number;
    descricao?: string;
    quantidade?: number;
}

export type RootParamList = {
    Listagem: undefined;
    Detalhes: DetalhesProps;
};

type PropsType = RouteProp<RootParamList, 'Detalhes'>;
type PropsNavigationType = DrawerNavigationProp<RootParamList, 'Detalhes'>;

export type TelaDetalhesProps = {
    route: PropsType;
    navigation: PropsNavigationType;
}