import Theme from "@theme/config";
const env = require("../../nuxt.config");
const { Configuration } = require('@schul-cloud/commons');


export default ({ app, store }) => {
	const { user } = store.state.auth;
	app.$sentry.configureScope((scope) => {
		scope.setLevel("warn");
		scope.setTag("theme", Theme.name);
		scope.setTag("domain", window.location.host);

		// populate userdata
		if (user && user.schoolId) {
			scope.setTag({ schoolId: user.schoolId });
		}
	});
	if (Configuration.has('SENTRY_DSN')) {
		Sentry.init({
			dsn: Configuration.get('SENTRY_DSN'),
			sampleRate: env.SENTRY_SAMPLE_RATE,
		});

		app.use(Sentry.Handlers.requestHandler());
	}
	// eslint-disable-next-line no-console
	console.log("sentry error logging initialized");
};
