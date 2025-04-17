import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { KebabMenuActionDelete } from "@ui-kebab-menu";
import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import DeletedElementMenu from "./DeletedElementMenu.vue";

describe("DeletedElementMenu", () => {
	const getWrapper = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(DeletedElementMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("Delete Button", () => {
		it("should have a menu option to delete", () => {
			const { wrapper } = getWrapper();

			const menuItem = wrapper.findComponent(KebabMenuActionDelete);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the delete event on click", async () => {
			const { wrapper } = getWrapper();

			const menuItem = wrapper.findComponent(KebabMenuActionDelete);

			menuItem.vm.$emit("click", Promise.resolve(true));
			await nextTick();

			expect(wrapper.emitted("delete:element")).toBeDefined();
		});
	});
});
