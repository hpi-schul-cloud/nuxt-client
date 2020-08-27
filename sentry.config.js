const pkg = require("./package");

const environment = process.env.NODE_ENV;
const sampleRate = process.env.SENTRY_SAMPLE_RATE
	? parseFloat(process.env.SENTRY_SAMPLE_RATE)
	: 1.0;

module.exports = {
	config: {
		release: pkg.version,
		environment,
		sampleRate,
		beforeSend: (event) => {
			function removeIds(url) {
				var checkForHexRegExp = /[a-f\d]{24}/gi;
				return url.replace(checkForHexRegExp, "ID");
			}
			if (event.request && event.request.url) {
				var cleanUrl = removeIds(event.request.url);
				event.request.url = cleanUrl;
			}
			return event;
		},
	},
	clientIntegrations: {
		Dedupe: {},
		ExtraErrorData: {},
		ReportingObserver: {},
		RewriteFrames: {},
		Vue: { attachProps: true },
		CaptureConsole: { levels: ["warn", "error"] },
	},
	serverIntegrations: {
		Dedupe: {},
		ExtraErrorData: {},
		RewriteFrames: {},
		Transaction: {},
		CaptureConsole: { levels: ["warn", "error"] },
	},
};
