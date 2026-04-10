import { isServer } from "./server-route.mjs";
import { isVueClient } from "./vue-client-route.mjs";

const isLegacyClient = (path: string) => !(isServer(path) || isVueClient(path));

export { isLegacyClient };
