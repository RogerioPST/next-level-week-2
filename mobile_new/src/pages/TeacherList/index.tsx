import React, { useState, useEffect } from 'react'
import {View, TextInput, Text} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import {Feather} from '@expo/vector-icons'
import api from '../../services/api'
import { useFocusEffect } from '@react-navigation/native'


function TeacherList(){
	const [teachers, setTeachers] = useState([])
	const [favorites, setfavorites] = useState<number[]>([])
	const [subject, setSubject] = useState('Química')
	const [week_day, setweek_day] = useState('0')
	const [time, settime] = useState('11:00')
	const [isFiltersVisible, setFiltersVisible] = useState(false)
	function loadFavorites(){
		AsyncStorage.getItem('favorites').then(response =>{
			if (response){
				const favoritedTeachers = JSON.parse(response)
				const favoritedTeachersIds = favoritedTeachers
					.map((teacher : Teacher) => {
						return teacher.id
					})
				setfavorites(favoritedTeachersIds)
			}
		})
	}
	//será executado toda vez q a tela entrar em foco
	useFocusEffect(() =>{
		loadFavorites()
	})
	
	function handleToggleFilter(){
		setFiltersVisible(!isFiltersVisible)
	}
	async function handleFiltersSubmit(){
		/* console.log({
			subject, week_day, time
		}) */
		loadFavorites()
		const response = await api.get('classes', {
			params:{
				subject, week_day, time
			}
		})
		/* console.log(response.data) */
		setFiltersVisible(false)
		setTeachers(response.data)
	}
	return (
		<View style={styles.container}>
			<PageHeader 
				title="Proffys disponíveis" 
				headerRight={
					<BorderlessButton>
						<Feather 
						onPress={handleToggleFilter}
						name="filter" size={20} color="#FFF" />
					</BorderlessButton>
				} 
			>
				{isFiltersVisible && (<View style={styles.searchForm}>
					<Text style={styles.label}>Matéria</Text>
					<TextInput 
					placeholderTextColor="#c1bccc" style={styles.input}
					value={subject}
					onChangeText={text => setSubject(text)}
						placeholder="Qual a matéria?" />

					<View style={styles.inputGroup}>
						<View style={styles.inputBlock}>
							<Text style={styles.label}>Dia da semana</Text>
							<TextInput placeholderTextColor="#c1bccc" style={styles.input}
									value={week_day}
									onChangeText={text => setweek_day(text)}	
								placeholder="Qual o dia?" />
						</View>
						<View style={styles.inputBlock}>
							<Text style={styles.label}>Horário</Text>
							<TextInput placeholderTextColor="#c1bccc" style={styles.input}
									value={time}
									onChangeText={text => settime(text)}
								placeholder="Qual horário?" />
						</View>
					</View>
					<RectButton style={styles.submitButton}
						onPress={handleFiltersSubmit}
					>
						<Text style={styles.submitButtonText}>Filtrar</Text>
					</RectButton>
				</View>
				)}
			</PageHeader>
			<ScrollView
				style={styles.teacherList}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 16,
				}}
			>
				{teachers.map((teacher: Teacher) =>{
					return (
						<TeacherItem key={teacher.id} 
							teacher={teacher}
							favorited={favorites.includes(teacher.id)}

						/>
					)
				})}			
			</ScrollView>
		</View>
	)
}

export default TeacherList