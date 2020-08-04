import {Request, Response} from 'express'
import db from '../database/connection'
import convertHoursToMinutes from '../utils/convertHoursToMinutes'

interface ScheduleItem {
	week_day: number,
	from: string,
	to: string
}

export default class ClassesController {
	async index (req:Request, resp:Response) {
		const filters = req.query		

		const week_day = filters.week_day as string
		const subject = filters.subject as string
		const time = filters.time as string

		if (!week_day || !subject || !time){
			return resp.status(400).json({
				error: 'Missing filters to search classes'
			})
		}

		const timeInMinutes = convertHoursToMinutes(time)

		const classes = await db('classes')
			.whereExists(function(){
				this.select('class_schedule.*')
					.from('class_schedule')
					.whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
					.whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
					.whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])					
					.whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])					
			})
			.where('classes.subject', '=', subject)
			.join('users', 'classes.user_id', '=', 'users.id')
			.select(['classes.*', 'users.*'])
		return resp.json(classes)

	}
	async create (req:Request, resp:Response) {
		const { name, avatar, whatsapp, bio,
			subject, cost, schedule } = req.body
	
		//caso tenha alguma falha em algum passo, a transacao faz rollback
		const transacao = await db.transaction()
		try {
	
			const insertedUsersIds = await transacao('users').insert({
				name, avatar, whatsapp, bio
			})
			const user_id = insertedUsersIds[0]
	
			const insertedClassesIds = await transacao('classes').insert({
				subject, cost, user_id
			})
	
			const class_id = insertedClassesIds[0]
	
			//convertendo cada horario (8:00, 12:00) 
			//para inteiro/tempo em minutos
			const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
				return {
					class_id,
					week_day: scheduleItem.week_day,
					from: convertHoursToMinutes(scheduleItem.from),
					to: convertHoursToMinutes(scheduleItem.to),
				}
			})
	
			await transacao('class_schedule').insert(classSchedule)
	
			await transacao.commit()
	
			return resp.status(201).send()
		} catch (err) {
			await transacao.rollback()
			console.log(err)
			return resp.status(400).json({				
				error: 'Unexpected error'
			})
		}
	}
}