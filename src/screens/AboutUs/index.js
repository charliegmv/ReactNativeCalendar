import React from 'react'
import { Image, Linking, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import AppConfig from '../../config/App'
import Colors from '../../assets/Colors'

export default () => (
    <View style={styles.container}>
        <Text style={styles.title}>{AppConfig.NAME}</Text>
        <Text style={styles.version}>{AppConfig.VERSION}</Text>
        <Image
            resizeMode='cover'
            source={require('../../assets/Images/logo.png')}
            style={styles.logo} />
        <Text style={styles.author}>© 2020 Developed by 
            <TouchableWithoutFeedback onPress={() => Linking.openURL(`mailto:${AppConfig.SUPPORT_EMAIL}`)}>
                <Text style={{ color: Colors.BLUE }}> {AppConfig.OWNER}</Text>
            </TouchableWithoutFeedback>
        </Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Colors.BACKGROUND,
        flex: 1,
        paddingTop: 50
    },
    title: {
        color: Colors.PRIMARY,
        fontWeight: 'bold',
        fontSize: 20
    },
    version: {
        color: Colors.LIGHT_GRAY,
    },
    logo: {
        height: 80,
        width: 80,
        marginVertical: 40
    },
    author: {
        color: Colors.DEFAULT
    }
})