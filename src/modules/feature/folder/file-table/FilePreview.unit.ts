import { FilePreviewStatus, FileRecord } from "@/types/file/File";
import { fileRecordFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mdiFileDocumentOutline, mdiFileMusicOutline, mdiFileVideoOutline } from "@icons/material";
import { mount } from "@vue/test-utils";
import FilePreview from "./FilePreview.vue";

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

		it("should set previewWidth to 24px", () => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: FilePreviewStatus.PREVIEW_POSSIBLE,
			});

			const { wrapper } = setupWrapper(fileRecord, 1024);

			const imageComponent = wrapper.findComponent({ name: "v-img" });
			expect(imageComponent.props("width")).toBe(24);
		});

		it("should set aspectRatio to 1", () => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: FilePreviewStatus.PREVIEW_POSSIBLE,
			});

			const { wrapper } = setupWrapper(fileRecord, 1024);

			const imageComponent = wrapper.findComponent({ name: "v-img" });
			expect(imageComponent.props("aspectRatio")).toBe(1);
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

		it("should set previewWidth to 96px", () => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: FilePreviewStatus.PREVIEW_POSSIBLE,
			});

			const { wrapper } = setupWrapper(fileRecord, 400);

			const imageComponent = wrapper.findComponent({ name: "v-img" });
			expect(imageComponent.props("width")).toBe(96);
		});

		it("should set aspectRatio to undefined", () => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: FilePreviewStatus.PREVIEW_POSSIBLE,
			});

			const { wrapper } = setupWrapper(fileRecord, 400);

			const imageComponent = wrapper.findComponent({ name: "v-img" });
			expect(imageComponent.props("aspectRatio")).toBeUndefined();
		});
	});

	describe("when display size changes from desktop to mobile", () => {
		it("should upgrade srcWidth from 50px to 150px", async () => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: FilePreviewStatus.PREVIEW_POSSIBLE,
			});

			const { wrapper } = setupWrapper(fileRecord, 1024);
			
			const imageComponentTime1 = wrapper.findComponent({ name: "v-img" });
			expect(imageComponentTime1.props("src")).toContain("width=50");

			Object.defineProperty(window, "innerWidth", {
				writable: true,
				configurable: true,
				value: 400,
			});

			window.dispatchEvent(new Event("resize"));
			await wrapper.vm.$nextTick();

			const imageComponentTime2 = wrapper.findComponent({ name: "v-img" });
			expect(imageComponentTime2.props("src")).toContain("width=150");
		});

	describe("when display size changes from mobile to desktop", () => {
		it("should not downgrade srcWidth", async () => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: FilePreviewStatus.PREVIEW_POSSIBLE,
			});

			const { wrapper } = setupWrapper(fileRecord, 400);
			
			const imageComponentTime1 = wrapper.findComponent({ name: "v-img" });
			expect(imageComponentTime1.props("src")).toContain("width=150");

			Object.defineProperty(window, "innerWidth", {
				writable: true,
				configurable: true,
				value: 1024,
			});

			window.dispatchEvent(new Event("resize"));
			await wrapper.vm.$nextTick();

			const imageComponentTime2 = wrapper.findComponent({ name: "v-img" });
			expect(imageComponentTime2.props("src")).toContain("width=150");
		});
	});
	});
});
