import LdapUsersSection from "./LdapUsersSection.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { VTextField } from "vuetify/components";

describe("LdapUsersSection", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const defaultModelValue = {
		userPath: "user=path;;user=p",
		firstName: "givenName",
		familyName: "sn",
		email: "mail@de.de",
		uid: "uid",
		uuid: "uuid",
	};

	const getWrapper = (props = {}) =>
		mount(LdapUsersSection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				modelValue: defaultModelValue,
				...props,
			},
		});

	it("renders all required fields", () => {
		const wrapper = getWrapper();

		expect(wrapper.find("[data-testid=ldapDataUsersUserPath]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataUsersFirstName]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataUsersFamilyName]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataUsersEmail]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataUsersUid]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataUsersUuid]").exists()).toBe(true);
	});

	it("displays the correct values from modelValue prop", () => {
		const wrapper = getWrapper();

		expect(wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataUsersUserPath]").props().modelValue).toBe(
			defaultModelValue.userPath
		);
		expect(wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataUsersFirstName]").props().modelValue).toBe(
			defaultModelValue.firstName
		);
		expect(wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataUsersFamilyName]").props().modelValue).toBe(
			defaultModelValue.familyName
		);
		expect(wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataUsersEmail]").props().modelValue).toBe(
			defaultModelValue.email
		);
		expect(wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataUsersUid]").props().modelValue).toBe(
			defaultModelValue.uid
		);
		expect(wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataUsersUuid]").props().modelValue).toBe(
			defaultModelValue.uuid
		);
	});

	it("emits update:modelValue with updated firstName when firstName changes", async () => {
		const wrapper = getWrapper();
		wrapper
			.findComponent<typeof VTextField>("[data-testid=ldapDataUsersFirstName]")
			.vm.$emit("update:modelValue", "NewFirstName");

		await nextTick();

		expect(wrapper.emitted("update:modelValue")?.[0][0]).toEqual({
			...defaultModelValue,
			firstName: "NewFirstName",
		});
	});

	it("emits update:modelValue with updated userPath when userPath changes", async () => {
		const wrapper = getWrapper();

		wrapper
			.findComponent<typeof VTextField>("[data-testid=ldapDataUsersUserPath]")
			.vm.$emit("update:modelValue", "newpath");
		await nextTick();

		expect(wrapper.emitted("update:modelValue")?.[0][0]).toEqual({
			...defaultModelValue,
			userPath: "newpath",
		});
	});
});
