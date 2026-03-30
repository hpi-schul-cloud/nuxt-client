import { courseRoomDetailsModule } from "@/store";

export const useCommonCartridgeExport = () => {
	const allowedVersions = ["1.1.0", "1.3.0"];

	const startExport = async (
		version: string,
		topics: string[],
		tasks: string[],
		columnBoards: string[]
	): Promise<void> => {
		if (!allowedVersions.includes(version)) {
			return;
		}

		await courseRoomDetailsModule.downloadCommonCartridgeCourse({
			version: version as "1.1.0" | "1.3.0",
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
