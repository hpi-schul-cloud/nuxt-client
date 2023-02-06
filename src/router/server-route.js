const isServer = (path) => {
	return path.startsWith("/api/v");
};
const isFileStorage = (path) => {
	return path.startsWith("/api/v3/file");
};

module.exports = {
	isServer,
	isFileStorage,
};
