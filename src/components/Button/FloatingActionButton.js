import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../assets/Colors'

const FloatingActionButton = ({ backgroundColor, disabled, icon, color, onPress }) => (
    <TouchableHighlight
        activeOpacity={0.5}
        disabled={disabled}
        onPress={onPress}
        style={{
            alignItems: 'center',
            backgroundColor,
            borderRadius: 30,
            bottom: 30,
            elevation: 10,
            height: 60,
            justifyContent: 'center',
            position: 'absolute',
            right: 30,
            width: 60,
        }}
        underlayColor={backgroundColor}>
        <Icon name={icon} size={30} color={color} />
    </TouchableHighlight>
)

FloatingActionButton.propTypes = {
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
}

FloatingActionButton.defaultProps = {
    backgroundColor: '#fff',
    color: Colors.PRIMARY,
    disabled: false
}

export default FloatingActionButton