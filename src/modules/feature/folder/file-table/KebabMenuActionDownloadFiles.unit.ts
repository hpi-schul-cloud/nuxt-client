import { FileRecord } from "@/types/file/File";
import { downloadFile } from "@/utils/fileHelper";
import { fileRecordFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { KebabMenuAction } from "@ui-kebab-menu";
import { nextTick } from "vue";
import KebabMenuActionDownloadFiles from "./KebabMenuActionDownloadFiles.vue";

jest.mock("@/utils/fileHelper");

describe("KebabMenuActionDownloadFiles", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	const setupWrapper = (props: {
		disabled?: boolean;
		fileRecords: FileRecord[];
		selectedIds: string[];
	}) => {
		const wrapper = mount(KebabMenuActionDownloadFiles, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				disabled: props.disabled,
				fileRecords: props.fileRecords,
				selectedIds: props.selectedIds,
			},
		});

		return { wrapper };
	};

	describe("when action is clicked", () => {
		describe("when all file records are selected", () => {
			const setup = async () => {
				const fileRecord1 = fileRecordFactory.build({
					id: "1",
				});
				const fileRecord2 = fileRecordFactory.build({
					id: "2",
				});
				const fileRecords = [fileRecord1, fileRecord2];

				const selectedIds = ["1", "2"];

				const downloadFileMock = jest
					.mocked(downloadFile)
					.mockReturnValueOnce();

				const { wrapper } = setupWrapper({
					fileRecords,
					selectedIds,
				});

				const kebabMenuAction = wrapper.findComponent(KebabMenuAction);
				kebabMenuAction.trigger("click");

				await nextTick();
				await nextTick();
				await nextTick();

				return { downloadFileMock, fileRecords };
			};

			it("should call downloadFile with correct params", async () => {
				const { downloadFileMock, fileRecords } = await setup();

				const firstFileRecord = fileRecords[0];
				const secondFileRecord = fileRecords[1];

				expect(downloadFileMock).toHaveBeenNthCalledWith(
					1,
					firstFileRecord.url,
					firstFileRecord.name
				);
				expect(downloadFileMock).toHaveBeenNthCalledWith(
					2,
					secondFileRecord.url,
					secondFileRecord.name
				);
			});
		});

		describe("when only second filrecord is selected", () => {
			const setup = async () => {
				const fileRecord1 = fileRecordFactory.build({
					id: "1",
				});
				const fileRecord2 = fileRecordFactory.build({
					id: "2",
				});
				const fileRecords = [fileRecord1, fileRecord2];

				const selectedIds = ["2"];

				const downloadFileMock = jest
					.mocked(downloadFile)
					.mockReturnValueOnce();

				const { wrapper } = setupWrapper({
					fileRecords,
					selectedIds,
				});

				const kebabMenuAction = wrapper.findComponent(KebabMenuAction);
				kebabMenuAction.trigger("click");

				await nextTick();
				await nextTick();
				await nextTick();

				return { downloadFileMock, fileRecords, selectedIds };
			};

			it("should call downloadFile with correct params", async () => {
				const { downloadFileMock, fileRecords } = await setup();

				const secondFileRecord = fileRecords[1];

				expect(downloadFileMock).toHaveBeenCalledWith(
					secondFileRecord.url,
					secondFileRecord.name
				);
			});
		});
	});

	describe("when action is disabled", () => {
		describe("when all file records are selected", () => {
			const setup = async () => {
				const fileRecord1 = fileRecordFactory.build({
					id: "1",
				});
				const fileRecord2 = fileRecordFactory.build({
					id: "2",
				});
				const fileRecords = [fileRecord1, fileRecord2];

				const selectedIds = ["1", "2"];

				const downloadFileMock = jest
					.mocked(downloadFile)
					.mockReturnValueOnce();

				const { wrapper } = setupWrapper({
					disabled: true,
					fileRecords,
					selectedIds,
				});

				const kebabMenuAction = wrapper.findComponent(KebabMenuAction);
				kebabMenuAction.trigger("click");

				await nextTick();
				await nextTick();
				await nextTick();

				return { downloadFileMock };
			};

			it("should not call downloadFile", async () => {
				const { downloadFileMock } = await setup();

				expect(downloadFileMock).not.toHaveBeenCalled();
			});
		});
	});
});
