'use strict';

const axios = require('axios');

const request_wrapper = {
	request,
	handle404,
};

async function request(options) {
	let hasError;
	const response = await axios.request(options)
		.catch(error => {
			hasError = Boolean(error);
			if (error.response && error.response.status === 404) {
				return request_wrapper.handle404(options, error);
			}
			throw error;
		});
	if (hasError) {
		return response;
	}
	return response.status;
}

function handle404(options) {
	return {
		error: 'Reponse 404',
		message: `Error, handled 404 response of url ${options.url}`,
	};
}

module.exports = request_wrapper;
