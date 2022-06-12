import { StyleSheet } from 'react-native'
import color from './colors'

//Estilos para SplashScreen
const splashStyles = StyleSheet.create({
    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.WHITE,
    }
})

//Estilos para LoginScreen
const loginStyles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
    },

    logo: {
        paddingTop: 70,
        marginBottom: 20,
        alignItems: 'center',
    },

    btnMain: {
        width: 280,
        marginTop:40,
        marginBottom: 20,
        backgroundColor: color.BLUE,
        borderRadius: 60
    },

    btnMain2: {
        width: 280,
        marginTop:40,
        marginBottom: 40,
        backgroundColor: color.BLUE,
        borderRadius: 60,
        fontSize: 20
    },

    btnTransparent: {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        borderColor: color.BLUE,
        width: 280,
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 60
    },

    btntxt: {
        textAlign: 'center',
        fontSize: 17,
        color: color.WHITE,
        paddingVertical: 15,
        //fontFamily: 'Poppins-Bold',
    },

    txtTransparent: {
        color: color.LIGHTPRIMARYCOLOR,
        fontSize: 14,
        //fontFamily: 'Poppins-Light',
    },

    texto: {
        color: color.BLUE,
        fontSize: 20,
        //fontFamily: 'Poppins-Light',
    },
    
    textoGrueso: {
        color: color.BLACK,
        fontSize: 30,
        //fontFamily: 'Poppins-Light',
    },
    
    listas: {
        color: color.BLACK,
        fontSize: 30,        height: 40,
        width: 35,
        paddingTop: 8,
        paddingLeft:5,
        paddingRight:5,
        resizeMode: 'contain',
        height: '100%',
        width: '100%'
    }
})

export { loginStyles, splashStyles }