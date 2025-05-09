import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import ActionMenu from "./ActionMenu.vue";

describe("ActionMenu", () => {
	const setup = (isVisibleChangeRoleButton = false) => {
		const wrapper = mount(ActionMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				selectedIds: ["test-id#1", "test-id#2"],
				isVisibleChangeRoleButton,
			},
		});

		return { wrapper };
	};

	it("should be rendered", () => {
		const { wrapper } = setup();
		expect(wrapper).toBeDefined();
	});

	it("should show selected count", async () => {
		const { wrapper } = setup();
		const selectedCount = wrapper.find(".selected-count");
		expect(selectedCount.html()).toContain("2 pages.administration.selected");
	});

	it("should emit 'reset:selected' event when 'Reset' button is clicked", async () => {
		const { wrapper } = setup();
		await wrapper
			.findComponent({ ref: "resetSelectedMembers" })
			.trigger("click");

		expect(wrapper.emitted()).toHaveProperty("reset:selected");
	});
});
