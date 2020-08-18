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
import { ProjetoData } from '../ListagemProjetos';



const CadastroProjetos: React.FC<TelaCadastroProjetosProps> = ({ route, navigation }) => {
  const { id, descricao, data_ini, data_fim, manutencao } = route.params;
  const [idProjeto, setIdProjeto] = useState(0);
  const [exibirDatePickerInicial, setExibirDatePickerInicial] = useState(false);
  const [exibirDatePickerFinal, setExibirDatePickerFinal] = useState(false);
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataConclusao, setDataConclusao] = useState(new Date());
  const [descricaoProjeto, setDescricaoProjeto] = useState(descricao);

  useEffect(() => {
    if (manutencao === 'novo') {
      api.get(`/projeto`)
        .then(response => {
          const projetos: ProjetoData[] = response.data;
          const maiorId: number = projetos.length === 0 ? 0 :
            projetos
              .map(projeto => projeto.id)
              .sort((x, y) => {
                if (x < y) return 1;
                if (x > y) return -1;
                return 0;
              })[0];
          setIdProjeto(maiorId + 1);
        });
    } else {
      if (id) setIdProjeto(id);
      setDescricaoProjeto(descricao);
      setDataInicial(moment(data_ini, 'DD/MM/YYYY').toDate());
      setDataConclusao(moment(data_fim, 'DD/MM/YYYY').toDate());
    }

  }, []);

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

      api.put(`/projeto/${idProjeto}`, {
        descricao: descricaoProjeto,
        data_ini: moment(dataInicial, 'DD/MM/YYYY').format('DD/MM/YYYY'),
        data_fim: moment(dataConclusao, 'DD/MM/YYYY').format('DD/MM/YYYY'),
      })
        .then(response => console.log({ response }))
        .catch(response => console.log({ response }));

    } else {

      api.post('/projeto', {
        id: idProjeto,
        descricao: descricaoProjeto,
        data_ini: moment(dataInicial, 'DD/MM/YYYY').format('DD/MM/YYYY'),
        data_fim: moment(dataConclusao, 'DD/MM/YYYY').format('DD/MM/YYYY'),
      })
        .then(response => console.log({ response }))
        .catch(response => console.log({ response }));
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
          iconLeft={{
            iconName: 'arrow-left',
            onPress: () => {
              inicializaForm();
              navigation.goBack();
            },
          }}
          iconRight={{
            iconName: 'floppy',
            onPress: salvaProjeto,
          }}
        />
        <ScrollView style={{ marginTop: 12 }}>
          <Container>
            <Input
              icon="hash"
              label="Id do projeto"
              editable={false}
              value={idProjeto.toString()}
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
                defaultValue: moment(dataInicial).format('DD/MM/YYYY'),
                editable: true,
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
                defaultValue: moment(dataConclusao).format('DD/MM/YYYY'),
                editable: true,
              }}
            />
          </Container>
        </ScrollView>

      </KeyboardAvoidingView>
    </>
  );
};
export default CadastroProjetos;
