import LDAPConfigPage from "./LDAPConfig.page.vue";
import InfoMessage from "@/components/administration/InfoMessage.vue";
import LdapClassesSection from "@/components/administration/ldap/LdapClassesSection.vue";
import { unchangedPassword } from "@/utils/ldapConstants.js";
import { expectNotification, mockedPiniaStoreTyping } from "@@/tests/test-utils/index.js";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { LdapFormData, useLdapConfigStore, VerifiedData } from "@data-ldap";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { LocationQuery } from "vue-router";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

const mockInputData: LdapFormData = {
	url: "ldaps://ldap.hpi-schul-cloud.de",
	basisPath: "dc=schul-cloud,dc=org",
	searchUser: "cn=ldapadmin,dc=schul-cloud,dc=org",
	searchUserPassword: "mockPassword",
	userPath: "ou=users",
	firstName: "givenName",
	familyName: "sn",
	email: "mail",
	uid: "uid",
	uuid: "uidNumber",
	groupOption: "group",
	member: "description",
	student: "cn=student,ou=roles,ou=groups,dc=schul-cloud,dc=org",
	teacher: "cn=teacher,ou=roles,ou=groups,dc=schul-cloud,dc=org",
	admin: "cn=admin,ou=roles,ou=groups,dc=schul-cloud,dc=org",
	user: "no-sc",
	classPath: "ou=classes,ou=groups",
	nameAttribute: "description",
	participantAttribute: "member",
};

describe("ldap/config", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = (options?: Partial<Partial<{ query: LocationQuery }>>) => {
		window.scrollTo = vi.fn();

		const router = createRouterMock();
		injectRouterMock(router);

		if (options?.query) {
			router.setQuery(options.query);
		}

		const wrapper = mount(LDAPConfigPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		const ldapConfigStore = mockedPiniaStoreTyping(useLdapConfigStore);

		return { wrapper, ldapConfigStore, router };
	};

	it("should call 'initializeStore' action if $route.query.id is defined", async () => {
		const { ldapConfigStore } = setup({
			query: { id: "mockId" },
		});
		await nextTick();

		expect(ldapConfigStore.initializeStore).toHaveBeenCalled();
	});

	describe("submit", () => {
		const triggerSubmit = async (wrapper: VueWrapper) => {
			const submitButton = wrapper.find(`[data-testid="ldapVerifyButton"]`);
			await submitButton.trigger("click");
			await flushPromises();
		};
		describe("when validation fails", () => {
			it("should show error message", async () => {
				const { wrapper, ldapConfigStore } = setup({
					query: { id: "mockId" },
				});
				ldapConfigStore.ldapFormData = { ...mockInputData, url: "" };
				await nextTick();

				await triggerSubmit(wrapper);

				const errorMessage = wrapper.findComponent(InfoMessage);
				expect(errorMessage.exists()).toBe(true);
				expect(errorMessage.props("message")).toBe("common.validation.invalid");
			});
		});

		describe("when validation is successful", () => {
			it("should set searchUser Password to undefined if it is unchanged password", async () => {
				const id = "mockId";
				const { wrapper, ldapConfigStore } = setup({
					query: { id },
				});
				ldapConfigStore.ldapFormData = { ...mockInputData, searchUserPassword: unchangedPassword };
				await nextTick();

				await triggerSubmit(wrapper);

				expect(ldapConfigStore.ldapFormData.searchUserPassword).toBe(undefined);
				expect(ldapConfigStore.verifyExistingLdapConfig).toHaveBeenCalledWith(id, {
					...mockInputData,
					searchUserPassword: undefined,
				});
			});
			describe("when route id is defined", async () => {
				it("should call 'verifyExistingLdapConfig' action", async () => {
					const id = "mockId";
					const { wrapper, ldapConfigStore } = setup({
						query: { id },
					});
					ldapConfigStore.ldapFormData = mockInputData;
					await nextTick();

					await triggerSubmit(wrapper);
					expect(ldapConfigStore.verifyExistingLdapConfig).toHaveBeenCalledWith(id, ldapConfigStore.ldapFormData);
				});
				it("should notify success and navigate to ldap activation page", async () => {
					const id = "mockId";
					const { wrapper, ldapConfigStore, router } = setup({
						query: { id },
					});
					ldapConfigStore.ldapFormData = mockInputData;
					ldapConfigStore.verified = {
						ok: true,
					} as VerifiedData;
					await nextTick();

					await triggerSubmit(wrapper);

					expectNotification("success");
					expect(router.push).toHaveBeenCalledWith({
						path: "/administration/ldap/activate",
						query: { id },
					});
				});
			});
			describe("when route id is not defined", () => {
				it("should call 'verifyNewLdapConfig' action", async () => {
					const { wrapper, ldapConfigStore } = setup();
					ldapConfigStore.ldapFormData = mockInputData;
					await nextTick();

					await triggerSubmit(wrapper);
					expect(ldapConfigStore.verifyNewLdapConfig).toHaveBeenCalledWith(ldapConfigStore.ldapFormData);
				});

				it("should notify success and navigate to ldap activation page", async () => {
					const { wrapper, ldapConfigStore, router } = setup();
					ldapConfigStore.ldapFormData = mockInputData;
					ldapConfigStore.verified = {
						ok: true,
					} as VerifiedData;
					await nextTick();

					await triggerSubmit(wrapper);

					expectNotification("success");
					expect(router.push).toHaveBeenCalledWith({
						path: "/administration/ldap/activate",
						query: {},
					});
				});
			});
		});
	});

	it("should clear 'ldapFormData' values on clear button click", async () => {
		const { wrapper, ldapConfigStore } = setup({
			query: { id: "mockId" },
		});
		await nextTick();

		ldapConfigStore.ldapFormData = mockInputData;
		await nextTick();

		const classesSection = wrapper.find(`[data-testid="ldapClassesSection"]`).findComponent(LdapClassesSection);
		classesSection.vm.$emit("update:inputs");

		expect(ldapConfigStore.ldapFormData).toEqual({
			...mockInputData,
			classPath: undefined,
			nameAttribute: undefined,
			participantAttribute: undefined,
		});
	});

	it("should call 'resetLdapFormData' on reset button click", async () => {
		const { wrapper, ldapConfigStore } = setup({
			query: { id: "mockId" },
		});
		await nextTick();

		ldapConfigStore.ldapFormData = mockInputData;
		await nextTick();

		const resetButton = wrapper.find(`[data-testid="ldapResetInputsButton"]`);
		await resetButton.trigger("click");
		await nextTick();

		expect(ldapConfigStore.resetLdapFormData).toHaveBeenCalled();
	});
});
