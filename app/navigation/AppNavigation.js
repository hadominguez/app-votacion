import { createAppContainer } from "react-navigation";
import { createStackNavigator} from "react-navigation-stack";
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import VotarScreen from '../screens/VotarScreen';
import VotarSegundoScreen from '../screens/VotarSegundoScreen';
import VotarTerceroScreen from '../screens/VotarTerceroScreen';
import VotoFinalizadoScreen from '../screens/VotoFinalizadoScreen';
import ResultadoVotoCorrectoScreen from '../screens/ResultadoVotoCorrectoScreen';
import ResultadoVotoIncorrectoScreen from '../screens/ResultadoVotoIncorrectoScreen';

const AppNavigation = createStackNavigator({
    Splash: {
        screen: SplashScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Login:{
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    Votar:{
        screen: VotarScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    VotarSegundo:{
        screen: VotarSegundoScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    VotarTercero:{
        screen: VotarTerceroScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    VotoFinalizado:{
        screen: VotoFinalizadoScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    ResultadoVotoCorrecto:{
        screen: ResultadoVotoCorrectoScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    ResultadoVotoIncorrecto:{
        screen: ResultadoVotoIncorrectoScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    Home:{
        screen: HomeScreen,
        navigationOptions: {
            headerShown: false,
        }
    }
})

export default createAppContainer(AppNavigation)