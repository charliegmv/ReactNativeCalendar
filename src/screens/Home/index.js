import React, { Component } from 'react'
import { StyleSheet, View, ToastAndroid } from 'react-native'
import moment from 'moment'

import { IconButton } from '../../components/Button'
import Calendar from '../../components/Calendar'
import Colors from '../../assets/Colors'

export default class Home extends Component {

    state = {
        today: new Date(),
        activeDate: new Date()
    }

    static navigationOptions = ({navigation}) => ({
        headerLeft: (<IconButton name='help-outline' style={{ marginLeft: 10 }}  onPress={() => null} size={25} /> ),
        headerTitle: navigation.getParam('title',''),
        headerRight: (<View style={{flexDirection: 'row'}}>
                        <IconButton name='chevron-left' onPress={navigation.getParam('prevMonth',() => null)} size={25} />
                        <IconButton name='chevron-right' style={{ marginRight: 10 }} onPress={navigation.getParam('nextMonth',() => null)} size={25} />
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
        const nextMonth = moment(this.state.activeDate).startOf('month').add(1,'M')
        this.setState({ activeDate: nextMonth.toDate() }, () => {
            this.props.navigation.setParams({ title: nextMonth.format("MMMM YYYY")})
        })
    }

    prevMonth = () => {
        const prevMonth = moment(this.state.activeDate).startOf('month').subtract(1,'M')
        this.setState({ activeDate: prevMonth.toDate() }, () => {
            this.props.navigation.setParams({ title: prevMonth.format("MMMM YYYY")})
        })
    }
    
    render() {
        const { today, activeDate } = this.state

        return (
            <View style={styles.container}>
                <Calendar today={today} activeDate={activeDate} />
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