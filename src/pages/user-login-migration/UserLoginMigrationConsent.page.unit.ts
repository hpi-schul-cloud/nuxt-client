import UserLoginMigrationConsent from "@/pages/user-login-migration/UserLoginMigrationConsent.page.vue";
import EnvConfigModule from "@/store/env-config";
import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";
import UserLoginMigrationModule from "@/store/user-login-migrations";
import {
	ENV_CONFIG_MODULE_KEY,
	I18N_KEY,
	SYSTEMS_MODULE_KEY,
	USER_LOGIN_MIGRATION_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { i18nMock } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import {
	MigrationLinks,
	MigrationPageOrigin,
	UserLoginMigration,
} from "@/store/user-login-migration";
import { userLoginMigrationFactory } from "@@/tests/test-utils/factory/userLoginMigration.factory";

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

describe("UserLoginMigrationConsent", () => {
	let systemsModule: jest.Mocked<SystemsModule>;
	let userLoginMigrationModule: jest.Mocked<UserLoginMigrationModule>;
	let envConfigModule: jest.Mocked<EnvConfigModule>;

	const setup = async (props: { origin: string }) => {
		document.body.setAttribute("data-app", "true");
		const targetSystemId = "targetSystemId";
		const systemsMock: System[] = [
			{
				id: "sourceSystemId",
				name: "sourceSystem",
			},
			{
				id: targetSystemId,
				name: "targetSystem",
			},
		];
		const migrationLinksMock: MigrationLinks = {
			proceedLink: "proceedLink",
			cancelLink: "cancelLink",
		};

		systemsModule = createModuleMocks(SystemsModule, {
			getSystems: systemsMock,
		});
		const userLoginMigrationMock: UserLoginMigration =
			userLoginMigrationFactory.build({ targetSystemId });
		userLoginMigrationModule = createModuleMocks(UserLoginMigrationModule, {
			getMigrationLinks: migrationLinksMock,
			getUserLoginMigration: userLoginMigrationMock,
		});
		envConfigModule = createModuleMocks(EnvConfigModule);

		const wrapper: Wrapper<Vue> = mount(
			UserLoginMigrationConsent as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: {
					[SYSTEMS_MODULE_KEY.valueOf()]: systemsModule,
					[USER_LOGIN_MIGRATION_MODULE_KEY.valueOf()]: userLoginMigrationModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
					[I18N_KEY.valueOf()]: i18nMock,
				},
				propsData: props,
				mocks: {
					$t: (key: string, dynamic?: object): string =>
						key + (dynamic ? ` ${JSON.stringify(dynamic)}` : ""),
				},
			}
		);

		return {
			wrapper,
			migrationLinksMock,
		};
	};

	describe("Rendering", () => {
		describe("when all mandatory props are defined", () => {
			it("should render the component", async () => {
				const { wrapper } = await setup({
					origin: "sourceSystemId",
				});

				const result: boolean = wrapper
					.findComponent(UserLoginMigrationConsent)
					.exists();

				expect(result).toEqual(true);
			});
		});

		describe("when origin is equal to sourceSystemId and mandatory is not set", () => {
			it("should show the normal description text", async () => {
				const { wrapper } = await setup({
					origin: "sourceSystemId",
				});

				const descriptionText: string = wrapper
					.find("[data-testId=text-description]")
					.text();

				expect(descriptionText).toEqual(
					'pages.userMigration.description.fromSource {"targetSystem":"targetSystem","startMigration":"pages.userMigration.button.startMigration"}'
				);
			});

			it("should show the proceed migration button", async () => {
				const { wrapper, migrationLinksMock } = await setup({
					origin: "sourceSystemId",
				});

				const button = wrapper.find("[data-testId=btn-proceed]");

				expect(button.text()).toEqual(
					"pages.userMigration.button.startMigration"
				);
				expect(button.props().href).toEqual(migrationLinksMock.proceedLink);
			});

			it("should show the skip migration button", async () => {
				const { wrapper, migrationLinksMock } = await setup({
					origin: "sourceSystemId",
				});

				const button = wrapper.find("[data-testId=btn-cancel]");

				expect(button.text()).toEqual("pages.userMigration.button.skip");
				expect(button.props().to).toEqual(migrationLinksMock.cancelLink);
			});
		});

		describe("when origin is equal to sourceSystemId and when mandatory is set", () => {
			it("should show the mandatory description text", async () => {
				const { wrapper } = await setup({
					origin: "sourceSystemId",
				});

				const descriptionText: string = wrapper
					.find("[data-testId=text-description]")
					.text();

				expect(descriptionText).toEqual(
					'pages.userMigration.description.fromSourceMandatory {"targetSystem":"targetSystem","startMigration":"pages.userMigration.button.startMigration"}'
				);
			});

			it("should show the logout button", async () => {
				const { wrapper, migrationLinksMock } = await setup({
					origin: "sourceSystemId",
				});

				const button = wrapper.find("[data-testId=btn-cancel]");

				expect(button.text()).toEqual("common.actions.logout");
				expect(button.props().to).toEqual(migrationLinksMock.cancelLink);
			});
		});

		describe("when origin is equal to targetSystem", () => {
			it("should show the mandatory description text", async () => {
				const { wrapper } = await setup({
					origin: "targetSystemId",
				});

				const descriptionText: string = wrapper
					.find("[data-testId=text-description]")
					.text();

				expect(descriptionText).toEqual(
					'pages.userMigration.description.fromTarget {"targetSystem":"targetSystem","startMigration":"pages.userMigration.button.startMigration"}'
				);
			});
		});
	});

	describe("Api", () => {
		describe("when origin is equal to sourceSystem", () => {
			it("should call the api to load the migrations links", async () => {
				await setup({
					origin: "sourceSystemId",
				});

				await Vue.nextTick();

				expect(
					userLoginMigrationModule.fetchMigrationLinks
				).toHaveBeenCalledWith({
					pageType: MigrationPageOrigin.START_FROM_SOURCE_SYSTEM,
				});
			});
		});

		describe("when origin is equal to sourceSystem and mandatory is set", () => {
			it("should call the api to load the migrations links", async () => {
				await setup({
					origin: "sourceSystemId",
				});

				await Vue.nextTick();

				expect(
					userLoginMigrationModule.fetchMigrationLinks
				).toHaveBeenCalledWith({
					pageType: MigrationPageOrigin.START_FROM_SOURCE_SYSTEM_MANDATORY,
				});
			});
		});

		describe("when origin is equal to targetSystem", () => {
			it("should call the api to load the migrations links", async () => {
				await setup({
					origin: "targetSystemId",
				});

				await Vue.nextTick();

				expect(
					userLoginMigrationModule.fetchMigrationLinks
				).toHaveBeenCalledWith({
					pageType: MigrationPageOrigin.START_FROM_TARGET_SYSTEM,
				});
			});
		});
	});
});
