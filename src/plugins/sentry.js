import Theme from "@theme/config";

export default ({ app, store }) => {
	const user = store.getters["auth/getUser"];

	app.$sentry.configureScope((scope) => {
		scope.setLevel("warn");
		scope.setTag("theme", Theme.name);
		scope.setTag("domain", window.location.host);

		// populate userdata
		if (user && user.schoolId) {
			scope.setTag({ schoolId: user.schoolId });
		}
	});
	// eslint-disable-next-line no-console
	console.log("sentry error logging initialized");
};
