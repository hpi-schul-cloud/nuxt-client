import { FileRecord } from "@/types/file/File";
import { fileRecordFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { KebabMenuAction } from "@ui-kebab-menu";
import { nextTick } from "vue";
import KebapMenuActionDeleteFiles from "./KebapMenuActionDeleteFiles.vue";

describe("KebapMenuActionDeleteFiles", () => {
	const setupWrapper = (props: {
		fileRecords: FileRecord[];
		selectedIds: string[];
	}) => {
		const wrapper = mount(KebapMenuActionDeleteFiles, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
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

				const { wrapper } = setupWrapper({
					fileRecords,
					selectedIds,
				});

				const kebapMenuAction = wrapper.findComponent(KebabMenuAction);
				kebapMenuAction.trigger("click");

				await nextTick();
				await nextTick();
				await nextTick();

				return { fileRecords, selectedIds, wrapper };
			};

			it("should emit delete-files with filerecords and promise", async () => {
				const { fileRecords, wrapper } = await setup();

				expect(wrapper.emitted("delete-files")).toEqual([
					[fileRecords, expect.any(Promise)],
				]);
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

				const { wrapper } = setupWrapper({
					fileRecords,
					selectedIds,
				});

				const kebapMenuAction = wrapper.findComponent(KebabMenuAction);
				kebapMenuAction.trigger("click");

				await nextTick();
				await nextTick();
				await nextTick();

				return { fileRecords, selectedIds, wrapper };
			};

			it("should emit delete-files with filerecords and promise", async () => {
				const { fileRecords, wrapper } = await setup();

				expect(wrapper.emitted("delete-files")).toEqual([
					[[fileRecords[1]], expect.any(Promise)],
				]);
			});
		});
	});
});
