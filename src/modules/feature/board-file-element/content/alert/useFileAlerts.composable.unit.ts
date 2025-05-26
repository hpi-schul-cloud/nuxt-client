import { PreviewStatus } from "@/fileStorageApi/v3";
import { FileAlert } from "@/types/file/FileAlert.enum";
import { fileRecordFactory, mountComposable } from "@@/tests/test-utils";
import { ref } from "vue";
import { useFileAlerts } from "./useFileAlerts.composable";

describe("useFileAlerts", () => {
	describe("when filerecord is undefined", () => {
		const setup = () => {
			const fileRecord = ref();
			const { alerts } = mountComposable(() => useFileAlerts(fileRecord));

			return {
				alerts,
			};
		};

		it("should return alerts empty", () => {
			const { alerts } = setup();
			expect(alerts.value).toEqual([]);
		});
	});

	describe("when filerecord is defined", () => {
		const setup = (previewStatus: PreviewStatus) => {
			const fileRecord = ref(fileRecordFactory.build({ previewStatus }));
			const { alerts, addAlert } = mountComposable(() =>
				useFileAlerts(fileRecord)
			);

			return {
				alerts,
				fileRecord,
				addAlert,
			};
		};

		describe("when previewStatus is AWAITING_SCAN_STATUS", () => {
			it("should return AWAITING_SCAN_STATUS alert", () => {
				const { alerts } = setup(PreviewStatus.AWAITING_SCAN_STATUS);
				expect(alerts.value).toEqual([FileAlert.AWAITING_SCAN_STATUS]);
			});
		});

		describe("when previewStatus is PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED", () => {
			it("should return SCAN_STATUS_BLOCKED alert", () => {
				const { alerts } = setup(
					PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED
				);
				expect(alerts.value).toEqual([FileAlert.SCAN_STATUS_BLOCKED]);
			});
		});

		describe("when previewStatus is PREVIEW_NOT_POSSIBLE_SCAN_STATUS_ERROR", () => {
			it("should return SCAN_STATUS_ERROR alert", () => {
				const { alerts } = setup(
					PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_ERROR
				);
				expect(alerts.value).toEqual([FileAlert.SCAN_STATUS_ERROR]);
			});
		});

		describe("when previewStatus is PREVIEW_NOT_POSSIBLE_SCAN_STATUS_WONT_CHECK", () => {
			it("should return SCAN_STATUS_WONT_CHECK alert", () => {
				const { alerts } = setup(
					PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_WONT_CHECK
				);

				expect(alerts.value).toEqual([FileAlert.SCAN_STATUS_WONT_CHECK]);
			});
		});

		describe("when previewStatus changes from AWAITING_SCAN_STATUS to PREVIEW_POSSIBLE", () => {
			it("should return SCAN_STATUS_WONT_CHECK alert", () => {
				const { alerts, fileRecord } = setup(
					PreviewStatus.AWAITING_SCAN_STATUS
				);

				fileRecord.value = fileRecordFactory.build({
					previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
				});

				expect(alerts.value).toEqual([]);
			});
		});

		describe("when alert is added", () => {
			it("should return correct alerts array", () => {
				const { alerts, addAlert } = setup(PreviewStatus.AWAITING_SCAN_STATUS);

				addAlert(FileAlert.VIDEO_FORMAT_ERROR);

				expect(alerts.value).toEqual([
					FileAlert.VIDEO_FORMAT_ERROR,
					FileAlert.AWAITING_SCAN_STATUS,
				]);
			});
		});
	});
});
