const isServer = (path) => {
	return path.startsWith("/api/v") && !isFileStorage(path);
};

const isEduSharing = (path) => {
	return path.startsWith("/api/v3/edu-sharing");
};

const isFileStorage = (path) => {
	return path.startsWith("/api/v3/file");
};

const isH5pEditor = (path) => {
	return path.startsWith("/api/v3/h5p-editor");
};

const isEduSharingRepo = (path) => {
	return path.startsWith("/edu-sharing/rest");
};

module.exports = {
	isServer,
	isEduSharing,
	isEduSharingRepo,
	isFileStorage,
	isH5pEditor,
};
