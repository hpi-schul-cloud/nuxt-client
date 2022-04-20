import { mount, shallowMount } from "@vue/test-utils";

import migrationIndex from "@pages/administration/migration/index.vue";
import ImportUsersModule from "@store/import-users";
import SchoolsModule from "@store/schools";
import EnvConfigModule from "@/store/env-config";

declare var createComponentMocks: Function;

const $theme = {
	short_name: "instance name",
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(migrationIndex, {
		...createComponentMocks({
			i18n: true,
			vueMeta: true,
			vuetify: true,
			mocks: {
				$theme,
			},
		}),
		propsData: props,
		...options,
	});
};

const getWrapperShallow: any = (props: object, options?: object) => {
	return shallowMount(migrationIndex, {
		...createComponentMocks({
			i18n: true,
			vueMeta: true,
			vuetify: true,
			mocks: { $theme },
		}),
		propsData: props,
		...options,
	});
};

const schoolMock = {
	_id: "5f2987e020834114b8efd6f8",
	name: "Schule_100000",
	fileStorageType: "awsS3",
	federalState: "0000b186816abba584714c53",
	county: {
		antaresKey: "BRB",
		_id: "5fa55eb53f472a2d986c8812",
		countyId: "12051",
		name: "Brandenburg an der Havel",
		id: "5fa55eb53f472a2d986c8812",
	},
	systems: [
		"0000d186816abba584714c91",
		"0000d186816abba584714c90",
		"6204fb6dcd5e9eb7240bc93f",
	],
	updatedAt: "2022-02-10T11:56:22.817Z",
	createdAt: "2017-01-01T00:06:37.148Z",
	__v: 1,
	currentYear: "5ebd6dc14a431f75ec9a3e77",
	purpose: "demo",
	features: {
		rocketChat: true,
		videoconference: false,
		messenger: true,
		studentVisibility: false,
		messengerSchoolRoom: false,
		messengerStudentRoomCreate: false,
	},
	enableStudentTeamCreation: false,
	permissions: { teacher: { STUDENT_LIST: true } },
	officialSchoolNumber: "100000",
	documentBaseDirType: "",
	inMaintenanceSince: "2022-02-10T11:55:50.344Z",
	inUserMigration: true,
	ldapSchoolIdentifier: "100000",
	inMaintenance: true,
	documentBaseDir: "https://s3.hidrive.strato.com/cloud-instances/default/",
	isExternal: true,
	id: "5f2987e020834114b8efd6f8",
	years: {
		schoolYears: [
			{
				_id: "5ebd6dc14a431f75ec9a3e77",
				name: "2021/22",
				startDate: "2021-08-01T00:00:00.000Z",
				endDate: "2022-07-31T00:00:00.000Z",
				__v: 0,
			},
			{
				_id: "5ebd6dc14a431f75ec9a3e78",
				name: "2022/23",
				startDate: "2022-08-01T00:00:00.000Z",
				endDate: "2023-07-31T00:00:00.000Z",
				__v: 0,
			},
		],
		activeYear: {
			_id: "5ebd6dc14a431f75ec9a3e77",
			name: "2021/22",
			startDate: "2021-08-01T00:00:00.000Z",
			endDate: "2022-07-31T00:00:00.000Z",
			__v: 0,
		},
		defaultYear: {
			_id: "5ebd6dc14a431f75ec9a3e77",
			name: "2021/22",
			startDate: "2021-08-01T00:00:00.000Z",
			endDate: "2022-07-31T00:00:00.000Z",
			__v: 0,
		},
		nextYear: {
			_id: "5ebd6dc14a431f75ec9a3e78",
			name: "2022/23",
			startDate: "2022-08-01T00:00:00.000Z",
			endDate: "2023-07-31T00:00:00.000Z",
			__v: 0,
		},
		lastYear: {
			_id: "5d44297075e1502c27e405e2",
			name: "2020/21",
			startDate: "2020-08-01T00:00:00.000Z",
			endDate: "2021-07-31T00:00:00.000Z",
			__v: 0,
		},
	},
	isTeamCreationByStudentsEnabled: false,
};

window.scrollTo = jest.fn();

