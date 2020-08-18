/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { TelaCadastroProjetosProps } from '../../routes/app.routes';
import { Container } from './styles';
import { KeyboardAvoidingView, ToastAndroid, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from '../../components/DatePicker';
import moment from 'moment';
import api from '../../services/api';

interface Projeto {
  id: number;
  descricao: string;
  data_ini: Date;
  data_fim: Date;
}

const CadastroProjetos: React.FC<TelaCadastroProjetosProps> = ({ route, navigation }) => {
  const { id, descricao, data_ini, data_fim, manutencao } = route.params;
  const [exibirDatePickerInicial, setExibirDatePickerInicial] = useState(false);
  const [exibirDatePickerFinal, setExibirDatePickerFinal] = useState(false);
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataConclusao, setDataConclusao] = useState(new Date());
  const [descricaoProjeto, setDescricaoProjeto] = useState(descricao);

  useEffect(() => {
    console.log({ id, descricao, data_ini, data_fim, manutencao })
    if (manutencao === 'editar') {
      setDescricaoProjeto(descricao);
      setDataInicial(moment(data_ini, 'DD/MM/YYYY').toDate());
      setDataConclusao(moment(data_fim, 'DD/MM/YYYY').toDate());
    }
  }, [id, descricao, data_ini, data_fim, manutencao])

  const mudaDataInicial = useCallback((data: any) => {
    setExibirDatePickerInicial(false);
    setDataInicial(data);
  }, []);

  const mudaDataConclusao = useCallback((data: any) => {
    setExibirDatePickerFinal(false);
    setDataConclusao(data);
  }, []);

  const inicializaForm = useCallback(() => {
    setExibirDatePickerFinal(false);
    setExibirDatePickerInicial(false);
    setDataInicial(new Date());
    setDataConclusao(new Date());
    setDescricaoProjeto('');
  }, [id]);

  const exibeDatePickerInicial = useCallback(() => {
    Keyboard.dismiss();
    setExibirDatePickerInicial(true);
  }, []);
  const exibeDatePickerFinal = useCallback(() => {
    Keyboard.dismiss();
    setExibirDatePickerFinal(true);
  }, []);


  const salvaProjeto = useCallback(async () => {


    if (manutencao === 'editar') {

      await api.put(`/projeto/${id}`, {
        descricao: descricaoProjeto,
        data_ini: moment(dataInicial, 'DD/MM/YYYY').format('DD/MM/YYYY'),
        data_fim: moment(dataConclusao, 'DD/MM/YYYY').format('DD/MM/YYYY'),
      });

    } else {

      await api.post('/projeto', {
        id: id,
        descricao: descricaoProjeto,
        data_ini: moment(dataInicial, 'DD/MM/YYYY').format('DD/MM/YYYY'),
        data_fim: moment(dataConclusao, 'DD/MM/YYYY').format('DD/MM/YYYY'),
      });
    }
    inicializaForm();
    navigation.goBack();
  }, [inicializaForm, id, descricaoProjeto, dataInicial, dataConclusao, navigation]);

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
            iconName: 'arrow-left',
            onPress: () => {
              inicializaForm();
              navigation.goBack();
            },
          }}
        />
        <ScrollView style={{ marginTop: 12 }}>
          <Container>
            <Input
              icon="hash"
              label="Id do projeto"
              editable={false}
              defaultValue={id.toString()}
            />
            <Input
              icon="at-sign"
              label="Nome do projeto"
              editable={true}
              onChangeText={(data) => setDescricaoProjeto(data)}
              defaultValue={descricaoProjeto}
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

        <Button onPress={salvaProjeto}>{manutencao === 'novo' ? 'Cadastrar' : 'Salvar'}</Button>
      </KeyboardAvoidingView>
    </>
  );
};
export default CadastroProjetos;
