import ExternalToolConfigParameter from "./ExternalToolConfigParameter.vue";
import { ToolParameter, ToolParameterType } from "@/store/external-tool";
import { toolParameterFactory } from "@@/tests/test-utils/factory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("ExternalToolConfigParameter", () => {
	const getWrapper = (
		props: {
			parameter: ToolParameter;
			value?: string;
		} = { parameter: toolParameterFactory.build() }
	) => {
		const wrapper = mount(ExternalToolConfigParameter, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				...props,
				modelValue: props.parameter.defaultValue,
			},
		});

		return {
			wrapper,
		};
	};

	describe("when parameter has type boolean", () => {
		const setup = () => {
			const parameter: ToolParameter = toolParameterFactory.build({
				type: ToolParameterType.Boolean,
			});

			const { wrapper } = getWrapper({
				parameter,
			});

			return {
				wrapper,
				parameter,
			};
		};

		it("should render a tri state select", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent({ name: "v-select" }).exists()).toEqual(true);
		});

		it("should use default selectItem when parameter value is undefined", async () => {
			const { wrapper, parameter } = setup();

			await wrapper.find(`[data-testId=${parameter.name}]`).trigger("click");

			expect(wrapper.find(".v-select__selection").text()).toEqual("common.words.noChoice");
		});

		it("should watch selectItem and emit event when select input value changes", async () => {
			const { wrapper, parameter } = setup();

			await wrapper.findComponent(`[data-testId=${parameter.name}]`).setValue(true);

			expect(wrapper.emitted("update:modelValue")).toEqual([[true]]);
		});
	});

	describe("when parameter has type string", () => {
		const setup = () => {
			const parameter: ToolParameter = toolParameterFactory.build({
				type: ToolParameterType.String,
			});

			const { wrapper } = getWrapper({
				parameter,
			});

			return {
				wrapper,
				parameter,
			};
		};

		it("should render a text-field", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent({ name: "v-text-field" }).exists()).toEqual(true);
		});

		it("should emit event when parameter value changes", async () => {
			const { wrapper, parameter } = setup();

			await wrapper.findComponent(`[data-testId=${parameter.name}]`).setValue("newValue");

			expect(wrapper.emitted("update:modelValue")).toEqual([["newValue"]]);
		});
	});

	describe("when parameter has type number", () => {
		const setup = () => {
			const parameter: ToolParameter = toolParameterFactory.build({
				type: ToolParameterType.Number,
			});

			const { wrapper } = getWrapper({
				parameter,
			});

			return {
				wrapper,
				parameter,
			};
		};

		it("should render a text-field with type number", () => {
			const { wrapper, parameter } = setup();

			expect(wrapper.findComponent({ name: "v-text-field" }).exists()).toEqual(true);

			expect(wrapper.findComponent(`[data-testId=${parameter.name}]`).get("input").attributes("type")).toEqual(
				"number"
			);
		});

		it("should emit event when parameter value changes", async () => {
			const { wrapper, parameter } = setup();

			await wrapper.findComponent(`[data-testId=${parameter.name}]`).setValue("1234");

			expect(wrapper.emitted("update:modelValue")).toEqual([["1234"]]);
		});
	});
});
