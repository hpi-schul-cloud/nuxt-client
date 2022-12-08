const { isServer } = require("./server-route");
const { isVueClient } = require("./vue-client-route");

const isLegacyClient = (path) => {
	return !(isServer(path) || isVueClient(path));
};

module.exports = {
	isLegacyClient,
};
