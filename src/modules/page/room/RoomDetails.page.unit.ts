import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomDetailsPage } from "@page-room";
import { createTestingPinia } from "@pinia/testing";

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
	injectStrict: jest.fn().mockImplementation(() => {
		return {
			getEnv: jest.fn().mockReturnValue(true),
		};
	}),
}));

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

describe("@pages/RoomsDetails.page.vue", () => {
	const setup = () => {
		const wrapper = mount(RoomDetailsPage, {
			shallow: true,
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia(),
				],
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
