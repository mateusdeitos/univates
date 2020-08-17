/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container } from './styles';
import { KeyboardAvoidingView, ToastAndroid, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from '../../components/DatePicker';
import { FAB } from 'react-native-paper'
import moment from 'moment';

const CadastroProjetos: React.FC = ({ navigation }: any) => {
  const [exibirDatePickerInicial, setExibirDatePickerInicial] = useState(false);
  const [exibirDatePickerFinal, setExibirDatePickerFinal] = useState(false);
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataConclusao, setDataConclusao] = useState(new Date());
  const [idProjeto, setIdProjeto] = useState(1);
  const [nomeProjeto, setNomeProjeto] = useState('');

  const mudaDataInicial = useCallback((data: any) => {
    setExibirDatePickerInicial(false);
    setDataInicial(data);
  }, []);

  const mudaDataConclusao = useCallback((data: any) => {
    setExibirDatePickerFinal(false);
    setDataConclusao(data);
  }, []);

  const inicializaForm = useCallback(() => {
    setIdProjeto(idProjeto + 1);
    setExibirDatePickerFinal(false);
    setExibirDatePickerInicial(false);
    setDataInicial(new Date());
    setDataConclusao(new Date());
    setNomeProjeto('');
  }, [idProjeto]);

  const realizaCadastro = useCallback(() => {
    ToastAndroid.showWithGravity(
      'Projeto Criado!',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    inicializaForm();
  }, [inicializaForm]);

  const exibeDatePickerInicial = useCallback(() => {
    Keyboard.dismiss();
    setExibirDatePickerInicial(true);
  }, []);
  const exibeDatePickerFinal = useCallback(() => {
    Keyboard.dismiss();
    setExibirDatePickerFinal(true);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
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
        <ScrollView style={{ marginTop: 12 }}>
          <Container>
            <Input
              icon="hash"
              label="Id do projeto"
              editable={false}
              defaultValue={idProjeto.toString()}
            />
            <Input
              icon="at-sign"
              label="Nome do projeto"
              editable={true}
              onChangeText={(data) => setNomeProjeto(data)}
              defaultValue={nomeProjeto}
            />
            <DatePicker
              date={new Date()}
              display="calendar"
              isVisible={exibirDatePickerInicial}
              onConfirm={(value) => mudaDataInicial(value)}
              onCancel={() => setExibirDatePickerInicial(false)}
              locale="pt_BR"
              input={{
                icon: 'calendar',
                label: 'Data de início',
                onFocus: exibeDatePickerInicial,
                value: moment(dataInicial).format('DD/MM/YYYY'),
              }}
            />
            <DatePicker
              date={new Date()}
              display="calendar"
              isVisible={exibirDatePickerFinal}
              onConfirm={(value) => mudaDataConclusao(value)}
              onCancel={() => setExibirDatePickerFinal(false)}
              locale="pt_BR"
              input={{
                icon: 'calendar',
                label: 'Data estimada de término',
                onFocus: exibeDatePickerFinal,
                value: moment(dataConclusao).format('DD/MM/YYYY'),
              }}
            />
          </Container>
        </ScrollView>

        <Button onPress={realizaCadastro}>Cadastrar</Button>
      </KeyboardAvoidingView>
    </>
  );
};
export default CadastroProjetos;
