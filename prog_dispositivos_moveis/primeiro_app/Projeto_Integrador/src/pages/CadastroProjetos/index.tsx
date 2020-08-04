/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Header from '../../../../components/Header';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import {Container} from './styles';
import {KeyboardAvoidingView, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const CadastroProjetos: React.FC = ({navigation}: any) => {
  const [exibirDatePicker, setExibirDatePicker] = useState(false);
  const [dataInicial, setDataInicial] = useState(null);

  function mudaData(data: any) {
    setExibirDatePicker(false);
    const dataSelecionada = data || new Date();
    setDataInicial(dataSelecionada);
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
            <Input icon="home" label="Id do projeto" editable={false} />
            <Input icon="home" label="Nome do projeto" editable={false} />
            <Input
              icon="calendar"
              label="Data de início"
              onFocus={mostraDatePicker}
              placeholder="Data de Nascimento"
              value={moment(dataInicial || new Date()).format('DD/MM/YYYY')}
            />
            <DateTimePickerModal
              date={new Date()}
              display="spinner"
              isVisible={exibirDatePicker}
              onConfirm={mudaData}
              onCancel={() => setExibirDatePicker(false)}
              locale="pt_BR"
            />
            <Button onPress={realizaCadastro}>Cadastrar</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
export default CadastroProjetos;
