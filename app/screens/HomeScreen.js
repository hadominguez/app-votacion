import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { loginStyles } from "../styles/styles";
import { View, Text, Image } from "react-native";
import MyButton from "../components/MyButton";

export default function Home({ navigation, route }) {

    const [dni, setDni] = useState('');
    const [tramite, setTramite] = useState('');
    const [sexo, setSexo] = useState('');
    const [voto, setVoto] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [hashVoto, setHashVoto] = useState('');
    const [voto_1, setVoto1] = useState('');
    const [voto_2, setVoto2] = useState('');
    const [voto_3, setVoto3] = useState('');
    

    let boton_votar;

    if(voto){
        boton_votar = 'Consultar Estado del Voto'
    }else{
        boton_votar = 'Votar'
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        try {
            AsyncStorage.getItem('UserData')
                .then(value => {
                    if (value != null) {
                        let user = JSON.parse(value);
                        setDni(user.Dni);
                        setTramite(user.Tramite);
                        setSexo(user.Sexo);
                        setNombre(user.Nombre);
                        setApellido(user.Apellido);
                        setVoto(user.Voto);
                    }
                });
            AsyncStorage.getItem('HashData')
                .then(value => {
                    if (value != null) {
                        let hash = JSON.parse(value);
                        setHashVoto(hash.Hash);
                    }
                });
            AsyncStorage.getItem('Voto1Data')
                .then(value => {
                    if (value != null) {
                        let voto1 = JSON.parse(value);
                        setVoto1(voto1.Voto1);
                    }
                });
            AsyncStorage.getItem('Voto2Data')
                .then(value => {
                    if (value != null) {
                        let voto2 = JSON.parse(value);
                        setVoto2(voto2.Voto2);
                    }
                });
            AsyncStorage.getItem('Voto3Data')
                .then(value => {
                    if (value != null) {
                        let voto3 = JSON.parse(value);
                        setVoto3(voto3.Voto3);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    const removeData = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    }

    const setDataVotar = async () => {
        if (dni.length == 0 || tramite.length == 0 || sexo.length == 0) {
            Alert.alert('Warning!', 'Ingres tus datos.')
        } else {
            if(voto){
                try {
                    var response = await fetch('http://192.168.0.109:3011/verificarVoto', {
                        method: 'post',
                        mode: 'no-cors',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "usuario":"tesisfinal", "contrasena":"t3s15f1n47"
                        })
                    });
                    var data = await response.json();
                    if(data.modificado){
                        navigation.navigate('ResultadoVotoIncorrecto');
                    } else {
                        navigation.navigate('ResultadoVotoCorrecto');
                    }
                } catch (error) {
                    console.log(error);
                }
            }else{
                try {
                    var response = await fetch('http://192.168.0.109:3011/getListasFinales', {
                        method: 'post',
                        mode: 'no-cors',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "usuario":"tesisfinal", "contrasena":"t3s15f1n47",
                            "celhash": hashVoto ,
                            "voto1": voto_1,
                            "voto2": voto_2,
                            "voto3": voto_3
                        })
                    });
                    var data = await response.json();

                    var orden = 0;
                    var orden_anterior = 0;
                    var x =0;
                    var listas = [];
                    var lista_temp = [];
                    for(var i=0; i < data.length; i++) {
                        orden = data[i].orden;
                        if (orden == orden_anterior || i == 0) {
                            lista_temp.push(data[i]);
                        }else{
                            listas[x] = lista_temp;
                            lista_temp = [];
                            x = x + 1 ;
                            lista_temp.push(data[i]);
                        }
                        orden_anterior = orden;
                    }
                    listas[x] = lista_temp;
                    

                    var listados = {
                        Lista1: listas[0],
                        Lista2: listas[1],
                        Lista3: listas[2]
                    }
                    await AsyncStorage.setItem('ListaData', JSON.stringify(listados));
                    navigation.navigate('Votar');
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }






    return (
        <View style= {[loginStyles.container]}>
            <View style={loginStyles.logo}>
                <Image source={require('../resources/images/logochico.png')}/>
            </View>
            <Text style={[ loginStyles.textoGrueso ]}> Apellido: {apellido} </Text>
            <Text style={[ loginStyles.textoGrueso ]}> Nombre: {nombre} </Text>
            <Text style={[ loginStyles.textoGrueso ]}> DNI: {dni} </Text>

            <MyButton
                title={boton_votar}
                style={loginStyles.btnMain} 
                onPressFunction={setDataVotar}
            />
            <MyButton
                title='Eliminar Información'
                style={loginStyles.btnMain} 
                onPressFunction={removeData}
            />
        </View>
    )
}
