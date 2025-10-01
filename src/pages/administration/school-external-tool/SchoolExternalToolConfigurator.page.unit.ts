import ExternalToolConfigurator from "@/components/external-tools/configuration/ExternalToolConfigurator.vue";
import ExternalToolMediumDetails from "@/components/external-tools/configuration/ExternalToolMediumDetails.vue";
import { SchoolExternalToolSave } from "@/store/external-tool";
import NotifierModule from "@/store/notifier";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import {
	NOTIFIER_MODULE_KEY,
	SCHOOL_EXTERNAL_TOOLS_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestAppStoreWithSchool } from "@@/tests/test-utils";
import {
	businessErrorFactory,
	schoolExternalToolConfigurationTemplateFactory,
	toolParameterFactory,
} from "@@/tests/test-utils/factory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { ExternalToolMediumStatus } from "@/serverApi/v3";
import { SchoolExternalToolConfigurationTemplate } from "@data-external-tool";
import { createMock } from "@golevelup/ts-vitest";
import { mount } from "@vue/test-utils";
import { Component, nextTick } from "vue";
import { Router, useRouter } from "vue-router";
import SchoolExternalToolConfigurator from "./SchoolExternalToolConfigurator.page.vue";
import { Mock } from "vitest";

vi.mock(
	"@/utils/pageTitle",
	() =>
		({
			buildPageTitle: (pageTitle) => pageTitle ?? "",
		}) as typeof import("@/utils/pageTitle")
);

vi.mock("vue-router", () => {
	return {
		useRouter: vi.fn(),
	};
});

const useRouterMock = <Mock>useRouter;

