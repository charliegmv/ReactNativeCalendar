import { createStackNavigator } from 'react-navigation-stack'

import Home from './Home'
import Agenda from './Agenda'
import Colors from '../assets/Colors'

export default createStackNavigator({
    Agenda: {
        screen: Agenda,
        navigationOptions: {
            headerTintColor: Colors.DEFAULT,
            headerStyle: { elevation: 0 },
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            headerTintColor: Colors.DEFAULT,
            headerStyle: { elevation: 0 },
        }
    }
}, {
    initialRouteName: 'Home',
})