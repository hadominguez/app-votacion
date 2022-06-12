import React, {Component} from "react";
import { View, Text, StatusBar } from "react-native";
import { loginStyles } from "../styles/styles";
import MyButton from "../components/MyButton";
import * as Animatable from 'react-native-animatable';
import { splashStyles } from "../styles/styles";

export default class VotoFinalizadoScreen extends Component{
    goToScreen(routeName){
        this.props.navigation.navigate(routeName)
    }

    componentDidMount(){
       setTimeout(() => {
           this.goToScreen('Login')
       }, 4000, this) 
    }

    render(){

        const home = async () => {
            try {
                navigation.navigate('Home');
            } catch (error) {
                console.log(error);
            }
        }

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
                <Text style={[ loginStyles.textoGrueso ]}> Votación Finalizada </Text>

                <MyButton
                    title='Volver al inicio'
                    style={loginStyles.btnMain} 
                    onPressFunction={home}
                />
            </View>
        )
    }
}