import ExternalToolsModule from "@store/external-tools";
import { createModuleMocks } from "@utils/mock-store-module";
import { createLocalVue, mount, shallowMount, Wrapper } from "@vue/test-utils";
import ExternalToolConfigSettings from "./ExternalToolConfigSettings.vue";
import createComponentMocks from "../../../../tests/test-utils/componentMocks";
import { provide } from "@vue/composition-api";
import VueI18n from "vue-i18n";
import {
	ToolConfigurationTemplate,
	ToolParameter,
	ToolParameterLocationEnum,
	ToolParameterScopeEnum,
	ToolParameterTypeEnum,
} from "@store/external-tool";
import Vuetify from "vuetify";

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

		const wrapper: Wrapper<any> = mount(ExternalToolConfigSettings, {
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
		it("should throw an error when schoolsModule injection fails", () => {
			try {
				shallowMount(ExternalToolConfigSettings, {
					setup() {
						provide("i18n", VueI18n);
					},
				});
			} catch (e) {
				expect(
					e.message.includes('Injection "externalToolsModule" not found')
				).toBeTruthy();
			}
		});

		it("should throw an error when i18n injection fails", () => {
			try {
				shallowMount(ExternalToolConfigSettings, {
					setup() {
						provide("externalToolsModule", ExternalToolsModule);
					},
					propsData: {
						toolParameters: [],
					},
				});
			} catch (e) {
				expect(e.message.includes('Injection "i18n" not found')).toBeTruthy();
			}
		});
	});

	describe("t", () => {
		it("should return translation", () => {
			const { wrapper } = setup({});
			const testKey = "testKey";

			const result: string = wrapper.vm.t(testKey);

			expect(result).toEqual(testKey);
		});

		it("should return 'unknown translation-key'", () => {
			const { wrapper } = setup({});
			const testKey = 123;

			const result: string = wrapper.vm.t(testKey);

			expect(result.includes("unknown translation-key:")).toBeTruthy();
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
				{
					name: "Parameter2",
					type: ToolParameterTypeEnum.Boolean,
					value: undefined,
					isOptional: true,
					scope: ToolParameterScopeEnum.School,
					location: ToolParameterLocationEnum.Path,
				},
			];
			return template;
		};

		it("should render given toolParameters", () => {
			const template = setupTemplate();
			const { wrapper } = setup({}, template);

			template.parameters.forEach((param: ToolParameter) =>
				expectParameter(wrapper, param)
			);
		});

		it("should emit event on value change", async () => {
			const template = setupTemplate();
			const requiredParam = template.parameters[0];
			const { wrapper } = setup({}, template);

			const input = wrapper.find(`[data-testId=${requiredParam.name}]`);
			input.setValue("notValidRegex");
			wrapper.find("form").trigger("submit");
			await wrapper.vm.$nextTick();

			expect(wrapper.find("transition-group-stub").exists()).toBeTruthy();
			expect(wrapper.emitted("update:value")).toBeTruthy();
		});

		const expectParameter = (wrapper: Wrapper<any>, param: ToolParameter) => {
			if (ToolParameterTypeEnum.String === param.type) {
				const textfield = wrapper.find(".v-text-field__slot");
				textfield.find("input[type=text]");
			} else if (ToolParameterTypeEnum.Boolean === param.type) {
				const checkbox = wrapper.find(".v-input--checkbox");
				checkbox.find("input[type=checkbox]");
			}
			wrapper
				.text()
				.includes(param.isOptional ? param.name : `${param.name} *`);
		};
	});
});
