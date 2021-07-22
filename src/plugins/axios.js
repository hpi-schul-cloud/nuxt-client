const unrecoverableErrorCodes = [401, 404, 500];

export default function ({ $axios, store, error }) {
	$axios.onRequest((config) => {
		// prepend default '/v1' version prefix to all urls that don't begin with '/v<x>/'
		if (!config.url.match(/^\/v\d\//)) {
			config.url = `/v1${config.url}`;
		}

		store.commit("error/reset");
		if (store.getters["auth/getAccessToken"]) {
			config.headers.common["Authorization"] =
				"Bearer " + store.getters["auth/getAccessToken"];
		}
	});

	$axios.onError((err) => {
		if (
			!err.response ||
			unrecoverableErrorCodes.includes(err.response.data.code)
		) {
			const unrecoverableError = {
				statusCode: null,
				message: null,
			};
			unrecoverableError.message = !err.response
				? "Connection timeout!"
				: err.response.data.message;
			unrecoverableError.statusCode = !err.response
				? null
				: err.response.data.code;
			if (!err.response) {
				err.response = {
					data: unrecoverableError,
				};
			}
			store.commit("error/set", unrecoverableError);
			error(unrecoverableError);
		}
	});
}
