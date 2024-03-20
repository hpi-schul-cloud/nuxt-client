import { mount } from "@vue/test-utils";
import LdapRolesSection from "./LdapRolesSection";
import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import BaseInput from "@/components/base/BaseInput/BaseInput.vue";

describe("@/components/organisms/LdapRolesSection", () => {
	const getWrapper = (props = {}) => {
		return mount(LdapRolesSection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				components: {
					"base-input": BaseInput,
				},
			},
			props: {
				modelValue: {
					groupOption: "group",
					member: "description",
					student: "cn=schueler,ou=rolle",
					teacher: "cn=lehrer,ou=rolle",
					admin: "cn=admin,ou=rolle",
					user: "cn=ehemalige,ou=rolle",
				},
				...props,
			},
		});
	};

	it("has correct child components", () => {
		const wrapper = getWrapper();

		expect(wrapper.find(".section-sub-header").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataRolesMember]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataRolesStudent]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataRolesTeacher]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataRolesAdmin]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataRolesUser]").exists()).toBe(true);
	});

	it("loads the validator", async () => {
		const wrapper = getWrapper({ groupOption: "group" });
		expect(wrapper.vm.v$).not.toBeUndefined();
	});

	it("invalid validation is false when valid values are sent through props", async () => {
		const wrapper = getWrapper({ groupOption: "group" });

		// default props values are valid so expect this assertion to succeed
		expect(wrapper.vm.v$.$invalid).toBe(false);
	});

	it("invalid validation is true when invalid values are sent through props", async () => {
		const wrapper = getWrapper({
			modelValue: {
				// validations are only active when groupOption === group
				groupOption: "group",
				member: "",
				student: "invalid",
				teacher: "invalid",
				admin: "invalid",
				user: "invalid",
			},
		});

		expect(wrapper.vm.v$.$invalid).toBe(true);
	});

	it("invalid validation is true when any of the input values are invalid", async () => {
		const wrapper = getWrapper({
			modelValue: {
				// validations are only active when groupOption === group
				groupOption: "group",
				member: "",
				student: "invalid",
				teacher: "invalid",
				admin: "invalid",
				user: "invalid",
			},
		});

		await wrapper.vm.v$.$touch();

		const errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataRolesStudent'] .base-input-info.base-input-error"
		);
		expect(errorMessageComponent.exists()).toBeTruthy();
	});

	it("it emits update:errors event when validate prop changes value", async () => {
		const wrapper = getWrapper({ validate: false });

		expect(wrapper.emitted("update:errors")).toBeUndefined();

		await wrapper.setProps({
			validate: true,
		});
		expect(wrapper.vm.$props.validate).toBe(true);

		await wrapper.vm.$nextTick();
		expect(wrapper.emitted("update:errors")[0]).toHaveLength(2);
	});

	it("invalid error message is displayed only after the blur event, even if originally invalid props were passed through", async () => {
		const wrapper = getWrapper({
			modelValue: {
				// validations are only active when groupOption === group
				groupOption: "group",
				member: "",
				student: "invalid",
				teacher: "invalid",
				admin: "invalid",
				user: "invalid",
			},
		});
		const ldapConfigDataTestSpecific = {
			// validations are only active when groupOption === group
			groupOption: "group",
			member: "",
			student: "invalid",
			teacher: "invalid",
			admin: "invalid",
			user: "invalid",
		};

		let errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataRolesStudent'] .base-input-info.base-input-error"
		);
		expect(wrapper.vm.v$.$invalid).toBe(true);
		expect(errorMessageComponent.exists()).toBeFalsy();

		const inputMember = wrapper.find("input[data-testid=ldapDataRolesStudent]");
		expect(inputMember.exists()).toBe(true);
		expect(inputMember.element.value).toBe(ldapConfigDataTestSpecific.student);

		await inputMember.trigger("blur"); // without this the error is not displayed

		errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataRolesStudent'] .base-input-info.base-input-error"
		);
		expect(errorMessageComponent.exists()).toBeTruthy();
	});
});
