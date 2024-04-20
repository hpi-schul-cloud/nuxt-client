import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { VListItem } from "vuetify/lib/components/index.mjs";
import MediaBoardLineMenu from "./MediaBoardLineMenu.vue";

describe("MediaBoardLineMenu", () => {
	const lineId = "lineId";

	const getWrapper = () => {
		const wrapper = mount(MediaBoardLineMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					VMenu: true,
				},
			},
			props: {
				lineId,
			},
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when opening the menu", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should have all menu points", async () => {
			const { wrapper } = setup();

			const menuItems = wrapper.findAllComponents(VListItem);

			expect(menuItems.length).toEqual(1);
			expect(menuItems[0].text()).toEqual("common.actions.remove");
		});
	});

	describe("when deleting a line", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should emit the delete:line event", async () => {
			const { wrapper } = setup();

			const deleteListItem = wrapper.findComponent(
				"[data-testid=action-delete-line]"
			);
			await deleteListItem.trigger("click");

			expect(wrapper.emitted("delete:line")).toEqual([[lineId]]);
		});
	});
});
