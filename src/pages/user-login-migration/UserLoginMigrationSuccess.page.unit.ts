import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createModuleMocks } from "@/utils/mock-store-module";
import Vue from "vue";
import UserLoginMigrationSuccessPage from "./UserLoginMigrationSuccess.page.vue";

describe("UserLoginMigrationSuccess", () => {
	let systemsModule: jest.Mocked<SystemsModule>;

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

		const wrapper: Wrapper<Vue> = mount(
			UserLoginMigrationSuccessPage as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: {
					systemsModule,
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
					.findComponent(UserLoginMigrationSuccessPage)
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
					'pages.userMigration.success.description {"targetSystem":"targetSystem"}'
				);
			});

			it("should show the 'back to login' button", () => {
				const { wrapper } = setup({
					sourceSystem: "sourceSystemId",
					targetSystem: "targetSystemId",
				});

				const button = wrapper.find("[data-testId=btn-proceed]");

				expect(button.text()).toEqual(
					'pages.userMigration.success.login {"targetSystem":"targetSystem"}'
				);
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
