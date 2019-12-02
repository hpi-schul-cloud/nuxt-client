// Aliases are not supported here :'(
import proxyServerMiddleware from "../serverMiddleware/proxy";

export default function SimpleModule(moduleOptions) {
	console.log(moduleOptions);
	console.log(this);
	//console.log(this.nuxt);
	//console.log(this.nuxt.moduleContainer.requiredModules.sentry);
	this.addServerMiddleware(proxyServerMiddleware);
}
