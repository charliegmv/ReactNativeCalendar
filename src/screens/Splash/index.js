import React, { Component } from 'react'
import { Image, Platform, StatusBar, StyleSheet, View } from 'react-native'

export default class Splash extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Home')
		}, 3000)
    }
    
    render() {
        return (
            <View style={styles.splash}>
                {Platform.Version >= 23 && <StatusBar backgroundColor={'#FFF'} barStyle='light-content' />}
                <Image source={require('../../assets/Images/logo.png')} style={styles.logo} />
            </View>
        )
    }
}

const styles = StyleSheet.create({	
	splash: {
		alignItems: 'center',
        backgroundColor: '#FFF',
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        height: 120,
        width: 120,
    }
})