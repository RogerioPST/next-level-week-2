import React, { useState, FormEvent } from 'react'
import {useHistory} from 'react-router-dom'
import PageHeader from '../../components/PageHeader'

import './styles.css'
import Input from '../../components/Input'

import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import api from '../../services/api'




function TeacherForm(){
	const history = useHistory()
	const [name, setName] = useState('')
	const [avatar, setAvatar] = useState('')
	const [whatsapp, setWhatsapp] = useState('')
	const [bio, setBio] = useState('')
	const [subject, setSubject] = useState('')
	const [cost, setCost] = useState('')

	const [scheduleItems, setScheduledItem] = useState( [
		{week_day: 0, from: '', to: ''},		
	])
	
	function addScheduleItem(){
		setScheduledItem([...scheduleItems, 	{week_day: 0, from: '8:00 AM', to: '4:00 PM'},])
	}
	function handleCreateClass(event : FormEvent){
		event.preventDefault()
		api.post('classes', {
			name, avatar, whatsapp, bio, cost: Number(cost), subject, 
			schedule: scheduleItems
		}).then(() => {alert('cadastro feito')
		history.push('/')
	})
		.catch((err) =>{ alert(err)})
	}
	function setScheduleItemValue(position: number, field: string, value: string){
		const updatedScheduleItems = scheduleItems.map((scheduleItem, index) =>{
			if (index === position){
				return {...scheduleItem, [field]: value}
			}
			return scheduleItem
		})
		setScheduledItem(updatedScheduleItems)
	}
	return (
		<div id="page-teacher-form" className="container">
			<PageHeader 
				title="Que incrivel que vc quer dar aulas"
				description="O primeiro passo é preencher o nosso formulário"	
			/>
			<main>
				<form onSubmit={handleCreateClass} >				
				<fieldset>
					<legend>Seus dados</legend>
					<Input name="name" label="Nome completo" 
						value={name} onChange={(e) => setName(e.target.value)}/>  
					<Input name="avatar" label="Avatar"
						value={avatar} onChange={(e) => setAvatar(e.target.value)}/>  
					/>  
					<Input name="whatsapp" label="Whatsapp"
						value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}/>  
					/>  	
					<Textarea name="bio" label="Bio"
						value={bio} onChange={(e) => setBio(e.target.value)}/>  
					/>				
				</fieldset>
				<fieldset>
					<legend>Sobre a aula</legend>
					<Select 
						name="subject" label="Matéria"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						options={[
							{value: 'Artes', label:'Artes'},
							{value: 'Biologia', label:'Biologia'},
							{value: 'Química', label:'Química'},
						]}
					/>  
					<Input name="cost" label="Custo da sua hora por aula"
						value={cost}
						onChange={(e) => setCost(e.target.value)}
					/>  
				</fieldset>
				<fieldset>
					<legend>
						Horários disponíveis
						<button type="button" onClick={addScheduleItem}>+ Novo horário</button>
					</legend>
					{scheduleItems.map((schedule, index) =>{
						return (
							<div key={schedule.week_day} className="schedule-item">
								
							<Select 
								name="week_day" label="Dia da semana"
								value={schedule.week_day}
								onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
							<Input name="from" label="Das" type="time"
							value={schedule.from}
								onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
							/>  
							<Input name="to" label="Até" type="time"
								value={schedule.to}
								onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
							/>  
							</div>
						)
					})}
				</fieldset>
				<footer>
					<p>
						<img src={warningIcon} alt="Aviso importante"/>
						Importante <br />
						Preencha todos os dados!
					</p>
					<button type="submit">Salvar cadastro</button>
				</footer>
				</form>
			</main>
		</div>

	)
}

export default TeacherForm