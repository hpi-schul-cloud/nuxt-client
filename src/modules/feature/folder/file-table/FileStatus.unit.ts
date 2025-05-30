import { FileRecordScanStatus, PreviewStatus } from "@/fileStorageApi/v3";
import { FilePreviewStatus, FileRecord } from "@/types/file/File";
import { fileRecordFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import FileStatus from "./FileStatus.vue";

describe("FileStatus", () => {
	const setupWrapper = (fileRecord: FileRecord) => {
		const wrapper = mount(FileStatus, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				fileRecord,
			},
		});
		return { wrapper };
	};

	it("renders without crashing", () => {
		const fileRecord = fileRecordFactory.build({
			previewStatus: FilePreviewStatus.PREVIEW_POSSIBLE,
		});

		const { wrapper } = setupWrapper(fileRecord);

		expect(wrapper.exists()).toBe(true);
	});

	describe("when status pending", () => {
		it("sould shows v-icon", () => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: PreviewStatus.AWAITING_SCAN_STATUS,
			});

			const { wrapper } = setupWrapper(fileRecord);

			expect(
				wrapper
					.findComponent('[data-testid="file-status-scan-pending"]')
					.exists()
			).toBe(true);
		});
	});

	describe("when status wont check", () => {
		it("sould shows v-icon", () => {
			const fileRecord = fileRecordFactory.build({
				previewStatus:
					PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_WONT_CHECK,
			});

			const { wrapper } = setupWrapper(fileRecord);

			expect(
				wrapper
					.findComponent('[data-testid="file-status-scan-wont-check"]')
					.exists()
			).toBe(true);
		});
	});

	describe("when status error", () => {
		it("sould shows v-icon", () => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_ERROR,
			});

			const { wrapper } = setupWrapper(fileRecord);

			expect(
				wrapper.findComponent('[data-testid="file-status-scan-error"]').exists()
			).toBe(true);
		});
	});

	describe("when status virus detected", () => {
		it("sould shows v-icon", () => {
			const fileRecord = fileRecordFactory.build({
				securityCheckStatus: FileRecordScanStatus.BLOCKED,
			});

			const { wrapper } = setupWrapper(fileRecord);

			expect(
				wrapper
					.findComponent('[data-testid="file-status-scan-virus-detected"]')
					.exists()
			).toBe(true);
		});
	});
});
