import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import ShareModalOptionsForm from "./ShareModalOptionsForm.vue";

describe("@/components/share-course/ShareModalOptionsForm", () => {
	const getWrapper = (attrs = {}) => {
		const wrapper = mount(ShareModalOptionsForm, {
			...createComponentMocks({
				i18n: true,
			}),
			...attrs,
		});

		return wrapper;
	};

	it("should emit initial event during setup", () => {
		const wrapper = getWrapper();

		expect(wrapper.emitted("share-options-change")).toHaveLength(1);
	});

	it("should emit event on changes of isSchoolInternal switch", async () => {
		const wrapper = getWrapper();

		const switchIsSchoolInternal = wrapper.find(
			'[data-testid="isSchoolInternal"]'
		);
		await switchIsSchoolInternal.setChecked(false);

		expect(wrapper.emitted("share-options-change")).toHaveLength(2);
	});

	it("should emit event on changes of hasExpiryDate switch", async () => {
		const wrapper = getWrapper();

		const switchhasExpiryDate = wrapper.find('[data-testid="hasExpiryDate"]');
		await switchhasExpiryDate.setChecked(false);

		expect(wrapper.emitted("share-options-change")).toHaveLength(2);
	});
});
