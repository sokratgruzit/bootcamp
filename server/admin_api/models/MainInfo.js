const mongoose = require('mongoose'); 
const {isEmail} = require('validator');

const mainInfoSchema = mongoose.Schema({
	name:{
		type: String,
		default: 'main_info'
	},
	title:{
		type: String,
		required: [true, 'Please enter a title'],
		default: 'Title'
	},
	favicon:{
		type: Object,
		default: false
	},
	logo:{  
		type: Object,
		default: false
	},
	svg_logo:{
		type: Object,
		default: false
	},
	mobile:{
		type: String,
		default: 'xxx-xxx-xxx'
	},
	phone:{
		type: String,
		default: 'x-xx-xx-xx'
	},
	address:{
		type: String,
		default: 'address'
	},
	email:{
		type: String,
		default: 'email@address.com',
		lowercase: true,
		validate: [isEmail, 'Please enter valid email'] 
	},
	copyright:{ 
		type: String,
		default: '@copyright'
	},
}) 

mainInfoSchema.pre('findOneAndUpdate', function (next) {
    this.options.runValidators = true;
    next()
})

const MainInfo = mongoose.model('main_infos', mainInfoSchema);

module.exports = MainInfo;