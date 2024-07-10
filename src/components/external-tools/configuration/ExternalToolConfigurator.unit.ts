import * as useExternalToolUtilsComposable from "@/composables/external-tool-mappings.composable";
import { ToolParameterLocation } from "@/store/external-tool";
import NotifierModule from "@/store/notifier";
import { ComponentProps } from "@/types/vue";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	schoolExternalToolConfigurationTemplateFactory,
	schoolExternalToolFactory,
	toolParameterFactory,
} from "@@/tests/test-utils/factory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-jest";
import { flushPromises, mount } from "@vue/test-utils";
import { VAutocomplete, VBtn } from "vuetify/lib/components/index.mjs";
import ExternalToolConfigSettings from "./ExternalToolConfigSettings.vue";
import ExternalToolConfigurator from "./ExternalToolConfigurator.vue";

describe("ExternalToolConfigurator", () => {
	jest
		.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
		.mockReturnValue({
			...useExternalToolUtilsComposable.useExternalToolMappings(),
			getBusinessErrorTranslationKey: () => "",
		});

	const getWrapper = (
		props: ComponentProps<typeof ExternalToolConfigurator>
	) => {
		const notifierModule = createModuleMocks(NotifierModule);

		const wrapper = mount(ExternalToolConfigurator, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
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

	describe("Search box", () => {
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

		describe("when clicking on the 'paste' icon", () => {
			const setup = () => {
				const clipboardText = "https://google.de";
				const template = schoolExternalToolConfigurationTemplateFactory.build();

				const clipboardMock = createMock<Clipboard>();
				Object.assign(navigator, { clipboard: clipboardMock });

				const { wrapper } = getWrapper({
					templates: [template],
				});

				clipboardMock.readText.mockResolvedValue(clipboardText);

				return {
					wrapper,
					template,
					clipboardMock,
					clipboardText,
				};
			};

			it("should paste the text from the clipboard into the input field", async () => {
				const { wrapper, clipboardMock, clipboardText } = setup();

				const icon = wrapper
					.find(".v-input__append")
					.find(".v-icon--clickable");
				await icon.trigger("click");
				await flushPromises();

				const autocomplete = wrapper.findComponent(VAutocomplete);

				expect(clipboardMock.readText).toHaveBeenCalled();
				expect(autocomplete.props().search).toEqual(clipboardText);
			});
		});

		describe("when pasting a url for an existing tool into the search box", () => {
			const setup = () => {
				const template = schoolExternalToolConfigurationTemplateFactory.build({
					baseUrl: "https://test.com/:pathParam1/spacer/:pathParam2",
					parameters: [
						toolParameterFactory.build({
							name: "pathParam1",
							location: ToolParameterLocation.PATH,
						}),
						toolParameterFactory.build({
							name: "queryParam1",
							location: ToolParameterLocation.QUERY,
						}),
						toolParameterFactory.build({
							name: "pathParam2",
							location: ToolParameterLocation.PATH,
						}),
					],
				});

				const { wrapper } = getWrapper({
					templates: [
						template,
						schoolExternalToolConfigurationTemplateFactory.build(),
					],
				});

				return {
					wrapper,
					template,
				};
			};

			it("should automatically fill the parameters", async () => {
				const { wrapper, template } = setup();

				const autocomplete = wrapper.findComponent(VAutocomplete);
				await autocomplete.setValue(
					"https://test.com/pathParamValue1/spacer/pathParamValue2?queryParam1=queryParamValue1",
					"search"
				);
				await autocomplete.setValue(template);

				const settings = wrapper.getComponent(ExternalToolConfigSettings);
				expect(settings.props().modelValue).toEqual([
					"pathParamValue1",
					"queryParamValue1",
					"pathParamValue2",
				]);
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
