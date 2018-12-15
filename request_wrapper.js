'use strict';

const axios = require('axios');

async function request(options) {
	try {
		const response = await axios.request(options);
		return response.status;
	} catch (error) {
		if (error.response && error.response.status === 404) {
			return request_wrapper.handle404(options, error);
		}
		throw error;
	}
}

// At the moment return for testing
function handle404 (options, error) {
	return {
		error: 'Reponse 404',
		message: `Error, handling 404 response of url ${options.url}`
	};
}

const request_wrapper = {
	request,
	handle404
}

module.exports = request_wrapper;
