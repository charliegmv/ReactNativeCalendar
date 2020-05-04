import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Platform, StatusBar, StyleSheet, ToastAndroid, View } from 'react-native'
import { setReminders as setRemindersToState } from '../../actions/Reminders'
import { fetchReminders } from '../../actions/Storage'

class Splash extends Component {
    componentDidMount() {
        setTimeout(() => {
            fetchReminders().then(({error, reminders}) => {
                if(error) ToastAndroid.show('An error ocurred loading the reminders', ToastAndroid.SHORT)
                else this.props.dispatch(setRemindersToState(reminders))
                this.props.navigation.navigate('Home')
            })
		}, 1500)
    }
    
    render() {
        return (
            <View style={styles.splash}>
                {Platform.Version >= 23 && <StatusBar backgroundColor={'#FFF'} barStyle='dark-content' />}
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

export default connect()(Splash)