describe("SchoolExternalToolConfigurator", () => {
	const getWrapper = (
		props: { configId?: string } = {},
		getters: Partial<SchoolExternalToolsModule> = {}
	) => {
		const schoolExternalToolsModule = createModuleMocks(
			SchoolExternalToolsModule,
			{
				getSchoolExternalToolConfigurationTemplates: [
					schoolExternalToolConfigurationTemplateFactory.build(),
				],
				getBusinessError: businessErrorFactory.build({ message: undefined }),
				...getters,
			}
		);

		const schoolId = "schoolId";
		createTestAppStoreWithSchool(schoolId);

		const notifierModule = createModuleMocks(NotifierModule);

		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);

		const wrapper = mount(SchoolExternalToolConfigurator, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[SCHOOL_EXTERNAL_TOOLS_MODULE_KEY.valueOf()]:
						schoolExternalToolsModule,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
			props,
		});

		return {
			wrapper,
			router,
			schoolExternalToolsModule,
			notifierModule,
			schoolId,
		};
	};

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("title", () => {
		it("should render title", () => {
			const { wrapper } = getWrapper({});

			expect(wrapper.find("h1").exists()).toBeTruthy();
		});
	});

	describe("onMounted", () => {
		describe("when creating a new configuration", () => {
			it("should load the available tools for a school", async () => {
				const { schoolExternalToolsModule, schoolId } = getWrapper({});

				await nextTick();

				expect(
					schoolExternalToolsModule.loadAvailableToolsForSchool
				).toHaveBeenCalledWith(schoolId);
			});
		});

		describe("when updating an existing configuration", () => {
			it("should load the template", async () => {
				const { schoolExternalToolsModule } = getWrapper({
					configId: "configId",
				});

				await nextTick();

				expect(
					schoolExternalToolsModule.loadConfigurationTemplateForSchoolExternalTool
				).toHaveBeenCalledWith("configId");
			});

			it("should load the configuration", async () => {
				const { schoolExternalToolsModule } = getWrapper({
					configId: "configId",
				});

				await nextTick();

				expect(
					schoolExternalToolsModule.loadSchoolExternalTool
				).toHaveBeenCalledWith("configId");
			});
		});
	});

	describe("onCancel", () => {
		it("should change page when cancel button was clicked", async () => {
			const { wrapper, router } = getWrapper({});

			wrapper
				.findComponent(ExternalToolConfigurator as Component)
				.vm.$emit("cancel");
			await nextTick();

			expect(router.push).toHaveBeenCalledWith({
				path: "/administration/school-settings",
			});
		});
	});

	describe("onSave", () => {
		describe("when creating a new configuration", () => {
			const setup = () => {
				const template = schoolExternalToolConfigurationTemplateFactory.build({
					parameters: toolParameterFactory.buildList(1),
				});

				const {
					wrapper,
					router,
					schoolExternalToolsModule,
					schoolId,
					notifierModule,
				} = getWrapper(
					{},
					{
						getSchoolExternalToolConfigurationTemplates: [template],
					}
				);

				return {
					wrapper,
					router,
					schoolExternalToolsModule,
					notifierModule,
					template,
					schoolId,
				};
			};

			it("should call store action to save tool", async () => {
				const { wrapper, template, schoolExternalToolsModule, schoolId } =
					setup();
				const testValue = "test";

				wrapper
					.findComponent(ExternalToolConfigurator as Component)
					.vm.$emit("save", template, [
						{
							name: template.parameters[0].name,
							value: testValue,
						},
					]);
				await nextTick();

				expect(
					schoolExternalToolsModule.createSchoolExternalTool
				).toHaveBeenCalledWith<[SchoolExternalToolSave]>({
					toolId: template.externalToolId,
					isDeactivated: template.isDeactivated,
					parameters: [
						{
							name: template.parameters[0].name,
							value: testValue,
						},
					],
					schoolId,
				});
			});

			it("should redirect back to school settings page when there is no error", async () => {
				const { wrapper, router, template } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator as Component)
					.vm.$emit("save", template, []);
				await nextTick();

				expect(router.push).toHaveBeenCalledWith({
					path: "/administration/school-settings",
					query: { openPanels: "tools" },
				});
			});

			it("should display a notification when created", async () => {
				const { wrapper, notifierModule, template } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator as Component)
					.vm.$emit("save", template, []);
				await nextTick();

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "components.administration.externalToolsSection.notification.created",
					status: "success",
				});
			});
		});

		describe("when editing a configuration", () => {
			const setup = () => {
				const template = schoolExternalToolConfigurationTemplateFactory.build();

				const schoolExternalToolId = "configId";

				const {
					wrapper,
					router,
					schoolExternalToolsModule,
					schoolId,
					notifierModule,
				} = getWrapper(
					{ configId: schoolExternalToolId },
					{
						getSchoolExternalToolConfigurationTemplates: [template],
					}
				);

				return {
					wrapper,
					router,
					schoolExternalToolsModule,
					notifierModule,
					template,
					schoolId,
					schoolExternalToolId,
				};
			};

			it("should call store action to update tool", async () => {
				const {
					wrapper,
					schoolExternalToolsModule,
					template,
					schoolExternalToolId,
					schoolId,
				} = setup();

				wrapper
					.findComponent(ExternalToolConfigurator as Component)
					.vm.$emit("save", template, []);
				await nextTick();

				expect(
					schoolExternalToolsModule.updateSchoolExternalTool
				).toHaveBeenCalledWith<
					[
						{
							schoolExternalToolId: string;
							schoolExternalTool: SchoolExternalToolSave;
						},
					]
				>({
					schoolExternalToolId: schoolExternalToolId,
					schoolExternalTool: {
						toolId: template.externalToolId,
						parameters: [],
						schoolId,
						isDeactivated: template.isDeactivated,
					},
				});
			});

			it("should redirect back to school settings page when there is no error", async () => {
				const { wrapper, router, template } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator as Component)
					.vm.$emit("save", template, []);
				await nextTick();

				expect(router.push).toHaveBeenCalledWith({
					path: "/administration/school-settings",
					query: { openPanels: "tools" },
				});
			});

			it("should display a notification when updated", async () => {
				const { wrapper, notifierModule, template } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator as Component)
					.vm.$emit("save", template, []);
				await nextTick();

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "components.administration.externalToolsSection.notification.updated",
					status: "success",
				});
			});
		});

		describe("when an error occurs during saving", () => {
			const setup = () => {
				const { wrapper, router } = getWrapper(
					{},
					{
						getBusinessError: businessErrorFactory.build(),
					}
				);

				return {
					wrapper,
					router,
				};
			};

			it("should display an alert", async () => {
				const { wrapper } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator as Component)
					.vm.$emit(
						"save",
						schoolExternalToolConfigurationTemplateFactory.build(),
						[]
					);
				await nextTick();

				expect(wrapper.find(".v-alert__content").exists()).toBeTruthy();
			});

			it("should not redirect", async () => {
				const { wrapper, router } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator as Component)
					.vm.$emit(
						"save",
						schoolExternalToolConfigurationTemplateFactory.build(),
						[]
					);
				await nextTick();

				expect(router.push).not.toHaveBeenCalled();
			});
		});
	});

	describe("ExternalToolMediumDetails", () => {
		const setup = async (
			selectedTemplate: SchoolExternalToolConfigurationTemplate
		) => {
			const { wrapper } = getWrapper({});

			const externalToolConfigurator = wrapper.findComponent(
				ExternalToolConfigurator as Component
			);

			(
				externalToolConfigurator.vm as unknown as typeof SchoolExternalToolConfigurator
			).selectedTemplate = selectedTemplate;
			await nextTick();

			return { wrapper };
		};

		describe("when the selected template has medium", () => {
			it("should show the external tool medium details", async () => {
				const { wrapper } = await setup({
					externalToolId: "",
					name: "School External Tool",
					baseUrl: "https://test.com",
					parameters: [],
					medium: {
						status: ExternalToolMediumStatus.Active,
						mediaSourceId: "media-source-id",
						mediumId: "medium-id",
					},
					isDeactivated: false,
				});

				const mediumDetails = wrapper.findComponent(ExternalToolMediumDetails);

				expect(mediumDetails.isVisible()).toBe(true);
			});
		});

		describe("when the selected template has no medium", () => {
			it("should not show the external tool medium details", async () => {
				const { wrapper } = await setup({
					externalToolId: "",
					name: "School External Tool",
					baseUrl: "https://test.com",
					parameters: [],
					medium: undefined,
					isDeactivated: false,
				});

				const mediumDetails = wrapper.findComponent(ExternalToolMediumDetails);

				expect(mediumDetails.exists()).toBe(false);
			});
		});
	});
});
