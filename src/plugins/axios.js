import { authModule, errorModule } from "@/store";

const unrecoverableErrorCodes = [401, 403, 404, 500];

export default async function ({ $axios, app, error }) {
	const runtimeConfigJson = await $axios.get(
		`${window.location.origin}/runtime.config.json`
	);
	window.schoolCloudRuntimeConfig = runtimeConfigJson.data;
	$axios.setBaseURL(window.schoolCloudRuntimeConfig.apiURL);

	$axios.onRequest((config) => {
		errorModule.setError(null);

		if (authModule.getAccessToken) {
			config.headers.common["Authorization"] =
				"Bearer " + authModule.getAccessToken;
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
			errorModule.setError(unrecoverableError);
			error(unrecoverableError);
			app.router.push({ path: "/request-error" });
		}
	});
}
