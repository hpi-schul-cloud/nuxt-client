import { ExternalToolConfigurationTemplate } from "@/store/external-tool";
import ExternalToolsModule from "@/store/external-tools";
import { EXTERNAL_TOOLS_MODULE_KEY, I18N_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	i18nMock,
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
		},
		getter: Partial<ExternalToolsModule> = {}
	) => {
		document.body.setAttribute("data-app", "true");

		const externalToolsModule = createModuleMocks(ExternalToolsModule, {
			getLoading: false,
			...getter,
		}) as jest.Mocked<ExternalToolsModule>;

		const wrapper: Wrapper<Vue> = shallowMount(
			ExternalToolConfigSettings as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: {
					[I18N_KEY.valueOf()]: i18nMock,
					[EXTERNAL_TOOLS_MODULE_KEY.valueOf()]: externalToolsModule,
				},
				propsData: {
					...props,
				},
			}
		);

		return {
			wrapper,
			externalToolsModule,
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

	describe("display title", () => {
		it("should display title", () => {
			const { wrapper } = getWrapper();

			const h2 = wrapper.find("h2");

			expect(h2.exists()).toBeTruthy();
		});
	});

	describe("progressbar", () => {
		it("should display progressbar when loading in store is set", () => {
			const { wrapper } = getWrapper(
				{
					template: schoolExternalToolConfigurationTemplateFactory.build(),
					value: [],
				},
				{
					getLoading: true,
				}
			);

			const progressbar = wrapper.find("v-progress-linear-stub");

			expect(progressbar.attributes().active).toBeTruthy();
		});

		it("should not display progressbar when loading in store is not set", () => {
			const { wrapper } = getWrapper(
				{
					template: schoolExternalToolConfigurationTemplateFactory.build(),
					value: [],
				},
				{
					getLoading: false,
				}
			);

			const progressbar = wrapper.find("v-progress-linear-stub");

			expect(progressbar.attributes().active).toBeFalsy();
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
