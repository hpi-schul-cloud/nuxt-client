const { isServer } = import("./server-route");
const { isVueClient } = import("./vue-client-route");

const isLegacyClient = (path) => {
	return !(isServer(path) || isVueClient(path));
};

export { isLegacyClient };
