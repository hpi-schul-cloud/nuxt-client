import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { VImg } from "vuetify/components";
import CollaboraDisplay from "./CollaboraDisplay.vue";

describe("CollaboraDisplay", () => {
	const setup = () => {
		const wrapper = mount(CollaboraDisplay, {
			global: {
				plugins: [createTestingVuetify()],
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
