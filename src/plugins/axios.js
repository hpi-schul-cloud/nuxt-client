import { applicationErrorModule, authModule } from "@/store";

const unrecoverableErrorCodes = [401, 403, 404, 500];

const isRecoverable = (err) =>
	unrecoverableErrorCodes.includes(err.response.data.code);

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

		// const { createApplicationError } = useApplicationError();

		if (isTimeout(err)) {
			applicationErrorModule.setError({
				statusCode: 408,
				messageTranslationKey: "error.408",
			});
			// throw createApplicationError(408)
			return;
		}

		applicationErrorModule.setError({
			statusCode: err.response.data.statusCode,
			messageTranslationKey: "error." + err.response.data.statusCode,
		});
	});
}
