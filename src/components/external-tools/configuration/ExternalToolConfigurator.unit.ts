import * as useExternalToolUtilsComposable from "@/composables/external-tool-mappings.composable";
import {
	SchoolExternalTool,
	ToolParameter,
	ToolParameterLocation,
} from "@/store/external-tool";
import { BusinessError } from "@/store/types/commons";
import {
	schoolExternalToolConfigurationTemplateFactory,
	schoolExternalToolFactory,
	toolParameterFactory,
} from "@@/tests/test-utils/factory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import {
	ContextExternalTool,
	ExternalToolConfigurationTemplate,
} from "@data-external-tool";
import { mount, VueWrapper } from "@vue/test-utils";
import { VBtn } from "vuetify/lib/components/index.mjs";
import ExternalToolConfigurator from "./ExternalToolConfigurator.vue";
import { DeepPartial } from "fishery";

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

	// TODO: new tests for combobox
	describe("combobox", () => {
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

				const selectionRow = wrapper.find(".v-combobox .v-list-item-title");

				expect(selectionRow.text()).toEqual(template.name);
			});
		});

		describe("when clicking on the 'paste' icon", () => {
			const setup = () => {
				const template = schoolExternalToolConfigurationTemplateFactory.build();
				const { wrapper } = getWrapper({
					templates: [template],
				});
				return {
					wrapper,
					template,
				};
			};

			it("should paste the text from the clipboard into the input field", async () => {
				const { wrapper } = setup();
				const mockClipboardText = "https://google.de";
				const mockClipboard = {
					readText: jest.fn().mockReturnValue(mockClipboardText),
				};
				Object.assign(navigator, { clipboard: mockClipboard });

				const icon = wrapper
					.find(".v-input__append")
					.find(".v-icon--clickable");
				await icon.trigger("click");

				const input = wrapper.find(".v-field__input").find("input");
				expect(mockClipboard.readText).toBeCalled();
				expect(input.element.value).toEqual(mockClipboardText);
			});
		});

		// TODO: comment in the test when https://github.com/vuetifyjs/vuetify/pull/16272 is merged
		describe("when inputting an url into the search box", () => {
			const addPathParamsToTemplate = (
				template: ExternalToolConfigurationTemplate
			) => {
				const pathParamConfig: DeepPartial<ToolParameter> = {
					location: ToolParameterLocation.PATH,
				};

				const pathParams: ToolParameter[] = [];
				pathParams.push(toolParameterFactory.build(pathParamConfig));
				pathParams.push(toolParameterFactory.build(pathParamConfig));
				template.parameters.push(...pathParams);

				template.parameters.forEach((parameter) => {
					if (parameter.location !== ToolParameterLocation.PATH) {
						return;
					}
					template.baseUrl += `/:${parameter.name}`;
				});
			};

			const addQueryParamsToTemplate = (
				template: ExternalToolConfigurationTemplate
			) => {
				const pathParamConfig: DeepPartial<ToolParameter> = {
					location: ToolParameterLocation.QUERY,
				};

				const queryParams: ToolParameter[] = [];
				queryParams.push(toolParameterFactory.build(pathParamConfig));
				queryParams.push(toolParameterFactory.build(pathParamConfig));
				template.parameters.push(...queryParams);
			};

			const generateTestParamValue = (parameterName: string) => {
				return `test-${parameterName}`;
			};

			const generateTestUrlFromTemplate = (
				template: ExternalToolConfigurationTemplate
			) => {
				let testUrl = template.baseUrl;
				template.parameters.forEach((parameter) => {
					const testValue = generateTestParamValue(parameter.name);
					switch (parameter.location) {
						case ToolParameterLocation.PATH:
							testUrl = testUrl.replace(`:${parameter.name}`, testValue);
							break;
						case ToolParameterLocation.QUERY:
							if (testUrl.includes("?")) {
								testUrl += "&";
							} else {
								testUrl += "?";
							}
							testUrl += `${parameter.name}=${testValue}`;
					}
				});
				return testUrl;
			};

			const getListedSelectionItems = (wrapper: VueWrapper) => {
				return wrapper
					.find(".v-overlay-container")
					.find(".v-overlay__content .v-combobox__content")
					.findAll('[data-testid="configuration-select-item"]');
			};

			const clickOnFirstSelectionItem = async (wrapper: VueWrapper) => {
				wrapper.find(".v-overlay-container");
				return;
			};

			describe("when the url matches a template's base url", () => {
				const setup = () => {
					const templates = [];
					templates.push(
						schoolExternalToolConfigurationTemplateFactory.build()
					);
					templates.push(
						schoolExternalToolConfigurationTemplateFactory.build()
					);
					const { wrapper } = getWrapper({
						templates: templates,
					});

					const openSelect = async (wrapper: VueWrapper) => {
						await wrapper
							.find('[data-testId="configuration-select"]')
							.trigger("click");
					};

					return { wrapper, templates, openSelect };
				};

				it.skip("should display only the matched tool(s) in the selection", async () => {
					const { wrapper, templates, openSelect } = setup();
					await openSelect(wrapper);

					const input = wrapper.find(".v-field__input").find("input");
					const inputUrl = generateTestUrlFromTemplate(templates[0]);
					await input.setValue(inputUrl);

					const items = getListedSelectionItems(wrapper);
					expect(items.length).toEqual(1);

					const toolName = items[0].find(".v-list-item-title").text();
					expect(toolName).toEqual(templates[0].name);
				});
			});

			describe("when the url matches a template and contains path parameters", () => {
				const setup = () => {
					const templates = [];
					templates.push(
						schoolExternalToolConfigurationTemplateFactory.build()
					);
					templates.push(
						schoolExternalToolConfigurationTemplateFactory.build()
					);

					templates.forEach((template) => addPathParamsToTemplate(template));
					addQueryParamsToTemplate(templates[1]);

					const templateWithPathParams = templates[0];
					const templateWithBothParams = templates[1];

					const { wrapper } = getWrapper({
						templates: templates,
					});

					const openSelect = async (wrapper: VueWrapper) => {
						await wrapper
							.find('[data-testId="configuration-select"]')
							.trigger("click");
					};

					return {
						wrapper,
						openSelect,
						templateWithPathParams,
						templateWithBothParams,
					};
				};

				it.skip("should set path parameters values from url in the configuration fields", async () => {
					const { wrapper, openSelect, templateWithPathParams } = setup();
					await openSelect(wrapper);

					const input = wrapper.find(".v-field__input").find("input");
					const inputUrl = generateTestUrlFromTemplate(templateWithPathParams);
					await input.setValue(inputUrl);

					const items = getListedSelectionItems(wrapper);
					expect(items.length).toEqual(1);
					const toolName = items[0].find(".v-list-item-title").text();
					expect(toolName).toEqual(templateWithPathParams.name);

					await clickOnFirstSelectionItem(wrapper);
					const inputFields = wrapper
						.findAll('[data-testid="configuration-field"]')
						.map((field) => field.find("input"));
					const validValues = templateWithPathParams.parameters.map(
						(parameter) => generateTestParamValue(parameter.name)
					);

					for (const input of inputFields) {
						expect(validValues).toContain(input.element.value);
					}
				});

				it.skip("should set path parameters values from url with both parameters in the correct fields", async () => {
					const { wrapper, openSelect, templateWithBothParams } = setup();
					await openSelect(wrapper);

					const input = wrapper.find(".v-field__input").find("input");
					const inputUrl = generateTestUrlFromTemplate(templateWithBothParams);
					await input.setValue(inputUrl);
				});
			});

			describe("when the url matches a template and contains query parameters", () => {
				const setup = () => {
					const templates = [];
					templates.push(
						schoolExternalToolConfigurationTemplateFactory.build()
					);
					templates.push(
						schoolExternalToolConfigurationTemplateFactory.build()
					);

					templates.forEach((template) => addQueryParamsToTemplate(template));
					addPathParamsToTemplate(templates[1]);

					const templateWithQueryParams = templates[0];
					const templateWithBothParams = templates[1];

					const { wrapper } = getWrapper({
						templates: templates,
					});

					const openSelect = async (wrapper: VueWrapper) => {
						await wrapper
							.find('[data-testId="configuration-select"]')
							.trigger("click");
					};

					return {
						wrapper,
						openSelect,
						templateWithQueryParams,
						templateWithBothParams,
					};
				};

				it.skip("should set query parameters values from inputted url in the configuration fields", async () => {
					const { wrapper, openSelect, templateWithQueryParams } = setup();
					await openSelect(wrapper);

					const input = wrapper.find(".v-field__input").find("input");
					const inputUrl = generateTestUrlFromTemplate(templateWithQueryParams);
					await input.setValue(inputUrl);
				});

				it.skip("should set query parameters values from the url with both parameters in the correct fields", async () => {
					const { wrapper, openSelect, templateWithBothParams } = setup();
					await openSelect(wrapper);

					const input = wrapper.find(".v-field__input").find("input");
					const inputUrl = generateTestUrlFromTemplate(templateWithBothParams);
					await input.setValue(inputUrl);
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
});
