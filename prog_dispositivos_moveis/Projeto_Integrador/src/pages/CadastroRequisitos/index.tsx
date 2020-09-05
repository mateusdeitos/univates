/* eslint-disable no-console */
import React, { useState, useEffect, useCallback } from 'react';
import { KeyboardAvoidingView, Text, Platform, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { Container } from './styles';
import RadioButton, { OptionsProps } from '../../components/RadioButton';
import { TelaCadastroRequisitosProps } from '../../routes/projeto.routes';
import api from '../../services/api';
import { RequisitoData } from '../ListagemRequisitos';
import { options } from '../../defaults/options';
import SliderInput from '../../components/SliderInput';
import Button from '../../components/Button';
import ImageGrid from '../../components/ImageGrid';

const CadastroRequisitos: React.FC<TelaCadastroRequisitosProps> = ({
  route,
  navigation,
}) => {
  const {
    id,
    id_projeto,
    descricao,
    data_registro,
    nivel_dificuldade,
    nivel_importancia,
    tempo,
    tipo_requisito,
    coordenadas,
    fotos_uri,
    onSubmit,
  } = route.params;

  const { niveisDificuldade, niveisImportancia, tiposRequisitos } = options;
  const [listaTiposRequisitos, setListaTiposRequisitos] = useState<
    OptionsProps[]
  >([]);
  const [listaNiveisDificuldade, setListaNiveisDificuldade] = useState<
    OptionsProps[]
  >([]);
  const [listaNiveisImportancia, setListaNiveisImportancia] = useState<
    OptionsProps[]
  >([]);
  const [idRequisito, setIdRequisito] = useState(0);
  const [projetoSelecionado] = useState(id_projeto);
  const [dataRegistro] = useState(() =>
    moment(new Date(), 'DD/MM/YYYY').toDate(),
  );
  const [nivelDificuldade, setNivelDificuldade] = useState(0);
  const [nivelImportancia, setNivelImportancia] = useState(0);
  const [horasHomem, setHorasHomem] = useState(0);
  const [descricaoRequisito, setDescricaoRequisito] = useState('');
  const [tipoRequisito, setTipoRequisito] = useState(0);
  const [coordenadaAtual, setCoordenadaAtual] = useState('Carregando...');
  const [fotos, setFotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setListaTiposRequisitos(tiposRequisitos);
    setListaNiveisDificuldade(niveisDificuldade);
    setListaNiveisImportancia(niveisImportancia);
  }, [niveisDificuldade, niveisImportancia, tiposRequisitos]);

  const inicializaForm = useCallback(() => {
    setTipoRequisito(0);
    setNivelDificuldade(1);
    setNivelImportancia(1);
    setDescricaoRequisito('');
    setHorasHomem(0);
  }, []);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== 'granted') {
        Alert.alert(
          'Ooooops... ',
          'Precisamos de us apermissão para obter a localização',
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;

      setCoordenadaAtual(`${latitude.toFixed(10)},${longitude.toFixed(10)}`);
    }
    if (!id) loadPosition();
  }, [id]);

  useEffect(() => {
    if (!id) {
      api
        .get(`/requisito`)
        .then(response => {
          const requisitos: RequisitoData[] = response.data;
          const maiorId: number =
            requisitos.length === 0
              ? 0
              : requisitos
                  .map(requisito => requisito.id)
                  .sort((x, y) => {
                    if (x < y) return 1;
                    if (x > y) return -1;
                    return 0;
                  })[0];
          setIdRequisito(maiorId + 1);
        })
        .catch(error => console.log({ error }))
        .finally(() => setIsLoading(false));
    } else {
      if (id) setIdRequisito(id);
      if (descricao) setDescricaoRequisito(descricao);
      if (nivel_dificuldade) setNivelDificuldade(nivel_dificuldade);
      if (nivel_importancia) setNivelImportancia(nivel_importancia);
      if (coordenadas) setCoordenadaAtual(coordenadas);
      if (fotos_uri) setFotos(fotos_uri);
      if (tempo) setHorasHomem(tempo);
      if (tipo_requisito) setTipoRequisito(tipo_requisito);
      setIsLoading(false);
    }
  }, [
    coordenadas,
    data_registro,
    descricao,
    fotos_uri,
    id,
    nivel_dificuldade,
    nivel_importancia,
    tempo,
    tipo_requisito,
  ]);
  const salvaRequisito = useCallback(async () => {
    onSubmit({
      id: idRequisito,
      id_projeto,
      data_registro: dataRegistro,
      descricao: descricaoRequisito,
      nivel_dificuldade: nivelDificuldade,
      nivel_importancia: nivelImportancia,
      tempo: horasHomem,
      tipo_requisito: tipoRequisito,
      coordenadas: coordenadaAtual,
      fotos_uri: fotos,
    });

    inicializaForm();
    navigation.goBack();
  }, [
    onSubmit,
    idRequisito,
    id_projeto,
    dataRegistro,
    descricaoRequisito,
    nivelDificuldade,
    nivelImportancia,
    horasHomem,
    tipoRequisito,
    coordenadaAtual,
    fotos,
    inicializaForm,
    navigation,
  ]);

  const handleAddFotoCamera = useCallback(async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);

    if (cameraPermission.status !== 'granted') {
      Alert.alert(
        'Ooooops... ',
        'Precisamos de us apermissão para acessar a câmera',
      );
      return;
    }
    try {
      const result = await launchCameraAsync();
      if (!result.cancelled) {
        setFotos([...fotos, result.uri]);
      }
    } catch (error) {
      console.log({ error });
    }
  }, [fotos]);

  const handleAddFotoGaleria = useCallback(async () => {
    const galeriaPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
    );

    if (galeriaPermission.status !== 'granted') {
      Alert.alert(
        'Ooooops... ',
        'Precisamos de us apermissão para acessar a galeria',
      );
      return;
    }
    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
      });
      if (!result.cancelled) {
        setFotos([...fotos, result.uri]);
      }
    } catch (error) {
      console.log({ error });
    }
  }, [fotos]);

  const handleApagaTodasFotos = useCallback(() => {
    setFotos([]);
  }, []);

  const handleDeletaFoto = useCallback(
    (uri: string) => {
      setFotos(fotos.filter(fotoUri => fotoUri !== uri));
    },
    [fotos],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset={32}
      >
        <Header
          texto="Cadastro de requisitos"
          backgroundColor="#346FEF"
          iconLeft={{
            iconName: 'arrow-left',
            onPress: () => navigation.goBack(),
          }}
          iconRight={{
            iconName: 'floppy',
            onPress: salvaRequisito,
          }}
        />
        <ScrollView style={{ marginTop: 12 }}>
          {isLoading ? (
            <Container>
              <Text>Carregando</Text>
            </Container>
          ) : (
            <Container>
              <Input
                icon="hash"
                label="Id do Projeto"
                editable={false}
                accessible={false}
                value={projetoSelecionado.toString()}
              />
              <Input
                icon="hash"
                label="Id do Requisito"
                editable={false}
                accessible={false}
                value={idRequisito.toString()}
              />
              <Input
                icon="calendar"
                label="Data do registro"
                editable={false}
                accessible={false}
                value={moment(dataRegistro).format('DD/MM/YYYY')}
              />
              <Input
                icon="map-pin"
                label="Coordenadas"
                editable={false}
                accessible={false}
                value={coordenadaAtual}
                multiline={false}
                numberOfLines={1}
              />
              <RadioButton
                label="Tipo do requisito"
                options={listaTiposRequisitos}
                initial={tipoRequisito}
                onPress={value => setTipoRequisito(value)}
              />
              <RadioButton
                label="Nível de Dificuldade"
                options={listaNiveisDificuldade}
                initial={nivelDificuldade}
                onPress={value => setNivelDificuldade(value)}
              />
              <RadioButton
                label="Nível de Importância"
                options={listaNiveisImportancia}
                initial={nivelImportancia}
                onPress={value => setNivelImportancia(value)}
              />
              <SliderInput
                label="Horas/Homem"
                value={horasHomem}
                step={1}
                minimumValue={0}
                maximumValue={50}
                onValueChange={(value: number) => setHorasHomem(value)}
              />
              <Input
                icon="file-text"
                label="Descrição do Requisito"
                editable
                maxLength={255}
                numberOfLines={3}
                multiline
                textAlignVertical="top"
                defaultValue={descricaoRequisito}
                onChangeText={value => setDescricaoRequisito(value)}
              />
              <Button
                icon="image"
                text="Galeria"
                onPress={handleAddFotoGaleria}
              />
              <Button
                icon="camera"
                text="Câmera"
                onPress={handleAddFotoCamera}
              />

              {fotos.length > 0 && (
                <>
                  <ImageGrid images={fotos} onDelete={handleDeletaFoto} />
                  <Button
                    icon="trash"
                    text="Apagar Todas"
                    onPress={handleApagaTodasFotos}
                    backgroundColor="#ff6060"
                  />
                </>
              )}
            </Container>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
export default CadastroRequisitos;
