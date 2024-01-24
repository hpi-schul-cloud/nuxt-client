import migrationIndex from "@/pages/administration/Migration.page.vue";
import { envConfigModule, importUsersModule, schoolsModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import ImportUsersModule from "@/store/import-users";
import SchoolsModule from "@/store/schools";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount, shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import { VBtn } from "vuetify/lib/components/index.mjs";

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

const $theme = {
	name: "instance name",
};

const getWrapper = (props = {}, options?: object) => {
	return mount(migrationIndex, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			mocks: { $theme },
		},
		props,
		...options,
	});
};

const getWrapperShallow = (props = {}, options?: object) => {
	return shallowMount(migrationIndex, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			mocks: { $theme },
		},
		props,
		...options,
	});
};

const schoolMock = {
	id: "5f2987e020834114b8efd6f8",
	name: "Schule_100000",
	fileStorageType: "awsS3",
	federalState: {
		id: "0000b186816abba584714c53",
		counties: [],
		name: "",
		abbreviation: "",
		logoUrl: "",
	},
	logo_name: "Schule_logo",
	county: {
		id: "5fa55eb53f472a2d986c8812",
		antaresKey: "BRB",
		countyId: 12051,
		name: "Brandenburg an der Havel",
	},
	updatedAt: "2022-02-10T11:56:22.817Z",
	createdAt: "2017-01-01T00:06:37.148Z",
	currentYear: {
		id: "5ebd6dc14a431f75ec9a3e77",
		name: "2021/22",
		startDate: "2021-08-01T00:00:00.000Z",
		endDate: "2022-07-31T00:00:00.000Z",
	},
	purpose: "demo",
	features: {
		rocketChat: true,
		videoconference: false,
		studentVisibility: false,
		ldapUniventionMigrationSchool: false,
		showOutdatedUsers: false,
		enableLdapSyncDuringMigration: false,
		isTeamCreationByStudentsEnabled: false,
		nextcloud: false,
		oauthProvisioningEnabled: false,
	},
	permissions: { teacher: { STUDENT_LIST: true } },
	officialSchoolNumber: "100000",
	inUserMigration: true,
	inMaintenance: true,
	isExternal: true,
	systemIds: [],
	years: {
		schoolYears: [
			{
				id: "5ebd6dc14a431f75ec9a3e77",
				name: "2021/22",
				startDate: "2021-08-01T00:00:00.000Z",
				endDate: "2022-07-31T00:00:00.000Z",
			},
			{
				id: "5ebd6dc14a431f75ec9a3e78",
				name: "2022/23",
				startDate: "2022-08-01T00:00:00.000Z",
				endDate: "2023-07-31T00:00:00.000Z",
			},
		],
		activeYear: {
			id: "5ebd6dc14a431f75ec9a3e77",
			name: "2021/22",
			startDate: "2021-08-01T00:00:00.000Z",
			endDate: "2022-07-31T00:00:00.000Z",
		},
		nextYear: {
			id: "5ebd6dc14a431f75ec9a3e78",
			name: "2022/23",
			startDate: "2022-08-01T00:00:00.000Z",
			endDate: "2023-07-31T00:00:00.000Z",
		},
		lastYear: {
			id: "5d44297075e1502c27e405e2",
			name: "2020/21",
			startDate: "2020-08-01T00:00:00.000Z",
			endDate: "2021-07-31T00:00:00.000Z",
		},
	},
};

window.scrollTo = jest.fn();

