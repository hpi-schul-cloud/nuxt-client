import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import LanguageSelector from "./LanguageSelector.vue";
import { createI18n } from "vue-i18n";

const vuetify = createVuetify({ components, directives });
const i18n = createI18n({
	locale: "de",
	messages: {
		de: {},
		en: {},
	},
});

const getWrapper = (options = {}) => {
	const wrapper = mount(LanguageSelector, {
		global: {
			plugins: [i18n, vuetify],
		},
		...options,
	});
	return wrapper;
};

describe("LanguageSelector", () => {
	it("renders properly", () => {
		const wrapper = getWrapper();
		expect(wrapper.text()).toContain("Deutsch");
	});

	it("should change language from de to en when en btn clicked", () => {
		const wrapper = getWrapper();
		const englishBtn = wrapper.find(`[data-test-id="changeLanguageToEnglish"]`);

		expect(i18n.global.locale).toStrictEqual("de");

		englishBtn.trigger("click");

		expect(i18n.global.locale).toStrictEqual("en");
	});
});
