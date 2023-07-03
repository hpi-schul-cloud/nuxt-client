import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import ExternalToolConfigSettings from "./ExternalToolConfigSettings.vue";
import {
	ToolConfigurationTemplate,
	ToolParameter,
	ToolParameterLocation,
	ToolParameterScope,
	ToolParameterType,
} from "@/store/external-tool";
import ExternalToolsModule from "@/store/external-tools";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import Vue from "vue";
import { toolConfigurationTemplateFactory } from "@@/tests/test-utils/factory";
import { EXTERNAL_TOOLS_MODULE, I18N_KEY } from "@/utils/inject";

describe("ExternalToolConfigSettings", () => {
	let externalToolsModule: jest.Mocked<ExternalToolsModule>;

	const setup = (
		getter: Partial<ExternalToolsModule> = {},
		template: ToolConfigurationTemplate = toolConfigurationTemplateFactory.build()
	) => {
		document.body.setAttribute("data-app", "true");
		externalToolsModule = createModuleMocks(ExternalToolsModule, {
			getLoading: false,
			...getter,
		}) as jest.Mocked<ExternalToolsModule>;

		const wrapper: Wrapper<any> = shallowMount(
			ExternalToolConfigSettings as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: {
					[I18N_KEY as symbol]: { t: (key: string) => key },
					[EXTERNAL_TOOLS_MODULE.valueOf()]: externalToolsModule,
				},
				propsData: {
					value: template,
				},
			}
		);

		return {
			wrapper,
		};
	};

	describe("basic functions", () => {
		it("should render component", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(ExternalToolConfigSettings).exists()).toBe(
				true
			);
		});
	});

	describe("inject", () => {
		describe("when externalToolsModule injection fails", () => {
			it("should throw an error", () => {
				const consoleErrorSpy = jest
					.spyOn(console, "error")
					.mockImplementation();

				try {
					shallowMount(ExternalToolConfigSettings as MountOptions<Vue>);
					// eslint-disable-next-line no-empty
				} catch (e) {}

				expect(consoleErrorSpy).toHaveBeenCalledWith(
					expect.stringMatching(
						/\[Vue warn]: Error in setup: "Error: Injection of dependencies failed"/
					)
				);

				consoleErrorSpy.mockRestore();
			});
		});
	});

	describe("display title", () => {
		it("should display title", () => {
			const { wrapper } = setup();

			const h2 = wrapper.find("h2");

			expect(h2.exists()).toBeTruthy();
		});
	});

	describe("progressbar", () => {
		it("should display progressbar when loading in store is set", () => {
			const { wrapper } = setup({
				getLoading: true,
			});

			const progressbar = wrapper.find("v-progress-linear-stub");

			expect(progressbar.attributes().active).toBeTruthy();
		});

		it("should not display progressbar when loading in store is not set", () => {
			const { wrapper } = setup({
				getLoading: false,
			});

			const progressbar = wrapper.find("v-progress-linear-stub");

			expect(progressbar.attributes().active).toBeFalsy();
		});
	});

	describe("parameters", () => {
		const setupTemplate = (): ToolConfigurationTemplate => {
			const template: ToolConfigurationTemplate =
				toolConfigurationTemplateFactory.build();
			const param1: ToolParameter = {
				name: "Parameter1",
				displayName: "Parameter 1",
				type: ToolParameterType.String,
				isOptional: false,
				scope: ToolParameterScope.School,
				location: ToolParameterLocation.PATH,
			};
			template.parameters = [param1, { ...param1, name: "Param2" }];
			return template;
		};

		it("should render given toolParameters", () => {
			const template = setupTemplate();
			const { wrapper } = setup({}, template);

			expect(
				wrapper.findAll("external-tool-config-parameter-stub").length
			).toEqual(template.parameters.length);
		});
	});
});
