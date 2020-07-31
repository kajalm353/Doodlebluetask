const jwt = require('jsonwebtoken');
// const config = require('config');

module.exports = function (req, res, next) {
	const token = req.header('x-access-token');

	if (!token){

		console.log("token not their");
		
		 return res.status(401).send('Access denied. No token provided.')
		};

	try {
		const decoded = jwt.verify(token, 'jwtPrivateKey');
		req.user = decoded;
		next();
	} catch (ex) {
		res.status(400).send('Invalid token.');
	}
};