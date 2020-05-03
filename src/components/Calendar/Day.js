import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import moment from 'moment'
import Colors from '../../assets/Colors'
import { sortReminders } from '../../utils/helpers'

const Day = ({ activeDate, checkDate, date, newReminder, reminders = [], today }) => {
    const isToday = date.isSame(today, 'd')
    const isCurrentMonth = date.isSame(activeDate, 'month')
    const onClick = reminders.length > 0 ? checkDate : newReminder
    const reminders_sorted = sortReminders(reminders)

    return (
        <TouchableHighlight
            activeOpacity={1}
            onPress={() => onClick(date)}
            style={styles.container}
            underlayColor='rgba(0,0,0,0.1)'>
            <View style={{flex: 1}}>
                <Text style={[styles.date, { opacity: isCurrentMonth ? 1 : 0.3 }, isToday ? styles.today : '']}>
                    {moment(date).date()}
                </Text>
                {reminders_sorted.map((r,i) => {
                    let clip = null
                    if(i <= 2) clip = (
                        <View key={`reminder_${i}`} style={{ opacity: isCurrentMonth ? 1 : 0.3 }}>
                            {i < 2 && <ReminderClip color={r.color} />}
                            {i == 2 && <Text style={styles.see_more}>···</Text>}
                        </View>
                    )
                    return clip
                })}
            </View>
        </TouchableHighlight>
    )
}

const ReminderClip = ({ color }) => {
    return (
        <View style={[styles.reminder_clip, {backgroundColor: color}]} />
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        borderColor: Colors.SEPARATORS,
        borderBottomWidth: 1,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        flex: 1,
    },
    date: {
        alignSelf: 'center',
        paddingVertical: 5
    },
    today: {
        backgroundColor: Colors.TODAY,
        borderRadius: 50,
        color: "#fff",
        margin: 2,
        paddingVertical: 3,
        paddingHorizontal: 8
    },
    reminder_clip: {
        borderRadius: 50,
        height: 10,
        marginHorizontal: 5,
        marginVertical: 2
    },
    see_more: {
        fontSize: 18, 
        fontWeight: 'bold', 
        textAlign: 'center'
    }
})

export default connect((state, ownProps) => ({
    reminders: state.reminders.reminders[moment(ownProps.date).format("YYYY-MM-DD")]
}))(Day)