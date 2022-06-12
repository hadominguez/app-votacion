import React, {Component, useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { loginStyles } from "../styles/styles";
import * as Animatable from 'react-native-animatable';
import { splashStyles } from "../styles/styles";

export default class ResultadoVotoIncorrectoScreen extends Component{
    goToScreen(routeName){
        this.props.navigation.navigate(routeName)
    }

    componentDidMount(){
       setTimeout(() => {
           this.goToScreen('Home')
       }, 4000, this) 
    }

    render(){
        return(
            <View style={splashStyles.image}>
                <StatusBar translucent backgroundColor='rgba(0,0,0,0.2)'/>
                <Animatable.Image
                    animation="pulse"
                    easing="ease-out"
                    iterationCount="infinite"
                    style = {{
                        width: 200,
                        height: 200,
                        margin: 100,
                    }}
                    source={require('../resources/images/logogrande.png')}
                />
                <Text style={[ loginStyles.textoGrueso ]}> Tu voto fue modificado, y se ha anulado </Text>
            </View>
        )
    }
}