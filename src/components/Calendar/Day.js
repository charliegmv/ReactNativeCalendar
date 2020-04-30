import React, { Component } from 'react'
import { StyleSheet, Text, TouchableHighlight, ToastAndroid } from 'react-native'
import moment from 'moment'
import Colors from '../../assets/Colors'

export default class Day extends Component {

    onDayPressed = (date) => {
        ToastAndroid.show(`Dia aplastado ${moment(date).format('DD-MM-YYYY')}`,ToastAndroid.SHORT)
    }

    render() {
        const { activeDate, date, today } = this.props
        const isToday = date.isSame(today, 'd')
        const isCurrentMonth = date.isSame(activeDate, 'month')

        return (
            <TouchableHighlight
                activeOpacity={1}
                onPress={() => this.onDayPressed(date)}
                style={styles.container}
                underlayColor='rgba(0,0,0,0.1)'>
    
                <Text style={[styles.date, {opacity: isCurrentMonth ? 1 : 0.3}, isToday ? styles.today : '']}>
                    {moment(date).date()}
                </Text>
    
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({    
    container: {
        alignItems: 'center',
        alignSelf: 'stretch',
        borderColor: Colors.SEPARATORS,
        borderBottomWidth: 1,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        flex: 1,
    },
    date: {
        paddingVertical: 5
    },
    today: {
        backgroundColor: Colors.TODAY,
        borderRadius: 100,
        paddingVertical: 3,
        paddingHorizontal: 5,
        margin: 2,
        color: "#fff"
    },    
})
