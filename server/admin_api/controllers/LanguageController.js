const Language = require('../models/Language');

class LanguageController {  

	async index(req, res){
		try{ 
			let languages = await Language.findOne({name: 'language'}).exec(); 
			if(!languages || languages.length < 1){
				languages = new  Language();
				await languages.save(); 
			}
			res.status(200).json({languages});
		}catch(e){
			res.status(400).json(e);
		}
	}

}

module.exports = new LanguageController(); 