const PaginationService = require('./PaginationService');
const Quizz = require('../models/Quizz')

class MultipleContentServices {

	handleErrors(err){
		return err; 
	} 

	async index(req){
		const data = await PaginationService.paginate(req, Quizz); 
 		return data;
	} 

	async create(body){
		const item = new Quizz(body);
		await item.save();
		return item;
	} 
 
	async update(body){
		let item = await Quizz.findByIdAndUpdate(body._id, body);
		return item;
	}

	async updateStatus(body){
		let item = await Quizz.findByIdAndUpdate(body._id, {status: body.status});
		return item;
	}
 
	async destroy(id){
		const item = await Quizz.findOneAndDelete({ _id: id });
		return item;
	}

} 

module.exports =  new MultipleContentServices();