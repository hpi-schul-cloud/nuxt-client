import {
	ToolParameter,
	ToolParameterLocationEnum,
	ToolParameterScopeEnum,
	ToolParameterTypeEnum,
} from "@/store/external-tool";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import ExternalToolConfigParameter from "@/components/administration/external-tool/ExternalToolConfigParameter.vue";
import { mount, MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";

describe("ExternalToolConfigParameter", () => {
	let wrapper: Wrapper<any>;

	const setup = (parameter: ToolParameter = setupToolParameter()) => {
		document.body.setAttribute("data-app", "true");

		wrapper = mount(ExternalToolConfigParameter as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				i18n: { t: (key: string) => key },
			},
			propsData: {
				value: parameter,
			},
		});
	};

	const setupToolParameter = (): ToolParameter => {
		return {
			value: undefined,
			default: undefined,
			scope: ToolParameterScopeEnum.School,
			type: ToolParameterTypeEnum.String,
			location: ToolParameterLocationEnum.Path,
			name: "Parameter1",
			isOptional: true,
		};
	};

	describe("inject", () => {
		describe("when i18n injection fails", () => {
			it("should throw an error", () => {
				const consoleErrorSpy = jest
					.spyOn(console, "error")
					.mockImplementation();

				try {
					shallowMount(ExternalToolConfigParameter as MountOptions<Vue>);
					// eslint-disable-next-line no-empty
				} catch (e) {}

				expect(consoleErrorSpy).toHaveBeenCalledWith(
					expect.stringMatching(
						/\[Vue warn\]: Error in setup: "Error: Injection of dependencies failed"/
					)
				);

				consoleErrorSpy.mockRestore();
			});
		});
	});

	describe("when component is used", () => {
		it("should be found in the dom", () => {
			setup();

			expect(
				wrapper.findComponent(ExternalToolConfigParameter).exists()
			).toBeTruthy();
		});
	});

	describe("when parameter has type boolean", () => {
		it("should render a tri state select", () => {
			const parameter: ToolParameter = setupToolParameter();
			parameter.type = ToolParameterTypeEnum.Boolean;
			setup(parameter);

			expect(wrapper.find(".v-select__slot"));
		});

		it("should set default when parameter has no value", () => {
			const parameter: ToolParameter = setupToolParameter();
			parameter.type = ToolParameterTypeEnum.Boolean;
			parameter.value = undefined;
			setup(parameter);

			expect(wrapper.find(".v-select__selection").text()).toEqual(
				"common.words.noChoice"
			);
		});

		it("should set value from parameter", () => {
			const parameter: ToolParameter = setupToolParameter();
			parameter.type = ToolParameterTypeEnum.Boolean;
			parameter.value = "false";
			setup(parameter);

			expect(wrapper.find(".v-select__selection").text()).toEqual(
				"common.words.no"
			);
		});

		it("should watch selectItem and emit event", async () => {
			const parameter: ToolParameter = setupToolParameter();
			parameter.type = ToolParameterTypeEnum.Boolean;
			setup(parameter);

			const input = wrapper.find(`[data-testId=${parameter.name}]`);
			input.setValue(false);
			await input.trigger("change");

			expect(wrapper.vm.value.value).toEqual("false");
			expect(wrapper.emitted("updated"));
		});
	});

	describe("when parameter has type string", () => {
		it("should render a textfield", () => {
			const parameter: ToolParameter = setupToolParameter();
			parameter.type = ToolParameterTypeEnum.String;
			setup(parameter);

			expect(wrapper.find(".v-text-field__slot"));
		});

		it("should emit event on parameter value change", async () => {
			const parameter: ToolParameter = setupToolParameter();
			parameter.type = ToolParameterTypeEnum.String;
			setup(parameter);

			const input = wrapper.find(`[data-testId=${parameter.name}]`);
			input.setValue("newValue");
			await input.trigger("change");

			expect(wrapper.vm.value.value).toEqual("newValue");
			expect(wrapper.emitted("updated"));
		});
	});
});
