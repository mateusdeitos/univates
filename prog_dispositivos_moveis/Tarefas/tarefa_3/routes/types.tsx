import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";


interface DetalhesProps {
    id: number;
    descricao: string;
    quantidade: number;
}

export type RootStackParamList = {
    Listagem: undefined;
    Detalhes: DetalhesProps;
};

type TelaDetalhesType = RouteProp<RootStackParamList, 'Detalhes'>;
type TelaDetalhesNavigatiionType = StackNavigationProp<RootStackParamList, 'Detalhes'>;

export type TelaDetalhesProps = {
    route: TelaDetalhesType;
    navigation: TelaDetalhesNavigatiionType;
}