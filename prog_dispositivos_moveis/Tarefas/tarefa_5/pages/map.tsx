import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Accelerometer, Magnetometer } from 'expo-sensors';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';

const Map: React.FC = () => {
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [accData, setAccData] = useState({ x: 0, y: 0, z: 0 });
    const [magData, setMagData] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        Accelerometer.setUpdateInterval(3000);
        Accelerometer.addListener(accelerometerData => {
            const { x, y, z } = accelerometerData;
            setAccData({
                x: Math.floor(x * 100) / 100,
                y: Math.floor(y * 100) / 100,
                z: Math.floor(z * 100) / 100,
            });
        });

        Magnetometer.setUpdateInterval(1000);
        Magnetometer.addListener(magnetometerData => {
            const { x, y, z } = magnetometerData;
            setMagData({
                x: Math.floor(x * 100) / 100,
                y: Math.floor(y * 100) / 100,
                z: Math.floor(z * 100) / 100,
            });

        });
    }, []);

    useEffect(() => {
        async function loadPosition() {
            const { status } = await Permissions.askAsync(Permissions.LOCATION);

            if (status !== 'granted') {
                Alert.alert('Ooooops... ', 'Precisamos de us apermissão para obter a localização')
                return;
            }

            const location = await Location.getCurrentPositionAsync();

            const { latitude, longitude } = location.coords;

            setInitialPosition([
                latitude + accData.x / 100,
                longitude + accData.y / 100
            ]);
        }
        loadPosition();
    }, [accData.x, accData.y]);


    return (

        <View style={styles.container}>
            <View style={styles.mapContainer}>
                {initialPosition[0] !== 0 && (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: initialPosition[0],
                            longitude: initialPosition[1],
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014,
                        }}
                    >
                        <Marker coordinate={{ latitude: initialPosition[0], longitude: initialPosition[1] }} />
                    </MapView>
                )}
            </View>
            <Text style={styles.description}>
                Acelerômetro{"\n"}
                {`x: ${accData.x} | y: ${accData.y} | z: ${accData.z}`}
            </Text>
            <Text style={styles.description}>
                Bússola{"\n"}
                {`x: ${magData.x} | y: ${magData.y} | z: ${magData.z}`}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        backgroundColor: '#0210a1',
        alignItems: 'center',
        
    },

    // title: {
    //     fontSize: 20,
    //     fontFamily: 'Ubuntu_700Bold',
    //     marginTop: 24,
    // },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 4,
        // fontFamily: 'Roboto_400Regular',
    },

    mapContainer: {
        flex: 1,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },

    map: {
        width: '100%',
        height: '100%',
    },

    mapMarker: {
        width: 90,
        height: 80,
    },

    mapMarkerContainer: {
        width: 90,
        height: 70,
        backgroundColor: '#34CB79',
        flexDirection: 'column',
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center'
    },

    mapMarkerImage: {
        width: 90,
        height: 45,
        resizeMode: 'cover',
    },

    // mapMarkerTitle: {
    //     flex: 1,
    //     fontFamily: 'Roboto_400Regular',
    //     color: '#FFF',
    //     fontSize: 13,
    //     lineHeight: 23,
    // },

    itemsContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 32,
    },

    item: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#eee',
        height: 120,
        width: 120,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'space-between',

        textAlign: 'center',
    },

    selectedItem: {
        borderColor: '#34CB79',
        borderWidth: 2,
    },

    // itemTitle: {
    //     fontFamily: 'Roboto_400Regular',
    //     textAlign: 'center',
    //     fontSize: 13,
    // },
});

export default Map;