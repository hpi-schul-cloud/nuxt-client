import ShareModalOptionsForm from "./ShareModalOptionsForm.vue";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("@/components/share/ShareModalOptionsForm", () => {
	const setup = () => {
		const wrapper = mount(ShareModalOptionsForm, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				type: ShareTokenBodyParamsParentTypeEnum.Courses,
			},
		});
		return { wrapper };
	};

	it("should emit initial event during setup", () => {
		const { wrapper } = setup();

		expect(wrapper.emitted("share-options-change")).toHaveLength(1);
	});

	it("should emit event on changes of isSchoolInternal checkbox", async () => {
		const { wrapper } = setup();

		const checkboxIsSchoolInternal = wrapper.findComponent('[data-testid="isSchoolInternal"]');

		await checkboxIsSchoolInternal.setValue(false);

		expect(wrapper.emitted("share-options-change")).toHaveLength(2);
	});

	it("should emit event on changes of hasExpiryDate checkbox", async () => {
		const { wrapper } = setup();

		const checkboxHasExpiryDate = wrapper.findComponent('[data-testid="hasExpiryDate"]');
		await checkboxHasExpiryDate.setValue(false);

		expect(wrapper.emitted("share-options-change")).toHaveLength(2);
	});
});
