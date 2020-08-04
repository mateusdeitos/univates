/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Header from '../../../../components/Header';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import {Container} from './styles';
import {KeyboardAvoidingView, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Picker from '../../../../components/DropDownPicker';
import moment from 'moment';
import RadioButton from '../../../../components/RadioButton';

const CadastroRequisitos: React.FC = ({navigation}: any) => {
  const [dificuldade, setDificuldade] = useState(0);
  const [importancia, setImportancia] = useState(0);

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
          texto="Cadastro de requisitos"
          backgroundColor="#346FEF"
          icon={{
            iconName: 'menu',
            onPress: () => navigation.toggleDrawer(),
          }}
        />
        <ScrollView style={{marginTop: 12}}>
          <Container>
            <Input icon="hash" label="Id do Requisito" editable={false} />
            <Input
              icon="calendar"
              label="Data do registro"
              editable={false}
              defaultValue={moment(new Date()).format('DD/MM/YYYY')}
            />
            <Picker
              label="Projeto"
              searchablePlaceholder="Pesquise um projeto"
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
            <RadioButton
              label="Nível de Dificuldade"
              options={[
                {
                  label: 'Baixo',
                  value: 0,
                  activeColor: '#4EC5F1',
                },
                {
                  label: 'Médio',
                  value: 1,
                  activeColor: '#cb6506',
                },
                {
                  label: 'Alto',
                  value: 2,
                  activeColor: '#ff0000',
                },
              ]}
              initial={dificuldade}
              onPress={(value) => setDificuldade(value)}
            />
            <RadioButton
              label="Nível de Importância"
              options={[
                {
                  label: 'Baixo',
                  value: 0,
                  activeColor: '#4EC5F1',
                },
                {
                  label: 'Médio',
                  value: 1,
                  activeColor: '#cb6506',
                },
                {
                  label: 'Alto',
                  value: 2,
                  activeColor: '#ff0000',
                },
              ]}
              initial={importancia}
              onPress={(value) => setImportancia(value)}
            />
            <Input
              icon="clock"
              label="Horas/Homem estimado"
              editable={true}
              defaultValue="0"
            />
            <Input
              icon="file-text"
              label="Descrição do Requisito"
              editable={true}
              maxLength={255}
              multiline={true}
            />
          </Container>
        </ScrollView>

        <Button onPress={realizaCadastro}>Cadastrar</Button>
      </KeyboardAvoidingView>
    </>
  );
};
export default CadastroRequisitos;
