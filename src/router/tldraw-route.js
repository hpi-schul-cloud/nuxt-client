const isTldraw = (path) => {
	return path.startsWith("/tldraw-test") || path.startsWith("/static");
};

module.exports = {
	isTldraw,
};
