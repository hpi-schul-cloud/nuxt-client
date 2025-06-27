import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import ContentEduSharingFooter from "./ContentEduSharingFooter.vue";

describe("@/components/molecules/ContentEduSharingFooter", () => {
	const wrapper = mount(ContentEduSharingFooter, {
		global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		data: () => ({}),
		props: {
			img: "@/assets/img/edusharing/edusharing-logo.svg",
		},
	});

	it("Renders svg image", () => {
		expect(wrapper.find(".edusharing-footer__logo").exists()).toBe(true);
		expect(wrapper.find(".edusharing-footer__logo").attributes("alt")).toBe(
			"components.molecules.EdusharingFooter.img_alt"
		);

		expect(wrapper.find(".edusharing-footer__logo").attributes("src")).toBe(
			"/src/assets/img/edusharing/edusharing-logo.svg"
		);
	});

	it("Provides proper text", () => {
		expect(wrapper.find(".edusharing-footer__text").exists()).toBe(true);
		expect(wrapper.find(".edusharing-footer__text").text()).toBe(
			"components.molecules.EdusharingFooter.text"
		);
	});
});
