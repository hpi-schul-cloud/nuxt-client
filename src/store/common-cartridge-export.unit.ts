import setupStores from "@@/tests/test-utils/setupStores";
import CommonCartridgeExportModule from "./common-cartridge-export";
import RoomModule from "./room";

describe("commonCartridgeExportModule", () => {
	describe("actions", () => {
		beforeEach(() => {
			setupStores({ roomModule: RoomModule });
		});
		describe("startExport", () => {
			it("should call startExport with the correct version", () => {
				const commonCartridgeExportModule = new CommonCartridgeExportModule({});
				const roomModule = new RoomModule({});

				commonCartridgeExportModule.setVersion("1.1.0");
				roomModule.downloadCommonCartridgeCourse("1.1.0");

				expect(commonCartridgeExportModule.getVersion).toBe("1.1.0");
			});
		});

		describe("startExportFlow", () => {
			it("should set version to an empty string and open the modal", () => {
				const commonCartridgeExportModule = new CommonCartridgeExportModule({});

				commonCartridgeExportModule.setVersion("1.1.0");
				commonCartridgeExportModule.startExportFlow();

				expect(commonCartridgeExportModule.getVersion).toBe("");
				expect(commonCartridgeExportModule.getIsExportModalOpen).toBe(true);
			});
		});

		describe("resetExportFlow", () => {
			it("should set version to an empty string and close the modal", () => {
				const commonCartridgeExportModule = new CommonCartridgeExportModule({});

				commonCartridgeExportModule.setVersion("1.1.0");
				commonCartridgeExportModule.resetExportFlow();

				expect(commonCartridgeExportModule.getVersion).toBe("");
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
	});
});
