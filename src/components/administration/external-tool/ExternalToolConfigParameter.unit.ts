import {
	ToolConfigurationTemplateParameter,
	ToolParameterType,
} from "@/store/external-tool";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import ExternalToolConfigParameter from "@/components/administration/external-tool/ExternalToolConfigParameter.vue";
import { mount, MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import { toolParameterFactory } from "@@/tests/test-utils/factory";

describe("ExternalToolConfigParameter", () => {
	let wrapper: Wrapper<any>;

	const setup = (
		parameter: ToolConfigurationTemplateParameter = toolParameterFactory()
	) => {
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
						/\[Vue warn]: Error in setup: "Error: Injection of dependencies failed"/
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
			setup(toolParameterFactory({ type: ToolParameterType.Boolean }));

			expect(wrapper.find(".v-select__slot"));
		});

		it("should use default selectItem when parameter value is undefined", async () => {
			const parameter: ToolConfigurationTemplateParameter =
				toolParameterFactory({
					type: ToolParameterType.Boolean,
					value: undefined,
				});
			setup(parameter);

			await wrapper.find(`[data-testId=${parameter.name}]`).trigger("click");

			expect(wrapper.find(".v-select__selection").text()).toEqual(
				"common.words.noChoice"
			);
		});

		it("should watch selectItem and emit event when select input value changes", async () => {
			const parameter: ToolConfigurationTemplateParameter =
				toolParameterFactory({
					type: ToolParameterType.Boolean,
				});
			setup(parameter);

			await wrapper.find(`[data-testId=${parameter.name}]`).setValue(false);

			expect(wrapper.vm.value.value).toEqual("false");
			expect(wrapper.emitted("updated"));
		});
	});

	describe("when parameter has type string", () => {
		it("should render a text-field", () => {
			setup(toolParameterFactory({ type: ToolParameterType.String }));

			expect(wrapper.find(".v-text-field__slot"));
		});

		it("should emit event when parameter value changes", async () => {
			const parameter: ToolConfigurationTemplateParameter =
				toolParameterFactory({
					type: ToolParameterType.String,
				});
			setup(parameter);

			await wrapper
				.find(`[data-testId=${parameter.name}]`)
				.setValue("newValue");

			expect(wrapper.vm.value.value).toEqual("newValue");
			expect(wrapper.emitted("updated"));
		});
	});

	describe("when parameter has type number", () => {
		it("should render a text-field with type number", () => {
			const parameter: ToolConfigurationTemplateParameter =
				toolParameterFactory({
					type: ToolParameterType.Number,
				});
			setup(parameter);

			expect(wrapper.find(".v-text-field__slot"));
			expect(
				wrapper.find(`[data-testId=${parameter.name}]`).attributes("type")
			).toEqual("number");
		});

		it("should emit event when parameter value changes", async () => {
			const parameter: ToolConfigurationTemplateParameter =
				toolParameterFactory({
					type: ToolParameterType.Number,
				});
			setup(parameter);

			await wrapper.find(`[data-testId=${parameter.name}]`).setValue("1234");

			expect(wrapper.vm.value.value).toEqual("1234");
			expect(wrapper.emitted("updated"));
		});
	});
});
