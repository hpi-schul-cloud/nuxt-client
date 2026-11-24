import RoomGroupsOnboardingLine from "./RoomGroupsOnboardingLine.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";

describe("RoomGroupsOnboardingLine", () => {
	const setup = (disabled = false) =>
		mount(RoomGroupsOnboardingLine, {
			props: { disabled },
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

	it("renders the hint as quiet text without an alert", () => {
		const wrapper = setup();

		expect(wrapper.get(".room-groups-onboarding-text").text()).toBe("pages.rooms.groups.onboarding.text");
		expect(wrapper.find("[role='alert']").exists()).toBe(false);
		expect(wrapper.attributes("data-testid")).toBe("room-groups-onboarding");
	});

	it("emits add and dismiss from its 40 px text buttons", async () => {
		const wrapper = setup();

		const add = wrapper.get("[data-testid='room-groups-onboarding-add']");
		const dismiss = wrapper.get("[data-testid='room-groups-onboarding-dismiss']");
		expect(add.attributes("style")).toContain("height: 40px");
		expect(dismiss.attributes("style")).toContain("height: 40px");
		await add.trigger("click");
		await dismiss.trigger("click");

		expect(wrapper.emitted("add")).toHaveLength(1);
		expect(wrapper.emitted("dismiss")).toHaveLength(1);
	});

	it("disables adding while the overview is not ready", () => {
		const wrapper = setup(true);

		expect(wrapper.get("[data-testid='room-groups-onboarding-add']").attributes("disabled")).toBeDefined();
	});
});
