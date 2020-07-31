const mongoose = require("mongoose");
const config = require("config");
const fs = require("fs");


module.exports = function() {
	const db = config.get("db");	
	const options = {}
	mongoose
		.connect(db, options)
		.then(() => console.log(`Connected to ${db}...`));
};
