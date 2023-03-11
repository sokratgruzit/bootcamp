const Quizz = require('../../admin_api/models/Quizz');
const QuizzResults = require('../../admin_api/models/QuizzResult');

 
class QuizzServices {  
	async index(){
		const data = await Quizz.find({status: true}).exec();
 		return data;
	} 

	async indexResults(){
		const data = await QuizzResults.find().exec();
 		return data;
	}

	async createResult(body){
		const item = new QuizzResults(body);
		await item.save();
		return item;
	}
} 

module.exports = new QuizzServices();
