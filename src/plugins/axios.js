import AuthModule from "@/store/auth";

const unrecoverableErrorCodes = [401, 404, 500];

export default async function ({ $axios, store, error }) {
	const runtimeConfigJson = await $axios.get(
		`${window.location.origin}/runtime.config.json`
	);
	window.schoolCloudRuntimeConfig = runtimeConfigJson.data;
	$axios.setBaseURL(window.schoolCloudRuntimeConfig.apiURL);

	$axios.onRequest((config) => {
		store.commit("error/reset");

		if (AuthModule.getAccessToken) {
			config.headers.common["Authorization"] =
				"Bearer " + AuthModule.getAccessToken;
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
