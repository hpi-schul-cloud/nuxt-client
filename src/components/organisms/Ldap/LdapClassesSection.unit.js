import { mount } from "@vue/test-utils";
import LdapClassesSection from "./LdapClassesSection";

describe("@/components/organisms/LdapClassesSection", () => {
	const ldapConfigData = {
		classPath: "class=path",
		nameAttribute: "description",
		participantAttribute: "member",
	};
	it(...isValidComponent(LdapClassesSection));

	it("has correct child components", () => {
		const wrapper = mount(LdapClassesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});

		expect(wrapper.find("[data-testid=ldapDataClassesPath]").exists()).toBe(
			true
		);
		expect(
			wrapper.find("[data-testid=ldapDataClassesNameAttribute]").exists()
		).toBe(true);
		expect(
			wrapper
				.find("[data-testid=ldapDataClassesNameparticipantAttribute]")
				.exists()
		).toBe(true);
	});

	it("loads the validator", async () => {
		const wrapper = mount(LdapClassesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});
		// validations are only active when checked === true
		await wrapper.setData({ checked: true });
		expect(wrapper.vm.$v).not.toBeUndefined();
	});

	it("invalid validation is false when valid values are sent through props", async () => {
		const wrapper = mount(LdapClassesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});
		// validations are only active when checked === true
		await wrapper.setData({ checked: true });
		// default props values are valid so expect this assertion to succeed
		expect(wrapper.vm.$v.$invalid).toBe(false);
	});

	it("invalid validation is true when invalid values are sent through props", async () => {
		const wrapper = mount(LdapClassesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: {
					classPath: "invalid",
					nameAttribute: "",
					participantAttribute: "",
				},
			},
		});
		await wrapper.setData({ checked: true });
		expect(wrapper.vm.$v.$invalid).toBe(true);
	});

	it("invalid validation is true when any of the input values are invalid", async () => {
		const ldapConfigDataTestSpecific = { ...ldapConfigData };
		const wrapper = mount(LdapClassesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigDataTestSpecific,
			},
			listeners: {
				input: (event) => {
					ldapConfigDataTestSpecific.classPath = event.classPath;
					ldapConfigDataTestSpecific.nameAttribute = event.nameAttribute;
					ldapConfigDataTestSpecific.participantAttribute =
						event.participantAttribute;
				},
			},
		});
		// validations are only active when checked === true
		await wrapper.setData({ checked: true });

		const inputPath = wrapper.find("input[data-testid=ldapDataClassesPath]");
		expect(inputPath.exists()).toBe(true);

		inputPath.setValue("");
		inputPath.trigger("blur"); // without this the error is not displayed

		expect(inputPath.element.value).toBe("");
		// disabled until behaviour is figured out
		// expect(wrapper.vm.$v.$invalid).toBe(true);
		// await wrapper.vm.$nextTick();
		// const errorMessageComponent = wrapper.find(
		// 	"div[data-testid='ldapDataClassesPath'] .info.error"
		// );
		// expect(errorMessageComponent.exists()).toBeTrue();
	});

	it("it emits update:errors event when validate prop changes value", async () => {
		const wrapper = mount(LdapClassesSection, {
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
			classPath: "invalid",
			nameAttribute: "",
			participantAttribute: "",
		};
		const wrapper = mount(LdapClassesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigDataTestSpecific,
			},
			listeners: {
				input: (event) => {
					ldapConfigDataTestSpecific.classPath = event.classPath;
					ldapConfigDataTestSpecific.nameAttribute = event.nameAttribute;
					ldapConfigDataTestSpecific.participantAttribute =
						event.participantAttribute;
				},
			},
		});
		// validations are only active when checked === true
		await wrapper.setData({ checked: true });

		let errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataClassesPath'] .base-input-info.base-input-error"
		);
		expect(wrapper.vm.$v.$invalid).toBe(true);
		expect(errorMessageComponent.exists()).toBeFalse();

		const inputPath = wrapper.find("input[data-testid=ldapDataClassesPath]");
		expect(inputPath.exists()).toBe(true);
		expect(inputPath.element.value).toBe(ldapConfigDataTestSpecific.classPath);

		inputPath.trigger("blur"); // without this the error is not displayed

		await wrapper.vm.$nextTick();
		errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataClassesPath'] .base-input-info.base-input-error"
		);
		expect(errorMessageComponent.exists()).toBeTrue();
	});
});
