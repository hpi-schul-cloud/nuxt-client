import setupStores from "@@/tests/test-utils/setupStores";
import DownloadModule from "./download";
import RoomModule from "./room";

describe("DownloadModule", () => {
	describe("actions", () => {
		beforeEach(() => {
			setupStores({ roomModule: RoomModule });
		});
		describe("startDownload", () => {
			it("should call startDownload with the correct version", () => {
				const downloadModule = new DownloadModule({});
				const roomModule = new RoomModule({});

				downloadModule.setVersion("1.1.0");
				roomModule.downloadCommonCartridgeCourse("1.1.0");

				expect(downloadModule.getVersion).toBe("1.1.0");
			});
		});

		describe("startDownloadFlow", () => {
			it("should set version to an empty string and open the download modal", () => {
				const downloadModule = new DownloadModule({});

				downloadModule.setVersion("1.1.0");
				downloadModule.startDownloadFlow();

				expect(downloadModule.getVersion).toBe("");
				expect(downloadModule.getIsDownloadModalOpen).toBe(true);
			});
		});

		describe("resetDownloadFlow", () => {
			it("should set version to an empty string and close the download modal", () => {
				const downloadModule = new DownloadModule({});

				downloadModule.setVersion("1.1.0");
				downloadModule.resetDownloadFlow();

				expect(downloadModule.getVersion).toBe("");
				expect(downloadModule.getIsDownloadModalOpen).toBe(false);
			});
		});
	});

	describe("mutations", () => {
		describe("setDownloadModalOpen", () => {
			it("should set isDownloadModalOpen to the given value", () => {
				const downloadModule = new DownloadModule({});

				downloadModule.setIsDownloadModalOpen(true);

				expect(downloadModule.getIsDownloadModalOpen).toBe(true);
			});
		});

		describe("setVersion", () => {
			it("should set version to the given value", () => {
				const downloadModule = new DownloadModule({});

				downloadModule.setVersion("1.1.0");

				expect(downloadModule.getVersion).toBe("1.1.0");
			});
		});
	});
});
