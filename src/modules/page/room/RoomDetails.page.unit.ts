import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomDetailsPage } from "@page-room";

jest.mock("vue-router", () => ({
	useRouter: jest.fn().mockReturnValue({
		push: jest.fn(),
	}),
	useRoute: jest.fn().mockReturnValue({
		params: {
			id: "test-123",
		},
	}),
}));

jest.mock("@/utils/inject", () => ({
	injectStrict: jest.fn().mockImplementation((key) => {
		return {
			getEnv: jest.fn().mockReturnValue(true), // gibt immer true zurück
		};
	}),
}));

describe("@pages/RoomsDetails.page.vue", () => {
	const setup = () => {
		const wrapper = mount(RoomDetailsPage, {
			shallow: true,
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
