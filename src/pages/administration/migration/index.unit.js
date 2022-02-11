import Vuetify from "vuetify";
import migrationIndex from "./index";
import ImportUsersModule from '@store/import-users';
import SchoolsModule from '@store/schools';

describe("User Migration / Index", () => {
	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(migrationIndex));

	it("should set page title", () => {
		const wrapper = shallowMount(migrationIndex, {
			...createComponentMocks({
				i18n: true,
				vueMeta: true,
			}),
			vuetify,
		});

		const title = wrapper.vm.$i18n.t("pages.administration.migration.title");
		expect(wrapper.vm.$metaInfo.title).toBe(title);
	});

	it('shows business error', () => {
		ImportUsersModule.setBusinessError({
			statusCode: '123',
			message: 'foo'
		});
		const wrapper = mount(migrationIndex, {
			...createComponentMocks({
				i18n: true,
				vueMeta: true,
			}),
			vuetify,
		});
		const findText = wrapper.find(".v-snack");
		const errorMsg = wrapper.vm.$i18n.t("pages.administration.migration.error");
		expect(findText.html()).toContain(errorMsg);
	});

	it('shows not show business error, if it is not set', () => {
		ImportUsersModule.setBusinessError(null);
		const wrapper = mount(migrationIndex, {
			...createComponentMocks({
				i18n: true,
				vueMeta: true,
			}),
			vuetify,
		});
		const findText = wrapper.find(".v-snack");
		expect(findText.exists()).toBe(false);
	});

	it("should show info text", () => {
		const wrapper = shallowMount(migrationIndex, {
			...createComponentMocks({
				i18n: true,
				vueMeta: true,
			}),
			vuetify,
		});

		const tutorial = wrapper.vm.$i18n.t(
			"pages.administration.migration.tutorial",
			{
				instance: "dBildungscloud",
				source: wrapper.vm.$i18n.t("pages.administration.migration.ldapSource"),
			}
		);
		const findText = wrapper.find("[data-testid=migration_tutorial]");

		expect(findText.element.innerHTML).toContain(tutorial);
	});

	it.todo('check stepper steps');

	describe('show summary', () => {
		it("should display summary text with totals", () => {
			const schoolMock = {
				_id: "5f2987e020834114b8efd6f8",
				officialSchoolNumber: "100000",
				inMaintenance: true,
				inUserMigration: true,
			};
			SchoolsModule.setSchool(schoolMock);
			const $theme = {
				short_name: "test",
			};
			const totalImportUsers = 10;
			const totalMatched = 2;
			const totalUnmatched = 4;
			const importUsersListMock = {
				data: [],
				total: totalImportUsers,
				skip: 0,
				limit: 1,
			};
			ImportUsersModule.setTotalUnmatched(totalUnmatched);
			ImportUsersModule.setTotalMatched(totalMatched);
			ImportUsersModule.setImportUsersList(importUsersListMock);
			const wrapper = mount(migrationIndex, {
				...createComponentMocks({
					i18n: true,
					vueMeta: true,
					mocks: { $theme }
				}),
				vuetify,
			});

			const summaryText = wrapper.vm.$i18n.t(
				'pages.administration.migration.summary', {
					instance: $theme.short_name,
					source: wrapper.vm.$i18n.t('pages.administration.migration.ldapSource'),
					importUsersCount: totalImportUsers,
					importUsersUnmatchedCount: totalUnmatched,
					usersUnmatchedCount: totalMatched,
				}
			);
			const findText = wrapper.find("[data-testid=migration_summary]");
			expect(findText.html().replace(/\s/g, "")).toContain(summaryText.replace(/\s/g, ""));
		});

		it('should disable perform migration button, if confirm not checked', async () => {
			const schoolMock = {
				_id: "5f2987e020834114b8efd6f8",
				officialSchoolNumber: "100000",
				inMaintenance: true,
				inUserMigration: true,
			};
			SchoolsModule.setSchool(schoolMock);

			const wrapper = mount(migrationIndex, {
				...createComponentMocks({
					i18n: true,
					vueMeta: true,
				}),
				vuetify,
			});
			const btn = wrapper.find('[data-testid=migration_performMigration]');

			expect(btn.vm.disabled).toBe(true);

			wrapper.setData({ isMigrationConfirm: true });
			await wrapper.vm.$nextTick();
			expect(btn.vm.disabled).toBe(false);
		});
	});

});
