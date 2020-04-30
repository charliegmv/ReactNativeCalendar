import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../../assets/Colors'

export default () => {
    const weekDays = ["S", "M", "T", "W", "T", "F", "S"]

    return (
        <View style={styles.container}>
            {weekDays.map((day, i) => (
                <Text key={`weekday_${i}`} style={styles.day}>{day}</Text>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    day: {
        alignSelf: 'stretch',
        borderColor: Colors.SEPARATORS,
        borderBottomWidth: 1,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        flex: 1,
        fontWeight: 'bold',
        paddingVertical: 5,
        textAlign: 'center'
    }
})