describe("User Migration / Index", () => {
	beforeAll(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
			importUsersModule: ImportUsersModule,
			schoolsModule: SchoolsModule,
		});

		envConfigModule.getEnv.FEATURE_USER_MIGRATION_ENABLED = true;
		envConfigModule.getEnv.SC_THEME = "default";
		importUsersModule.setTotal(100);
	});

	it("should set page title", () => {
		const wrapper = getWrapperShallow();

		const title = wrapper.vm.$t("pages.administration.migration.title", {
			source: "LDAP",
			instance: $theme.name,
		});
		expect(document.title).toBe(title);
	});

	it("shows business error", () => {
		importUsersModule.setBusinessError({
			statusCode: "123",
			message: "foo",
		});
		const wrapper = getWrapper();
		const findText = document.querySelector(".v-snackbar__content");
		const errorMsg = wrapper.vm.$t("pages.administration.migration.error");
		expect(findText?.textContent).toContain(errorMsg);
	});

	it("shows not show business error, if it is not set", () => {
		importUsersModule.setBusinessError(null);
		const wrapper = getWrapper();
		const snackbar = wrapper.findComponent({ name: "v-snackbar" });
		expect(snackbar.exists()).toBe(false);
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
			schoolsModule.setSchool({ ...schoolMock, inUserMigration: undefined });
			importUsersModule.setTotal(0);
		});
		afterEach(() => {
			schoolsModule.setSchool(schoolMock);
			importUsersModule.setTotal(100);
		});
		it("should show hint text that sync can take some time", () => {
			const wrapper = getWrapperShallow();
			const tutorialWait = wrapper.vm.$t(
				"pages.administration.migration.tutorialWait"
			);
			const findText = wrapper.find("[data-testid=migration_tutorial]");

			expect(findText.element.innerHTML).toContain(tutorialWait);
		});

		it("should not be possible to go to other steps, if migration not started", () => {
			const wrapper = getWrapper();

			const stepper = wrapper.findComponent({ name: "v-stepper" });
			expect(stepper.vm.steps[1].editable).toBe(false);
			expect(stepper.vm.steps[1].complete).toBe(false);
			expect(stepper.vm.steps[2].editable).toBe(false);
			expect(stepper.vm.steps[2].complete).toBe(false);
			expect(stepper.vm.steps[3].editable).toBe(false);
			expect(stepper.vm.steps[3].complete).toBe(false);
			expect(stepper.vm.steps[4].editable).toBe(false);
			expect(stepper.vm.steps[4].complete).toBe(false);
		});
		it("should show button for start inUserMigration", async () => {
			const wrapper = getWrapper();

			const btn = wrapper.findComponent<typeof VBtn>(
				"[data-testid=start_user_migration]"
			);
			expect(btn.vm.disabled).toBe(false);
			const nextBtn = wrapper.findComponent<typeof VBtn>(
				"[data-testid=migration_tutorial_next]"
			);
			expect(nextBtn.vm).toBe(undefined);

			importUsersModule.setTotal(100);
			schoolsModule.setSchool({ ...schoolMock, inUserMigration: true });
			await nextTick();

			const btnRemoved = wrapper.findComponent<typeof VBtn>(
				"[data-testid=start_user_migration]"
			);
			expect(btnRemoved.vm).toBe(undefined);

			const nextBtn2 = wrapper.findComponent<typeof VBtn>(
				"[data-testid=migration_tutorial_next]"
			);
			expect(nextBtn2.vm.disabled).toBe(false);
		});
	});

	// it("should be possible to click on steps 1-3", async () => {
	// 	schoolsModule.setSchool(schoolMock);
	// 	const wrapper = getWrapper();

	// 	const stepper = wrapper.find(".stepper");
	// 	expect(stepper.vm.steps[0].editable).toBe(true);
	// 	expect(stepper.vm.steps[0].complete).toBe(false);

	// 	expect(stepper.vm.steps[1].editable).toBe(true);
	// 	expect(stepper.vm.steps[1].complete).toBe(false);

	// 	expect(stepper.vm.steps[2].editable).toBe(true);
	// 	expect(stepper.vm.steps[2].complete).toBe(false);

	// 	expect(stepper.vm.steps[3].editable).toBe(false);
	// 	expect(stepper.vm.steps[3].complete).toBe(false);

	// 	expect(stepper.vm.steps[4].editable).toBe(false);
	// 	expect(stepper.vm.steps[4].complete).toBe(false);
	// });

	// it("should not be possible to click on steps 2-3 when migration finished", async () => {
	// 	schoolsModule.setSchool({ ...schoolMock, inUserMigration: false });

	// 	const wrapper = getWrapper();
	// 	const stepper = wrapper.find(".stepper");

	// 	expect(stepper.vm.steps[0].editable).toBe(true);
	// 	expect(stepper.vm.steps[0].complete).toBe(false);

	// 	expect(stepper.vm.steps[1].editable).toBe(false);
	// 	expect(stepper.vm.steps[1].complete).toBe(true);

	// 	expect(stepper.vm.steps[2].editable).toBe(false);
	// 	expect(stepper.vm.steps[2].complete).toBe(true);

	// 	expect(stepper.vm.steps[3].editable).toBe(true);
	// 	expect(stepper.vm.steps[3].complete).toBe(false);

	// 	wrapper.setData({ migrationStep: 1 });
	// 	const btn = wrapper.find("#migration_tutorial_skip");
	// 	btn.trigger("click");
	// 	await nextTick();
	// 	expect(stepper.vm.steps[3].isActive).toBe(true);
	// });

	// describe("show summary", () => {
	// 	it("should display summary text with totals", async () => {
	// 		schoolsModule.setSchool(schoolMock);
	// 		const totalImportUsers = 10;
	// 		const totalMatched = 2;
	// 		const totalUnmatched = 4;

	// 		importUsersModule.setTotal(totalImportUsers);
	// 		importUsersModule.setTotalUnmatched(totalUnmatched);
	// 		importUsersModule.setTotalMatched(totalMatched);

	// 		const wrapper = getWrapper();

	// 		const summaryText = wrapper.vm.$t(
	// 			"pages.administration.migration.summary",
	// 			{
	// 				instance: $theme.name,
	// 				source: wrapper.vm.$t("pages.administration.migration.ldapSource"),
	// 				importUsersCount: totalMatched,
	// 				importUsersUnmatchedCount: totalImportUsers - totalMatched,
	// 				usersUnmatchedCount: totalUnmatched,
	// 			}
	// 		);
	// 		const findText = wrapper.find("[data-testid=migration_summary]");
	// 		expect(findText.element.innerHTML).toContain(summaryText);
	// 	});

	// 	it("should disable perform migration button, if confirm not checked", async () => {
	// 		schoolsModule.setSchool(schoolMock);

	// 		const wrapper = getWrapper();
	// 		const btn = wrapper.findComponent(
	// 			"[data-testid=migration_performMigration]"
	// 		) as VueWrapper<VBtn>;

	// 		expect(btn.vm.disabled).toBe(true);

	// 		wrapper.setData({ isMigrationConfirm: true });
	// 		await nextTick();
	// 		expect(btn.vm.disabled).toBe(false);
	// 	});

	// 	it("implement perform migration", async () => {
	// 		schoolsModule.setSchool(schoolMock);

	// 		const performMigrationMock = jest.spyOn(
	// 			importUsersModule,
	// 			"performMigration"
	// 		);
	// 		performMigrationMock.mockImplementation(async () => {
	// 			return Promise.resolve();
	// 		});

	// 		const wrapper = getWrapper();
	// 		const btn = wrapper.findComponent(
	// 			"[data-testid=migration_performMigration]"
	// 		) as VueWrapper<VBtn>;
	// 		wrapper.setData({ migrationStep: 3, isMigrationConfirm: true });
	// 		await nextTick();
	// 		await nextTick();
	// 		expect(btn.vm.disabled).toBe(false);

	// 		btn.trigger("click");

	// 		await nextTick();
	// 		await nextTick();
	// 		// TODO after implementing of backend and store, mock store response and expect to be called with
	// 		expect(performMigrationMock).toHaveBeenCalledTimes(1);
	// 		expect(wrapper.vm.migrationStep).toBe(4);
	// 		expect(schoolsModule.getSchool.inUserMigration).toBe(false);
	// 		expect(wrapper.vm.school.inUserMigration).toBe(false);
	// 	});
	// });

	// describe("show maintenance/Transferphase", () => {
	// 	let wrapper: any;
	// 	beforeEach(async () => {
	// 		schoolsModule.setSchool({ ...schoolMock, inUserMigration: false });
	// 		wrapper = getWrapper();
	// 		wrapper.setData({
	// 			migrationStep: 4,
	// 			isMigrationConfirm: true,
	// 		});
	// 		await nextTick();
	// 	});

	// 	it("should show text", async () => {
	// 		const stepperContent = wrapper.find("[data-testid=migration_finish]");

	// 		expect(stepperContent.element.textContent).toContain(
	// 			wrapper.vm.$t(
	// 				"pages.administration.migration.step4.linkingFinished",
	// 				{
	// 					source: "LDAP",
	// 					instance: $theme.name,
	// 				}
	// 			)
	// 		);
	// 	});

	// 	it("perform end maintenance", async () => {
	// 		const endMaintenanceMock = jest.spyOn(
	// 			schoolsModule,
	// 			"migrationStartSync"
	// 		);
	// 		endMaintenanceMock.mockImplementation(async () => {
	// 			schoolsModule.setSchool({
	// 				...schoolsModule.getSchool,
	// 				inMaintenance: false,
	// 			});
	// 			return Promise.resolve({}) as any;
	// 		});

	// 		const btn = wrapper.find("[data-testid=migration_endMaintenance]");
	// 		btn.trigger("click");

	// 		await nextTick();
	// 		await nextTick();

	// 		expect(endMaintenanceMock).toHaveBeenCalledTimes(1);
	// 		expect(wrapper.vm.migrationStep).toBe(5);
	// 		expect(wrapper.vm.school.inMaintenance).toBe(false);
	// 	});
	// });
});
