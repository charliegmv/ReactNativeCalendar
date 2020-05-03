import { createStackNavigator } from 'react-navigation-stack'

import AboutUs from './AboutUs'
import Agenda from './Agenda'
import Home from './Home'
import Colors from '../assets/Colors'

const navigationOptions = {
    headerTintColor: Colors.DEFAULT,
    headerStyle: { elevation: 0 },
}

export default createStackNavigator({
    AboutUs: {
        screen: AboutUs,
        navigationOptions
    },
    Agenda: {
        screen: Agenda,
        navigationOptions
    },
    Home: {
        screen: Home,
        navigationOptions
    }
}, {
    initialRouteName: 'Home',
})