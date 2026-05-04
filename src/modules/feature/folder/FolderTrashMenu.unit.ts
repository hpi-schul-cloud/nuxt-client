import FolderTrashMenu from "./FolderTrashMenu.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { KebabMenu, KebabMenuAction } from "@ui-kebab-menu";
import { enableAutoUnmount, mount } from "@vue/test-utils";

describe("FolderTrashMenu.vue", () => {
	enableAutoUnmount(afterEach);

	const setupWrapper = () => {
		const wrapper = mount(FolderTrashMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper };
	};

	it("should render the kebab menu", () => {
		const { wrapper } = setupWrapper();

		expect(wrapper.findComponent(KebabMenu).exists()).toBe(true);
	});

	it("should render the empty trash action after opening the menu", async () => {
		const { wrapper } = setupWrapper();

		const menuButton = wrapper.find("[data-testid='folder-trash-menu']");
		await menuButton.trigger("click");

		const action = wrapper.findComponent(KebabMenuAction);
		expect(action.attributes("data-testid")).toBe("folder-trash-menu-empty");
	});

	it("should emit empty-trash when the empty trash action is clicked", async () => {
		const { wrapper } = setupWrapper();

		const menuButton = wrapper.find("[data-testid='folder-trash-menu']");
		await menuButton.trigger("click");

		const action = wrapper.findComponent(KebabMenuAction);
		await action.trigger("click");

		expect(wrapper.emitted("empty-trash")).toBeTruthy();
	});
});
