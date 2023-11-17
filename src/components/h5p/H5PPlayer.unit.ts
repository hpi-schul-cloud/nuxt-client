import { mount } from "@vue/test-utils";
import H5PPlayer from "./H5PPlayer.vue";
import { I18N_KEY } from "@/utils/inject";
import VueI18n from "vue-i18n";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { H5PPlayerComponent } from "@lumieducation/h5p-webcomponents";

describe("H5PPlayer", () => {
	const contentId = "test-content-id";

	const i18nMock = new VueI18n({
		locale: "en",
	});

	const createWrapper = (propsData = {}) => {
		return mount(H5PPlayer, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				contentId,
				...propsData,
			},
			provide: {
				[I18N_KEY as any]: i18nMock,
			},
		});
	};

	it("renders without errors with standard props", async () => {
		const wrapper = createWrapper();
		const h5pPlayer = wrapper.findComponent({ ref: "h5pPlayerRef" });
		expect(wrapper.exists()).toBe(true);
		expect(h5pPlayer).toBeDefined();
		await wrapper.vm.$nextTick();
		const h5pPlayerComponent = h5pPlayer.element as H5PPlayerComponent;
		expect(h5pPlayerComponent.loadContentCallback).toBeDefined();
	});
});
