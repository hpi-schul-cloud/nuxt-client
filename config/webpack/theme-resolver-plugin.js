class ThemeResolverPlugin {
	constructor(dirname, replacements) {
		this.dirname = dirname;
		this.replacements = replacements;
	}

	apply(resolver) {
		const target = resolver.ensureHook("resolve");
		resolver
			.getHook("resolve")
			.tapAsync("ThemeResolverPlugin", (request, resolveContext, callback) => {
				const foundReplace = this.replacements.find((replacement) => {
					if (request.request === undefined) {
						return false;
					}

					return request.request === replacement.find;
				});

				if (foundReplace) {
					console.log(
						`replace "${foundReplace.find}" with "${foundReplace.replacement}"\n`
					);

					const customRequest = {
						...request,
						request: `${foundReplace.replacement}`,
					};

					resolver.doResolve(
						target,
						customRequest,
						null,
						resolveContext,
						callback
					);
				} else {
					callback();
				}
			});
	}
}

module.exports = ThemeResolverPlugin;
