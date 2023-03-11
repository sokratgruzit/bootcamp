const HomePage = require('../models/HomePage')

class BannerServices {  
	async index(){
		let data =  await HomePage.findOne({ name: 'home_page' }).exec();
		if(!data){
			data = new  HomePage();
			await data.save(); 
		}
 		return data;
	} 
 
	async update(body){
		console.log(body); 
		const query = {name: 'home_page'};
		let data = await HomePage.findOneAndUpdate(query, body)
		// let banner = await Banner.findOne({slug: body.slug});
		// banner.status = body.status;
		// banner.ge = body.ge;
		// banner.en = body.en;
		// banner.ru = body.ru;
		// banner = await banner.save(); 
		console.log(data);
		return data;
	}
} 

module.exports = new BannerServices();