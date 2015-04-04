var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema
({
	firstname: String,
	lastname: String,
	username: String,
	password: String
});

UserSchema.methods.createNew = function(data)
{
	this.save(data);
};
mongoose.model("User", UserSchema);

