import React from 'react'
import {View, Image, Text, TouchableOpacity, ImageBackground} from 'react-native'

import styles from './styles'
import giveClassesBgImage from '../../assets/images/give-classes-background.png'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import PageHeader from '../../components/PageHeader'


function Favorites(){
	
	return (
		<View style={styles.container}>
			<PageHeader title="Meus Proffys favoritos" />
		</View>
	)
}

export default Favorites