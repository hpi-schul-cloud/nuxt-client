import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import ShareModalOptionsForm from "./ShareModalOptionsForm.vue";

describe("@components/share-modal/ShareModalOptionsForm", () => {
	const mountComponent = (attrs = {}) => {
		const wrapper = mount(ShareModalOptionsForm, {
			...createComponentMocks({}),
			setup() {},
			...attrs,
		});

		return wrapper;
	};

	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		// document.body.setAttribute("data-app", "true");
	});

	it("should emit initial event during setup", () => {
		const wrapper = mountComponent();

		expect(wrapper.emitted("share-options-change")).toHaveLength(1);
	});

	it("should emit event on changes of SchoolInternally switch", async () => {
		const wrapper = mountComponent();

		const switchSchoolInternally = wrapper.findComponent({
			ref: "switch-school-internally",
		});
		await switchSchoolInternally.vm.$emit("change", false);

		expect(wrapper.emitted("share-options-change")).toHaveLength(2);
	});

	it("should emit event on changes of ExpiresInSevenDays switch", async () => {
		const wrapper = mountComponent();

		const switchExpiresInSevenDays = wrapper.findComponent({
			ref: "expires-in-seven-days",
		});
		await switchExpiresInSevenDays.vm.$emit("change", false);

		expect(wrapper.emitted("share-options-change")).toHaveLength(2);
	});
});
