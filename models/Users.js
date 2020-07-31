/**
 * This is the user model.
 * Creating schema for user
 *
 * @class userModel
 */
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var userSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String },
	}
);


//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this


  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})


/*
 * create model from schema
 */
var collectionName = "users";
var users = mongoose.model("users", userSchema, collectionName);

/*
 * export users model
 */
module.exports = users;
