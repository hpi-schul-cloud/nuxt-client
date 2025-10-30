import FilePreview from "./FilePreview.vue";
import { FilePreviewStatus, FileRecord } from "@/types/file/File";
import { fileRecordFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mdiFileDocumentOutline, mdiFileMusicOutline, mdiFileVideoOutline } from "@icons/material";
import { mount } from "@vue/test-utils";

describe("FilePreview", () => {
	const setupWrapper = (fileRecord: FileRecord, viewportWidth = 1024) => {
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: viewportWidth,
		});

		const wrapper = mount(FilePreview, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				fileRecord,
			},
		});
		return { wrapper };
	};

	describe("when preview is possible", () => {
		it("should show v-img", () => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: FilePreviewStatus.PREVIEW_POSSIBLE,
			});

			const { wrapper } = setupWrapper(fileRecord);

			expect(wrapper.findComponent({ name: "v-img" }).exists()).toBe(true);
		});
	});

	describe("when preview is not possible", () => {
		it("should show v-icon", () => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: FilePreviewStatus.PREVIEW_NOT_POSSIBLE_WRONG_MIME_TYPE,
			});

			const { wrapper } = setupWrapper(fileRecord);

			expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(true);
		});
	});

	describe("when mime type is audio mime type", () => {
		it("should show mdiFileMusicOutline v-icon", () => {
			const fileRecord = fileRecordFactory.build({
				mimeType: "audio/mpeg",
				previewStatus: FilePreviewStatus.PREVIEW_NOT_POSSIBLE_WRONG_MIME_TYPE,
			});

			const { wrapper } = setupWrapper(fileRecord);

			const includesIcon = wrapper.html().includes(mdiFileMusicOutline);
			expect(includesIcon).toBe(true);
		});
	});

	describe("when mime type is video mime type", () => {
		it("should show mdiFileVideoOutline v-icon", () => {
			const fileRecord = fileRecordFactory.build({
				mimeType: "video/mp4",
				previewStatus: FilePreviewStatus.PREVIEW_NOT_POSSIBLE_WRONG_MIME_TYPE,
			});

			const { wrapper } = setupWrapper(fileRecord);

			const includesIcon = wrapper.html().includes(mdiFileVideoOutline);
			expect(includesIcon).toBe(true);
		});
	});

	describe("when mime type is document mime type", () => {
		it("should show mdiFileVideoOutline v-icon", () => {
			const fileRecord = fileRecordFactory.build({
				mimeType: "application/pdf",
				previewStatus: FilePreviewStatus.PREVIEW_NOT_POSSIBLE_WRONG_MIME_TYPE,
			});

			const { wrapper } = setupWrapper(fileRecord);

			const includesIcon = wrapper.html().includes(mdiFileDocumentOutline);
			expect(includesIcon).toBe(true);
		});
	});

	describe("when display size is not xs", () => {
		it("should use 50px preview width", () => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: FilePreviewStatus.PREVIEW_POSSIBLE,
			});

			const { wrapper } = setupWrapper(fileRecord, 1024);

			const imageComponent = wrapper.findComponent({ name: "v-img" });
			expect(imageComponent.props("src")).toContain("width=50");
		});
	});

	describe("when display size is xs", () => {
		it("should use 150px preview width", () => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: FilePreviewStatus.PREVIEW_POSSIBLE,
			});

			const { wrapper } = setupWrapper(fileRecord, 400);
			const imageComponent = wrapper.findComponent({ name: "v-img" });

			expect(imageComponent.props("src")).toContain("width=150");
		});
	});
});
