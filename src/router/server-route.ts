export const isServer = (path: string) => path.startsWith("/api/v") && !isFileStorage(path) && !isCommonCartridge(path);

export const isFileStorage = (path: string) => path.startsWith("/api/v3/file") || path.startsWith("/api/v3/wopi");

export const isH5pEditor = (path: string) => path.startsWith("/api/v3/h5p-editor");

export const isArchiveDownload = (path: string) => path.startsWith("/api/v1/filestorage/files/archive");

export const isFWUEndpoint = (path: string) => path.startsWith("/api/v3/fwu");

export const isH5pStaticFiles = (path: string) => path.startsWith("/api/v3/h5p-editor/h5pstatics");

export const isCommonCartridge = (path: string) => path.startsWith("/api/v3/common-cartridge");

export const isNotification = (path: string) => path.startsWith("/notifications");

