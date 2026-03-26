import LdapRolesSection from "./LdapRolesSection.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { VTextField } from "vuetify/components";

describe("LdapRolesSection", () => {
	const defaultModelValue = {
		groupOption: "group",
		member: "description",
		student: "cn=schueler,ou=rolle",
		teacher: "cn=lehrer,ou=rolle",
		admin: "cn=admin,ou=rolle",
		user: "cn=ehemalige,ou=rolle",
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const getWrapper = (props = {}) =>
		mount(LdapRolesSection, {
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

		expect(wrapper.find("[data-testid=ldapDataRolesMember]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataRolesStudent]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataRolesTeacher]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataRolesAdmin]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataRolesUser]").exists()).toBe(true);
	});

	it("displays the correct values from modelValue prop", () => {
		const wrapper = getWrapper();

		expect(wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataRolesMember]").props().modelValue).toBe(
			defaultModelValue.member
		);
		expect(wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataRolesStudent]").props().modelValue).toBe(
			defaultModelValue.student
		);
		expect(wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataRolesTeacher]").props().modelValue).toBe(
			defaultModelValue.teacher
		);
		expect(wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataRolesAdmin]").props().modelValue).toBe(
			defaultModelValue.admin
		);
		expect(wrapper.findComponent<typeof VTextField>("[data-testid=ldapDataRolesUser]").props().modelValue).toBe(
			defaultModelValue.user
		);
	});

	it("emits update:modelValue with updated student when student changes", async () => {
		const wrapper = getWrapper();

		wrapper
			.findComponent<typeof VTextField>("[data-testid=ldapDataRolesMember]")
			.vm.$emit("update:modelValue", "member1");
		await nextTick();

		expect(wrapper.emitted("update:modelValue")?.[0][0]).toEqual({
			...defaultModelValue,
			member: "member1",
		});
	});

	it("emits update:modelValue with updated student when student changes", async () => {
		const wrapper = getWrapper();

		wrapper
			.findComponent<typeof VTextField>("[data-testid=ldapDataRolesStudent]")
			.vm.$emit("update:modelValue", "student1");
		await nextTick();

		expect(wrapper.emitted("update:modelValue")?.[0][0]).toEqual({
			...defaultModelValue,
			student: "student1",
		});
	});
});
