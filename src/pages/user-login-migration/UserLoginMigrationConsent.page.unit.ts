import UserLoginMigrationConsent from "@/pages/user-login-migration/UserLoginMigrationConsent.page.vue";
import SystemsModule from "@/store/systems";
import UserLoginMigrationModule from "@/store/user-login-migration";
import { System } from "@/store/types/system";
import {
	MigrationLinks,
	MigrationPageOrigin,
} from "@/store/types/user-login-migration";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createModuleMocks } from "@/utils/mock-store-module";
import Vue from "vue";

describe("UserLoginMigrationConsent", () => {
	let systemsModule: jest.Mocked<SystemsModule>;
	let userLoginMigrationModule: jest.Mocked<UserLoginMigrationModule>;

	const setup = async (props: object) => {
		document.body.setAttribute("data-app", "true");
		const systemsMock: System[] = [
			{
				id: "sourceSystemId",
				name: "sourceSystem",
			},
			{
				id: "targetSystemId",
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
		userLoginMigrationModule = createModuleMocks(UserLoginMigrationModule, {
			getMigrationLinks: migrationLinksMock,
		});

		const wrapper: Wrapper<Vue> = mount(
			UserLoginMigrationConsent as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: {
					systemsModule,
					userLoginMigrationModule,
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
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
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
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
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
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
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
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
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
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
					origin: "sourceSystemId",
					mandatory: true,
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
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
					origin: "sourceSystemId",
					mandatory: true,
				});

				const button = wrapper.find("[data-testId=btn-cancel]");

				expect(button.text()).toEqual("common.actions.logout");
				expect(button.props().to).toEqual(migrationLinksMock.cancelLink);
			});
		});

		describe("when origin is equal to targetSystem", () => {
			it("should show the mandatory description text", async () => {
				const { wrapper } = await setup({
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
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
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
					origin: "sourceSystemId",
				});

				expect(
					userLoginMigrationModule.fetchMigrationLinks
				).toHaveBeenCalledWith({
					pageType: MigrationPageOrigin.START_FROM_SOURCE_SYSTEM,
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
				});
			});
		});

		describe("when origin is equal to sourceSystem and mandatory is set", () => {
			it("should call the api to load the migrations links", async () => {
				await setup({
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
					origin: "sourceSystemId",
					mandatory: true,
				});

				expect(
					userLoginMigrationModule.fetchMigrationLinks
				).toHaveBeenCalledWith({
					pageType: MigrationPageOrigin.START_FROM_SOURCE_SYSTEM_MANDATORY,
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
				});
			});
		});

		describe("when origin is equal to targetSystem", () => {
			it("should call the api to load the migrations links", async () => {
				await setup({
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
					origin: "targetSystemId",
				});

				expect(
					userLoginMigrationModule.fetchMigrationLinks
				).toHaveBeenCalledWith({
					pageType: MigrationPageOrigin.START_FROM_TARGET_SYSTEM,
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
				});
			});
		});
	});
});
