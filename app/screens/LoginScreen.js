import React, {Component, useState, useEffect} from "react";
import { View, StatusBar, Image, Alert } from "react-native";
import { loginStyles } from "../styles/styles";
import {CheckBox } from 'react-native-elements';
import MyTextInput from "../components/MyTextInput";
import MyButton from "../components/MyButton";
import color from "../styles/colors";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({ navigation, route }){

    const [dni, setDni] = useState('');
    const [tramite, setTramite] = useState('');
    const [sexo, setSexo] = useState('');

    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);

    function setCheck(value){
        setSexo(value);
        if(value == "F"){
            setCheck1(true);
            setCheck2(false);
        }else{
            setCheck1(false);
            setCheck2(true);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        try {
            AsyncStorage.getItem('UserData')
                .then(value => {
                    if (value != null) {
                        navigation.navigate('Home');
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const setData = async () => {
        if (dni.length == 0 || tramite.length == 0 || sexo.length == 0) {
            Alert.alert('Aviso:', 'Por favor ingrese sus datos.')
        } else {
            try {
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
                    Horario: data.horario,
                }
                if(user.Nombre){
                    await AsyncStorage.setItem('UserData', JSON.stringify(user));
                    navigation.navigate('Home');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }



    return(
        <View style= {[loginStyles.container]}>
            <StatusBar backgroundColor={color.Blue} translucent={true} />
            <View style={loginStyles.logo}>
                <Image source={require('../resources/images/logochico.png')}/>
            </View>
            <MyTextInput keyboardType={'numeric'} placeholder='DNI' image='user' 
                onChangeText={(value) => setDni(value)}/>
            <MyTextInput keyboardType={'numeric'} placeholder='Nro. Trámite' image='user'
                onChangeText={(value) => setTramite(value)}/>

            <CheckBox
                center
                title="Femenino"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={check1}
                onPress={() => setCheck("F")}
                />
   
            <CheckBox
                center
                title="Masculino"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={check2}
                onPress={() => setCheck("M")}
                />

            <MyButton
                title='Ingresar'
                style={loginStyles.btnMain} 
                onPressFunction={setData}
            />
        </View>
    )

}