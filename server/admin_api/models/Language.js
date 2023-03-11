const mongoose = require('mongoose'); 

const languageSchema = new mongoose.Schema(
{
	name:{
		type: String,
		default: 'language'
	},
	list:{
		type: Array,
		default: [
			{
				code: 'en',
				title: 'English'
			},
			{
				code: 'ru',
				title: 'Russian'
			},
			{
				code: 'ge',
				title: 'Georgian'
			},
		]
	}
}) 
 

const Lanhuage = mongoose.model('language', languageSchema);

module.exports = Lanhuage;