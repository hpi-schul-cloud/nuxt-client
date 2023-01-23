import UserMigration from "@pages/user-migration/UserMigration.page.vue";
import SystemsModule from "@store/systems";
import { ApplicationError } from "@store/types/application-error";
import { System } from "@store/types/system";
import {
	MigrationLinks,
	MigrationPageOrigin,
} from "@store/types/user-migration";
import UserMigrationModule from "@store/user-migration";
import { shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { provide } from "@vue/composition-api";
import { createModuleMocks } from "@utils/mock-store-module";
import Vue from "vue";

describe("UserMigration", () => {
	let systemsModule: jest.Mocked<SystemsModule>;
	let userMigrationModule: jest.Mocked<UserMigrationModule>;

	const setup = (props: object) => {
		Vue.config.silent = true;
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
		}) as jest.Mocked<SystemsModule>;
		userMigrationModule = createModuleMocks(UserMigrationModule, {
			getMigrationLinks: migrationLinksMock,
		}) as jest.Mocked<UserMigrationModule>;

		const wrapper: Wrapper<any> = shallowMount(UserMigration, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {
				provide("systemsModule", systemsModule);
				provide("userMigrationModule", userMigrationModule);
			},
			propsData: props,
			mocks: {
				$t: (key: string, props?: object): string =>
					key + (props ? ` ${JSON.stringify(props)}` : ""),
			},
		});

		return {
			wrapper,
			migrationLinksMock,
		};
	};

	describe("Prop validation", () => {
		describe("when prop sourceSystem is missing", () => {
			it("should throw an error", () => {
				const func = () =>
					setup({
						targetSystem: "targetSystemId",
						origin: "sourceSystemId",
					});

				expect(func).toThrow("ApplicationError");
			});
		});

		describe("when prop targetSystem is missing", () => {
			it("should throw an error", () => {
				const func = () =>
					setup({
						sourceSystem: "sourceSystemId",
						origin: "sourceSystemId",
					});

				expect(func).toThrow("ApplicationError");
			});
		});

		describe("when prop origin is missing", () => {
			it("should throw an error", () => {
				const func = () =>
					setup({
						sourceSystem: "sourceSystemId",
						targetSystem: "targetSystemId",
					});

				expect(func).toThrow("ApplicationError");
			});
		});
	});

	describe("Injection", () => {
		describe("when injection userMigrationModule is missing", () => {
			it("should throw an error", () => {
				const func = () =>
					shallowMount(UserMigration, {
						...createComponentMocks({
							i18n: true,
						}),
						setup() {
							provide("systemsModule", systemsModule);
						},
						propsData: {
							sourceSystem: "sourceSystemId",
							targetSystem: "targetSystemId",
							origin: "sourceSystemId",
						},
					});

				expect(func).toThrow(
					"ApplicationError: Injection of dependencies failed"
				);
			});
		});

		describe("when injection systemsModule is missing", () => {
			it("should throw an error", () => {
				const func = () =>
					shallowMount(UserMigration, {
						...createComponentMocks({
							i18n: true,
						}),
						setup() {
							provide("userMigrationModule", userMigrationModule);
						},
						propsData: {
							sourceSystem: "sourceSystemId",
							targetSystem: "targetSystemId",
							origin: "sourceSystemId",
						},
					});

				expect(func).toThrow(
					"ApplicationError: Injection of dependencies failed"
				);
			});
		});
	});

	describe("Rendering", () => {
		describe("when all mandatory props are defined", () => {
			it("should render the component", () => {
				const { wrapper } = setup({
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
					origin: "sourceSystemId",
				});

				const result: boolean = wrapper.findComponent(UserMigration).exists();

				expect(result).toEqual(true);
			});
		});

		describe("when mandatory is not set", () => {
			it("should show the normal description text", () => {
				const { wrapper } = setup({
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
					origin: "sourceSystemId",
				});

				const descriptionText: string = wrapper
					.find("[data-testId=text-description]")
					.text();

				expect(descriptionText).toEqual(
					'pages.userMigration.description {"sourceSystem":"sourceSystem","targetSystem":"targetSystem"}'
				);
			});

			it("should show the proceed migration button", () => {
				const { wrapper, migrationLinksMock } = setup({
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

			it("should show the skip migration button", () => {
				const { wrapper, migrationLinksMock } = setup({
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
					origin: "sourceSystemId",
				});

				const button = wrapper.find("[data-testId=btn-cancel]");

				expect(button.text()).toEqual("pages.userMigration.button.skip");
				expect(button.props().to).toEqual(migrationLinksMock.cancelLink);
			});
		});

		describe("when mandatory is set", () => {
			it("should show the mandatory description text", () => {
				const { wrapper } = setup({
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
					origin: "sourceSystemId",
					mandatory: true,
				});

				const descriptionText: string = wrapper
					.find("[data-testId=text-description]")
					.text();

				expect(descriptionText).toEqual(
					'pages.userMigration.descriptionMandatory {"sourceSystem":"sourceSystem","targetSystem":"targetSystem"}'
				);
			});

			it("should show the logout button", () => {
				const { wrapper, migrationLinksMock } = setup({
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
					origin: "sourceSystemId",
					mandatory: true,
				});

				const button = wrapper.find("[data-testId=btn-cancel]");

				expect(button.text()).toEqual("pages.userMigration.button.logout");
				expect(button.props().to).toEqual(migrationLinksMock.cancelLink);
			});
		});
	});

	describe("Api", () => {
		describe("when origin is equal to sourceSystem", () => {
			it("should call the api to load the migrations links", () => {
				setup({
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
					origin: "sourceSystemId",
				});

				expect(userMigrationModule.fetchMigrationLinks).toHaveBeenCalledWith({
					pageType: MigrationPageOrigin.START_FROM_SOURCE_SYSTEM,
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
				});
			});
		});

		describe("when origin is equal to sourceSystem and mandatory is set", () => {
			it("should call the api to load the migrations links", () => {
				setup({
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
					origin: "sourceSystemId",
					mandatory: true,
				});

				expect(userMigrationModule.fetchMigrationLinks).toHaveBeenCalledWith({
					pageType: MigrationPageOrigin.START_FROM_SOURCE_SYSTEM_MANDATORY,
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
				});
			});
		});

		describe("when origin is equal to targetSystem", () => {
			it("should call the api to load the migrations links", () => {
				setup({
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
					origin: "targetSystemId",
				});

				expect(userMigrationModule.fetchMigrationLinks).toHaveBeenCalledWith({
					pageType: MigrationPageOrigin.START_FROM_TARGET_SYSTEM,
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
				});
			});
		});

		describe("when origin does not equal the sourceSystem or targetSystem", () => {
			it("should throw an error", () => {
				const func = () =>
					setup({
						sourceSystem: "sourceSystemId",
						targetSystem: "targetSystemId",
						origin: "otherId",
					});

				expect(func).toThrow("Unknown origin system");
			});
		});
	});
});
