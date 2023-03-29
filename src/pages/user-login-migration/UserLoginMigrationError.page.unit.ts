import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createModuleMocks } from "@/utils/mock-store-module";
import Vue from "vue";
import EnvConfigModule from "@/store/env-config";
import UserLoginMigrationError from "./UserLoginMigrationError.page.vue";

describe("UserLoginMigrationError", () => {
	let systemsModule: jest.Mocked<SystemsModule>;
	let envConfigModule: jest.Mocked<EnvConfigModule>;

	const setup = (props: { sourceSystem: string; targetSystem: string }) => {
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

		systemsModule = createModuleMocks(SystemsModule, {
			getSystems: systemsMock,
		});
		envConfigModule = createModuleMocks(EnvConfigModule, {
			getAccessibilityReportEmail: "nbc-support@netz-21.de",
		});

		const wrapper: Wrapper<Vue> = mount(
			UserLoginMigrationError as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: {
					systemsModule,
					envConfigModule,
				},
				propsData: props,
				mocks: {
					$t: (key: string, dynamic?: object): string =>
						key + (dynamic ? ` ${JSON.stringify(dynamic)}` : ""),
					$theme: {
						name: "Testcloud",
					},
				},
			}
		);

		return {
			wrapper,
		};
	};

	describe("Rendering", () => {
		describe("when all mandatory props are defined", () => {
			it("should render the component", () => {
				const { wrapper } = setup({
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
				});

				const result: boolean = wrapper
					.findComponent(UserLoginMigrationError)
					.exists();

				expect(result).toEqual(true);
			});
		});

		describe("when the systems are loaded", () => {
			it("should show the description text", () => {
				const { wrapper } = setup({
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
				});

				const descriptionText: string = wrapper
					.find("[data-testId=text-description]")
					.text();

				expect(descriptionText).toEqual(
					'pages.userMigration.error.description {"targetSystem":"targetSystem","instance":"Testcloud","supportLink":"mailto:nbc-support@netz-21.de?subject=Fehler%20bei%20der%20Migration"}'
				);
			});

			it("should show the 'back to login' button", () => {
				const { wrapper } = setup({
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
				});

				const button = wrapper.find("[data-testId=btn-proceed]");

				expect(button.text()).toEqual("pages.userMigration.backToLogin");
				expect(button.props().to).toEqual("/logout");
			});
		});
	});

	describe("Api", () => {
		describe("when mounting the component", () => {
			it("should fetch the systems", () => {
				setup({
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
				});

				expect(systemsModule.fetchSystems).toHaveBeenCalledWith();
			});
		});
	});
});
