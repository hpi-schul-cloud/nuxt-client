import { mount } from "@vue/test-utils";
import H5PPlayer from "./H5PPlayer.vue";
import { H5PPlayerComponent } from "@lumieducation/h5p-webcomponents";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { nextTick } from "vue";

vi.mock(import("@lumieducation/h5p-webcomponents"), async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		defineElements: vi.fn(),
	};
});

describe("H5PPlayer", () => {
	const contentId = "test-content-id";

	const createWrapper = (props = {}) => {
		return mount(H5PPlayer, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				contentId,
				...props,
			},
		});
	};

	it("renders without errors with standard props", async () => {
		const wrapper = createWrapper();
		const h5pPlayer = wrapper.find({ ref: "h5pPlayerRef" });
		expect(wrapper.exists()).toBe(true);
		expect(h5pPlayer).toBeDefined();
		await nextTick();
		const h5pPlayerComponent = h5pPlayer.element as H5PPlayerComponent;
		expect(h5pPlayerComponent.loadContentCallback).toBeDefined();
	});
});
