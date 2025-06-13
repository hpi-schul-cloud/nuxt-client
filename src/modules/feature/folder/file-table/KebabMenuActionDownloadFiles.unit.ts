import * as FileHelper from "@/utils/fileHelper";
import * as Helper from "@/utils/helpers";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { KebabMenuAction } from "@ui-kebab-menu";
import dayjs from "dayjs";
import KebabMenuActionDownloadFiles from "./KebabMenuActionDownloadFiles.vue";

describe("KebabMenuActionDownloadFiles", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	const setupWrapper = (props: {
		disabled?: boolean;
		selectedIds: string[];
	}) => {
		const wrapper = mount(KebabMenuActionDownloadFiles, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				disabled: props.disabled,
				selectedIds: props.selectedIds,
				archiveName: "test-archive",
			},
		});

		return { wrapper };
	};

	describe("when action is clicked", () => {
		describe("when all file records are selected", () => {
			const setup = async () => {
				const selectedIds = ["1", "2"];
				const now = dayjs().format("YYYYMMDD");
				const archiveName = `${now}_test-archive`;

				const downloadFilesAsArchiveMock = jest.spyOn(
					FileHelper,
					"downloadFilesAsArchive"
				);
				jest.spyOn(Helper, "delay").mockResolvedValueOnce(undefined);

				const { wrapper } = setupWrapper({
					selectedIds,
				});

				const kebabMenuAction = wrapper.findComponent(KebabMenuAction);
				kebabMenuAction.trigger("click");

				return { downloadFilesAsArchiveMock, selectedIds, archiveName };
			};

			it("should call downloadFiles with correct params", async () => {
				const { downloadFilesAsArchiveMock, selectedIds, archiveName } =
					await setup();

				expect(downloadFilesAsArchiveMock).toHaveBeenCalledWith({
					archiveName,
					fileRecordIds: selectedIds,
				});
			});
		});

		describe("when only second filrecord is selected", () => {
			const setup = async () => {
				const selectedIds = ["2"];
				const now = dayjs().format("YYYYMMDD");
				const archiveName = `${now}_test-archive`;

				const downloadFilesAsArchiveMock = jest.spyOn(
					FileHelper,
					"downloadFilesAsArchive"
				);
				jest.spyOn(Helper, "delay").mockResolvedValueOnce(undefined);

				const { wrapper } = setupWrapper({
					selectedIds,
				});

				const kebabMenuAction = wrapper.findComponent(KebabMenuAction);
				kebabMenuAction.trigger("click");

				return { downloadFilesAsArchiveMock, selectedIds, archiveName };
			};

			it("should call downloadFiles with correct params", async () => {
				const { downloadFilesAsArchiveMock, archiveName, selectedIds } =
					await setup();

				expect(downloadFilesAsArchiveMock).toHaveBeenCalledWith({
					archiveName,
					fileRecordIds: selectedIds,
				});
			});
		});
	});

	describe("when action is disabled", () => {
		describe("when all file records are selected", () => {
			const setup = async () => {
				const selectedIds = ["1", "2"];

				const downloadFilesAsArchiveMock = jest.spyOn(
					FileHelper,
					"downloadFilesAsArchive"
				);
				jest.spyOn(Helper, "delay").mockResolvedValueOnce(undefined);

				const { wrapper } = setupWrapper({
					disabled: true,
					selectedIds,
				});

				const kebabMenuAction = wrapper.findComponent(KebabMenuAction);
				kebabMenuAction.trigger("click");

				return { downloadFilesAsArchiveMock };
			};

			it("should not call downloadFile", async () => {
				const { downloadFilesAsArchiveMock } = await setup();

				expect(downloadFilesAsArchiveMock).not.toHaveBeenCalled();
			});
		});
	});
});
