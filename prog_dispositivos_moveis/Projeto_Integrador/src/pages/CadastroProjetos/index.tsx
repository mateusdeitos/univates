/* eslint-disable import/no-useless-path-segments */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import moment from 'moment';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { TelaCadastroProjetosProps } from '../../routes/projeto.routes';
import { Container } from './styles';
import DatePicker from '../../components/DatePicker';
import api from '../../services/api';
import { ProjetoData } from '../ListagemProjetos';

const CadastroProjetos: React.FC<TelaCadastroProjetosProps> = ({
  route,
  navigation,
}) => {
  const {
    id,
    descricao,
    link_externo,
    data_ini,
    data_fim,
    onSubmit,
  } = route.params;
  const nomeProjetoRef = useRef<TextInput>(null);
  const [idProjeto, setIdProjeto] = useState(0);
  const [exibirDatePickerInicial, setExibirDatePickerInicial] = useState(false);
  const [exibirDatePickerFinal, setExibirDatePickerFinal] = useState(false);
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataConclusao, setDataConclusao] = useState(new Date());
  const [descricaoProjeto, setDescricaoProjeto] = useState(descricao || '');
  const [linkExternoProjeto, setLinkExternoProjeto] = useState(
    link_externo || '',
  );

  useEffect(() => {
    if (!id) {
      api.get(`/projeto`).then(response => {
        const projetos: ProjetoData[] = response.data;
        const maiorId: number =
          projetos.length === 0
            ? 0
            : projetos
                .map(projeto => projeto.id)
                .sort((x, y) => {
                  if (x < y) return 1;
                  if (x > y) return -1;
                  return 0;
                })[0];
        setIdProjeto(maiorId + 1);
      });
    } else {
      setIdProjeto(id);
      setDescricaoProjeto(descricao || '');
      setLinkExternoProjeto(link_externo || '');
      setDataInicial(moment(data_ini, 'DD/MM/YYYY').toDate());
      setDataConclusao(moment(data_fim, 'DD/MM/YYYY').toDate());
    }
  }, [data_fim, data_ini, descricao, id, link_externo]);

  const mudaDataInicial = useCallback((data: Date) => {
    setExibirDatePickerInicial(false);
    setDataInicial(data);
  }, []);

  const mudaDataConclusao = useCallback((data: Date) => {
    setExibirDatePickerFinal(false);
    setDataConclusao(data);
  }, []);

  const inicializaForm = useCallback(() => {
    setExibirDatePickerFinal(false);
    setExibirDatePickerInicial(false);
    setDataInicial(new Date());
    setDataConclusao(new Date());
    setDescricaoProjeto('');
  }, []);

  const exibeDatePickerInicial = useCallback(() => {
    Keyboard.dismiss();
    setExibirDatePickerInicial(true);
  }, []);
  const exibeDatePickerFinal = useCallback(() => {
    Keyboard.dismiss();
    setExibirDatePickerFinal(true);
  }, []);

  const salvaProjeto = useCallback(async () => {
    onSubmit({
      id: idProjeto,
      descricao: descricaoProjeto,
      link_externo: linkExternoProjeto,
      data_ini: dataInicial,
      data_fim: dataConclusao,
    });

    inicializaForm();
    navigation.goBack();
  }, [
    onSubmit,
    idProjeto,
    descricaoProjeto,
    linkExternoProjeto,
    dataInicial,
    dataConclusao,
    inicializaForm,
    navigation,
  ]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
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
        <ScrollView style={{ marginTop: 30 }}>
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
              editable
              onChangeText={data => setDescricaoProjeto(data)}
              defaultValue={descricaoProjeto}
            />
            <DatePicker
              date={new Date()}
              display="calendar"
              isVisible={exibirDatePickerInicial}
              onConfirm={value => mudaDataInicial(value)}
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
              onConfirm={value => mudaDataConclusao(value)}
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
            <Input
              icon="link"
              label="Link documentação externa"
              editable
              onChangeText={data => setLinkExternoProjeto(data)}
              defaultValue={linkExternoProjeto}
              autoCorrect={false}
              autoCapitalize="none"
              button={{
                icon: 'external-link',
                enabled: !!linkExternoProjeto,
                onPress: () =>
                  navigation.navigate('TelaLinkProjeto', {
                    uri: linkExternoProjeto,
                  }),
              }}
            />
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
export default CadastroProjetos;
