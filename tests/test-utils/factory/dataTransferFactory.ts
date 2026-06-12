export const fileSystemFileEntryFactory = (file: File): FileSystemFileEntry => ({
	isFile: true,
	isDirectory: false,
	name: file.name,
	fullPath: `/${file.name}`,
	filesystem: {} as FileSystem,
	getParent: vi.fn(),
	file: (successCb) => successCb(file),
});

export const fileSystemDirectoryReaderFactory = (batches: FileSystemEntry[][]): FileSystemDirectoryReader => {
	let batchIndex = 0;
	return {
		readEntries: (successCb) => {
			successCb(batches[batchIndex++] ?? []);
		},
	};
};

export const fileSystemDirectoryEntryFactory = (
	name: string,
	entries: FileSystemEntry[],
	batches?: FileSystemEntry[][]
): FileSystemDirectoryEntry => ({
	isFile: false,
	isDirectory: true,
	name,
	fullPath: `/${name}`,
	filesystem: {} as FileSystem,
	getParent: vi.fn(),
	createReader: () => fileSystemDirectoryReaderFactory(batches ?? [entries, []]),
	getDirectory: vi.fn(),
	getFile: vi.fn(),
});

export const dataTransferFileItemFactory = (entry: FileSystemEntry | null): DataTransferItem => ({
	kind: "file",
	type: "",
	getAsFile: vi.fn(),
	getAsString: vi.fn(),
	webkitGetAsEntry: () => entry,
});

export const dataTransferStringItemFactory = (): DataTransferItem => ({
	kind: "string",
	type: "text/plain",
	getAsFile: vi.fn(),
	getAsString: vi.fn(),
	webkitGetAsEntry: vi.fn(),
});

export const dataTransferItemListFactory = (items: DataTransferItem[]): DataTransferItemList =>
	items as unknown as DataTransferItemList;
