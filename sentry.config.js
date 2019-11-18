const pkg = require("./package");

module.exports = {
	config: {
		// environment: "{{@root.env}}", // TODO implement & enable
		release: pkg.version,
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
