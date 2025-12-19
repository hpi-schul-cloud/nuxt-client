import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { mdiPlus } from "@icons/material";
import { SpeedDialMenuAction } from "@ui-speed-dial-menu";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { VBtn, VIcon } from "vuetify/components";

describe("@speed-dial-menu/SpeedDialMenuAction", () => {
	const router = createRouterMock();
	const setup = () => {
		injectRouterMock(router);

		const wrapper = mount(SpeedDialMenuAction, {
			global: {
				plugins: [createTestingVuetify()],
			},
			props: {
				action: {
					icon: mdiPlus,
					label: "Add",
					to: "/rooms",
				},
			},
		});

		return {
			wrapper,
		};
	};

	it("should render label and icon button", () => {
		const { wrapper } = setup();

		const label = wrapper.findAllComponents(VBtn)[0];
		const icon = wrapper.findAllComponents(VBtn)[1].findComponent(VIcon);

		expect(label.text()).toBe("Add");
		expect(icon.exists()).toBe(true);
	});
});
