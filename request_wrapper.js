'use strict';

const axios = require('axios');

async function request(options) {
	const response = await axios.request(options)
		.catch(error => {
			if (error.response && error.response.status === 404) {
				return request_wrapper.handle404(options, error);
			}
			throw error;
		});
	if (response.error) 
		return response;
	return response.status;
}

function handle404 (options, error) {
	return {
		error: 'Reponse 404',
		message: `Error, handled 404 response of url ${options.url}`
	};
}

const request_wrapper = {
	request,
	handle404
}

module.exports = request_wrapper;
