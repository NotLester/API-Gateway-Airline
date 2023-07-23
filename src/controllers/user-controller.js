const { UserService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

//POST /signup   {email: "", password: ""}
async function create(req, res) {
	try {
		const user = await UserService.create({
			email: req.body.email,
			password: req.body.password,
		});
		SuccessResponse.data = user;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
   } catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

module.exports = { create };
