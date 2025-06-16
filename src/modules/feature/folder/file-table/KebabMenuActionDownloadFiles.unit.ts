import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { KebabMenuAction } from "@ui-kebab-menu";
import KebabMenuActionDownloadFiles from "./KebabMenuActionDownloadFiles.vue";

describe("KebabMenuActionDownloadFiles", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	const setupWrapper = (props: {
		selectedIds: string[];
		disabled: boolean;
	}) => {
		const wrapper = mount(KebabMenuActionDownloadFiles, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				selectedIds: props.selectedIds,
				disabled: props.disabled,
			},
		});

		return { wrapper };
	};

	describe("when disabled is true", () => {
		it("does not emit", async () => {
			const { wrapper } = setupWrapper({
				selectedIds: ["1", "2"],
				disabled: true,
			});

			await wrapper.findComponent(KebabMenuAction).trigger("click");

			expect(wrapper.emitted("download")).toBeFalsy();
		});
	});

	describe("when selectedIds is empty ", () => {
		it("does not emit", async () => {
			const { wrapper } = setupWrapper({
				selectedIds: [],
				disabled: false,
			});

			await wrapper.findComponent(KebabMenuAction).trigger("click");

			expect(wrapper.emitted("download")).toBeFalsy();
		});
	});

	describe("when disabled is false and selectedIds is not empty", () => {
		it("emits download with selectedIds", async () => {
			const selectedIds = ["1", "2"];
			const { wrapper } = setupWrapper({ selectedIds, disabled: false });

			await wrapper.findComponent(KebabMenuAction).trigger("click");

			expect(wrapper.emitted("download")).toBeTruthy();
			expect(wrapper.emitted("download")![0]).toEqual([selectedIds]);
		});
	});
});
