const isServer = (path) => {
	return path.startsWith("/api/v") && !isFileStorage(path);
};
const isFileStorage = (path) => {
	return path.startsWith("/api/v3/file");
};

/**
 * @param {string} path
 */
const isH5pEditor = (path) => {
	return path.startsWith("/api/v3/h5p-editor");
};

const isEduSharing = (path) => {
	return path.startsWith("/edu-sharing/rest");
};

module.exports = {
	isServer,
	isFileStorage,
	isH5pEditor,
	isEduSharing,
};
