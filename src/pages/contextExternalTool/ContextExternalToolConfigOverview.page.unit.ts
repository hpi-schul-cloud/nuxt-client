import { createModuleMocks } from "@/utils/mock-store-module";
import { mount, MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import ExternalToolsModule from "@/store/external-tools";
import flushPromises from "flush-promises";
import Vue from "vue";
import {
	toolConfigurationTemplateFactory,
	businessErrorFactory,
	toolConfigurationFactory,
} from "@@/tests/test-utils/factory";
import { ToolConfigurationTemplate } from "@/store/external-tool";
import ContextExternalToolConfigOverviewPage from "./ContextExternalToolConfigOverview.page.vue";
import * as useExternalToolUtilsComposable from "@/composables/external-tool-mappings.composable";
import { ToolContextType } from "@/store/external-tool/tool-context-type.enum";
import RoomsModule from "@/store/rooms";

describe("ContextExternalToolConfigOverview", () => {
	let externalToolsModule: jest.Mocked<ExternalToolsModule>;
	let roomsModule: jest.Mocked<RoomsModule>;

	jest
		.spyOn(useExternalToolUtilsComposable, "useExternalToolMappings")
		.mockReturnValue({
			...useExternalToolUtilsComposable.useExternalToolMappings(),
			getTranslationKey: () => "",
		});

	const setup = async (
		getters: Partial<ExternalToolsModule> = {},
		propsData: { contextId: string; contextType: ToolContextType }
	) => {
		document.body.setAttribute("data-app", "true");
		externalToolsModule = createModuleMocks(ExternalToolsModule, {
			getToolConfigurations: [toolConfigurationFactory.build()],
			getBusinessError: businessErrorFactory.build(),
			...getters,
		});
		roomsModule = createModuleMocks(RoomsModule, {
			getRoomsData: [
				{
					title: "Mathematik",
					id: propsData.contextId,
					displayColor: "red",
					shortTitle: "Mathe",
					xPosition: 1,
					yPosition: 1,
				},
			],
		});
		const courseTitle = roomsModule?.getRoomsData[0].title;

		const routerPush = jest.fn();
		const $router = {
			push: routerPush,
		};

		const toolTemplate: ToolConfigurationTemplate =
			toolConfigurationTemplateFactory.build();

		externalToolsModule.loadToolConfigurationTemplateFromSchoolExternalTool.mockResolvedValue(
			toolTemplate
		);

		const wrapper: Wrapper<any> = mount(
			ContextExternalToolConfigOverviewPage as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: {
					i18n: { t: (key: string) => key },
					externalToolsModule,
					roomsModule,
				},
				propsData: {
					...propsData,
				},
				mocks: {
					$router,
				},
			}
		);

		await flushPromises();

		return {
			wrapper,
			routerPush,
			toolTemplate,
			courseTitle,
		};
	};

	describe("basic functions", () => {
		it("should render component", async () => {
			const { wrapper } = await setup();
			expect(
				wrapper.findComponent(ContextExternalToolConfigOverviewPage).exists()
			).toBe(true);
		});
	});

	describe("t", () => {
		it("should return translation", async () => {
			const { wrapper } = await setup({});
			const testKey = "testKey";

			const result: string = wrapper.vm.t(testKey);

			expect(result).toEqual(testKey);
		});

		it("should return 'unknown translation-key'", async () => {
			const { wrapper } = await setup({});
			const testKey = 123;

			const result: string = wrapper.vm.t(testKey);

			expect(result.includes("unknown translation-key:")).toBeTruthy();
		});
	});

	describe("onMounted is called", () => {
		it("should load available tool configurations", async () => {
			await setup();
			expect(
				externalToolsModule.loadAvailableSchoolToolConfigurations
			).toHaveBeenCalled();
		});
	});

	describe("breadcrumbs", () => {
		it("should render static breadcrumbs", async () => {
			const { wrapper, courseTitle } = await setup(
				{},
				{ contextId: "contextId", contextType: ToolContextType.COURSE }
			);

			const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

			expect(breadcrumbs.at(0).text()).toEqual("pages.courses.index.title");
			expect(breadcrumbs.at(1).text()).toEqual(courseTitle);
		});
	});

	describe("title", () => {
		it("should render title", async () => {
			const { wrapper } = await setup();
			expect(wrapper.find("h1").exists()).toBeTruthy();
		});
	});

	describe("select", () => {
		describe("when creating a new configuration", () => {
			const openSelect = async (wrapper: Wrapper<any>) => {
				await wrapper
					.find('[data-testid="configuration-select"]')
					.trigger("click");
				await wrapper
					.find(".menuable__content__active")
					.findAll(".v-list-item")
					.at(0)
					.trigger("click");
				await Vue.nextTick();
			};

			it("should display name and logo of an tool configuration in selection list", async () => {
				const name = "nameForSelect";
				const { wrapper } = await setup({
					getToolConfigurations: [
						toolConfigurationFactory.build({
							name,
						}),
					],
				});

				await openSelect(wrapper);

				const selectionRow = wrapper.find(".row");
				expect(selectionRow.find(".v-image__image").exists()).toBeTruthy();
				expect(selectionRow.find("span").text().includes(name));
			});

			it("should load template when tool configuration was changed", async () => {
				const id = "expectedToolId";
				const { wrapper } = await setup({
					getToolConfigurations: [toolConfigurationFactory.build({ id })],
				});

				await openSelect(wrapper);

				expect(
					externalToolsModule.loadToolConfigurationTemplateFromSchoolExternalTool
				).toHaveBeenCalledWith(id);
			});
		});
	});

	describe("cancel button", () => {
		it("should change page when cancel button was clicked", async () => {
			const { wrapper, routerPush } = await setup();

			await wrapper.find('[data-testid="cancel-button"]').trigger("click");

			expect(routerPush).toHaveBeenCalledWith({
				path: "/rooms/undefined",
			});
		});
	});

	describe("save button", () => {
		describe("when creating a new configuration", () => {
			it("should call store action to save tool", async () => {
				const { wrapper } = await setup(
					{},
					{
						contextId: "contextId",
						contextType: ToolContextType.COURSE,
					}
				);
				wrapper.vm.toolTemplate = toolConfigurationTemplateFactory.build();

				const payload = {
					toolTemplate: wrapper.vm.toolTemplate,
					contextId: "contextId",
					contextType: ToolContextType.COURSE,
				};

				const saveButton = wrapper.find('[data-testid="save-button"]');
				await saveButton.trigger("click");

				expect(
					externalToolsModule.createContextExternalTool
				).toHaveBeenCalledWith(payload);
			});

			it("should redirect back to context page when there is no error", async () => {
				const { wrapper, routerPush } = await setup({
					getBusinessError: businessErrorFactory.build({ message: undefined }),
				});

				const saveButton = wrapper.find('[data-testid="save-button"]');
				await saveButton.vm.$emit("click");

				expect(routerPush).toHaveBeenCalledWith({
					path: "/rooms/undefined",
				});
			});

			it("should display alert when server side error on save occurred", async () => {
				const { wrapper, routerPush } = await setup({
					getBusinessError: businessErrorFactory.build({
						message: "someErrorOccurred",
					}),
				});

				const saveButton = wrapper.find('[data-testid="save-button"]');
				await saveButton.vm.$emit("click");

				expect(routerPush).not.toHaveBeenCalled();
				expect(wrapper.find(".v-alert__content").exists()).toBeTruthy();
			});
		});
	});
});
