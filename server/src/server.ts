import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()

app.use(cors())
//c isso, o express entende json, pois, por padrão, n entende. 
app.use(express.json())
app.use(routes)

/* app.get('/users', (req, resp) =>{'
	const users =[
		{name: 'Rogerio', age: 37},
		{name: 'Vanessa', age: 36},
	]

	return resp.json(users)
})

app.post('/users', (req, resp) =>{
	const users =[
		{name: 'Rogerio', age: 37},
		{name: 'Vanessa', age: 36},
	]

	return resp.json(users)
}) */

app.listen(3333)