import { applicationErrorModule, authModule } from "@/store";
import { createApplicationError } from "@/utils/create-application-error.factory";

const unrecoverableErrorCodes = [401, 403, 404, 500];

const isRecoverable = (err) =>
	!unrecoverableErrorCodes.includes(err.response.data.code);

const isTimeout = (err) => err.response === undefined || err.response === null;

export default async function ({ $axios }) {
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

		if (isTimeout(err)) {
			applicationErrorModule.setError(createApplicationError(408));
			return;
		}
		if (err.response.data.code) {
			applicationErrorModule.setError(
				createApplicationError(err.response.data.code)
			);
		} else {
			applicationErrorModule.setError(createApplicationError(500));
		}
	});
}
