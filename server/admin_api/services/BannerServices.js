const Banner = require('../models/Banner')
const FileService = require('../services/FileService');
const PaginationService = require('./PaginationService');

class BannerServices {  
	handleErrors(err){
		let errors = {title: '', teaser: ''}; 

		//validation errors
		if(err.message.includes('banners validation failed')){
			Object.values(err.errors).forEach(function({properties}){
				errors[properties.path] = properties.message;
			})
		}

		return errors; 
	} 

	async index(req){
		const banners = await PaginationService.paginate(req, Banner); 
 		return banners;
	} 

	async create(body){
		const newBanner = new Banner(body);
		await newBanner.save();
		return newBanner;
	} 

	async update(body){
		let banner = await Banner.findOne({slug: body.slug});
		banner.status = body.status;
		banner.ge = body.ge;
		banner.en = body.en;
		banner.ru = body.ru;
		banner = await banner.save();
		return banner;
	}

	async destroy(slug){
		const banner = await Banner.deleteOne({ slug: slug});
		return banner;
	}

} 

module.exports = new BannerServices();