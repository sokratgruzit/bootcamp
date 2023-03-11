const MainInfo = require('../models/MainInfo');
const FileService = require('../services/FileService');   

class MainInfoServices {
	handleErrors(err){

		let errors = {img: '', email: '' , title: ''}; 

		//image error
		if (err.message === 'Invalid Image Extension') {
		    errors.img = 'Invalid image extension'; 
		}

		// incorrect email
		if (err.message === 'Please enter valid email') {
		    errors.email = 'Please enter valid email';
		} 

		//validation errors
		if(err.message.includes('Validation failed')){
			Object.values(err.errors).forEach(function({properties}){
				console.log(properties.message);
				errors[properties.path] = properties.message;
			})
		}

		return errors; 
	} 
 	
 	async index(){
		let mainInfo = await MainInfo.findOne({name: 'main_info'}).exec();
		if(!mainInfo){
			mainInfo = new MainInfo();
		}
		return mainInfo;
 	}

	async update(body){
		const filter = { name: 'main_info' };
		let main_info = await MainInfo.findOneAndUpdate(filter, body);
		return main_info; 
	}
}

module.exports = new MainInfoServices(); 