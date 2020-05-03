import React, { Component } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DateTimePicker from '@react-native-community/datetimepicker';

import Modal from '../../components/Modal'
import { weather as getWeather } from '../../api/Weather'
import Colors from '../../assets/Colors'

export default class ReminderModal extends Component {

    state = { 
        visible: false, 
        id: null,
        title: '', 
        color: Colors.BLUE,
        date: null,
        show_date: false,
        time: null,
        show_time: false,
        city: '',
        weather: null
    }

    show = (date, reminder) => {
        if(reminder) {
            this.setState({
                visible: true,
                id: reminder.id,
                title: reminder.title,
                color: reminder.color,
                date: moment(reminder.datetime).toDate(),
                time: moment(reminder.datetime).toDate(),
                city: reminder.city
            }, () => this.loadWeather())
        } else this.setState({ visible: true, date, time: new Date() })
    }

    hide = () => this.setState({ 
        visible: false, 
        id: null,
        title: '', 
        color: Colors.BLUE, 
        date: null, 
        time: null, 
        city: '', 
        weather: null 
    })

    changeDate = (e, date) => {
        if(date) this.setState({date, show_date: false}, () => this.loadWeather())
        else this.setState({show_date: false})
    }

    changeTime = (e, time) => {
        if(time) this.setState({time, show_time: false})
        else this.setState({show_time: false})
    }

    loadWeather = () => {
        const { date, city } = this.state

        if(!moment(date).isBetween(moment().startOf('day'), moment().add(4,'d').endOf('day'), 'day', '[]') || !city) {
            return this.setState({ weather: null })
        }

        this.setState({ weather: { loading: true }})
        return getWeather({city, date}).then(({ error, weather, icon}) => {
            if(error) {
                ToastAndroid.show("Holy rains! There has been an error :(",ToastAndroid.SHORT)
                return this.setState({ weather: null })
            }
            this.setState({ weather: { description: weather, icon }})
        })
    }

    saveReminder = () => {
        const { id, title, color, date, time, city } = this.state
        
        if(!title) return ToastAndroid.show('Title can\'t be empty' ,ToastAndroid.SHORT)
        
        const datetime = moment(`${moment(date).format("YYYY-MM-DD")} ${moment(time).format("HH:mm")}`).toDate()
        if(id) this.props.onSave({id, title, color, datetime, city}, 'udpate')
        else this.props.onSave({id: moment().valueOf().toString(), title, color, datetime, city}, 'create')
    }

    render() {
        const { city, color, date, time, title, show_date, show_time, visible, weather } = this.state

        return (
            <Modal visible={visible} onClose={this.hide} btnIcon='check' btnAction={this.saveReminder} >
                <View style={styles.container}>

                    {/* Title */}
                    <TextInput
                        maxLength={30}
                        onChangeText={text => this.setState({title: text})}
                        placeholder='Remind me to...'
                        returnKeyType='next'
                        selectionColor={Colors.DEFAULT}
                        style={styles.title}
                        value={title} />

                    {/* Colors */}
                    <ColorsField color={color} onPress={color => this.setState({ color })} />

                    {/* Date */}
                    <TouchableField icon='event' text={moment(date).format("dddd, MMMM D, YYYY")} onPress={() => this.setState({show_date: true})}/>
                    {show_date && <DateTimePicker mode='date'
                        minimumDate={new Date()}
                        onChange={this.changeDate}
                        value={moment(date).toDate()} />}

                    {/* Time */}
                    <TouchableField icon='access-time' text={moment(time).format("HH:mm")} onPress={() => this.setState({show_time: true})}/>
                    {show_time && <DateTimePicker mode='time'
                        onChange={this.changeTime}
                        value={time} />}

                    {/* City */}
                    <View style={styles.field} >
                        <Icon name='location-on' size={25} style={{marginRight: 20}} color={Colors.DEFAULT} />
                        <TextInput
                            maxLength={15}
                            onChangeText={text => this.setState({city: text})}
                            onEndEditing={this.loadWeather}
                            placeholder='e.g., Guayaquil'
                            returnKeyType='next'
                            selectionColor={Colors.DEFAULT}
                            style={styles.city}
                            value={city} />
                    </View>

                    {/* Weather */}
                    {weather !== null && <WeatherField 
                        description={weather.description} 
                        image={{uri: weather.icon}}
                        loading={weather.loading}
                    />}

                </View>
			</Modal>
        )
    }
}

const ColorsField = ({color, onPress}) => {
    const colors = [ Colors.BLUE, Colors.GREEN, Colors.YELLOW, Colors.ORANGE, Colors.RED, Colors.PINK, Colors.PURPLE, ]

    return (
        <View style={styles.color_container}>
            {colors.map((c, i) => (
                <View key={`color_${i}`} style={styles.circle_container}>
                    <TouchableWithoutFeedback onPress={() => onPress(c)}>
                        <View style={[styles.circle, {backgroundColor: c}, {opacity: c === color ? 1 : 0.2}]} />
                    </TouchableWithoutFeedback>
                </View>
            ))}
        </View>
    )
}

const TouchableField = ({icon, text, onPress}) => (
    <TouchableHighlight activeOpacity={1} onPress={onPress} underlayColor='rgba(0,0,0,0.1)'>
        <View style={styles.field} >
            <Icon name={icon} size={25} style={{marginRight: 20}} color={Colors.DEFAULT} />
            <Text>{text}</Text>
        </View>
    </TouchableHighlight>
)

const WeatherField = ({description, image, loading}) => (
    <View style={styles.weather_container}>
        <Text style={{fontWeight: 'bold', fontSize: 12}}>Weather Forecast</Text>
        {loading && <ActivityIndicator size="large" color={Colors.PRIMARY} style={styles.weather_loader} />}
        <Text style={styles.weather_description}>{description}</Text>
        <Image source={image} style={styles.weather_icon} />
    </View>
)

const styles = StyleSheet.create({
	container: {
        backgroundColor: Colors.BACKGROUND,
        flex: 1,
    },
    title: {
        fontSize: 25,
        color: Colors.DEFAULT,
        padding: 20,
    },
    color_container: {
        flexDirection: 'row',
        marginBottom: 10
    },
    circle_container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    circle: {
        borderRadius: 50,
        height: 25,
        width: 25
    },
    field: {
        flex: 1, 
        flexDirection: 'row', 
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    city: {
        color: Colors.DEFAULT
    },
    weather_container: {
        alignItems: 'center',
        padding: 10
    },
    weather_loader: {
        flex:1,
        paddingTop: 15
    },
    weather_description: {
        textTransform: 'uppercase',
    },
    weather_icon: {
        height: 120,
        width: 120,
    }
})