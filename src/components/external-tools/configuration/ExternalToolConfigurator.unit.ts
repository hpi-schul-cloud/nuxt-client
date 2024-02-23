import * as useExternalToolUtilsComposable from "@/composables/external-tool-mappings.composable";
import { VueWrapper, mount } from "@vue/test-utils";
import {
	schoolExternalToolConfigurationTemplateFactory,
	schoolExternalToolFactory,
} from "@@/tests/test-utils/factory";
import {
	ExternalToolConfigurationTemplate,
	SchoolExternalTool,
} from "@/store/external-tool";
import { ContextExternalTool } from "@/store/external-tool/context-external-tool";
import { BusinessError } from "@/store/types/commons";
import ExternalToolConfigurator from "./ExternalToolConfigurator.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { VBtn } from "vuetify/lib/components/index.mjs";

describe("ExternalToolConfigurator", () => {
	jest
		.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
		.mockReturnValue({
			...useExternalToolUtilsComposable.useExternalToolMappings(),
			getBusinessErrorTranslationKey: () => "",
		});

	const getWrapper = (props: {
		templates: ExternalToolConfigurationTemplate[];
		configuration?: SchoolExternalTool | ContextExternalTool;
		error?: BusinessError;
		loading?: boolean;
	}) => {
		const wrapper = mount(ExternalToolConfigurator, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

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

				const openSelect = async (wrapper: VueWrapper) => {
					await wrapper
						.find('[data-testId="configuration-select"]')
						.trigger("click");

					await wrapper
						.find(".menuable__content__active .v-list-item:firstChild")
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

				const select = wrapper
					.findComponent('[data-testId="configuration-select"]')
					.get("input");

				expect(select.attributes("disabled")).toBeDefined();
			});

			it("should display the edited tool in the selection", async () => {
				const { wrapper, template } = setup();

				const selectionRow = wrapper.find(".v-autocomplete .v-list-item-title");

				expect(selectionRow.text()).toEqual(template.name);
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

				await wrapper
					.findComponent<typeof VBtn>('[data-testId="cancel-button"]')
					.trigger("click");

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

				await wrapper
					.findComponent<typeof VBtn>('[data-testId="save-button"]')
					.trigger("click");

				expect(wrapper.emitted("save")).toBeDefined();
			});
		});
	});
});
