import { courseRoomDetailsModule } from "@/store";
import { CommonCartridgeVersion, useCommonCartridgeExport } from "@data-common-cartridge";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { vi } from "vitest";

vi.mock("@/store", () => ({
	courseRoomDetailsModule: {
		downloadCommonCartridgeCourse: vi.fn(),
	},
}));

describe("useCommonCartridgeExport composable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		vi.clearAllMocks();
	});

	describe("state management", () => {
		it("should return allowed versions", () => {
			const { allowedVersions } = useCommonCartridgeExport();

			expect(allowedVersions).toEqual(["1.1.0", "1.3.0"]);
		});

		it("should return startExport function", () => {
			const { startExport } = useCommonCartridgeExport();

			expect(typeof startExport).toBe("function");
		});
	});

	describe("startExport", () => {
		it("should call courseRoomDetailsModule.downloadCommonCartridgeCourse with correct parameters", async () => {
			const { startExport } = useCommonCartridgeExport();
			const version: CommonCartridgeVersion = "1.1.0";
			const topics = ["topic1", "topic2"];
			const tasks = ["task1", "task2"];
			const columnBoards = ["board1"];

			await startExport(version, topics, tasks, columnBoards);

			expect(courseRoomDetailsModule.downloadCommonCartridgeCourse).toHaveBeenCalledTimes(1);
			expect(courseRoomDetailsModule.downloadCommonCartridgeCourse).toHaveBeenCalledWith({
				version,
				topics,
				tasks,
				columnBoards,
			});
		});

		it("should call courseRoomDetailsModule.downloadCommonCartridgeCourse with version 1.3.0", async () => {
			const { startExport } = useCommonCartridgeExport();
			const version: CommonCartridgeVersion = "1.3.0";
			const topics = ["topic1"];
			const tasks = ["task1"];
			const columnBoards = ["board1"];

			await startExport(version, topics, tasks, columnBoards);

			expect(courseRoomDetailsModule.downloadCommonCartridgeCourse).toHaveBeenCalledTimes(1);
			expect(courseRoomDetailsModule.downloadCommonCartridgeCourse).toHaveBeenCalledWith({
				version,
				topics,
				tasks,
				columnBoards,
			});
		});

		it("should not call courseRoomDetailsModule.downloadCommonCartridgeCourse with invalid version", async () => {
			const { startExport } = useCommonCartridgeExport();
			const version = "2.0.0" as CommonCartridgeVersion; // Invalid version
			const topics = ["topic1"];
			const tasks = ["task1"];
			const columnBoards = ["board1"];

			await expect(startExport(version, topics, tasks, columnBoards)).rejects.toThrow("Invalid version");

			expect(courseRoomDetailsModule.downloadCommonCartridgeCourse).not.toHaveBeenCalled();
		});

		it("should handle empty arrays for topics, tasks, and columnBoards", async () => {
			const { startExport } = useCommonCartridgeExport();
			const version: CommonCartridgeVersion = "1.1.0";
			const topics: string[] = [];
			const tasks: string[] = [];
			const columnBoards: string[] = [];

			await startExport(version, topics, tasks, columnBoards);

			expect(courseRoomDetailsModule.downloadCommonCartridgeCourse).toHaveBeenCalledTimes(1);
			expect(courseRoomDetailsModule.downloadCommonCartridgeCourse).toHaveBeenCalledWith({
				version,
				topics,
				tasks,
				columnBoards,
			});
		});

		it("should handle promise rejection from courseRoomDetailsModule", async () => {
			const { startExport } = useCommonCartridgeExport();
			const mockError = new Error("Download failed");

			vi.mocked(courseRoomDetailsModule.downloadCommonCartridgeCourse).mockRejectedValueOnce(mockError);

			const version: CommonCartridgeVersion = "1.1.0";
			const topics = ["topic1"];
			const tasks = ["task1"];
			const columnBoards = ["board1"];

			await expect(startExport(version, topics, tasks, columnBoards)).rejects.toThrow("Download failed");

			expect(courseRoomDetailsModule.downloadCommonCartridgeCourse).toHaveBeenCalledTimes(1);
		});

		it("should validate version before making the call", async () => {
			const { startExport, allowedVersions } = useCommonCartridgeExport();

			for (const version of allowedVersions) {
				await startExport(version, [], [], []);
			}

			await expect(startExport("invalid_version" as CommonCartridgeVersion, [], [], [])).rejects.toThrow(
				"Invalid version"
			);

			expect(courseRoomDetailsModule.downloadCommonCartridgeCourse).toHaveBeenCalledTimes(allowedVersions.length);
		});
	});
});
