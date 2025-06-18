import { isServer } from "./server-route";
import { isVueClient } from "./vue-client-route";

const isLegacyClient = (path: string) => {
	return !(isServer(path) || isVueClient(path));
};

export { isLegacyClient };
