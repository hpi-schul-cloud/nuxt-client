import { mount } from "@vue/test-utils";
import H5pPlayerPage from "./H5PPlayer.page.vue";
import { createTestingI18n } from "@@/tests/test-utils/setup";

jest.mock("vue-router", () => ({
	useRoute: () => ({ params: { id: "test-id" }, query: {} }),
}));

describe("H5PPlayerPage", () => {
	const createWrapper = () => {
		return mount(H5pPlayerPage, {
			global: {
				plugins: [createTestingI18n()],
			},
		});
	};

	it("renders without errors with standard props", async () => {
		const wrapper = createWrapper();
		const h5pPlayer = wrapper.findComponent({ ref: "playerRef" });
		expect(wrapper.exists()).toBe(true);
		expect(h5pPlayer).toBeDefined();
	});
});
