import { ExternalToolConfigurationTemplate } from "@/store/external-tool";
import {
	schoolExternalToolConfigurationTemplateFactory,
	toolParameterFactory,
} from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import ExternalToolConfigSettings from "./ExternalToolConfigSettings.vue";

describe("ExternalToolConfigSettings", () => {
	const getWrapper = (
		props: {
			template: ExternalToolConfigurationTemplate;
			value: (string | undefined)[];
		} = {
			template: schoolExternalToolConfigurationTemplateFactory.build(),
			value: [],
		}
	) => {
		document.body.setAttribute("data-app", "true");

		const wrapper: Wrapper<Vue> = shallowMount(
			ExternalToolConfigSettings as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				propsData: {
					...props,
				},
			}
		);

		return {
			wrapper,
		};
	};

	describe("basic functions", () => {
		it("should render component", () => {
			const { wrapper } = getWrapper();

			expect(wrapper.findComponent(ExternalToolConfigSettings).exists()).toBe(
				true
			);
		});
	});

	describe("parameters", () => {
		const setup = () => {
			const template = schoolExternalToolConfigurationTemplateFactory.build({
				parameters: toolParameterFactory.buildList(3),
			});

			const { wrapper } = getWrapper({
				template,
				value: [],
			});

			return {
				wrapper,
				template,
			};
		};

		it("should render given toolParameters", () => {
			const { wrapper, template } = setup();

			expect(
				wrapper.findAll("external-tool-config-parameter-stub").length
			).toEqual(template.parameters.length);
		});
	});
});
