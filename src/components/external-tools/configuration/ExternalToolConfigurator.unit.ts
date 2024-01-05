import * as useExternalToolUtilsComposable from "@/composables/external-tool-mappings.composable";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import Vue from "vue";
import {
	contextExternalToolConfigurationTemplateFactory,
	contextExternalToolFactory,
	schoolExternalToolConfigurationTemplateFactory,
	schoolExternalToolFactory,
	schoolToolConfigurationStatusFactory,
} from "@@/tests/test-utils/factory";
import {
	ExternalToolConfigurationTemplate,
	SchoolExternalTool,
} from "@/store/external-tool";
import { ContextExternalTool } from "@/store/external-tool/context-external-tool";
import { BusinessError } from "@/store/types/commons";
import { I18N_KEY } from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";
import ExternalToolConfigurator from "./ExternalToolConfigurator.vue";

describe("ExternalToolConfigurator", () => {
	jest
		.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
		.mockReturnValue({
			...useExternalToolUtilsComposable.useExternalToolMappings(),
			getBusinessErrorTranslationKey: () => "",
		});

	const getWrapper = (propsData: {
		templates: ExternalToolConfigurationTemplate[];
		configuration?: SchoolExternalTool | ContextExternalTool;
		error?: BusinessError;
		loading?: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");

		const wrapper: Wrapper<Vue> = mount(
			ExternalToolConfigurator as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: {
					[I18N_KEY.valueOf()]: i18nMock,
				},
				propsData: {
					...propsData,
				},
			}
		);

		return {
			wrapper,
		};
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("autocomplete", () => {
		describe("when selecting a new configuration", () => {
			const setup = () => {
				const template = schoolExternalToolConfigurationTemplateFactory.build({
					logoUrl: "some logo",
				});

				const { wrapper } = getWrapper({
					templates: [template],
				});

				const openSelect = async (wrapper: Wrapper<Vue>) => {
					await wrapper
						.find('[data-testId="configuration-select"]')
						.trigger("click");

					await wrapper
						.find(".menuable__content__active")
						.findAll(".v-list-item")
						.at(0)
						.trigger("click");
				};

				return {
					wrapper,
					template,
					openSelect,
				};
			};

			// TODO: comment in the test when https://github.com/vuetifyjs/vuetify/pull/16272 is merged
			it.skip("should display name and logo of an tool configuration in selection list", async () => {
				const { wrapper, template, openSelect } = setup();

				await openSelect(wrapper);

				const selectionRow = wrapper.find(".row");

				expect(selectionRow.find(".v-image__image").exists()).toBeTruthy();
				expect(selectionRow.find("span").text()).toEqual(
					expect.stringContaining(template.name)
				);
			});

			// TODO: comment in the test when https://github.com/vuetifyjs/vuetify/pull/16272 is merged
			it.skip("should set enable the save button", async () => {
				const { wrapper, openSelect } = setup();

				await openSelect(wrapper);

				const button = wrapper.find('[data-testId="save-button"]');

				expect(button.attributes("disabled")).toBeUndefined();
			});
		});

		describe("when editing a configuration", () => {
			const setup = () => {
				const template = schoolExternalToolConfigurationTemplateFactory.build();

				const { wrapper } = getWrapper({
					templates: [template],
					configuration: schoolExternalToolFactory.build(),
				});

				return {
					wrapper,
					template,
				};
			};

			it("should disable the selection", async () => {
				const { wrapper } = setup();

				const select = wrapper.find('[data-testId="configuration-select"]');

				expect(select.attributes("disabled")).toBeDefined();
			});

			it("should display the edited tool in the selection", async () => {
				const { wrapper, template } = setup();

				const selectionRow = wrapper.find(".row");

				expect(selectionRow.find("span").text()).toEqual(
					expect.stringContaining(template.name)
				);
			});
		});
	});

	describe("deactivated checkbox", () => {
		describe("when the template is a school external tool", () => {
			it("should be checked when the tool configuration status is deactivated", async () => {
				const { wrapper } = getWrapper({
					templates: schoolExternalToolConfigurationTemplateFactory.buildList(
						1,
						{ isDeactivated: false }
					),
					configuration: schoolExternalToolFactory.build({
						status: schoolToolConfigurationStatusFactory.build({
							isDeactivated: true,
						}),
					}),
				});

				const checkbox = wrapper.find(
					'[data-testId="configuration-deactivate-checkbox"]'
				);

				expect(checkbox.attributes("aria-checked")).toBe("true");
			});
		});

		describe("when the template is a context external tool", () => {
			it("should not be rendered", async () => {
				const { wrapper } = getWrapper({
					templates:
						contextExternalToolConfigurationTemplateFactory.buildList(1),
					configuration: contextExternalToolFactory.build(),
				});

				const checkbox = wrapper.find(
					'[data-testId="configuration-deactivate-checkbox"]'
				);

				expect(checkbox.exists()).toBeFalsy();
			});
		});
	});

	describe("cancel button", () => {
		describe("when clicking the cancel button", () => {
			it("should emit the cancel event", async () => {
				const { wrapper } = getWrapper({
					templates:
						schoolExternalToolConfigurationTemplateFactory.buildList(1),
				});

				await wrapper.find('[data-testId="cancel-button"]').vm.$emit("click");

				expect(wrapper.emitted("cancel")).toBeDefined();
			});
		});
	});

	describe("save button", () => {
		describe("when clicking the save button", () => {
			it("should emit the save event", async () => {
				const { wrapper } = getWrapper({
					templates:
						schoolExternalToolConfigurationTemplateFactory.buildList(1),
					configuration: schoolExternalToolFactory.build(),
				});

				wrapper.find('[data-testId="save-button"]').vm.$emit("click");
				await Vue.nextTick();

				expect(wrapper.emitted("save")).toBeDefined();
			});
		});
	});
});
