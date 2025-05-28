import { createTestingI18n } from "@@/tests/test-utils/setup";
import { Confirmations } from "@feature-room";

describe("Confirmations", () => {
	const setup = () => {
		const wrapper = shallowMount(Confirmations, {
			global: {
				plugins: [createTestingI18n()],
			},
		});
		return { wrapper };
	};

	it("should render", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should render info text", () => {
		const { wrapper } = setup();
		const infoText = wrapper.get("[data-testid=info-text]");

		expect(infoText.text()).toBe(
			"pages.rooms.members.tab.confirmations.infoText"
		);
	});
});
