const isServer = (path) => {
	return (
		path.startsWith("/api/v") &&
		!isFileStorage(path) &&
		!isCommonCartridge(path)
	);
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

/**
 * @param {string} path
 */
const isCommonCartridge = (path) => {
	return path.startsWith("/api/v3/common-cartridge");
};

export {
	isServer,
	isFileStorage,
	isH5pEditor,
	isH5pStaticFiles,
	isCommonCartridge,
};
