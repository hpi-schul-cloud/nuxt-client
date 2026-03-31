import { courseRoomDetailsModule } from "@/store";

export type CommonCartridgeVersion = "1.1.0" | "1.3.0";

export const useCommonCartridgeExport = () => {
	const allowedVersions: CommonCartridgeVersion[] = ["1.1.0", "1.3.0"];

	const startExport = async (
		version: CommonCartridgeVersion,
		topics: string[],
		tasks: string[],
		columnBoards: string[]
	): Promise<void> => {
		if (!allowedVersions.includes(version)) {
			throw new Error(`Invalid version: ${version}. Allowed versions are: ${allowedVersions.join(", ")}`);
		}

		await courseRoomDetailsModule.downloadCommonCartridgeCourse({
			version,
			topics,
			tasks,
			columnBoards,
		});
	};

	return {
		startExport,
		allowedVersions,
	};
};
