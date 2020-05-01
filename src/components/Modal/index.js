import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ScrollView, StyleSheet, View } from 'react-native'
import { IconButton, HeaderButton } from '../Button'
import Colors from '../../assets/Colors'

const ScreenModal = ({
	btnAction,
	btnDisabled,
	btnIcon,
	children,
	contentContainerStyle,
	loading,
	onClose,
	style,
	visible
}) => (
		<Modal visible={visible} onRequestClose={loading ? () => null : onClose} animationType='slide'>
			<View style={styles.header}>
				<IconButton color={Colors.DEFAULT} name='close' onPress={onClose} size={25} disabled={loading} />
                {btnIcon !== undefined && 
                    <IconButton color={Colors.PRIMARY} name={btnIcon} onPress={btnAction} size={25} disabled={btnDisabled || loading} />
                }
			</View>
			<ScrollView contentContainerStyle={contentContainerStyle} style={[styles.container, style]}>
				{children}
			</ScrollView>
		</Modal>
	)

ScreenModal.propTypes = {
	btnAction: PropTypes.func,
	btnDisabled: PropTypes.bool,
	btnIcon: PropTypes.string,
	contentContainerStyle: PropTypes.object,
	loading: PropTypes.bool,
	onClose: PropTypes.func,
	style: PropTypes.object,
	visible: PropTypes.bool
}

ScreenModal.defaultProps = {
	btnAction: () => null,
	btnDisabled: false,
	loading: false,
	onClose: () => null,
	visible: false
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 5,
		paddingVertical: 10
	},
	container: {
		backgroundColor: Colors.BACKGROUND,
		flex: 1
	}
})

export default ScreenModal