describe("User Migration / Index", () => {
	beforeAll(() => {
		document.body.setAttribute("data-app", "true");
		EnvConfigModule.getEnv.FEATURE_USER_MIGRATION_ENABLED = true;
		ImportUsersModule.setTotal(100);
	});

	it("should set page title", () => {
		const wrapper = getWrapperShallow();

		const title = wrapper.vm.$i18n.t("pages.administration.migration.title");
		expect(wrapper.vm.$metaInfo.title).toBe(title);
	});

	it("shows business error", () => {
		ImportUsersModule.setBusinessError({
			statusCode: "123",
			message: "foo",
		});
		const wrapper = getWrapper();
		const findText = wrapper.find(".v-snack");
		const errorMsg = wrapper.vm.$i18n.t("pages.administration.migration.error");
		expect(findText.html()).toContain(errorMsg);
	});

	it("shows not show business error, if it is not set", () => {
		ImportUsersModule.setBusinessError(null);
		const wrapper = getWrapper();
		const findText = wrapper.find(".v-snack");
		expect(findText.exists()).toBe(false);
	});

	it("should show info text on step 1", () => {
		const wrapper = getWrapperShallow();
		const findText = wrapper.find("[data-testid=migration_tutorial]");

		expect(findText.element.innerHTML).toMatch(
			/<iframe.*https:\/\/docs\.dbildungscloud\.de\/display\/SCDOK\/Migrationsprozess\?frameable=true.*><\/iframe>/
		);
	});

	describe("Start user migration", () => {
		beforeEach(() => {
			SchoolsModule.setSchool({ ...schoolMock, inUserMigration: undefined });
			ImportUsersModule.setTotal(0);
		});
		afterEach(() => {
			SchoolsModule.setSchool(schoolMock);
			ImportUsersModule.setTotal(100);
		});
		it("should show hint text that sync can take some time", () => {
			const wrapper = getWrapperShallow();
			const tutorialWait = wrapper.vm.$i18n.t(
				"pages.administration.migration.tutorialWait"
			);
			const findText = wrapper.find("[data-testid=migration_tutorial]");

			expect(findText.element.innerHTML).toContain(tutorialWait);
		});
		it("should not be possible to go to other steps, if migration not started", () => {
			const wrapper = getWrapper();

			const stepper = wrapper.find(".stepper");
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

			const btn = wrapper.find("[data-testid=start_user_migration]");
			expect(btn.vm.disabled).toBe(false);
			const nextBtn = wrapper.find("[data-testid=migration_tutorial_next]");
			expect(nextBtn.vm).toBe(undefined);

			ImportUsersModule.setTotal(100);
			SchoolsModule.setSchool({ ...schoolMock, inUserMigration: true });
			await wrapper.vm.$nextTick();

			const btnRemoved = wrapper.find("[data-testid=start_user_migration]");
			expect(btnRemoved.vm).toBe(undefined);

			const nextBtn2 = wrapper.find("[data-testid=migration_tutorial_next]");
			expect(nextBtn2.vm.disabled).toBe(false);
		});
	});

	it("should be possible to click on steps 1-3", async () => {
		SchoolsModule.setSchool(schoolMock);
		const wrapper = getWrapper();

		const stepper = wrapper.find(".stepper");
		expect(stepper.vm.steps[0].editable).toBe(true);
		expect(stepper.vm.steps[0].complete).toBe(false);

		expect(stepper.vm.steps[1].editable).toBe(true);
		expect(stepper.vm.steps[1].complete).toBe(false);

		expect(stepper.vm.steps[2].editable).toBe(true);
		expect(stepper.vm.steps[2].complete).toBe(false);

		expect(stepper.vm.steps[3].editable).toBe(false);
		expect(stepper.vm.steps[3].complete).toBe(false);

		expect(stepper.vm.steps[4].editable).toBe(false);
		expect(stepper.vm.steps[4].complete).toBe(false);
	});

	it("should not be possible to click on steps 2-3 when migration finished", async () => {
		SchoolsModule.setSchool({ ...schoolMock, inUserMigration: false });

		const wrapper = getWrapper();
		const stepper = wrapper.find(".stepper");

		expect(stepper.vm.steps[0].editable).toBe(true);
		expect(stepper.vm.steps[0].complete).toBe(false);

		expect(stepper.vm.steps[1].editable).toBe(false);
		expect(stepper.vm.steps[1].complete).toBe(true);

		expect(stepper.vm.steps[2].editable).toBe(false);
		expect(stepper.vm.steps[2].complete).toBe(true);

		expect(stepper.vm.steps[3].editable).toBe(true);
		expect(stepper.vm.steps[3].complete).toBe(false);

		wrapper.setData({ migrationStep: 1 });
		const btn = wrapper.find("#migration_tutorial_skip");
		btn.trigger("click");
		await wrapper.vm.$nextTick();
		expect(stepper.vm.steps[3].isActive).toBe(true);
	});

	describe("show summary", () => {
		it("should display summary text with totals", async () => {
			SchoolsModule.setSchool(schoolMock);
			const totalImportUsers = 10;
			const totalMatched = 2;
			const totalUnmatched = 4;

			ImportUsersModule.setTotal(totalImportUsers);
			ImportUsersModule.setTotalUnmatched(totalUnmatched);
			ImportUsersModule.setTotalMatched(totalMatched);

			const wrapper = getWrapper();

			const summaryText = wrapper.vm.$i18n.t(
				"pages.administration.migration.summary",
				{
					instance: $theme.short_name,
					source: wrapper.vm.$i18n.t(
						"pages.administration.migration.ldapSource"
					),
					importUsersCount: totalMatched,
					importUsersUnmatchedCount: totalImportUsers - totalMatched,
					usersUnmatchedCount: totalUnmatched,
				}
			);
			const findText = wrapper.find("[data-testid=migration_summary]");
			expect(findText.element.innerHTML).toContain(summaryText);
		});

		it("should disable perform migration button, if confirm not checked", async () => {
			SchoolsModule.setSchool(schoolMock);

			const wrapper = getWrapper();
			const btn = wrapper.find("[data-testid=migration_performMigration]");

			expect(btn.vm.disabled).toBe(true);

			wrapper.setData({ isMigrationConfirm: true });
			await wrapper.vm.$nextTick();
			expect(btn.vm.disabled).toBe(false);
		});

		it("implement perform migration", async () => {
			SchoolsModule.setSchool(schoolMock);

			const performMigrationMock = jest.spyOn(
				ImportUsersModule,
				"performMigration"
			);
			performMigrationMock.mockImplementation(async () => {
				return Promise.resolve() as any;
			});

			const wrapper = getWrapper();
			const btn = wrapper.find("[data-testid=migration_performMigration]");
			wrapper.setData({ migrationStep: 3, isMigrationConfirm: true });
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();
			expect(btn.vm.disabled).toBe(false);

			btn.trigger("click");

			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();
			// TODO after implementing of backend and store, mock store response and expect to be called with
			expect(performMigrationMock).toHaveBeenCalledTimes(1);
			expect(wrapper.vm.migrationStep).toBe(4);
			expect(SchoolsModule.getSchool.inUserMigration).toBe(false);
			expect(wrapper.vm.school.inUserMigration).toBe(false);
		});
	});

	describe("show maintenance/Transferphase", () => {
		let wrapper: any;
		beforeEach(async () => {
			SchoolsModule.setSchool({ ...schoolMock, inUserMigration: false });
			wrapper = getWrapper();
			wrapper.setData({
				migrationStep: 4,
				isMigrationConfirm: true,
			});
			await wrapper.vm.$nextTick();
		});

		it("should show text", async () => {
			const stepperContent = wrapper.find("[data-testid=migration_finish]");
			const endTransferPhase = wrapper.vm.$i18n
				.t("pages.administration.migration.endTransferPhase")
				.replace(/<(.|\n)*?>/g, "");
			expect(stepperContent.element.textContent).toContain(endTransferPhase);
		});

		it("should disable end maintenance button, if confirm not checked", async () => {
			const btn = wrapper.find("[data-testid=migration_endMaintenance]");
			expect(btn.vm.disabled).toBe(true);

			const check = wrapper.find("[data-testid=isMaintenanceConfirm]");
			check.trigger("click");
			await wrapper.vm.$nextTick();
			expect(btn.vm.disabled).toBe(false);
		});

		it("perform end maintenance", async () => {
			const endMaintenanceMock = jest.spyOn(
				SchoolsModule,
				"migrationStartSync"
			);
			endMaintenanceMock.mockImplementation(async () => {
				SchoolsModule.setSchool({
					...SchoolsModule.getSchool,
					inMaintenance: false,
				});
				return Promise.resolve({}) as any;
			});

			wrapper.setData({ isMaintenanceConfirm: true });
			await wrapper.vm.$nextTick();

			const btn = wrapper.find("[data-testid=migration_endMaintenance]");
			btn.trigger("click");

			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();

			expect(endMaintenanceMock).toHaveBeenCalledTimes(1);
			expect(wrapper.vm.migrationStep).toBe(5);
			expect(wrapper.vm.school.inMaintenance).toBe(false);
		});
	});
});
