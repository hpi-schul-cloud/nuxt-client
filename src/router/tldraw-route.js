const isTldrawClient = (path) => {
	return path.startsWith("/tldraw-client") || path.startsWith("/static");
};

const isTldrawServer = (path) => {
	return path.startsWith("/tldraw-server"); //TODO
};

module.exports = {
	isTldrawClient,
	isTldrawServer,
};
