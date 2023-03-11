const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
	value: {
		type: String,
		unique: true,
		default: "USER"
	}
})

const Role = mongoose.model('roles', roleSchema);

module.exports = Role;