import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { loginStyles } from "../styles/styles";
import { View, Text, Image, FlatList } from "react-native";
import MyButton from "../components/MyButton";

export default function VotarSegundo({ navigation, route }) {

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

    const getData = () => {
        try {
            AsyncStorage.getItem('ListaData')
                .then(value => {
                    if (value != null) {
                        let listados = JSON.parse(value);
                        setLista(listados.Lista2);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }


    const setVotos = async (valor) => {
        try {
            var voto2 = {
                Voto2: valor
            }
            await AsyncStorage.setItem('Voto2Data', JSON.stringify(voto2));
            navigation.navigate('VotarTercero');
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

