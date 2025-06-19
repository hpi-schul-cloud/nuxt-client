import { createProxyMiddleware } from "http-proxy-middleware";

const createLegacyClientProxy = () => {
	const legacyClientProxy = createProxyMiddleware({
		target: "http://localhost:3100",
		changeOrigin: true,
	});
	return legacyClientProxy;
};

const createServerProxy = () => {
	const serverProxy = createProxyMiddleware({
		target: "http://localhost:3030",
		changeOrigin: true,
	});
	return serverProxy;
};

const createFileStorageProxy = () => {
	const fileStorageProxy = createProxyMiddleware({
		target: "http://localhost:4444",
		changeOrigin: true,
	});
	return fileStorageProxy;
};

const createH5pEditorProxy = () => {
	const h5pEditorProxy = createProxyMiddleware({
		target: "http://localhost:4448",
		changeOrigin: true,
	});
	return h5pEditorProxy;
};

const createH5pStaticFilesProxy = () => {
	const h5pStaticFilesProxy = createProxyMiddleware({
		target: "http://localhost:8080",
		changeOrigin: true,
		pathRewrite: { "^/api/v3/h5p-editor": "" },
	});
	return h5pStaticFilesProxy;
};

const createCommonCartridgeProxy = () => {
	const commonCartridgeProxy = createProxyMiddleware({
		target: "http://localhost:3350",
		changeOrigin: true,
	});
	return commonCartridgeProxy;
};

export {
	createCommonCartridgeProxy, 
	createFileStorageProxy,
	createH5pEditorProxy,
	createH5pStaticFilesProxy, 
	createLegacyClientProxy,
	createServerProxy
};

