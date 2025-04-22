import { createTestingI18n } from "@@/tests/test-utils/setup";
import { Invitations } from "@feature-room";

describe("Invitations", () => {
	const setup = () => {
		const wrapper = shallowMount(Invitations, {
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
			"pages.rooms.members.tab.invitations.infoText"
		);
	});
});
