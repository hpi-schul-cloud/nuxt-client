import LdapConnectionSection from "./LdapConnectionSection.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { nextTick } from "vue";
import { VTextField } from "vuetify/components";

describe("LdapConnectionSection", () => {
	const defaultModelValue = {
		url: "ldaps://url.u",
		rootPath: "cn=schueler,ou=rolle",
		basisPath: "cn=schueler,ou=rolle",
		searchUser: "cn=schueler,ou=rolle",
		searchUserPassword: "pass",
	};

	beforeAll(() => {
		setActivePinia(createPinia());
	});

	const getWrapper = (props = {}) =>
		mount(LdapConnectionSection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				modelValue: defaultModelValue,
				...props,
			},
		});

	it("has correct child components", () => {
		const wrapper = getWrapper();

		expect(wrapper.find("[data-testid=ldapDataConnectionUrl]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataConnectionBasisPath]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataConnectionSearchUser]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataConnectionSearchUserPassword]").exists()).toBe(true);
	});

	it("displays the correct values from modelValue prop", () => {
		const wrapper = getWrapper();

		expect(wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataConnectionUrl]").props().modelValue).toBe(
			defaultModelValue.url
		);
		expect(
			wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataConnectionBasisPath]").props().modelValue
		).toBe(defaultModelValue.basisPath);

		expect(
			wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataConnectionSearchUser]").props().modelValue
		).toBe(defaultModelValue.searchUser);
		expect(
			wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataConnectionSearchUserPassword]").props().modelValue
		).toBe(defaultModelValue.searchUserPassword);
	});

	it("emits update:modelValue with updated url when url changes", async () => {
		const wrapper = getWrapper();

		wrapper
			.findComponent<typeof VTextField>("[data-testid=ldapDataConnectionUrl]")
			.vm.$emit("update:modelValue", "newUrl");
		await nextTick();

		expect(wrapper.emitted("update:modelValue")?.[0][0]).toEqual({
			...defaultModelValue,
			url: "newUrl",
		});
	});

	it("emits update:modelValue with updated basisPath when basisPath changes", async () => {
		const wrapper = getWrapper();

		wrapper
			.findComponent<typeof VTextField>("[data-testid=ldapDataConnectionBasisPath]")
			.vm.$emit("update:modelValue", "basePath");
		await nextTick();

		expect(wrapper.emitted("update:modelValue")?.[0][0]).toEqual({
			...defaultModelValue,
			basisPath: "basePath",
		});
	});
});
