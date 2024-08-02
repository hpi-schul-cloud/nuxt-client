import setupStores from "@@/tests/test-utils/setupStores";
import CommonCartridgeExportModule from "./common-cartridge-export";
import CourseModule from "./course";
import { roomModule } from "./store-accessor";

describe("commonCartridgeExportModule", () => {
	describe("actions", () => {
		beforeEach(() => {
			setupStores({ roomModule: CourseModule });
		});
		describe("startExport", () => {
			it("should call roomModule.downloadCommonCartridgeCourse with the correct version and topic", () => {
				const commonCartridgeExportModule = new CommonCartridgeExportModule({});
				const roomModuleMock = jest.spyOn(
					roomModule,
					"downloadCommonCartridgeCourse"
				);

				commonCartridgeExportModule.setVersion("1.1.0");
				commonCartridgeExportModule.setTopics(["topic"]);
				commonCartridgeExportModule.setTasks(["task"]);
				commonCartridgeExportModule.setColumnBoards(["columnBoard"]);

				commonCartridgeExportModule.startExport();

				expect(roomModuleMock).toHaveBeenCalledWith({
					version: "1.1.0",
					topics: ["topic"],
					tasks: ["task"],
					columnBoards: ["columnBoard"],
				});
			});
		});

		describe("startExportFlow", () => {
			it("should set version to an empty string and open the modal", () => {
				const commonCartridgeExportModule = new CommonCartridgeExportModule({});

				commonCartridgeExportModule.setVersion("1.1.0");
				commonCartridgeExportModule.setTopics(["topic"]);
				commonCartridgeExportModule.setTasks(["task"]);
				commonCartridgeExportModule.setColumnBoards(["columnBoard"]);
				commonCartridgeExportModule.startExportFlow();

				expect(commonCartridgeExportModule.getVersion).toBe("");
				expect(commonCartridgeExportModule.getTopics).toEqual([]);
				expect(commonCartridgeExportModule.getTasks).toEqual([]);
				expect(commonCartridgeExportModule.getColumnBoards).toEqual([]);
				expect(commonCartridgeExportModule.getIsExportModalOpen).toBe(true);
			});
		});

		describe("resetExportFlow", () => {
			it("should set version to an empty string and close the modal", () => {
				const commonCartridgeExportModule = new CommonCartridgeExportModule({});

				commonCartridgeExportModule.setVersion("1.1.0");
				commonCartridgeExportModule.setTopics(["topic"]);
				commonCartridgeExportModule.setTasks(["task"]);
				commonCartridgeExportModule.setColumnBoards(["columnBoard"]);
				commonCartridgeExportModule.resetExportFlow();

				expect(commonCartridgeExportModule.getVersion).toBe("");
				expect(commonCartridgeExportModule.getTopics).toEqual([]);
				expect(commonCartridgeExportModule.getTasks).toEqual([]);
				expect(commonCartridgeExportModule.getColumnBoards).toEqual([]);
				expect(commonCartridgeExportModule.getIsExportModalOpen).toBe(false);
			});
		});
	});

	describe("mutations", () => {
		describe("setDownloadModalOpen", () => {
			it("should set isDownloadModalOpen to the given value", () => {
				const commonCartridgeExportModule = new CommonCartridgeExportModule({});

				commonCartridgeExportModule.setIsExportModalOpen(true);

				expect(commonCartridgeExportModule.getIsExportModalOpen).toBe(true);
			});
		});

		describe("setVersion", () => {
			it("should set version to the given value", () => {
				const commonCartridgeExportModule = new CommonCartridgeExportModule({});

				commonCartridgeExportModule.setVersion("1.1.0");

				expect(commonCartridgeExportModule.getVersion).toBe("1.1.0");
			});
		});

		describe("setTopics", () => {
			// AI next 7 lines
			it("should set topics to the given value", () => {
				const commonCartridgeExportModule = new CommonCartridgeExportModule({});

				commonCartridgeExportModule.setTopics(["topic"]);

				expect(commonCartridgeExportModule.getTopics).toEqual(["topic"]);
			});
		});

		// AI next 9 lines
		describe("setTasks", () => {
			it("should set tasks to the given value", () => {
				const commonCartridgeExportModule = new CommonCartridgeExportModule({});

				commonCartridgeExportModule.setTasks(["task"]);

				expect(commonCartridgeExportModule.getTasks).toEqual(["task"]);
			});
		});

		// AI next 11 lines
		describe("setColumnBoards", () => {
			it("should set columnBoards to the given value", () => {
				const commonCartridgeExportModule = new CommonCartridgeExportModule({});

				commonCartridgeExportModule.setColumnBoards(["columnBoard"]);

				expect(commonCartridgeExportModule.getColumnBoards).toEqual([
					"columnBoard",
				]);
			});
		});
	});
});
