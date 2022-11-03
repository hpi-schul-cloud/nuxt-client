import { mount } from "@vue/test-utils";
import LdapUsersSection from "./LdapUsersSection";

describe("@/components/organisms/LdapUsersSection", () => {
	const ldapConfigData = {
		userPath: "user=path;;user=p",
		firstName: "givenName",
		familyName: "sn",
		email: "mail@de.de",
		uid: "uid",
		uuid: "uuid",
	};

	it("has correct child components", () => {
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});

		expect(wrapper.find("[data-testid=ldapDataUsersUserPath]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataUsersFirstName]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataUsersFamilyName]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataUsersEmail]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataUsersUid]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataUsersUuid]").exists()).toBe(true);
	});

	it("loads the validator", () => {
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});
		expect(wrapper.vm.$v).not.toBeUndefined();
	});

	it("invalid validation is false when valid values are sent through props", async () => {
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});
		// default props values are valid so expect this assertion to succeed
		expect(wrapper.vm.$v.$invalid).toBe(false);
	});

	it("invalid validation is true when invalid values are sent through props", async () => {
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: {
					userPath: "invalid",
					firstName: "",
					familyName: "",
					email: "",
					uid: "",
					uuid: "",
				},
			},
		});
		expect(wrapper.vm.$v.$invalid).toBe(true);
	});

	it("invalid validation is true when any of the input values are invalid", async () => {
		const ldapConfigDataTestSpecific = {
			...ldapConfigData,
		};
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigDataTestSpecific,
			},
			listeners: {
				input: (event) => {
					ldapConfigDataTestSpecific.userPath = event.userPath;
					ldapConfigDataTestSpecific.firstName = event.firstName;
					ldapConfigDataTestSpecific.familyName = event.familyName;
					ldapConfigDataTestSpecific.email = event.email;
					ldapConfigDataTestSpecific.uid = event.uid;
					ldapConfigDataTestSpecific.uuid = event.uuid;
				},
			},
		});

		const inputFirstName = wrapper.find(
			"input[data-testid=ldapDataUsersFirstName]"
		);
		expect(inputFirstName.exists()).toBe(true);

		inputFirstName.setValue("");
		inputFirstName.trigger("blur");

		expect(inputFirstName.element.value).toBe("");
		expect(wrapper.vm.$v.$invalid).toBe(true);
		await wrapper.vm.$nextTick();
		const errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataUsersFirstName'] .base-input-info.base-input-error"
		);
		expect(errorMessageComponent.exists()).toBeTrue();
	});

	it("it emits update:errors event when validate prop changes value", async () => {
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
				validate: false,
			},
		});
		expect(wrapper.emitted("update:errors")).toBeUndefined();

		await wrapper.setProps({
			validate: true,
		});
		expect(wrapper.vm.$props.validate).toBe(true);

		await wrapper.vm.$nextTick();
		expect(wrapper.emitted("update:errors")[0]).toHaveLength(2);
	});

	it("invalid error message is displayed only after the blur event, even if originally invalid props were passed through", async () => {
		const ldapConfigDataTestSpecific = {
			userPath: "invalid",
			firstName: "",
			familyName: "",
			email: "",
			uid: "",
			uuid: "",
		};
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigDataTestSpecific,
			},
			listeners: {
				input: (event) => {
					ldapConfigDataTestSpecific.userPath = event.userPath;
					ldapConfigDataTestSpecific.firstName = event.firstName;
					ldapConfigDataTestSpecific.familyName = event.familyName;
					ldapConfigDataTestSpecific.email = event.email;
					ldapConfigDataTestSpecific.uid = event.uid;
					ldapConfigDataTestSpecific.uuid = event.uuid;
				},
			},
		});

		let errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataUsersFirstName'] .base-input-info.base-input-error"
		);
		expect(wrapper.vm.$v.$invalid).toBe(true);
		expect(errorMessageComponent.exists()).toBeFalse();

		const inputFirstName = wrapper.find(
			"input[data-testid=ldapDataUsersFirstName]"
		);
		expect(inputFirstName.exists()).toBe(true);
		expect(inputFirstName.element.value).toBe(
			ldapConfigDataTestSpecific.firstName
		);

		inputFirstName.trigger("blur"); // without this the error is not displayed

		await wrapper.vm.$nextTick();
		errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataUsersFirstName'] .base-input-info.base-input-error"
		);
		expect(errorMessageComponent.exists()).toBeTrue();
	});
});
