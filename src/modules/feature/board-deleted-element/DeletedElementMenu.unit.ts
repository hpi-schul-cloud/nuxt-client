import DeletedElementMenu from "./DeletedElementMenu.vue";
import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { KebabMenuActionDelete } from "@ui-kebab-menu";
import { flushPromises, shallowMount } from "@vue/test-utils";

describe("DeletedElementMenu", () => {
	const getWrapper = () => {
		const wrapper = shallowMount(DeletedElementMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				columnIndex: 0,
				rowIndex: 0,
				elementIndex: 0,
			},
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("Delete Button", () => {
		it("should have a menu option to delete", () => {
			const { wrapper } = getWrapper();

			const menuItem = wrapper.findComponent(KebabMenuActionDelete);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the delete event on click", async () => {
			vi.spyOn(confirmDialogUtils, "askDeletionForType").mockResolvedValue(true);
			const { wrapper } = getWrapper();

			const menuItem = wrapper.findComponent(KebabMenuActionDelete);

			await menuItem.trigger("click");
			await flushPromises();

			expect(wrapper.emitted("delete:element")).toBeDefined();
		});
	});
});
