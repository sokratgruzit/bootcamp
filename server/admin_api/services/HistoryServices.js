const History = require('../models/History')
const PaginationService = require('./PaginationService');

class HistoryServices {  
	handleErrors(err){
		return err; 
	} 

	async index(req){
		const histories = await PaginationService.paginate(req, History); 
 		return histories;
	} 

	async create(body){
		const history = new History(body);
		await history.save();
		return history;
	} 

	async update(body){
		let history = await History.findByIdAndUpdate(body._id, body);
		return history;
	}

	async updateStatus(body){
		console.log(body)
		let history = await History.findByIdAndUpdate(body._id, {status: body.status});
		return history;
	}
 
	async destroy(id){
		const history = await History.findOneAndDelete({ _id: id });
		return history;
	}

} 

module.exports = new HistoryServices();