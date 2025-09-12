import { importUsersModule } from "@/store";
import ImportUsersModule from "@/store/import-users";
import {
	ImportUserResponse,
	ImportUserResponseRoleNamesEnum,
	UserMatchResponse,
	UserMatchResponseMatchedByEnum,
	UserMatchResponseRoleNamesEnum,
} from "@/serverApi/v3";
import { THEME_KEY } from "@/utils/inject";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { mdiFlag, mdiFlagOutline } from "@icons/material";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { ComponentProps } from "vue-component-type-helpers";
import { VAutocomplete, VBtn, VListItem } from "vuetify/lib/components/index";
import vImportUsersMatchSearch from "./vImportUsersMatchSearch.vue";

const testProps = {
	editedItem: {
		flagged: false,
		importUserId: "123",
		loginName: "max_mus",
		firstName: "Max",
		lastName: "Mustermann",
		roleNames: [ImportUserResponseRoleNamesEnum.Student],
		classNames: ["6a"],
		externalRoleNames: [],
	},
	isDialog: true,
	ldapSource: "LDAP",
};

const getWrapper = (
	props: ComponentProps<typeof vImportUsersMatchSearch>,
	options?: object
) => {
	vi.spyOn(importUsersModule, "fetchAllUsers").mockResolvedValue();
	return mount(vImportUsersMatchSearch, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				[THEME_KEY.valueOf()]: {
					name: "nbc",
				},
			},
		},
		props,
		...options,
	});
};

describe("@/components/administration/vImportUsersMatchSearch", () => {
	beforeEach(() => {
		setupStores({ importUsersModule: ImportUsersModule });
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
		const saveFlagMock = vi.spyOn(importUsersModule, "saveFlag");
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
			roleNames: [ImportUserResponseRoleNamesEnum.Teacher],
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
			roleNames: [UserMatchResponseRoleNamesEnum.Teacher],
		};

		const saveMatchMock = vi.spyOn(importUsersModule, "saveMatch");
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
			roleNames: [ImportUserResponseRoleNamesEnum.Student],
			classNames: ["6a"],
		};
		const match: UserMatchResponse = {
			userId: "0000d213816abba584714c0a",
			loginName: "admin@schul-cloud.org",
			firstName: "Thorsten",
			lastName: "Test",
			roleNames: [UserMatchResponseRoleNamesEnum.Admin],
			matchedBy: UserMatchResponseMatchedByEnum.Admin,
		};
		const wrapper = getWrapper({
			editedItem: { ...importUser, match },
			ldapSource: "LDAP",
		});

		const deleteMatchMock = vi.spyOn(importUsersModule, "deleteMatch");
		deleteMatchMock.mockImplementation(async () => {
			return Promise.resolve(importUser);
		});
		const deleteMatchButton = wrapper.find("[data-testid=delete-match-btn]");
		await deleteMatchButton.trigger("click");
		await nextTick();

		expect(deleteMatchMock).toHaveBeenCalledTimes(1);
		expect(deleteMatchMock).toHaveBeenCalledWith(
			testProps.editedItem.importUserId
		);
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

		const editedItemUsername = wrapper.find(
			"[data-testid=edited-item-username]"
		);

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
					roleNames: [ImportUserResponseRoleNamesEnum.Student],
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

			const editedItemElement = wrapper
				.find("[data-testid=edited-item]")
				.html();

			expect(editedItemElement).not.toContain(
				`common.labels.role ${setupTestProps.ldapSource}`
			);
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
						roleNames: [ImportUserResponseRoleNamesEnum.Student],
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

				const editedItemElement = wrapper
					.find("[data-testid=edited-item]")
					.html();

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
						roleNames: [ImportUserResponseRoleNamesEnum.Teacher],
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

				const editedItemElement = wrapper
					.find("[data-testid=edited-item]")
					.html();

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
						roleNames: [ImportUserResponseRoleNamesEnum.Admin],
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

				const editedItemElement = wrapper
					.find("[data-testid=edited-item]")
					.html();

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
						roleNames: [ImportUserResponseRoleNamesEnum.Admin],
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

				const editedItemElement = wrapper
					.find("[data-testid=edited-item]")
					.html();

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
						roleNames: [ImportUserResponseRoleNamesEnum.Student],
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

				const editedItemElement = wrapper
					.find("[data-testid=edited-item]")
					.html();

				expect(editedItemElement).toContain("Max");
				expect(editedItemElement).toContain("Mustermann");
				expect(editedItemElement).toContain("common.roleName.student");
				expect(editedItemElement).toContain(
					"components.molecules.importUsersMatch.externalRoleName.none"
				);
			});
		});
	});
});
