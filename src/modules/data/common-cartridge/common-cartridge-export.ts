import { enforceDownload } from "@/utils/fileHelper";

export type CommonCartridgeVersion = "1.1.0" | "1.3.0";

export const allowedVersions: CommonCartridgeVersion[] = ["1.1.0", "1.3.0"];

export const startExport = async (
	version: CommonCartridgeVersion,
	roomId: string,
	topics: string[],
	tasks: string[],
	columnBoards: string[]
): Promise<void> => {
	if (!allowedVersions.includes(version)) {
		throw new Error(`Invalid version: ${version}. Allowed versions are: ${allowedVersions.join(", ")}`);
	}

	enforceDownload(`/api/v3/common-cartridge/export/${roomId}?version=${version}`, [
		{ key: "topics", value: JSON.stringify(topics) },
		{ key: "tasks", value: JSON.stringify(tasks) },
		{ key: "columnBoards", value: JSON.stringify(columnBoards) },
	]);
};
