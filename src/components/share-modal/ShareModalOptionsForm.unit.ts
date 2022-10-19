import createComponentMocks from "@@/tests/test-utils/componentMocks";
import ShareModalOptionsForm from "./ShareModalOptionsForm.vue";
import { mount } from "@vue/test-utils";

describe("@/components/share-modal/ShareModalOptionsForm", () => {
	const mountComponent = (attrs = {}) => {
		const wrapper = mount(ShareModalOptionsForm, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {},
			...attrs,
		});

		return wrapper;
	};

	it("should emit initial event during setup", () => {
		const wrapper = mountComponent();

		expect(wrapper.emitted("share-options-change")).toHaveLength(1);
	});

	it("should emit event on changes of SchoolInternally switch", async () => {
		const wrapper = mountComponent();

		const switchExpiresInSevenDays = wrapper.find(
			'[data-testid="schoolInternally"]'
		);
		await switchExpiresInSevenDays.setChecked(false);

		expect(wrapper.emitted("share-options-change")).toHaveLength(2);
	});

	it("should emit event on changes of ExpiresInSevenDays switch", async () => {
		const wrapper = mountComponent();

		const switchExpiresInSevenDays = wrapper.find(
			'[data-testid="expiresInSevenDays"]'
		);
		await switchExpiresInSevenDays.setChecked(false);

		expect(wrapper.emitted("share-options-change")).toHaveLength(2);
	});
});
