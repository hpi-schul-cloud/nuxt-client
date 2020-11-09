// const errorPageCodes = [404, 500, 400];

export default function ({ $axios, store }) {
	$axios.onRequest((config) => {
		if (store.state.auth.accessToken) {
			config.headers.common["Authorization"] =
				"Bearer " + store.state.auth.accessToken;
		}
	});

	// $axios.onError((err) => {
	// 	if (!err.response) {
	// 		error({ statusCode: null, message: "Network failure" });
	// 	}
	// 	const code = parseInt(err.response.data.code);
	// 	if (errorPageCodes.includes(code)) {
	// 		error({
	// 			statusCode: err.response.data.code,
	// 			message: err.response.data.message,
	// 		});
	// 	}
	// });
}
