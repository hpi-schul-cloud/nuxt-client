import { printDateFromStringUTC } from "@/plugins/datetime";
import { FileRecord, FileRecordVirusScanStatus } from "@/types/file/File";
import { fileRecordFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { DataTable } from "@ui-data-table";
import { EmptyState } from "@ui-empty-state";
import { VSkeletonLoader } from "vuetify/lib/components/index";
import FilePreview from "./FilePreview.vue";
import FileTable from "./FileTable.vue";
import FileUploadProgress from "./FileUploadProgress.vue";

describe("FileTable", () => {
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
				fileRecords: props.fileRecords,
				uploadProgress: props.uploadProgress,
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

			expect(wrapper.findComponent({ name: "VSkeletonLoader" }).exists()).toBe(
				true
			);
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

		it("should render created at column", () => {
			const fileRecord = fileRecordFactory.build();
			const { wrapper } = setupWrapper({
				isLoading: false,
				isEmpty: false,
				fileRecords: [fileRecord],
				uploadProgress: { uploaded: 1, total: 2 },
			});

			const createdAt = wrapper.find(
				`[data-testid='created-at-${fileRecord.name}']`
			);

			const date = printDateFromStringUTC(fileRecord.createdAt);
			expect(createdAt.text()).toContain(date);
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

			const checkbox = wrapper.find(
				`[data-testid='select-checkbox-${fileRecord.name}']`
			);
			expect(checkbox.classes()).toContain("v-selection-control--disabled");

			const previewColumn = wrapper.find(
				`[data-testid='file-preview-${fileRecord.name}']`
			);
			expect(previewColumn.classes()).toContain("text-disabled");

			const nameColumn = wrapper.find(
				`[data-testid='name-${fileRecord.name}']`
			);
			expect(nameColumn.classes()).toContain("text-disabled");

			const createdAtColumn = wrapper.find(
				`[data-testid='created-at-${fileRecord.name}']`
			);
			expect(createdAtColumn.classes()).toContain("text-disabled");

			const sizeColumn = wrapper.find(
				`[data-testid='size-${fileRecord.name}']`
			);
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

			const checkbox = wrapper.find(
				`[data-testid='select-checkbox-${fileRecord.name}']`
			);
			expect(checkbox.classes()).not.toContain("v-selection-control--disabled");

			const previewColumn = wrapper.find(
				`[data-testid='file-preview-${fileRecord.name}']`
			);
			expect(previewColumn.classes()).not.toContain("text-disabled");

			const nameColumn = wrapper.find(
				`[data-testid='name-${fileRecord.name}']`
			);
			expect(nameColumn.classes()).not.toContain("text-disabled");

			const createdAtColumn = wrapper.find(
				`[data-testid='created-at-${fileRecord.name}']`
			);
			expect(createdAtColumn.classes()).not.toContain("text-disabled");

			const sizeColumn = wrapper.find(
				`[data-testid='size-${fileRecord.name}']`
			);
			expect(sizeColumn.classes()).not.toContain("text-disabled");
		});
	});
});
