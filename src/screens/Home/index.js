import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, ToastAndroid, View } from 'react-native'
import moment from 'moment'

import Calendar from '../../components/Calendar'
import ReminderModal from '../Agenda/ReminderModal'
import { IconButton } from '../../components/Button'
import { saveReminder as saveReminderToState } from '../../actions/Reminders'
import { saveReminder } from '../../actions/Storage'
import Colors from '../../assets/Colors'

class Home extends Component {

    state = {
        today: new Date(),
        activeDate: new Date()
    }

    static navigationOptions = ({ navigation }) => ({
        headerLeft: (<IconButton name='help-outline' style={{ marginLeft: 10 }} onPress={() => null} size={25} />),
        headerTitle: navigation.getParam('title', ''),
        headerRight: (<View style={{ flexDirection: 'row' }}>
            <IconButton name='chevron-left' onPress={navigation.getParam('prevMonth', () => null)} size={25} />
            <IconButton name='chevron-right' style={{ marginRight: 10 }} onPress={navigation.getParam('nextMonth', () => null)} size={25} />
        </View>)
    })

    componentDidMount() {
        this.props.navigation.setParams({
            nextMonth: this.nextMonth,
            prevMonth: this.prevMonth,
            title: moment(this.state.activeDate).format("MMMM YYYY")
        })
    }

    nextMonth = () => {
        const nextMonth = moment(this.state.activeDate).startOf('month').add(1, 'M')
        this.setState({ activeDate: nextMonth.toDate() }, () => {
            this.props.navigation.setParams({ title: nextMonth.format("MMMM YYYY") })
        })
    }

    prevMonth = () => {
        const prevMonth = moment(this.state.activeDate).startOf('month').subtract(1, 'M')
        this.setState({ activeDate: prevMonth.toDate() }, () => {
            this.props.navigation.setParams({ title: prevMonth.format("MMMM YYYY") })
        })
    }

    newReminder = (date) => { this.reminderModal.show(date) }

    checkDate = (date) => { this.props.navigation.navigate('Agenda', { date }) }

    onSaveReminder = (reminder) => {
        return saveReminder(reminder.id, reminder, 'create').then(({ error, status }) => {
            if (error) return ToastAndroid.show('An error ocurred saving the reminder', ToastAndroid.SHORT)
            this.props.dispatch(saveReminderToState(reminder, 'create'))
            this.props.navigation.navigate('Agenda', { date: reminder.datetime })
            this.reminderModal.hide()
            ToastAndroid.show('Reminder saved', ToastAndroid.SHORT)
        })
    }

    render() {
        const { today, activeDate } = this.state

        return (
            <View style={styles.container}>
                <ReminderModal ref={modal => this.reminderModal = modal} onSave={this.onSaveReminder} />

                <Calendar
                    activeDate={activeDate}
                    checkDate={this.checkDate}
                    newReminder={this.newReminder}
                    today={today} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND
    }
})

export default connect()(Home)