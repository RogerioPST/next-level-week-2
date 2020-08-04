import path from 'path'

//precisa ser c essa sintaxe mais antiga, pois knex ainda n entende
module.exports = {
	client: 'sqlite3',
	connection:{
		filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
	},
	migrations:{
		directory: path.resolve(__dirname, 'src', 'database', 'migrations' )
	},
	useNullAsDefault: true,
}