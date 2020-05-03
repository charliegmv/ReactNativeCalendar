import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import moment from 'moment'

import ReminderModal from './ReminderModal'
import { IconButton } from '../../components/Button'
import { ActionModal } from '../../components/Modal'
import { 
    saveReminder as saveReminderToState, 
    deleteReminder as deleteReminderFromState,
    deleteAllReminders as deleteAllRemindersFromState
} from '../../actions/Reminders'
import { saveReminder, deleteReminders } from '../../actions/Storage'
import Colors from '../../assets/Colors'
import { sortReminders } from '../../utils/helpers'

class Agenda extends Component {

    state = { selected: {} }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: moment(navigation.getParam('date', new Date())).format("ddd, MMM D, YYYY"),
        headerRight: (<IconButton name='add' color={Colors.PRIMARY} style={{ marginRight: 10 }} onPress={navigation.getParam('newReminder', () => null)} size={25} />)
    })

    componentDidMount() { this.props.navigation.setParams({ newReminder: this.newReminder }) }

    newReminder = () => { this.reminderModal.show(this.props.navigation.getParam('date', new Date())) }

    editReminder = (reminder) => { this.reminderModal.show(null, reminder) }

    saveReminder = (reminder, type) => {
        const currentDate = this.props.navigation.getParam('date', new Date())
        return saveReminder(reminder.id, reminder, type).then(({ error }) => {
            if (error) return ToastAndroid.show('An error ocurred saving the reminder', ToastAndroid.SHORT)
            this.props.dispatch(saveReminderToState(reminder, type, currentDate))
            this.reminderModal.hide()
            ToastAndroid.show('Reminder saved', ToastAndroid.SHORT)
        })
    }

    deleteAlert = () => (
        Alert.alert('Calendar', 'Delete this reminder?', [
            {text: 'Cancel'},
            {text: 'Delete', onPress: this.deleteReminder}
        ], {cancelable: true})
    )

    deleteReminder = () => {
        const { selected } = this.state
        return deleteReminders([selected.id]).then(({ error }) => {
            if (error) return ToastAndroid.show('An error ocurred deleting the reminder', ToastAndroid.SHORT)
            this.props.dispatch(deleteReminderFromState(selected))
            ToastAndroid.show('Reminder deleted', ToastAndroid.SHORT)
        })
    }

    deleteAllAlert = () => (
        Alert.alert('Calendar', 'Delete ALL reminders for this day?', [
            {text: 'Cancel'},
            {text: 'Gotta delete \'em all', onPress: this.deleteAllReminders}
        ], {cancelable: true})
    )

    deleteAllReminders = () => {
        const { reminders, navigation } = this.props

        const reminders_keys = reminders.map(r => r.id)
        const date = navigation.getParam('date', new Date())
        return deleteReminders(reminders_keys).then(({ error }) => {
            if (error) return ToastAndroid.show('An error ocurred deleting the reminder', ToastAndroid.SHORT)
            this.props.dispatch(deleteAllRemindersFromState(date))
            ToastAndroid.show('Reminders deleted', ToastAndroid.SHORT)
        })
    }

    render() {
        const { reminders = [] } = this.props
        const reminders_sorted = sortReminders(reminders)
        const actions = [
            { text: 'Delete', onPress: this.deleteAlert},
            { text: 'Delete all', onPress: this.deleteAllAlert, color: Colors.DANGER },
        ]

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <ReminderModal ref={modal => this.reminderModal = modal} onSave={this.saveReminder} />
                <ActionModal actions={actions} ref={modal => this.actionModal = modal} />

                {reminders_sorted.length === 0 && <Text style={styles.no_reminders}>
                    No reminders scheduled for this day
                </Text>}

                {reminders_sorted.map((r, i) => (
                    <ReminderCard key={`rem_${i}`}
                        title={r.title}
                        time={moment(r.datetime).format("HH:mm")}
                        color={r.color}
                        onLongPress={() => this.setState({selected: r}, () => this.actionModal.show())}
                        onPress={() => this.editReminder(r)} />
                ))}
            </ScrollView>
        )
    }
}

const ReminderCard = ({ color, onLongPress, onPress, time, title }) => (
    <View style={{ marginVertical: 7 }}>
        <View style={styles.reminder_container}>
            <Text style={styles.reminder_time}>{time}</Text>
            <TouchableOpacity
                activeOpacity={0.7}
                onLongPress={onLongPress}
                onPress={onPress}
                style={[styles.reminder_card, { backgroundColor: color }]}>

                <Text style={styles.reminder_title}>{title}</Text>

            </TouchableOpacity>
        </View>
    </View>    
    
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND
    },
    no_reminders: {
        color: '#616161',
        marginTop: 30,
        textAlign: 'center'
    },
    reminder_container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reminder_time: {
        color: Colors.LIGHT_GRAY,
        marginLeft: 10,
        fontSize: 11,
        fontWeight: 'bold',
    },
    reminder_card: {
        flex: 1,
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginHorizontal: 5,
        borderRadius: 20
    },
    reminder_title: {
        fontWeight: 'bold',
        color: '#fff'
    }
})

export default connect((state, ownProps) => {
    const date = ownProps.navigation.getParam('date', new Date())
    return { reminders: state.reminders.reminders[moment(date).format("YYYY-MM-DD")] }
})(Agenda)