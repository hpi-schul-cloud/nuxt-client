import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomCreatePage } from "@page-room";
import { useRouter } from "vue-router";

jest.mock("vue-router", () => ({
	useRouter: jest.fn().mockReturnValue({
		push: jest.fn(),
	}),
}));
jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));
describe("@pages/RoomCreate.page.vue", () => {
	const setup = () => {
		const wrapper = mount(RoomCreatePage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return {
			wrapper,
			router: useRouter(),
		};
	};

	it("should be rendered in DOM", () => {
		const { wrapper } = setup();
		expect(wrapper.vm).toBeDefined();
	});
	it("should navigate to 'rooms' on cancel", async () => {
		const { wrapper, router } = setup();
		wrapper.vm.onCancel();
		expect(router.push).toHaveBeenCalledWith({ name: "rooms" });
	});
});
