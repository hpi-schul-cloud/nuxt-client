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

				const downloadFilesMock = jest.spyOn(FileHelper, "downloadFiles");
				jest.spyOn(Helper, "delay").mockImplementation(() => Promise.resolve());

				const { wrapper } = setupWrapper({
					selectedIds,
				});

				const kebabMenuAction = wrapper.findComponent(KebabMenuAction);
				kebabMenuAction.trigger("click");

				return { downloadFilesMock };
			};

			it("should call downloadFiles with correct params", async () => {
				const { downloadFilesMock } = await setup();
				const now = dayjs().format("YYYYMMDD");
				expect(downloadFilesMock).toHaveBeenCalledWith({
					archiveName: `${now}_test-archive`,
					fileRecordIds: ["1", "2"],
				});
			});
		});

		describe("when only second filrecord is selected", () => {
			const setup = async () => {
				const selectedIds = ["2"];

				const downloadFilesMock = jest.spyOn(FileHelper, "downloadFiles");
				jest.spyOn(Helper, "delay").mockImplementation(() => Promise.resolve());

				const { wrapper } = setupWrapper({
					selectedIds,
				});

				const kebabMenuAction = wrapper.findComponent(KebabMenuAction);
				kebabMenuAction.trigger("click");

				return { downloadFilesMock, selectedIds };
			};

			it("should call downloadFiles with correct params", async () => {
				const { downloadFilesMock } = await setup();

				const now = dayjs().format("YYYYMMDD");
				expect(downloadFilesMock).toHaveBeenCalledWith({
					archiveName: `${now}_test-archive`,
					fileRecordIds: ["2"],
				});
			});
		});
	});

	describe("when action is disabled", () => {
		describe("when all file records are selected", () => {
			const setup = async () => {
				const selectedIds = ["1", "2"];

				const downloadFilesMock = jest.spyOn(FileHelper, "downloadFile");
				jest.spyOn(Helper, "delay").mockImplementation(() => Promise.resolve());

				const { wrapper } = setupWrapper({
					disabled: true,
					selectedIds,
				});

				const kebabMenuAction = wrapper.findComponent(KebabMenuAction);
				kebabMenuAction.trigger("click");

				return { downloadFilesMock };
			};

			it("should not call downloadFile", async () => {
				const { downloadFilesMock } = await setup();

				expect(downloadFilesMock).not.toHaveBeenCalled();
			});
		});
	});
});
