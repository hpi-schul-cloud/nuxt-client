import LanguageSelection from "./LanguageSelection.vue";
import { LanguageType } from "@/serverApi/v3";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";

describe("LanguageSelection.vue", () => {
	const setup = () => {
		const wrapper = mount(LanguageSelection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				selectedLanguage: LanguageType.DE,
			},
		});

		return { wrapper };
	};

	it("should be rendered", () => {
		const { wrapper } = setup();
		expect(wrapper).toBeDefined();
	});

	it("should have VSelect component with correct props", () => {
		const { wrapper } = setup();
		const selectComponent = wrapper.findComponent({ name: "VSelect" });
		expect(selectComponent.exists()).toBe(true);
		expect(selectComponent.props("modelValue")).toBe(LanguageType.DE);
		expect(selectComponent.props("label")).toBe("pages.administration.school.index.generalSettings.labels.language");
		expect(selectComponent.props("items")).toEqual([
			{ value: LanguageType.DE, title: "global.topbar.language.longName.de" },
			{ value: LanguageType.EN, title: "global.topbar.language.longName.en" },
			{ value: LanguageType.ES, title: "global.topbar.language.longName.es" },
			{ value: LanguageType.UK, title: "global.topbar.language.longName.uk" },
		]);
	});

	it("should emit 'update:selectedLanguage' event on selection change", async () => {
		const { wrapper } = setup();
		const selectComponent = wrapper.findComponent({ name: "VSelect" });

		await selectComponent.vm.$emit("update:modelValue", LanguageType.EN);
		const emitted = selectComponent.emitted("update:modelValue");
		expect(emitted).toBeTruthy();
		expect(emitted?.[0]).toEqual([LanguageType.EN]);
	});
});
