import FilePreview from "./FilePreview.vue";
import FileTable from "./FileTable.vue";
import FileUploadProgress from "./FileUploadProgress.vue";
import { RoleName } from "@/serverApi/v3";
import { FileRecord, FileRecordVirusScanStatus } from "@/types/file/File";
import { createTestAppStoreWithRole, fileRecordFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { DataTable } from "@ui-data-table";
import { EmptyState } from "@ui-empty-state";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { VSkeletonLoader } from "vuetify/lib/components/index";

describe("FileTable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStoreWithRole(RoleName.Teacher);
	});

	const setupWrapper = (props: {
		isLoading: boolean;
		isEmpty: boolean;
		fileRecords: FileRecord[];
		uploadProgress: {
			uploaded: number;
			total: number;
		};
	}) => {
		const wrapper = mount(FileTable, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				isLoading: props.isLoading,
				isEmpty: props.isEmpty,
				fileFetchingError: false,
				isStudent: false,
				fileRecords: props.fileRecords,
				uploadProgress: props.uploadProgress,
				hasEditPermission: true,
			},
		});

		return { wrapper };
	};

	describe("when isLoading is true", () => {
		it("should show VSkeletonLoader", () => {
			const { wrapper } = setupWrapper({
				isLoading: true,
				isEmpty: false,
				fileRecords: [],
				uploadProgress: { uploaded: 0, total: 0 },
			});

			expect(wrapper.findComponent({ name: "VSkeletonLoader" }).exists()).toBe(true);
			expect(wrapper.findComponent(EmptyState).exists()).toBe(false);
			expect(wrapper.findComponent(DataTable).exists()).toBe(false);
		});
	});

	describe("when isLoading is false and isEmpty is true and uploadProgress.total is 0 ", () => {
		it("should show empty state", () => {
			const { wrapper } = setupWrapper({
				isLoading: false,
				isEmpty: true,
				fileRecords: [],
				uploadProgress: { uploaded: 0, total: 0 },
			});

			expect(wrapper.findComponent(VSkeletonLoader).exists()).toBe(false);
			expect(wrapper.findComponent(EmptyState).exists()).toBe(true);
			expect(wrapper.findComponent(DataTable).exists()).toBe(false);
		});
	});

	describe("when isLoading is false and isEmpty is false and uploadProgress.total = 0", () => {
		it("should show data table", () => {
			const { wrapper } = setupWrapper({
				isLoading: false,
				isEmpty: false,
				fileRecords: [],
				uploadProgress: { uploaded: 0, total: 0 },
			});

			expect(wrapper.findComponent(VSkeletonLoader).exists()).toBe(false);
			expect(wrapper.findComponent(EmptyState).exists()).toBe(false);
			expect(wrapper.findComponent(DataTable).exists()).toBe(true);
		});
	});

	describe("when isLoading is false and isEmpty is false and uploadProgress.total > 0", () => {
		it("should show data table", () => {
			const { wrapper } = setupWrapper({
				isLoading: false,
				isEmpty: false,
				fileRecords: [],
				uploadProgress: { uploaded: 1, total: 2 },
			});

			expect(wrapper.findComponent(VSkeletonLoader).exists()).toBe(false);
			expect(wrapper.findComponent(EmptyState).exists()).toBe(false);
			expect(wrapper.findComponent(DataTable).exists()).toBe(true);
		});

		it("should show File Preview component", () => {
			const fileRecord = fileRecordFactory.build();
			const { wrapper } = setupWrapper({
				isLoading: false,
				isEmpty: false,
				fileRecords: [fileRecord],
				uploadProgress: { uploaded: 1, total: 2 },
			});

			expect(wrapper.findComponent(FilePreview).exists()).toBe(true);
		});

		it("should render content modified column", () => {
			const fileRecord = fileRecordFactory.build();
			const { wrapper } = setupWrapper({
				isLoading: false,
				isEmpty: false,
				fileRecords: [fileRecord],
				uploadProgress: { uploaded: 1, total: 2 },
			});

			const contentLastModifiedAt = wrapper.find(`[data-testid='content-modified-at-${fileRecord.name}']`);
			expect(contentLastModifiedAt.exists()).toBe(true);
		});

		describe("when contentLastModifiedAt is set", () => {
			it("should render content modified column with contentLastModifiedAt", () => {
				const fileRecord = fileRecordFactory.build();
				fileRecord.contentLastModifiedAt = new Date().toISOString();
				const { wrapper } = setupWrapper({
					isLoading: false,
					isEmpty: false,
					fileRecords: [fileRecord],
					uploadProgress: { uploaded: 1, total: 2 },
				});

				const contentLastModifiedAt = wrapper.find(`[data-testid='content-modified-at-${fileRecord.name}']`);
				expect(contentLastModifiedAt.text()).toContain(wrapper.vm.$d(new Date(fileRecord.contentLastModifiedAt)));
			});
		});

		describe("when contentLastModifiedAt is not existing", () => {
			it("should render content modified column with createdAt", () => {
				const fileRecord = fileRecordFactory.build();
				delete fileRecord.contentLastModifiedAt;
				fileRecord.createdAt = new Date().toISOString();
				const { wrapper } = setupWrapper({
					isLoading: false,
					isEmpty: false,
					fileRecords: [fileRecord],
					uploadProgress: { uploaded: 1, total: 2 },
				});

				const contentLastModifiedAt = wrapper.find(`[data-testid='content-modified-at-${fileRecord.name}']`);
				expect(contentLastModifiedAt.text()).toContain(wrapper.vm.$d(new Date(fileRecord.createdAt)));
			});
		});

		describe("when contentLastModifiedAt and createdAt are not existing", () => {
			it("should render content modified column with empty string", () => {
				const fileRecord = fileRecordFactory.build();
				delete fileRecord.contentLastModifiedAt;
				delete fileRecord.createdAt;
				const { wrapper } = setupWrapper({
					isLoading: false,
					isEmpty: false,
					fileRecords: [fileRecord],
					uploadProgress: { uploaded: 1, total: 2 },
				});

				const contentLastModifiedAt = wrapper.find(`[data-testid='content-modified-at-${fileRecord.name}']`);
				expect(contentLastModifiedAt.text()).toBe("");
			});
		});

		it("should render file name column", () => {
			const fileRecord = fileRecordFactory.build();
			const { wrapper } = setupWrapper({
				isLoading: false,
				isEmpty: false,
				fileRecords: [fileRecord],
				uploadProgress: { uploaded: 1, total: 2 },
			});

			expect(wrapper.html()).toContain(fileRecord.name);
		});

		it("should render file size column", () => {
			const size = 1024;
			const fileRecord = fileRecordFactory.build({ size });
			const { wrapper } = setupWrapper({
				isLoading: false,
				isEmpty: false,
				fileRecords: [fileRecord],
				uploadProgress: { uploaded: 1, total: 2 },
			});

			const createdAt = wrapper.find(`[data-testid='size-${fileRecord.name}']`);

			const expectedSize = `1 KB`;
			expect(createdAt.text()).toContain(expectedSize);
		});

		it("should render file upload progress", () => {
			const fileRecord = fileRecordFactory.build();
			const { wrapper } = setupWrapper({
				isLoading: false,
				isEmpty: false,
				fileRecords: [fileRecord],
				uploadProgress: { uploaded: 1, total: 2 },
			});

			const uploadProgress = wrapper.findComponent(FileUploadProgress);
			expect(uploadProgress.exists()).toBe(true);
		});
	});

	describe("disabled functionality", () => {
		it("should apply the text-disabled class when item.isSelectable is false", () => {
			const fileRecord = fileRecordFactory.build({
				securityCheckStatus: FileRecordVirusScanStatus.BLOCKED,
			});
			const { wrapper } = setupWrapper({
				isLoading: false,
				isEmpty: false,
				fileRecords: [fileRecord],
				uploadProgress: { uploaded: 0, total: 0 },
			});

			const checkbox = wrapper.find(`[data-testid='select-checkbox-${fileRecord.name}']`);
			expect(checkbox.classes()).toContain("v-selection-control--disabled");

			const previewColumn = wrapper.find(`[data-testid='file-preview-${fileRecord.name}']`);
			expect(previewColumn.classes()).toContain("text-disabled");

			const nameColumn = wrapper.find(`[data-testid='name-${fileRecord.name}']`);
			expect(nameColumn.classes()).toContain("text-disabled");

			const contentLastModifiedAt = wrapper.find(`[data-testid='content-modified-at-${fileRecord.name}']`);
			expect(contentLastModifiedAt.classes()).toContain("text-disabled");

			const sizeColumn = wrapper.find(`[data-testid='size-${fileRecord.name}']`);
			expect(sizeColumn.classes()).toContain("text-disabled");
		});

		it("should not apply the text-disabled class when item.isSelectable is true", () => {
			const fileRecord = fileRecordFactory.build();
			const { wrapper } = setupWrapper({
				isLoading: false,
				isEmpty: false,
				fileRecords: [fileRecord],
				uploadProgress: { uploaded: 0, total: 0 },
			});

			const checkbox = wrapper.find(`[data-testid='select-checkbox-${fileRecord.name}']`);
			expect(checkbox.classes()).not.toContain("v-selection-control--disabled");

			const previewColumn = wrapper.find(`[data-testid='file-preview-${fileRecord.name}']`);
			expect(previewColumn.classes()).not.toContain("text-disabled");

			const nameColumn = wrapper.find(`[data-testid='name-${fileRecord.name}']`);
			expect(nameColumn.classes()).not.toContain("text-disabled");

			const contentLastModifiedAt = wrapper.find(`[data-testid='content-modified-at-${fileRecord.name}']`);
			expect(contentLastModifiedAt.classes()).not.toContain("text-disabled");

			const sizeColumn = wrapper.find(`[data-testid='size-${fileRecord.name}']`);
			expect(sizeColumn.classes()).not.toContain("text-disabled");
		});
	});
});
