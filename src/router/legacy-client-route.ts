import { isServer } from "./server-route.js";
import { isVueClient } from "./vue-client-route.js";

export const isLegacyClient = (path: string) => !(isServer(path) || isVueClient(path));
