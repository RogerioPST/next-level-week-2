import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'
import whatsAppIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
import PageHeader from '../../components/PageHeader'
import TeacherItem, {Teacher} from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import api from '../../services/api'



function TeacherList(){
	const [teachers, setTeachers] = useState([])
	const [subject , setSubject] = useState('')
	const [week_day , setweek_day] = useState('')
	const [time , settime] = useState('')

	async function searchTeachers(e: FormEvent){
		e.preventDefault()

		const response = await api.get('classes', {
			params:{
				subject, week_day, time
			}
		})

		setTeachers(response.data)
		
	}
	return (
		<div id="page-teacher-list" className="container">
			<PageHeader title="Estes são os proffys disponiveis.">
				texto p props.children
				<form id="search-teachers" onSubmit={searchTeachers}>
					
				<Select 
					value={subject}
					onChange={e => setSubject(e.target.value)}
						name="subject" label="Matéria"
						options={[
							{value: 'Artes', label:'Artes'},
							{value: 'Biologia', label:'Biologia'},
							{value: 'Química', label:'Química'},
						]}
					/>  
				<Select 
				value={week_day}
				onChange={e => setweek_day(e.target.value)}
						name="week_day" label="Dia da semana"
						options={[
							{value: '0', label:'Segunda-feira'},
							{value: '1', label:'Terça-feira'},
							{value: '2', label:'Quarta-feira'},
							{value: '3', label:'Quinta-feira'},
							{value: '4', label:'Sexta-feira'},
							{value: '5', label:'Sábado'},
							{value: '6', label:'Domingo'},
						]}
					/>  					
					<Input 
						value={time}
						onChange={e => settime(e.target.value)}
					type="time" name="time" label="Hora" />
				<button type="submit">Buscar</button>
				</form>
			</PageHeader>
			<main>
				{teachers.map((teacher: Teacher) =>{
					return <TeacherItem key={teacher.id} teacher={teacher}/>
				})}
				
			</main>
		</div>

	)
}

export default TeacherList