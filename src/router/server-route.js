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

/**
 * @param {string} path
 */
const isH5pStaticFiles = (path) => {
	return path.startsWith("/api/v3/h5p-editor/h5pstatics");
};

module.exports = {
	isServer,
	isFileStorage,
	isH5pEditor,
	isH5pStaticFiles,
};
