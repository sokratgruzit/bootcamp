const Article = require('../models/Article');
const PaginationService = require('./PaginationService');
const FileService = require('../services/FileService');   
 
class ArticleServices { 

	handleErrors(err){
		let errors = {title: '', teaser: '', img: ''};

		//image error
		if (err.message === 'Invalid Image Extension') {
		    errors.img = 'Invalid image extension';
		}

		/*dublicate error*/
		if(err.code === 11000){
			errors.title = 'Title must be unqiue';
			return errors;
		}

		//validation errors 
		if(err.message.includes('articles validation failed')){
			Object.values(err.errors).forEach(function({properties}){
				errors[properties.path] = properties.message;
			})
		}

		return errors;
	} 


 	async getAll(req){
 		const articles = await PaginationService.paginate(req, Article);
 		return articles;
 	} 

 	async findOne(id){
		const article = await Article.findById(id); 
		return article;
	} 
 
 	async add(body, picture){
 		let fileName = null;
		if(picture){ 
			fileName = FileService.saveImage(picture, '/uploads/articles/');	 
		}
		let article = new Article({...body, picture: fileName});
		article = await article.save();
		return article;
 	}

 	async deleteOne(id){
 		const article = await Article.findByIdAndDelete(id);

		if(article.picture && article.picture.path){
			FileService.removeImage(article.picture.path);	
		}

		return article;
 	}

 	async edit(body, picture){
 		let article = await Article.findById(body.id);
 		if(picture){
 			const fileName = FileService.saveImage(picture, '/uploads/articles/');
 			if(article.picture && article.picture.path){
				FileService.removeImage(article.picture.path);
			}
 			article.picture = fileName; 
 		}
		article.title = body.title;
		article.teaser = body.teaser;
		article = await article.save();

		return article;
	}
}
 
 module.exports = new ArticleServices(); 