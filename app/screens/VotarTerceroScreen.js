import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { loginStyles } from "../styles/styles";
import { View, Text, Image, FlatList } from "react-native";
import MyButton from "../components/MyButton";
const SHA256 = require('crypto-js/sha256');

export default function VotarTercero({ navigation, route }) {
    const [dni, setDni] = useState('');
    const [tramite, setTramite] = useState('');
    const [sexo, setSexo] = useState('');
    const [voto, setVoto] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [voto_1, setVoto1] = useState('');
    const [voto_2, setVoto2] = useState('');
    const [voto_3, setVoto3] = useState('');
    
    const [hashVoto, setHashVoto] = useState('');
    const [lista, setLista] = useState('');
    var titulo ;

    var opciones = [];
    for(let x= 0; x < lista.length ; x++){
        titulo = lista[x].descripcion;
        opciones.push({candidato: lista[x].candidato, lista: lista[x].lista , candidato_nombre: lista[x].candidato_nombre });
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            AsyncStorage.getItem('ListaData')
                .then(value => {
                    if (value != null) {
                        let listados = JSON.parse(value);
                        setLista(listados.Lista3);
                    }
                });
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
            let newHash = await SHA256(dni + sexo + tramite + (Math.random() * 5.0).toString()).toString();
            setHashVoto(newHash);
            var hash = {Hash : newHash};
            await AsyncStorage.setItem('HashData', JSON.stringify(hash));
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
        } catch (error) {
            console.log(error);
        }
    }


    const setVotos = async (valor) => {
        try {
            setVoto3(valor);
            var voto3 = {
                Voto3: valor
            }
            await AsyncStorage.setItem('Voto3Data', JSON.stringify(voto3));

            var response = await fetch('http://192.168.0.109:3011/votar', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { "usuario":"tesisfinal", "contrasena":"t3s15f1n47",
                    "data": { 
                        "dni": dni,
                        "sexo": sexo,
                        "nro_tramite" : tramite,
                        "celhash": hashVoto ,
                        "voto1": voto_1,
                        "voto2": voto_2,
                        "voto3": valor
                    }})
            });
            const datas = await response.json();

            var response = await fetch('http://192.168.0.109:3011/validarDatos', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "usuario":"tesisfinal", "contrasena":"t3s15f1n47",
                    "dni": dni,
                    "nro_tramite": tramite,
                    "sexo": sexo
                })
            });

            const data = await response.json();
            var user = {
                Dni: dni,
                Tramite: tramite,
                Sexo: sexo,
                Nombre: data.persona.nombre,
                Apellido: data.persona.apellido,
                Voto: data.persona.voto,
                Horario: data.horario
            }
            if(user.Nombre){
                await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
                navigation.navigate('VotoFinalizado');
            }
        } catch (error) {
            console.log(error);
        }
    }


    const home = async () => {
        try {
            navigation.navigate('Home');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style= {[loginStyles.container]}>
            <View style={loginStyles.logo}>
                <Image source={require('../resources/images/logochico.png')}/>
            </View>
            <Text style={[ loginStyles.textoGrueso ]}> {titulo} </Text>
            
            <FlatList 
                keyExtractor={(item) => item.candidato} 
                data={opciones} 
                renderItem={({ item }) => ( 
                <View style= {[loginStyles.container]}>
                    <Text style={[ loginStyles.texto ]}> {item.lista} </Text>
                    <MyButton
                        title={ item.candidato_nombre}
                        style={loginStyles.btnMain2} 
                        onPressFunction={() => setVotos(item.candidato)}
                    />
                </View>
                )}
            />
            <MyButton
                title='Volver al inicio'
                style={loginStyles.btnMain} 
                onPressFunction={home}
            />
        </View>
    )
}

