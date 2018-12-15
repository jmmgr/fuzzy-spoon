'use strict';

const axios = require('axios');
const request_wrapper = require('./request_wrapper');

describe('request_wrapper', () => {
	test('on 404, verify we call handle404', async () => {
		const axios_mock = jest.spyOn(axios, 'request').mockRejectedValue({
			response: {
				status: 404,
				message: 'invalid url',
			},
		});

		const spy_handle404 = jest.spyOn(request_wrapper, 'handle404');
		await request_wrapper.request({
			method: 'get',
			url: 'https://randomURL',
		});
		expect(axios_mock).toHaveBeenCalled();
		expect(spy_handle404).toHaveBeenCalled();
		expect(spy_handle404.mock.calls).toMatchSnapshot('handle404_calls');
		expect(spy_handle404.mock.results).toMatchSnapshot('handle404_results');
	});
});
