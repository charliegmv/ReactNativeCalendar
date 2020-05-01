import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment'

import WeekDays from './WeekDays'
import Day from './Day'
import Colors from '../../assets/Colors'

export default class Calendar extends Component {
    generateMonth = (activeDate) => {
        const startOfMonth = moment(activeDate).startOf('month')
        const firstDay = startOfMonth.day()
        
        let month = []
        var day = 0
        for (let i = 0; i < 6; i++) { // Rows
            month[i] = []
            for (let j = 0; j < 7; j++) { // Columns
                if(i === 0 && j < firstDay) month[i][j] = moment(startOfMonth).subtract(firstDay-j, 'd')
                else month[i][j] = moment(startOfMonth).add(day++, 'd')
            }
        }
        return month
    }

    render() {
        const { today, activeDate, onClick } = this.props
        const month = this.generateMonth(activeDate)

        return (
            <View style={styles.container}>
                <WeekDays />
                {month.map((week, i) => (
                    <View key={`week_${i}`} style={styles.week}>
                        {week.map((date, j) => (
                            <Day key={`date_${j}`} date={date} today={today} activeDate={activeDate} onClick={onClick} />
                        ))}
                    </View>
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND
    },
    week: {
        flex: 1,
        flexDirection: 'row'
    },
    day: {
        flex: 1,
        height: 18,
        textAlign: 'center',
        // Highlight Sundays
        // color: colIndex == 0 ? '#a00' : '#000',
        // Highlight current date
        // fontWeight: item == this.state.activeDate.getDate() ? 'bold' : ''
    }
})
