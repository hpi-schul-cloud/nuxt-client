import { applicationErrorModule, authModule } from "@/store";

const unrecoverableErrorCodes = [401, 403, 404, 500];

const isRecoverable = (err) =>
	unrecoverableErrorCodes.includes(err.response.data.code);

const isTimeout = (err) =>
	err.response === undefined || err.response === null;

export default async function ({ $axios, error }) {
	const runtimeConfigJson = await $axios.get(
		`${window.location.origin}/runtime.config.json`
	);
	window.schoolCloudRuntimeConfig = runtimeConfigJson.data;
	$axios.setBaseURL(window.schoolCloudRuntimeConfig.apiURL);

	$axios.onRequest((config) => {
		if (authModule.getAccessToken) {
			config.headers.common["Authorization"] =
				"Bearer " + authModule.getAccessToken;
		}
	});

	$axios.onError((err) => {
		if (!isTimeout(err) && isRecoverable(err)) {
			return;
		}
		const unrecoverableError = {
			statusCode: null,
			message: null,
		};
		unrecoverableError.message = isTimeout(err)
			? "Connection timeout!"
			: err.response.data.message;
		unrecoverableError.statusCode = isTimeout(err)
			? 408
			: err.response.data.code;
		if (!err.response) {
			err.response = {
				data: unrecoverableError,
			};
		}
		applicationErrorModule.setError(unrecoverableError);
	});
}
