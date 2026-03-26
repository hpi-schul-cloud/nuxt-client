import LdapClassesSection from "./LdapClassesSection.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { nextTick } from "vue";
import { VTextField } from "vuetify/components";

describe("LdapClassesSection", () => {
	beforeAll(() => {
		setActivePinia(createPinia());
	});

	const defaultModelValue = {
		classPath: "class=path",
		nameAttribute: "description",
		participantAttribute: "member",
	};

	const setup = (props = {}) => {
		const wrapper = mount(LdapClassesSection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				modelValue: defaultModelValue,
				...props,
			},
		});
		return { wrapper };
	};

	it("has correct child components", () => {
		const { wrapper } = setup();

		expect(wrapper.find("[data-testid=ldapDataClassesPath]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataClassesNameAttribute]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataClassesNameparticipantAttribute]").exists()).toBe(true);
	});

	it("displays the correct values from modelValue prop", () => {
		const { wrapper } = setup();

		expect(wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataClassesPath]").props().modelValue).toBe(
			defaultModelValue.classPath
		);
		expect(
			wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataClassesNameAttribute]").props().modelValue
		).toBe(defaultModelValue.nameAttribute);
		expect(
			wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataClassesNameparticipantAttribute]").props()
				.modelValue
		).toBe(defaultModelValue.participantAttribute);
	});

	it("emits update:modelValue with updated firstName when firstName changes", async () => {
		const { wrapper } = setup();
		wrapper
			.findComponent<typeof VTextField>("[data-testid=ldapDataClassesPath]")
			.vm.$emit("update:modelValue", "classPath");

		await nextTick();

		expect(wrapper.emitted("update:modelValue")?.[0][0]).toEqual({
			...defaultModelValue,
			classPath: "classPath",
		});
	});

	it("emits update:modelValue with updated userPath when userPath changes", async () => {
		const { wrapper } = setup();

		wrapper
			.findComponent<typeof VTextField>("[data-testid=ldapDataClassesNameAttribute]")
			.vm.$emit("update:modelValue", "newAttr");
		await nextTick();

		expect(wrapper.emitted("update:modelValue")?.[0][0]).toEqual({
			...defaultModelValue,
			nameAttribute: "newAttr",
		});
	});
});
