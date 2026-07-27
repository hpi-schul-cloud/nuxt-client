import CollaboraDisplay from "./CollaboraDisplay.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { VImg } from "vuetify/components";

describe("CollaboraDisplay", () => {
	const setup = (isEditMode = false) => {
		const wrapper = mount(CollaboraDisplay, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				showMenu: false,
				isEditMode,
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

	it("should not set interactive class in view mode", () => {
		const { wrapper } = setup(false);

		expect(wrapper.find(".content-element-interactive").exists()).toBe(false);
	});

	it("should set interactive class in edit mode", () => {
		const { wrapper } = setup(true);

		expect(wrapper.find(".content-element-interactive").exists()).toBe(true);
	});

	it("should not emit activate in view mode", async () => {
		const { wrapper } = setup(false);

		await wrapper.findComponent(VImg).trigger("click");

		expect(wrapper.emitted("activate")).toBeUndefined();
	});

	it("should emit activate in edit mode", async () => {
		const { wrapper } = setup(true);

		await wrapper.findComponent(VImg).trigger("click");

		expect(wrapper.emitted("activate")).toHaveLength(1);
	});
});
