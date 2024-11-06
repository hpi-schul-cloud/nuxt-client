import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomCreatePage } from "@page-room";

describe("@pages/RoomCreate.page.vue", () => {
	const setup = () => {
		const wrapper = shallowMount(RoomCreatePage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return {
			wrapper,
		};
	};

	it("should be rendered in DOM", () => {
		const { wrapper } = setup();

		expect(wrapper.vm).toBeDefined();
	});
});
