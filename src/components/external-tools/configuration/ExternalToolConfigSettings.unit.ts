import ExternalToolConfigSettings from "./ExternalToolConfigSettings.vue";
import { schoolExternalToolConfigurationTemplateFactory, toolParameterFactory } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { ExternalToolConfigurationTemplate } from "@data-external-tool";
import { shallowMount } from "@vue/test-utils";

describe("ExternalToolConfigSettings", () => {
	const getWrapper = (
		props: {
			template: ExternalToolConfigurationTemplate;
			modelValue: (string | undefined)[];
		} = {
			template: schoolExternalToolConfigurationTemplateFactory.build(),
			modelValue: [],
		}
	) => {
		const wrapper = shallowMount(ExternalToolConfigSettings, {
			global: {
				plugins: [createTestingI18n()],
			},
			props,
		});

		return {
			wrapper,
		};
	};

	describe("basic functions", () => {
		it("should render component", () => {
			const { wrapper } = getWrapper();

			expect(wrapper.findComponent(ExternalToolConfigSettings).exists()).toBe(true);
		});
	});

	describe("parameters", () => {
		const setup = () => {
			const template = schoolExternalToolConfigurationTemplateFactory.build({
				parameters: toolParameterFactory.buildList(3),
			});

			const { wrapper } = getWrapper({
				template,
				modelValue: [],
			});

			return {
				wrapper,
				template,
			};
		};

		it("should render given toolParameters", () => {
			const { wrapper, template } = setup();

			expect(wrapper.findAll("external-tool-config-parameter-stub").length).toEqual(template.parameters.length);
		});
	});
});
