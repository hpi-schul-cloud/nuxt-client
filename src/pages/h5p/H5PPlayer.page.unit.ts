import { mount } from "@vue/test-utils";
import H5pPlayerPage from "./H5PPlayer.page.vue";
import { I18N_KEY } from "@/utils/inject";
import VueI18n from "vue-i18n";
import createComponentMocks from "@@/tests/test-utils/componentMocks";

jest.mock("vue-router/composables", () => ({
	useRoute: () => ({ params: { id: "test-id" }, query: {} }),
}));

describe("H5PPlayerPage", () => {
	const i18nMock = new VueI18n({
		locale: "en",
	});

	const createWrapper = () => {
		return mount(H5pPlayerPage, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				[I18N_KEY as any]: i18nMock,
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
