import { nextTick } from "vue";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";
import { Router, useRouter } from "vue-router";
import { ComponentMountingOptions, mount, shallowMount } from "@vue/test-utils";
import { createMock } from "@golevelup/ts-vitest";
import { THEME_KEY } from "@/utils/inject";
import { SchulcloudTheme } from "@/serverApi/v3";
import { envConfigModule, importUsersModule, schoolsModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import ImportUsersModule from "@/store/import-users";
import SchoolsModule from "@/store/schools";
import MigrationWizard from "@/pages/administration/Migration.page.vue";
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { schoolFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { VCardText } from "vuetify/lib/components/index";

vi.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

vi.mock("vue-router");
const useRouterMock = <vi.Mock>useRouter;

const router = createMock<Router>();

const $theme = {
	name: "instance name",
};

const importUsersStub = {
	template: "<div></div>",
	methods: {
		reloadData: async () => Promise.resolve(),
	},
};

const getWrapper = (
	options: ComponentMountingOptions<typeof MigrationWizard> = {}
) => {
	document.body.setAttribute("data-app", "true");

	useRouterMock.mockReturnValue(router);

	return mount(MigrationWizard, {
		global: {
			plugins: [
				createTestingVuetify(),
				createTestingI18n(),
				vueDompurifyHTMLPlugin,
			],
			provide: {
				[THEME_KEY.valueOf()]: $theme,
			},
			stubs: {
				ImportUsers: importUsersStub,
				VSnackbar: true,
			},
		},
		...options,
	});
};

const getWrapperShallow = (
	options: ComponentMountingOptions<typeof MigrationWizard> = {}
) => {
	document.body.setAttribute("data-app", "true");

	return shallowMount(MigrationWizard, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				[THEME_KEY.valueOf()]: $theme,
			},
		},
		...options,
	});
};

window.scrollTo = vi.fn();

