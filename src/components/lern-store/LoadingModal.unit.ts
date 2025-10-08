import LoadingModal from "./LoadingModal.vue";
import ModalBodyInfo from "@/components/molecules/ModalBodyInfo.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { VBtn } from "vuetify/lib/components/index";

describe("@/components/molecules/LoadingModal", () => {
	it(`check props are set correctly `, () => {
		const wrapper = mount(LoadingModal, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			props: {
				title: "title",
				description: "description",
				btnText: "button",
				active: true,
			},
		});

		const info = wrapper.findComponent(ModalBodyInfo);
		const btn = wrapper.findComponent(VBtn);

		expect(info.props("title")).toContain("title");
		expect(info.props("description")).toContain("description");
		expect(btn.text()).toContain("button");
	});
});
