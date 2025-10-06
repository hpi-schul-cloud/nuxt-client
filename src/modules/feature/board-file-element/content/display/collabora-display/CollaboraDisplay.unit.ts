import CollaboraDisplay from "./CollaboraDisplay.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { VImg } from "vuetify/components";

describe("CollaboraDisplay", () => {
	const setup = () => {
		const wrapper = mount(CollaboraDisplay, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper };
	};

	it("should render CollaboraDisplay", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should render image", () => {
		const { wrapper } = setup();

		const vImage = wrapper.findComponent(VImg);
		expect(vImage.exists()).toBe(true);
		expect(vImage.props("src")).toEqual("/src/assets/img/collabora.svg");
	});
});
