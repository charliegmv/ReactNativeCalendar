import { createStackNavigator } from 'react-navigation-stack'

import Home from './Home'
import Colors from '../assets/Colors'

export default createStackNavigator({
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