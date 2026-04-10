import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoomLockedPage } from "@page-room";
import { mount } from "@vue/test-utils";

describe("@/pages/RoomLocked.page.vue", () => {
	const setup = () => {
		const wrapper = mount(RoomLockedPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				title: "Locked Room",
			},
		});

		return {
			wrapper,
		};
	};

	it("should render permission error svg", () => {
		const { wrapper } = setup();

		const svgElement = wrapper.findComponent({ name: "permission-error-svg" });
		expect(svgElement.exists()).toBe(true);
	});

	it("should render room title", () => {
		const { wrapper } = setup();

		const titleElement = wrapper.get("[data-testid='locked-room-title']");

		expect(titleElement.text()).toBe("Locked Room");
	});

	it("should render error message", () => {
		const { wrapper } = setup();

		expect(wrapper.text()).toContain("pages.room.locked");
	});

	it("should render correct breadcrumbs", () => {
		const { wrapper } = setup();

		const breadcrumbs = wrapper.findAllComponents({
			name: "v-breadcrumbs-item",
		});

		expect(breadcrumbs).toHaveLength(2);
		expect(breadcrumbs[0].text()).toBe("pages.rooms.title");
		expect(breadcrumbs[1].text()).toBe("Locked Room");
		expect(breadcrumbs[1].props("disabled")).toBe(true);
	});
});
