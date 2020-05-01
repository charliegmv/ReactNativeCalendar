import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { createAppContainer } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import reducers from './reducers'

import Splash from './screens/Splash'
import AppNavigator from './screens/AppLayout'

const store = createStore(reducers)

const AppContainer = createAppContainer(createAnimatedSwitchNavigator(
	{
        Splash: Splash,
        MainApp: AppNavigator
	},
	{ initialRouteName: 'Splash' }
))

export default class MainApp extends Component {
	render() {
		return (
			<Provider store={store}>
				<AppContainer />
			</Provider>
		)
	}
}
