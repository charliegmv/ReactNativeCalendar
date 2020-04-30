import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../assets/Colors'

const IconButton = ({ disabled, name, size, color, style, onPress }) => {
    const buttonSize = size * 1.4

    return (
        <TouchableHighlight
            activeOpacity={1}
            disabled={disabled}
            onPress={onPress}
            style={[
                style,
                {
                    borderRadius: buttonSize / 2,
                    width: buttonSize,
                    height: buttonSize,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            ]}
            underlayColor='rgba(0,0,0,0.1)'>
            <Icon name={name} size={size} color={disabled ? Colors.GRAY_30 : color} />
        </TouchableHighlight>
    )
}

IconButton.propTypes = {
    color: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    style: PropTypes.object,
    onPress: PropTypes.func.isRequired,
}

IconButton.defaultProps = {
    color: Colors.DEFAULT,
    disabled: false,
    size: 20
}

export default IconButton