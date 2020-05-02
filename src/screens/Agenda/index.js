import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, Text, ToastAndroid, TouchableHighlight, View } from 'react-native'
import moment from 'moment'

import { IconButton } from '../../components/Button'
import ReminderModal from './ReminderModal'
import { newReminder as newReminderToState } from '../../actions/Reminders'
import { setReminder } from '../../actions/Storage'
import Colors from '../../assets/Colors'

class Agenda extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: moment(navigation.getParam('date', new Date())).format("dddd Do"),
        headerRight: (<IconButton name='add' color={Colors.PRIMARY} style={{ marginRight: 10 }}  onPress={navigation.getParam('newReminder',() => null)} size={25} /> )
    })

    componentDidMount() {
        this.props.navigation.setParams({  newReminder: this.newReminder })
    }

    newReminder = () => { this.reminderModal.show(this.props.navigation.getParam('date', new Date())) }

    onSaveReminder = (reminder) => {
        return setReminder(reminder.id, reminder).then(({error, status}) => {            
            if(error) return ToastAndroid.show('An error ocurred saving the reminder', ToastAndroid.SHORT)
            this.props.dispatch(newReminderToState(reminder))
            return ToastAndroid.show('Reminder saved', ToastAndroid.SHORT)
        })
    }

    render() {
        const { reminders = [] } = this.props
        
        return (
            <ScrollView style={styles.container}>
                <ReminderModal ref={modal => this.reminderModal = modal} onSave={this.onSaveReminder} />

                {reminders.map((r,i) => (
                    <ReminderCard key={`rem_${i}`}
                        title={r.title} 
                        time={moment(r.datetime).format("HH:mm")} 
                        color={r.color} 
                        onPress={() => alert('pressed')}/>
                ))}
            </ScrollView>
        )
    }
}

const ReminderCard = ({color, onPress, time, title}) => (
    <TouchableHighlight activeOpacity={1} onPress={onPress} underlayColor='rgba(0,0,0,0.1)'>
        <View style={styles.reminder_container}>
            <Text style={styles.reminder_time}>{time}</Text>
            <View style={[styles.reminder_card, { backgroundColor: color }]}>
                <Text style={styles.reminder_title}>{title}</Text>
            </View>
        </View>
    </TouchableHighlight>
)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.BACKGROUND
    },
    reminder_container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reminder_time: {
        color: '#616161',
        marginLeft: 10,
        fontSize: 12
    },
    reminder_card: {
        flex: 1,
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 15,
        borderRadius: 20
    },
    reminder_title: {
        fontWeight: 'bold',
        color: '#fff'
    }
})

export default connect((state, ownProps) => {
    const date = ownProps.navigation.getParam('date', new Date())
    return { reminders : state.reminders.reminders[moment(date).format("YYYY-MM-DD")] }
})(Agenda)