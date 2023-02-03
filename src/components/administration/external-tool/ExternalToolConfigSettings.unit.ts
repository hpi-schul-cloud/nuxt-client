import ExternalToolsModule from "@store/external-tools";
import { createModuleMocks } from "@utils/mock-store-module";
import { shallowMount, Wrapper } from "@vue/test-utils";
import ExternalToolConfigSettings from "./ExternalToolConfigSettings.vue";
import createComponentMocks from "../../../../tests/test-utils/componentMocks";
import { provide } from "@vue/composition-api";
import VueI18n from "vue-i18n";
import {
	ToolConfigurationTemplate,
	ToolParameterLocationEnum,
	ToolParameterScopeEnum,
	ToolParameterTypeEnum,
} from "@store/external-tool";

describe("ExternalToolConfigSettings", () => {
	let externalToolsModule: jest.Mocked<ExternalToolsModule>;

	const setup = (
		getter: Partial<ExternalToolsModule> = {},
		template: ToolConfigurationTemplate = new ToolConfigurationTemplate()
	) => {
		document.body.setAttribute("data-app", "true");
		externalToolsModule = createModuleMocks(ExternalToolsModule, {
			getLoading: false,
			...getter,
		}) as jest.Mocked<ExternalToolsModule>;

		const wrapper: Wrapper<any> = shallowMount(ExternalToolConfigSettings, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {
				provide("i18n", { t: (key: string) => key });
				provide("externalToolsModule", externalToolsModule);
			},
			propsData: {
				value: template,
			},
		});

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
		it("should throw an error when externalToolsModule injection fails", () => {
			try {
				shallowMount(ExternalToolConfigSettings);
			} catch (e) {
				expect(
					e.message.includes('Injection "externalToolsModule" not found')
				).toBeTruthy();
			}
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

			const progressbar = wrapper.find(
				".v-progress-linear__indeterminate--active"
			);

			expect(progressbar.exists()).toBeTruthy();
		});

		it("should not display progressbar when loading in store is not set", () => {
			const { wrapper } = setup({
				getLoading: false,
			});

			const progressbar = wrapper.find(
				".v-progress-linear__indeterminate--active"
			);

			expect(progressbar.exists()).toBeFalsy();
		});
	});

	describe("parameters", () => {
		const setupTemplate = (): ToolConfigurationTemplate => {
			const template: ToolConfigurationTemplate =
				new ToolConfigurationTemplate();
			template.parameters = [
				{
					name: "Parameter1",
					type: ToolParameterTypeEnum.String,
					value: undefined,
					isOptional: false,
					scope: ToolParameterScopeEnum.School,
					regex: "[x]",
					location: ToolParameterLocationEnum.Path,
					regexComment: "Kommentar zu regex",
				},
			];
			return template;
		};

		it("should render given toolParameters", () => {
			const template = setupTemplate();
			const { wrapper } = setup({}, template);

			expect(wrapper.findAll("external-tool-parameter-stub").length).toEqual(
				template.parameters.length
			);
		});
	});
});
