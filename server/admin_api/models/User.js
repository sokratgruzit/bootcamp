const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt'); 
 
const userSchema = mongoose.Schema({ 
	email: {
		type: String, 
		required: [true, 'Please enter an email'],
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Please enter valid email']  
	},
	password: {
		type: String,
		required: [true, 'incorrect email'],
		minlength: [6, 'Minimum password length is 6 characters']
	},
	roles:[{
		type: String,
		ref: 'Role'
	}]
})

//mongoose hooks//

// fire function before doc saved to db
userSchema.pre('save', async function(next){
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
})

//static methods//

//login method
userSchema.statics.login = async function(userData){
	const user = await this.findOne({email: userData.email});
	if(user){
		const auth = await bcrypt.compare(userData.password, user.password);
		if(auth){
			return user;
		}
		throw Error('incorrect password');
	}
	throw Error('incorrect email');
};

const User = mongoose.model('users', userSchema);

module.exports = User;