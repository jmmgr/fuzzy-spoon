'use strict';

const {request} = require('./request_wrapper');

(async () => {
	console.log('Getting existing url =>', await request({
		url: 'https://api.github.com/',
	}));
	console.log('Getting non existing url =>', await request({
		url: 'https://api.github.com/random_url',
	}));
})();
