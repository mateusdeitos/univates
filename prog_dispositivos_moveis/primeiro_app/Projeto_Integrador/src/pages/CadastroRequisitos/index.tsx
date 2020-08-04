/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Header from '../../../../components/Header';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import {Container} from './styles';
import {KeyboardAvoidingView, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from '../../../../components/DatePicker';
import Picker from '../../../../components/DropDownPicker';
import moment from 'moment';

const CadastroRequisitos: React.FC = ({navigation}: any) => {
  const [exibirDatePicker, setExibirDatePicker] = useState(false);
  const [dataInicial, setDataInicial] = useState(null);

  function mudaData(data: any) {
    setExibirDatePicker(false);
    setDataInicial(data || new Date());
  }

  function mostraDatePicker() {
    setExibirDatePicker(true);
  }
  function realizaCadastro() {
    const mensagem = '';
    Alert.alert('Sucesso', mensagem);
  }
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={undefined}
        enabled={false}>
        <Header
          texto="Cadastro de projetos"
          backgroundColor="#346FEF"
          icon={{
            iconName: 'menu',
            onPress: () => navigation.toggleDrawer(),
          }}
        />
        <ScrollView style={{marginTop: 48}}>
          <Container>
            <Input icon="home" label="Id do Requisito" editable={false} />
            <Picker
              label="Projeto"
              placeholder="Selecione um projeto"
              items={[
                {
                  label: 'Projeto A',
                  value: '1',
                },
                {
                  label: 'Projeto B',
                  value: '2',
                },
              ]}
            />
            <DatePicker
              date={new Date()}
              display="default"
              isVisible={exibirDatePicker}
              onConfirm={mudaData}
              onCancel={() => setExibirDatePicker(false)}
              locale="pt_BR"
              input={{
                icon: 'calendar',
                label: 'Data de início',
                onFocus: mostraDatePicker,
                value: moment(dataInicial || new Date()).format('DD/MM/YYYY'),
              }}
            />
            <DatePicker
              date={new Date()}
              display="default"
              isVisible={exibirDatePicker}
              onConfirm={mudaData}
              onCancel={() => setExibirDatePicker(false)}
              locale="pt_BR"
              input={{
                icon: 'calendar',
                label: 'Data estimada de término',
                onFocus: mostraDatePicker,
                value: moment(dataInicial || new Date()).format('DD/MM/YYYY'),
              }}
            />
          </Container>
        </ScrollView>

        <Button onPress={realizaCadastro}>Cadastrar</Button>
      </KeyboardAvoidingView>
    </>
  );
};
export default CadastroRequisitos;
