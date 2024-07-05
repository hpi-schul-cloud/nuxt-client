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

		describe("when inputting an url which matches the baseUrl of a tool", () => {
			const setup = () => {
				const templates = [];
				templates.push(schoolExternalToolConfigurationTemplateFactory.build());
				templates.push(schoolExternalToolConfigurationTemplateFactory.build());

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
					templates,
					openSelect,
				};
			};

			const getSelectionItems = (wrapper: VueWrapper) => {
				return [];
			};

			it("should display only the matched tool in the selection", async () => {
				const { wrapper, templates, openSelect } = setup();
				await openSelect(wrapper);

				const selectInputField = wrapper.get("input");
				const inputUrl = templates[0].baseUrl;
				await selectInputField.setValue(inputUrl);

				const selectionItems = getSelectionItems(wrapper);

				expect(selectionItems).toEqual(1);
				// 	TODO: precise baseURL expects
			});
		});

		describe("when inputting an url with path params", () => {
			const createBaseUrlWithPathParams = (
				template: ExternalToolConfigurationTemplate
			): string => {
				let url = template.baseUrl;
				template.parameters.forEach((parameter) => {
					url += `/:${parameter.name}`;
				});
				url += "/";
				return url;
			};

			const setup = () => {
				const pathParams = [];
				const pathParamConfig: DeepPartial<ToolParameter> = {
					location: ToolParameterLocation.PATH,
				};
				pathParams.push(toolParameterFactory.build(pathParamConfig));
				pathParams.push(toolParameterFactory.build(pathParamConfig));

				const templates = [];
				const templateWithParam =
					schoolExternalToolConfigurationTemplateFactory.build({
						parameters: pathParams,
					});
				templateWithParam.baseUrl =
					createBaseUrlWithPathParams(templateWithParam);
				templates.push(templateWithParam);
				templates.push(schoolExternalToolConfigurationTemplateFactory.build());

				const { wrapper } = getWrapper({
					templates: templates,
					configuration: schoolExternalToolFactory.build(),
				});

				const openSelect = async (wrapper: VueWrapper) => {
					await wrapper
						.find('[data-testId="configuration-select"]')
						.trigger("click");
				};

				return {
					wrapper,
					templates,
					openSelect,
				};
			};

			it("should set path parameters values from inputted url in the configuration fields", async () => {
				const { wrapper, templates, openSelect } = setup();
				await openSelect(wrapper);

				const selectInputField = wrapper.get("input");
				const testPathParams = ["test-2", "test-1"];
				const baseUrlParts = templates[0].baseUrl.split("/");
				const inputUrlParts: string[] = [];
				baseUrlParts.forEach((part) => {
					let inputPart = part;
					if (part.startsWith(":")) {
						inputPart = testPathParams.pop() ?? "test";
					}
					inputUrlParts.push(inputPart);
				});
				const inputUrl = inputUrlParts.join("/");
				await selectInputField.setValue(inputUrl);

				// somehow click on the selection?

				const configFields = wrapper.findAll(
					'[data-testId="configuration-field"]'
				);
				configFields.forEach((field) => {
					const input = field.find("v-field__input");
					expect(input.text()).toEqual("test-1");
				});
			});
		});

		describe("when inputting an url with query parameters", () => {
			const setup = () => {
				const queryParams = [];
				const queryParamConfig: DeepPartial<ToolParameter> = {
					location: ToolParameterLocation.QUERY,
				};
				queryParams.push(toolParameterFactory.build(queryParamConfig));

				const templates = [];
				templates.push(
					schoolExternalToolConfigurationTemplateFactory.build({
						parameters: queryParams,
					})
				);
				templates.push(schoolExternalToolConfigurationTemplateFactory.build());

				const { wrapper } = getWrapper({
					templates: templates,
					configuration: schoolExternalToolFactory.build(),
				});

				const openSelect = async (wrapper: VueWrapper) => {
					await wrapper
						.find('[data-testId="configuration-select"]')
						.trigger("click");
				};

				const createInputUrlFromTemplate = (
					template: ExternalToolConfigurationTemplate
				) => {
					const testPathParams = ["test-2", "test-1"];
					let queryString = "";
					template.parameters.forEach((parameter, index) => {
						if (index > 0) {
							queryString += "&";
						}
						queryString += `${parameter.name}=${testPathParams[index]}`;
					});
					return template.baseUrl + "?" + queryString;
				};

				return {
					wrapper,
					templates,
					openSelect,
					createInputUrlFromTemplate,
				};
			};

			it("should set query parameters values from inputted url in the configuration fields", async () => {
				const { wrapper, templates, openSelect, createInputUrlFromTemplate } =
					setup();
				await openSelect(wrapper);

				const inputUrl = createInputUrlFromTemplate(templates[0]);

				const selectInputField = wrapper.get("input");
				await selectInputField.setValue(inputUrl);

				// somehow click on the selection?

				const configFields = wrapper.findAll(
					'[data-testId="configuration-field"]'
				);
				configFields.forEach((field) => {
					const input = field.find("v-field__input");
					expect(input.text()).toEqual("test-1");
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
