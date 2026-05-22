import ImportUsersMatchSearch from "./ImportUsersMatchSearch.vue";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import {
	ImportUserResponse,
	ImportUserResponseRoleNames,
	SchulcloudTheme,
	UserMatchResponse,
	UserMatchResponseMatchedBy,
	UserMatchResponseRoleNames,
} from "@api-server";
import { useImportUsersStore } from "@data-import-users";
import { mdiFlag, mdiFlagOutline } from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { ComponentProps } from "vue-component-type-helpers";
import { VAutocomplete, VBtn, VListItem } from "vuetify/components";

const testProps = {
	editedItem: {
		flagged: false,
		importUserId: "123",
		loginName: "max_mus",
		firstName: "Max",
		lastName: "Mustermann",
		roleNames: [ImportUserResponseRoleNames.STUDENT],
		classNames: ["6a"],
		externalRoleNames: [],
	},
	isDialog: true,
	ldapSource: "LDAP",
};

const getWrapper = (props: ComponentProps<typeof ImportUsersMatchSearch>, options?: object) => {
	const importUsersStore = useImportUsersStore();
	vi.spyOn(importUsersStore, "fetchAllUsers").mockResolvedValue();
	return mount(ImportUsersMatchSearch, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		props,
		...options,
	});
};

describe("ImportUsersMatchSearch", () => {
	let importUsersStore: ReturnType<typeof useImportUsersStore>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		createTestEnvStore({
			SC_THEME: SchulcloudTheme.THR,
		});
		importUsersStore = useImportUsersStore();
	});

	it("should display 'editedItem' property in HTML section", async () => {
		const wrapper = getWrapper(testProps);
		const editedItemElement = wrapper.find("[data-testid=edited-item]").html();

		expect(editedItemElement).toContain("Max");
		expect(editedItemElement).toContain("Mustermann");
		expect(editedItemElement).toContain("common.roleName.student");
		expect(editedItemElement).toContain("max_mus");
		expect(editedItemElement).toContain("6a");
	});

	it("should set 'flagged' property true when flag-button clicked", async () => {
		const saveFlagMock = vi.spyOn(importUsersStore, "saveFlag");
		saveFlagMock.mockResolvedValue({ ...testProps.editedItem, flagged: true });

		const wrapper = getWrapper(testProps);

		const flagButtonElement = wrapper.find("[data-testid=flag-button]");
		expect(flagButtonElement.element.innerHTML).toContain(mdiFlagOutline);
		await flagButtonElement.trigger("click");

		expect(saveFlagMock).toHaveBeenCalled();
		await nextTick();
		await nextTick();

		expect(wrapper.emitted()["saved-flag"]).toHaveLength(1);
		expect(flagButtonElement.element.innerHTML).toContain(mdiFlag);
	});

	it("should set 'selectedItem' property when autoComplete element is selected ", async () => {
		const payload = {
			userId: "0000d231816abba584714c9e",
			loginName: "lehrer@schul-cloud.org",
			firstName: "Cord",
			lastName: "Carl",
			roleNames: [ImportUserResponseRoleNames.TEACHER],
			text: "Cord Carl",
		};
		const wrapper = getWrapper(testProps);
		const autoCompleteElement = wrapper.findComponent(VAutocomplete);
		autoCompleteElement.vm.$emit("update:modelValue", payload);
		await nextTick();

		const editedItemElement = wrapper.findAllComponents(VListItem)[1].html();

		expect(editedItemElement).toContain(payload.firstName);
		expect(editedItemElement).toContain(payload.lastName);
		expect(editedItemElement).toContain("common.roleName.teacher");
	});

	it("should saveMatch method triggered when save button clicked", async () => {
		const match: UserMatchResponse = {
			userId: "0000d231816abba584714c9e",
			loginName: "lehrer@schul-cloud.org",
			firstName: "Cord",
			lastName: "Carl",
			roleNames: [UserMatchResponseRoleNames.TEACHER],
		};

		const saveMatchMock = vi.spyOn(importUsersStore, "saveMatch");
		saveMatchMock.mockResolvedValue({ ...testProps.editedItem, match });

		const wrapper = getWrapper(testProps);

		const autoCompleteElement = wrapper.findComponent(VAutocomplete);
		autoCompleteElement.vm.$emit("update:modelValue", match);
		await nextTick();

		const saveMatchButton = wrapper.find("[data-testid=save-match-btn]");
		await saveMatchButton.trigger("click");

		expect(saveMatchMock).toHaveBeenCalledTimes(1);
		expect(saveMatchMock).toHaveBeenCalledWith({
			importUserId: testProps.editedItem.importUserId,
			userId: match.userId,
		});
		await nextTick();

		expect(wrapper.emitted()["saved-match"]).toBeTruthy();
	});

	it("should deleteMatch method triggered when delete button clicked", async () => {
		const importUser: ImportUserResponse = {
			flagged: false,
			importUserId: "123",
			loginName: "max_mus",
			firstName: "Max",
			lastName: "Mustermann",
			roleNames: [ImportUserResponseRoleNames.STUDENT],
			classNames: ["6a"],
		};
		const match: UserMatchResponse = {
			userId: "0000d213816abba584714c0a",
			loginName: "admin@schul-cloud.org",
			firstName: "Thorsten",
			lastName: "Test",
			roleNames: [UserMatchResponseRoleNames.ADMIN],
			matchedBy: UserMatchResponseMatchedBy.ADMIN,
		};
		const wrapper = getWrapper({
			editedItem: { ...importUser, match },
			ldapSource: "LDAP",
		});

		const deleteMatchMock = vi.spyOn(importUsersStore, "deleteMatch");
		deleteMatchMock.mockImplementation(async () => Promise.resolve(importUser));
		const deleteMatchButton = wrapper.find("[data-testid=delete-match-btn]");
		await deleteMatchButton.trigger("click");
		await nextTick();

		expect(deleteMatchMock).toHaveBeenCalledTimes(1);
		expect(deleteMatchMock).toHaveBeenCalledWith(testProps.editedItem.importUserId);
		expect(wrapper.emitted()["deleted-match"]).toBeTruthy();
	});

	it("should disable delete button when edited item has no match", () => {
		const wrapper = getWrapper(testProps);
		const deleteMatchButton = wrapper
			.findAllComponents(VBtn)
			.filter((btn) => btn.attributes("data-testid") === "delete-match-btn")[0];

		expect(deleteMatchButton.props("disabled")).toBe(true);
	});

	it("should disable save button when no item was selected", () => {
		const wrapper = getWrapper(testProps);

		const saveMatchButton = wrapper
			.findAllComponents(VBtn)
			.filter((btn) => btn.attributes("data-testid") === "save-match-btn")[0];

		expect(saveMatchButton.props("disabled")).toBe(true);
	});

	it("should not display username when prop nbc is set", () => {
		const wrapper = getWrapper({ ...testProps, isNbc: true });

		const editedItemUsername = wrapper.find("[data-testid=edited-item-username]");

		expect(editedItemUsername.exists()).toBe(false);
	});

	describe("when the theme is not NBC", () => {
		const setup = () => {
			const setupTestProps = {
				editedItem: {
					flagged: false,
					importUserId: "123",
					loginName: "max_mus",
					firstName: "Max",
					lastName: "Mustermann",
					roleNames: [ImportUserResponseRoleNames.STUDENT],
					classNames: ["6a"],
					externalRoleNames: ["student-external"],
				},
				isDialog: true,
				ldapSource: "ldap-external",
				isNbc: false,
			};
			return {
				setupTestProps,
			};
		};

		it("should not contain any text for external role", () => {
			const { setupTestProps } = setup();
			const wrapper = getWrapper(setupTestProps);

			const editedItemElement = wrapper.find("[data-testid=edited-item]").html();

			expect(editedItemElement).not.toContain(`common.labels.role ${setupTestProps.ldapSource}`);
		});
	});

	describe("when the theme is NBC", () => {
		describe("when the external role is 'Lern' (Student)", () => {
			const setup = () => {
				const adminTestProps = {
					editedItem: {
						flagged: false,
						importUserId: "123",
						loginName: "max_mus",
						firstName: "Max",
						lastName: "Mustermann",
						roleNames: [ImportUserResponseRoleNames.STUDENT],
						classNames: ["6a"],
						externalRoleNames: ["Lern"],
					},
					isDialog: true,
					ldapSource: "moin.schule",
					isNbc: true,
				};
				return {
					adminTestProps,
				};
			};

			it("should correctly show the external role of the user", () => {
				const { adminTestProps } = setup();
				const wrapper = getWrapper(adminTestProps);

				const editedItemElement = wrapper.find("[data-testid=edited-item]").html();

				expect(editedItemElement).toContain("Max");
				expect(editedItemElement).toContain("Mustermann");
				expect(editedItemElement).toContain("common.roleName.student");
				expect(editedItemElement).toContain(
					`common.labels.role ${adminTestProps.ldapSource}: ` +
						"components.molecules.importUsersMatch.externalRoleName.schulconnex.student)"
				);
			});
		});

		describe("when the external role is 'Lehr' (Teacher)", () => {
			const setup = () => {
				const adminTestProps = {
					editedItem: {
						flagged: false,
						importUserId: "123",
						loginName: "max_mus",
						firstName: "Max",
						lastName: "Mustermann",
						roleNames: [ImportUserResponseRoleNames.TEACHER],
						classNames: ["6a"],
						externalRoleNames: ["Lehr"],
					},
					isDialog: true,
					ldapSource: "moin.schule",
					isNbc: true,
				};
				return {
					adminTestProps,
				};
			};

			it("should correctly show the external role of the user", () => {
				const { adminTestProps } = setup();
				const wrapper = getWrapper(adminTestProps);

				const editedItemElement = wrapper.find("[data-testid=edited-item]").html();

				expect(editedItemElement).toContain("Max");
				expect(editedItemElement).toContain("Mustermann");
				expect(editedItemElement).toContain("common.roleName.teacher");
				expect(editedItemElement).toContain(
					`common.labels.role ${adminTestProps.ldapSource}: ` +
						"components.molecules.importUsersMatch.externalRoleName.schulconnex.teacher)"
				);
			});
		});

		describe("when the external role is 'Leit' (Management)", () => {
			const setup = () => {
				const adminTestProps = {
					editedItem: {
						flagged: false,
						importUserId: "123",
						loginName: "max_mus",
						firstName: "Max",
						lastName: "Mustermann",
						roleNames: [ImportUserResponseRoleNames.ADMIN],
						classNames: ["6a"],
						externalRoleNames: ["Leit"],
					},
					isDialog: true,
					ldapSource: "moin.schule",
					isNbc: true,
				};
				return {
					adminTestProps,
				};
			};

			it("should correctly show the external role of the user", () => {
				const { adminTestProps } = setup();
				const wrapper = getWrapper(adminTestProps);

				const editedItemElement = wrapper.find("[data-testid=edited-item]").html();

				expect(editedItemElement).toContain("Max");
				expect(editedItemElement).toContain("Mustermann");
				expect(editedItemElement).toContain("common.roleName.administrator");
				expect(editedItemElement).toContain(
					`common.labels.role ${adminTestProps.ldapSource}: ` +
						"components.molecules.importUsersMatch.externalRoleName.schulconnex.manager)"
				);
			});
		});

		describe("when the external role is 'OrgAdmin' (Admin)", () => {
			const setup = () => {
				const adminTestProps = {
					editedItem: {
						flagged: false,
						importUserId: "123",
						loginName: "max_mus",
						firstName: "Max",
						lastName: "Mustermann",
						roleNames: [ImportUserResponseRoleNames.ADMIN],
						classNames: ["6a"],
						externalRoleNames: ["OrgAdmin"],
					},
					isDialog: true,
					ldapSource: "moin.schule",
					isNbc: true,
				};
				return {
					adminTestProps,
				};
			};

			it("should correctly show the external role of the user", () => {
				const { adminTestProps } = setup();
				const wrapper = getWrapper(adminTestProps);

				const editedItemElement = wrapper.find("[data-testid=edited-item]").html();

				expect(editedItemElement).toContain("Max");
				expect(editedItemElement).toContain("Mustermann");
				expect(editedItemElement).toContain("common.roleName.administrator");
				expect(editedItemElement).toContain(
					`common.labels.role ${adminTestProps.ldapSource}: ` +
						"components.molecules.importUsersMatch.externalRoleName.schulconnex.orgAdmin)"
				);
			});
		});

		describe("when externalRoleNames prop is empty", () => {
			const setup = () => {
				const setupTestProps = {
					editedItem: {
						flagged: false,
						importUserId: "123",
						loginName: "max_mus",
						firstName: "Max",
						lastName: "Mustermann",
						roleNames: [ImportUserResponseRoleNames.STUDENT],
						classNames: ["6a"],
						externalRoleNames: [],
					},
					isDialog: true,
					ldapSource: "moin.schule",
					isNbc: true,
				};
				return {
					setupTestProps,
				};
			};

			it("should show that the role is not available", () => {
				const { setupTestProps } = setup();
				const wrapper = getWrapper(setupTestProps);

				const editedItemElement = wrapper.find("[data-testid=edited-item]").html();

				expect(editedItemElement).toContain("Max");
				expect(editedItemElement).toContain("Mustermann");
				expect(editedItemElement).toContain("common.roleName.student");
				expect(editedItemElement).toContain("components.molecules.importUsersMatch.externalRoleName.none");
			});
		});

		describe("when the external role is unknown", () => {
			it("should show the raw role name when not in schulconnex mapping", () => {
				const propsWithUnknownRole = {
					editedItem: {
						flagged: false,
						importUserId: "123",
						loginName: "max_mus",
						firstName: "Max",
						lastName: "Mustermann",
						roleNames: [ImportUserResponseRoleNames.STUDENT],
						classNames: ["6a"],
						externalRoleNames: ["UnknownRole"],
					},
					isDialog: true,
					ldapSource: "moin.schule",
					isNbc: true,
				};
				const wrapper = getWrapper(propsWithUnknownRole);
				const editedItemElement = wrapper.find("[data-testid=edited-item]").html();

				expect(editedItemElement).toContain("UnknownRole");
			});
		});
	});

	describe("mapRoleNames", () => {
		it("should map admin role correctly", () => {
			const propsWithAdminRole = {
				...testProps,
				editedItem: {
					...testProps.editedItem,
					roleNames: [ImportUserResponseRoleNames.ADMIN],
				},
			};
			const wrapper = getWrapper(propsWithAdminRole);
			const editedItemElement = wrapper.find("[data-testid=edited-item]").html();

			expect(editedItemElement).toContain("common.roleName.administrator");
		});

		it("should map expert role correctly", () => {
			const propsWithExpertRole = {
				...testProps,
				editedItem: {
					...testProps.editedItem,
					roleNames: ["expert"] as unknown as ImportUserResponseRoleNames[],
				},
			};
			const wrapper = getWrapper(propsWithExpertRole);
			const editedItemElement = wrapper.find("[data-testid=edited-item]").html();

			expect(editedItemElement).toContain("common.roleName.expert");
		});

		it("should map externalPerson role correctly", () => {
			const propsWithExternalPersonRole = {
				...testProps,
				editedItem: {
					...testProps.editedItem,
					roleNames: ["externalPerson"] as unknown as ImportUserResponseRoleNames[],
				},
			};
			const wrapper = getWrapper(propsWithExternalPersonRole);
			const editedItemElement = wrapper.find("[data-testid=edited-item]").html();

			expect(editedItemElement).toContain("common.roleName.externalPerson");
		});

		it("should map superhero role correctly", () => {
			const propsWithSuperheroRole = {
				...testProps,
				editedItem: {
					...testProps.editedItem,
					roleNames: ["superhero"] as unknown as ImportUserResponseRoleNames[],
				},
			};
			const wrapper = getWrapper(propsWithSuperheroRole);
			const editedItemElement = wrapper.find("[data-testid=edited-item]").html();

			expect(editedItemElement).toContain("common.roleName.superhero");
		});

		it("should return raw role name for unknown roles", () => {
			const propsWithUnknownRole = {
				...testProps,
				editedItem: {
					...testProps.editedItem,
					roleNames: ["unknownRole"] as unknown as ImportUserResponseRoleNames[],
				},
			};
			const wrapper = getWrapper(propsWithUnknownRole);
			const editedItemElement = wrapper.find("[data-testid=edited-item]").html();

			expect(editedItemElement).toContain("unknownRole");
		});
	});

	describe("canSave computed", () => {
		it("should return false when selected user is already matched", async () => {
			const match: UserMatchResponse = {
				userId: "existing-user-id",
				loginName: "existing@schul-cloud.org",
				firstName: "Existing",
				lastName: "User",
				roleNames: [UserMatchResponseRoleNames.TEACHER],
			};
			const propsWithMatch = {
				...testProps,
				editedItem: {
					...testProps.editedItem,
					match,
				},
			};
			const wrapper = getWrapper(propsWithMatch);

			const autoCompleteElement = wrapper.findComponent(VAutocomplete);
			autoCompleteElement.vm.$emit("update:modelValue", match);
			await nextTick();

			const saveMatchButton = wrapper
				.findAllComponents(VBtn)
				.filter((btn) => btn.attributes("data-testid") === "save-match-btn")[0];

			expect(saveMatchButton.props("disabled")).toBe(true);
		});
	});

	describe("saveMatch error handling", () => {
		it("should not emit saved-match when businessError occurs", async () => {
			const match: UserMatchResponse = {
				userId: "0000d231816abba584714c9e",
				loginName: "lehrer@schul-cloud.org",
				firstName: "Cord",
				lastName: "Carl",
				roleNames: [UserMatchResponseRoleNames.TEACHER],
			};

			const saveMatchMock = vi.spyOn(importUsersStore, "saveMatch");
			saveMatchMock.mockResolvedValue(undefined);
			importUsersStore.businessError = { statusCode: 500, message: "Error", error: {} as never };

			const wrapper = getWrapper(testProps);

			const autoCompleteElement = wrapper.findComponent(VAutocomplete);
			autoCompleteElement.vm.$emit("update:modelValue", match);
			await nextTick();

			const saveMatchButton = wrapper.find("[data-testid=save-match-btn]");
			await saveMatchButton.trigger("click");
			await nextTick();

			expect(wrapper.emitted()["saved-match"]).toBeFalsy();
		});

		it("should not emit saved-match when returned match userId does not match", async () => {
			const selectedMatch: UserMatchResponse = {
				userId: "selected-user-id",
				loginName: "lehrer@schul-cloud.org",
				firstName: "Cord",
				lastName: "Carl",
				roleNames: [UserMatchResponseRoleNames.TEACHER],
			};
			const returnedMatch: UserMatchResponse = {
				userId: "different-user-id",
				loginName: "other@schul-cloud.org",
				firstName: "Other",
				lastName: "User",
				roleNames: [UserMatchResponseRoleNames.TEACHER],
			};

			const saveMatchMock = vi.spyOn(importUsersStore, "saveMatch");
			saveMatchMock.mockResolvedValue({ ...testProps.editedItem, match: returnedMatch });

			const wrapper = getWrapper(testProps);

			const autoCompleteElement = wrapper.findComponent(VAutocomplete);
			autoCompleteElement.vm.$emit("update:modelValue", selectedMatch);
			await nextTick();

			const saveMatchButton = wrapper.find("[data-testid=save-match-btn]");
			await saveMatchButton.trigger("click");
			await nextTick();

			expect(wrapper.emitted()["saved-match"]).toBeFalsy();
		});
	});

	describe("deleteMatch error handling", () => {
		it("should not emit deleted-match when businessError occurs", async () => {
			const match: UserMatchResponse = {
				userId: "0000d213816abba584714c0a",
				loginName: "admin@schul-cloud.org",
				firstName: "Thorsten",
				lastName: "Test",
				roleNames: [UserMatchResponseRoleNames.ADMIN],
				matchedBy: UserMatchResponseMatchedBy.ADMIN,
			};
			const propsWithMatch = {
				...testProps,
				editedItem: {
					...testProps.editedItem,
					match,
				},
			};

			const deleteMatchMock = vi.spyOn(importUsersStore, "deleteMatch");
			deleteMatchMock.mockResolvedValue(undefined);
			importUsersStore.businessError = { statusCode: 500, message: "Error", error: {} as never };

			const wrapper = getWrapper(propsWithMatch);

			const deleteMatchButton = wrapper.find("[data-testid=delete-match-btn]");
			await deleteMatchButton.trigger("click");
			await nextTick();

			expect(wrapper.emitted()["deleted-match"]).toBeFalsy();
		});

		it("should not call deleteMatch when match has no userId", async () => {
			const matchWithoutUserId = {
				loginName: "admin@schul-cloud.org",
				firstName: "Thorsten",
				lastName: "Test",
				roleNames: [UserMatchResponseRoleNames.ADMIN],
				userId: undefined,
			};
			const propsWithInvalidMatch = {
				...testProps,
				editedItem: {
					...testProps.editedItem,
					match: matchWithoutUserId as unknown as UserMatchResponse,
				},
			};

			const deleteMatchMock = vi.spyOn(importUsersStore, "deleteMatch");
			const wrapper = getWrapper(propsWithInvalidMatch);

			const deleteMatchButton = wrapper.find("[data-testid=delete-match-btn]");
			await deleteMatchButton.trigger("click");
			await nextTick();

			expect(deleteMatchMock).not.toHaveBeenCalled();
		});
	});

	describe("saveFlag error handling", () => {
		it("should not emit saved-flag when businessError occurs", async () => {
			const saveFlagMock = vi.spyOn(importUsersStore, "saveFlag");
			saveFlagMock.mockResolvedValue(undefined);
			importUsersStore.businessError = { statusCode: 500, message: "Error", error: {} as never };

			const wrapper = getWrapper(testProps);

			const flagButtonElement = wrapper.find("[data-testid=flag-button]");
			await flagButtonElement.trigger("click");
			await nextTick();

			expect(wrapper.emitted()["saved-flag"]).toBeFalsy();
		});

		it("should not emit saved-flag when returned flag does not match expected value", async () => {
			const saveFlagMock = vi.spyOn(importUsersStore, "saveFlag");
			saveFlagMock.mockResolvedValue({ ...testProps.editedItem, flagged: false });

			const wrapper = getWrapper(testProps);

			const flagButtonElement = wrapper.find("[data-testid=flag-button]");
			await flagButtonElement.trigger("click");
			await nextTick();

			expect(wrapper.emitted()["saved-flag"]).toBeFalsy();
		});
	});

	describe("close button", () => {
		it("should emit close event and reset selectedItem when close button clicked", async () => {
			const wrapper = getWrapper(testProps);

			const closeButton = wrapper.findAllComponents(VBtn).find((btn) => btn.props("icon") !== undefined);
			await closeButton?.trigger("click");

			expect(wrapper.emitted()["close"]).toBeTruthy();
		});
	});
});
