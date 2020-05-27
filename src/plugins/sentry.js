import Theme from "@theme/config";
const env = require("../../nuxt.config");

export default ({ app, store }) => {
	const { user } = store.state.auth;
	app.$sentry.configureScope((scope) => {
		scope.setLevel("warn");
		scope.setTag("theme", Theme.name);
		scope.setTag("domain", window.location.host);
		scope.setTag("sampleRate", env.SENTRY_SAMPLE_RATE);

		// populate userdata
		if (user && user.schoolId) {
			scope.setTag({ schoolId: user.schoolId });
		}
	});

		app.use(Sentry.Handlers.requestHandler());
	// eslint-disable-next-line no-console
	console.log("sentry error logging initialized");
	}
