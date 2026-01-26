const isServer = (path) => path.startsWith("/api/v") && !isFileStorage(path) && !isCommonCartridge(path);

const isFileStorage = (path) => path.startsWith("/api/v3/file") || path.startsWith("/api/v3/wopi");

/**
 * @param {string} path
 */
const isH5pEditor = (path) => path.startsWith("/api/v3/h5p-editor");

/**
 * @param {string} path
 */
const isFWUEndpoint = (path) => path.startsWith("/api/v3/fwu");

/**
 * @param {string} path
 */
const isH5pStaticFiles = (path) => path.startsWith("/api/v3/h5p-editor/h5pstatics");

/**
 * @param {string} path
 */
const isCommonCartridge = (path) => path.startsWith("/api/v3/common-cartridge");

export { isCommonCartridge, isFileStorage, isFWUEndpoint, isH5pEditor, isH5pStaticFiles, isServer };