describe("User Migration / Index", () => {
	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
			importUsersModule: ImportUsersModule,
			schoolsModule: SchoolsModule,
		});

		envConfigModule.getEnv.FEATURE_USER_MIGRATION_ENABLED = true;
		envConfigModule.getEnv.SC_THEME = SchulcloudTheme.Default;
		envConfigModule.getEnv.MIGRATION_WIZARD_DOCUMENTATION_LINK =
			"https://docs.dbildungscloud.de/x/VAEbDg?frameable=true";
		importUsersModule.setTotal(100);
		schoolsModule.setSchool(
			schoolFactory.build({
				inUserMigration: undefined,
				inMaintenance: undefined,
			})
		);
	});

	it("should set page title", () => {
		const wrapper = getWrapperShallow();

		const title = wrapper.vm.t("pages.administration.migration.title", {
			source: "LDAP",
			instance: $theme.name,
		});
		expect(document.title).toBe(title);
	});

	it("shows business error", async () => {
		importUsersModule.setBusinessError({
			statusCode: "500",
			message: "foo",
		});
		const wrapper = getWrapperShallow();
		const findText = wrapper.find('[data-testid="error-dialog"]');
		const errorMsg = wrapper.vm.t("pages.administration.migration.error");
		expect(findText.text()).toContain(errorMsg);
	});

	it("shows not show business error, if it is not set", () => {
		importUsersModule.setBusinessError(null);
		const wrapper = getWrapper();
		const findText = wrapper.find(".v-snack");
		expect(findText.exists()).toBe(false);
	});

	it("should show info text on step 1", () => {
		const wrapper = getWrapperShallow();
		const findText = wrapper.find("[data-testid=migration_tutorial]");

		expect(findText.element.innerHTML).toMatch(
			/<iframe.*https:\/\/docs.dbildungscloud\.de\/x\/VAEbDg\?frameable=true.*><\/iframe>/
		);
	});

	describe("Start user migration", () => {
		beforeEach(() => {
			importUsersModule.setTotal(0);
		});

		it("should show hint text that sync can take some time", () => {
			const wrapper = getWrapperShallow();
			const tutorialWait = wrapper.vm.t(
				"pages.administration.migration.tutorialWait"
			);
			const findText = wrapper.find("[data-testid=migration_tutorial]");

			expect(findText.element.innerHTML).toContain(tutorialWait);
		});

		it("should show button for start inUserMigration", async () => {
			const wrapper = getWrapper();

			const btn = wrapper.find("[data-testid=start_user_migration]");
			expect(btn.attributes("disabled")).toBeUndefined();

			const nextBtn = wrapper.find("[data-testid=migration_tutorial_next]");
			expect(nextBtn.exists()).toEqual(false);

			importUsersModule.setTotal(100);
			schoolsModule.setSchool(
				schoolFactory.build({
					inUserMigration: true,
					inMaintenance: true,
				})
			);
			await nextTick();

			const btnRemoved = wrapper.find("[data-testid=start_user_migration]");
			expect(btnRemoved.exists()).toEqual(false);

			const nextBtn2 = wrapper.find("[data-testid=migration_tutorial_next]");
			expect(nextBtn2.attributes("disabled")).toBeUndefined();
		});
	});

	describe("show summary", () => {
		beforeEach(() => {
			schoolsModule.setSchool(
				schoolFactory.build({
					inUserMigration: true,
					inMaintenance: true,
				})
			);
		});

		it("should display summary text with totals", async () => {
			const totalImportUsers = 10;
			const totalMatched = 2;
			const totalUnmatched = 4;

			importUsersModule.setTotal(totalImportUsers);
			importUsersModule.setTotalUnmatched(totalUnmatched);
			importUsersModule.setTotalMatched(totalMatched);

			const wrapper = getWrapperShallow();

			wrapper.vm.migrationStep = 3;
			await nextTick();

			const findText = wrapper
				.find("[data-testid=migration_summary]")
				.getComponent(VCardText);

			const expectedSummaryText = [
				"pages.administration.migration.summary.firstParagraph",
				`${totalMatched} pages.administration.migration.summary.secondParagraph.importUsersCount`,
				`${totalImportUsers - totalMatched} pages.administration.migration.summary.thirdParagraph.importUsersUnmatchedCount`,
				`${totalUnmatched} pages.administration.migration.summary.lastParagraph.usersUnmatchedCount`,
			].join("");

			expect(findText.text()).toContain(expectedSummaryText);
		});

		it("should disable perform migration button, if confirm not checked", async () => {
			const wrapper = getWrapper();

			wrapper.vm.migrationStep = 3;
			await nextTick();

			const btn = wrapper.find("[data-testid=migration_performMigration]");
			expect(btn.attributes("disabled")).toBeDefined();

			wrapper.vm.isMigrationConfirm = true;
			await nextTick();
			expect(btn.attributes("disabled")).toBeUndefined();
		});

		it("implement perform migration", async () => {
			const performMigrationMock = vi.spyOn(
				importUsersModule,
				"performMigration"
			);
			performMigrationMock.mockImplementation(async () => {
				return Promise.resolve();
			});

			const wrapper = getWrapper();
			wrapper.vm.migrationStep = 3;
			wrapper.vm.isMigrationConfirm = true;
			await nextTick();
			await nextTick();
			const btn = wrapper.find("[data-testid=migration_performMigration]");
			expect(btn.attributes("disabled")).toBeUndefined();

			await btn.trigger("click");

			await nextTick();
			await nextTick();
			// TODO after implementing of backend and store, mock store response and expect to be called with
			expect(performMigrationMock).toHaveBeenCalledTimes(1);
			expect(wrapper.vm.migrationStep).toBe(4);
			expect(schoolsModule.getSchool.inUserMigration).toBe(false);
			expect(wrapper.vm.school.inUserMigration).toBe(false);
		});
	});

	describe("show maintenance/Transferphase", () => {
		const setup = async () => {
			const wrapper = getWrapper();
			wrapper.vm.migrationStep = 4;
			wrapper.vm.isMigrationConfirm = true;
			await nextTick();

			return {
				wrapper,
			};
		};

		it("should show text", async () => {
			const { wrapper } = await setup();

			const stepperContent = wrapper.findComponent(
				"[data-testid=migration_finish]"
			);

			expect(stepperContent.text()).toContain(
				wrapper.vm.t("pages.administration.migration.step4.linkingFinished", {
					source: "LDAP",
					instance: $theme.name,
				})
			);
		});

		it("perform end maintenance", async () => {
			const { wrapper } = await setup();

			const endMaintenanceMock = vi.spyOn(schoolsModule, "migrationStartSync");
			endMaintenanceMock.mockImplementation(async () => {
				schoolsModule.setSchool({
					...schoolsModule.getSchool,
					inMaintenance: false,
				});
				return Promise.resolve();
			});

			const btn = wrapper.find("[data-testid=migration_endMaintenance]");
			await btn.trigger("click");

			await nextTick();
			await nextTick();

			expect(endMaintenanceMock).toHaveBeenCalledTimes(1);
			expect(wrapper.vm.migrationStep).toBe(5);
			expect(wrapper.vm.school.inMaintenance).toBe(false);
		});
	});

	describe("cancel migration", () => {
		describe("in step migration_importUsers", () => {
			const setup = async () => {
				schoolsModule.setSchool(
					schoolFactory.build({
						inUserMigration: true,
						inMaintenance: true,
					})
				);

				importUsersModule.setTotal(10);
				importUsersModule.setTotalUnmatched(5);
				importUsersModule.setTotalMatched(5);

				const wrapper = getWrapper();

				wrapper.vm.migrationStep = 2;
				wrapper.vm.t("pages.administration.migration.title", {
					source: "LDAP",
					instance: $theme.name,
				});

				const redirect = {
					path: "/administration/school-settings",
					query: { openPanels: "authentication" },
				};

				await nextTick();

				return {
					wrapper,
					redirect,
				};
			};

			it("should show cancel button", async () => {
				const { wrapper } = await setup();

				const button = wrapper.findComponent(
					"[data-testid=import-users-cancel-migration-btn]"
				);

				expect(button.exists()).toBe(true);
			});

			it("should show dialog on click", async () => {
				const { wrapper } = await setup();

				const button = wrapper.findComponent(
					"[data-testid=import-users-cancel-migration-btn]"
				);

				await button.trigger("click");

				expect(wrapper.vm.isCancelDialogOpen).toBe(true);
			});

			it("should change isCancelDialogOpen on isOpen", async () => {
				const { wrapper } = await setup();

				const button = wrapper.findComponent(
					"[data-testid=import-users-cancel-migration-btn]"
				);

				await button.trigger("click");

				const dialogParent = wrapper.find(
					'[data-testid="cancel-migration-dialog-wrapper"]'
				);
				const dialog = dialogParent.findComponent(VCustomDialog);

				dialog.vm.$emit("update:isOpen", false);
				await nextTick();

				expect(wrapper.vm.isCancelDialogOpen).toEqual(false);
			});

			it("should call stores on dialog-confirm", async () => {
				const { wrapper } = await setup();

				const cancelMigrationMock = vi.spyOn(
					importUsersModule,
					"cancelMigration"
				);

				cancelMigrationMock.mockImplementationOnce(async () => {
					schoolsModule.setSchool({
						...schoolsModule.getSchool,
						inUserMigration: false,
						inMaintenance: false,
					});
				});

				vi.spyOn(schoolsModule, "fetchSchool").mockResolvedValueOnce(
					Promise.resolve()
				);

				const button = wrapper.findComponent(
					"[data-testid=import-users-cancel-migration-btn]"
				);

				await button.trigger("click");

				const dialogParent = wrapper.find(
					'[data-testid="cancel-migration-dialog-wrapper"]'
				);
				const dialog = dialogParent.findComponent(VCustomDialog);

				dialog.vm.$emit("dialog-confirmed");

				await nextTick();

				expect(importUsersModule.cancelMigration).toHaveBeenCalled();
				expect(schoolsModule.fetchSchool).toHaveBeenCalled();
			});

			it("should redirect to school settings migration section", async () => {
				const { wrapper } = await setup();

				const cancelMigrationMock = vi.spyOn(
					importUsersModule,
					"cancelMigration"
				);
				cancelMigrationMock.mockImplementationOnce(async () => {
					schoolsModule.setSchool({
						...schoolsModule.getSchool,
						inUserMigration: false,
						inMaintenance: false,
					});
					return Promise.resolve();
				});

				const button = wrapper.findComponent(
					"[data-testid=import-users-cancel-migration-btn]"
				);

				await button.trigger("click");

				const dialogParent = wrapper.find(
					'[data-testid="cancel-migration-dialog-wrapper"]'
				);
				const dialog = dialogParent.findComponent(VCustomDialog);

				dialog.vm.$emit("dialog-confirmed");
				await nextTick();

				expect(router.push).toHaveBeenCalledWith({
					path: "/administration/school-settings",
					query: { openPanels: "migration" },
				});
			});
		});

		describe("in step migration_summary", () => {
			const setup = async () => {
				schoolsModule.setSchool(
					schoolFactory.build({
						inUserMigration: true,
						inMaintenance: true,
					})
				);

				const wrapper = getWrapper();

				wrapper.vm.migrationStep = 3;

				await nextTick();

				return {
					wrapper,
				};
			};

			it("should show cancel button", async () => {
				const { wrapper } = await setup();

				const button = wrapper.findComponent(
					"[data-testid=summary-cancel-migration-btn]"
				);

				expect(button.exists()).toBe(true);
			});
		});
	});

	describe("clear auto matches", () => {
		describe("when in step migration_importUsers", () => {
			beforeEach(() => {
				const dialogTeleportDiv = document.createElement("div");
				dialogTeleportDiv.className = "v-overlay-container";
				document.body.appendChild(dialogTeleportDiv);
			});

			afterEach(() => {
				document.body.innerHTML = "";
				vi.clearAllMocks();
			});

			const setup = async () => {
				schoolsModule.setSchool(
					schoolFactory.build({
						inUserMigration: true,
						inMaintenance: true,
					})
				);

				importUsersModule.setTotal(10);
				importUsersModule.setTotalUnmatched(5);
				importUsersModule.setTotalMatched(5);

				const wrapper = getWrapper();

				vi.spyOn(
					importUsersModule,
					"clearAllAutoMatches"
				).mockResolvedValueOnce(Promise.resolve());

				vi.spyOn(importUsersStub.methods, "reloadData");

				wrapper.vm.migrationStep = 2;
				wrapper.vm.t("pages.administration.migration.title", {
					source: "LDAP",
					instance: $theme.name,
				});

				await nextTick();

				return {
					wrapper,
				};
			};

			it("should show the clear auto matches button", async () => {
				const { wrapper } = await setup();

				const button = wrapper.findComponent(
					'[data-testid="import-users-clear-auto-matches-btn"]'
				);

				expect(button.exists()).toBe(true);
				expect(button.text()).toBe(
					"pages.administration.migration.clearAutoMatches"
				);
			});

			it("should show the dialog on button click", async () => {
				const { wrapper } = await setup();

				const button = wrapper.findComponent(
					'[data-testid="import-users-clear-auto-matches-btn"]'
				);

				await button.trigger("click");

				const dialogParent = wrapper.find(
					'[data-testid="clear-auto-matches-dialog-wrapper"]'
				);
				const dialog = dialogParent.findComponent(VCustomDialog);

				expect(wrapper.vm.isClearAutoMatchesDialogOpen).toBe(true);
				expect(dialog.exists()).toBe(true);
				expect(dialog.vm.isOpen).toBeTruthy();
			});

			it("should display the correct dialog content and text", async () => {
				const { wrapper } = await setup();

				const button = wrapper.findComponent(
					'[data-testid="import-users-clear-auto-matches-btn"]'
				);

				await button.trigger("click");

				expect(document.body.innerHTML).toContain(
					'data-testid="clear-auto-matches-dialog"'
				);
				expect(document.body.innerHTML).toContain(
					"components.administration.adminMigrationSection.clearAutoMatchesDialog.title"
				);
				expect(document.body.innerHTML).toContain(
					"components.administration.adminMigrationSection.clearAutoMatchesDialog.description"
				);
			});

			it("should close the dialog upon clicking on the cancel button", async () => {
				const { wrapper } = await setup();

				const button = wrapper.findComponent(
					'[data-testid="import-users-clear-auto-matches-btn"]'
				);

				await button.trigger("click");

				const dialogParent = wrapper.find(
					'[data-testid="clear-auto-matches-dialog-wrapper"]'
				);
				const dialog = dialogParent.findComponent(VCustomDialog);

				dialog.vm.cancelDialog();
				await nextTick();

				expect(wrapper.vm.isClearAutoMatchesDialogOpen).toBe(false);
				expect(dialog.exists()).toBe(true);
				expect(dialog.vm.isOpen).toBeFalsy();
			});

			it("should call stores, reload data & close dialog upon clicking on the confirm button", async () => {
				const { wrapper } = await setup();

				const button = wrapper.findComponent(
					'[data-testid="import-users-clear-auto-matches-btn"]'
				);

				await button.trigger("click");

				const dialogParent = wrapper.find(
					'[data-testid="clear-auto-matches-dialog-wrapper"]'
				);
				const dialog = dialogParent.findComponent(VCustomDialog);

				dialog.vm.confirmDialog();
				await nextTick();

				expect(importUsersModule.clearAllAutoMatches).toHaveBeenCalled();
				expect(importUsersStub.methods.reloadData).toHaveBeenCalled();
				expect(dialog.vm.isOpen).toBeFalsy();
			});
		});
	});
});
