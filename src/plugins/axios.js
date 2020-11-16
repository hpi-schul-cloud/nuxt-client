const unrecoverableErrorCodes = [401, 404, 500];

export default function ({ $axios, store, error }) {
	$axios.onRequest((config) => {
		store.commit("error/reset");
		if (store.state.auth.accessToken) {
			config.headers.common["Authorization"] =
				"Bearer " + store.state.auth.accessToken;
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
