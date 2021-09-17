import AuthModule from "@/store/auth";

const unrecoverableErrorCodes = [401, 404, 500];

const asyncInterval = async (callback, ms, triesLeft = 5) => {
	return new Promise((resolve, reject) => {
		const interval = setInterval(async () => {
			if (await callback()) {
				resolve();
				clearInterval(interval);
			} else if (triesLeft <= 1) {
				reject();
				clearInterval(interval);
			}
			// eslint-disable-next-line no-param-reassign
			triesLeft--;
		}, ms);
	});
};

export default async function ({ $axios, store, error }) {
	await asyncInterval(
		() => typeof schoolCloudRuntimeConfig !== "undefined",
		50,
		200
	);

	// Set baseURL (both client and server)
	$axios.setBaseURL(schoolCloudRuntimeConfig.baseURL);

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
