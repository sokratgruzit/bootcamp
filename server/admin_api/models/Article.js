const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug); 

const articleSchema = mongoose.Schema({
	title: {
		type: String,
		unique: true, 
		required: [true, 'Title is required'],
	}, 
	slug: { 
		type: String, 
		slug: "title", 
		slugPaddingSize: 2,  
		unique: true 
	},
	teaser: { 
		type: String
	},
	picture:{
		type: Object,
		default: false 
	}, 
	editor:{
		type: String
	},
},{
	timestamps: true
});


const Article = mongoose.model('articles', articleSchema);

module.exports = Article;