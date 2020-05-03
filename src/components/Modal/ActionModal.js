import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Dimensions,
    Modal,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View
} from 'react-native'
import Colors from '../../assets/Colors'

class ActionModal extends Component {

    state = { visible: false }

    show = () => this.setState({ visible: true })

    hide = () => this.setState({ visible: false })

    pressAction = (onPress) => {
        onPress()
        this.hide()
    }

    render() {
        const { visible } = this.state
        const { actions, style } = this.props

        return (
            <Modal visible={visible} onRequestClose={this.hide} animationType='fade' transparent>
                {Platform.Version >= 23 && <StatusBar backgroundColor="rgba(0,0,0,0.4)" barStyle="light-content" />}

                <TouchableWithoutFeedback onPress={this.hide}>
                    <View style={styles.background}>
                        <View style={[styles.container, style]}>

                            {actions.map((action, i) => {
                                const { color, text, onPress } = action

                                let custom_color = {}
                                if (color) custom_color = { color }

                                return (
                                    <TouchableHighlight key={i} style={styles.action} onPress={() => this.pressAction(onPress)} underlayColor='rgba(0,0,0,0.08)'>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={[styles.action_text, custom_color]}>{text}</Text>
                                        </View>
                                    </TouchableHighlight>
                                )
                            })}

                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        )
    }
}

ActionModal.propTypes = {
    actions: PropTypes.array,
    style: PropTypes.object,
}

ActionModal.defaultProps = {
    actions: []
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 5,
        width: Dimensions.get('window').width * 0.9
    },
    action: {
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    action_text: {
        color: Colors.DEFAULT
    }
});

export default ActionModal