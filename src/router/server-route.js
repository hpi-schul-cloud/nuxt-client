const isServer = (path) => {
	return path.startsWith("/api/v");
};

module.exports = {
	isServer,
};
