import SchoolExternalToolConfigurator from "./SchoolExternalToolConfigurator.page.vue";
import ExternalToolConfigurator from "@/components/external-tools/configuration/ExternalToolConfigurator.vue";
import ExternalToolMediumDetails from "@/components/external-tools/configuration/ExternalToolMediumDetails.vue";
import { ExternalToolMediumStatus } from "@/serverApi/v3";
import { SchoolExternalToolSave } from "@/store/external-tool";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import { SCHOOL_EXTERNAL_TOOLS_MODULE_KEY } from "@/utils/inject";
import { createTestAppStoreWithSchool, expectNotification } from "@@/tests/test-utils";
import {
	businessErrorFactory,
	schoolExternalToolConfigurationTemplateFactory,
	toolParameterFactory,
} from "@@/tests/test-utils/factory";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { SchoolExternalToolConfigurationTemplate } from "@data-external-tool";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, Mock } from "vitest";
import { Component, nextTick } from "vue";
import { Router, useRouter } from "vue-router";

vi.mock(
	"@/utils/pageTitle",
	() =>
		({
			buildPageTitle: (pageTitle) => pageTitle ?? "",
		}) as typeof import("@/utils/pageTitle")
);

vi.mock("vue-router", () => ({
	useRouter: vi.fn(),
}));

const useRouterMock = <Mock>useRouter;

describe("SchoolExternalToolConfigurator", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const getWrapper = (props: { configId?: string } = {}, getters: Partial<SchoolExternalToolsModule> = {}) => {
		const schoolExternalToolsModule = createModuleMocks(SchoolExternalToolsModule, {
			getSchoolExternalToolConfigurationTemplates: [schoolExternalToolConfigurationTemplateFactory.build()],
			getBusinessError: businessErrorFactory.build({ message: undefined }),
			...getters,
		});

		const schoolId = "schoolId";
		createTestAppStoreWithSchool(schoolId);

		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);

		const wrapper = mount(SchoolExternalToolConfigurator, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[SCHOOL_EXTERNAL_TOOLS_MODULE_KEY.valueOf()]: schoolExternalToolsModule,
				},
			},
			props,
		});

		return {
			wrapper,
			router,
			schoolExternalToolsModule,
			schoolId,
		};
	};

	describe("breadcrumbs", () => {
		it("should render static breadcrumbs", () => {
			const { wrapper } = getWrapper();

			const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

			expect(breadcrumbs.at(0)?.text()).toEqual("pages.administration.school.index.title");
			expect(breadcrumbs.at(1)?.text()).toEqual("pages.tool.title");
		});
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

				expect(schoolExternalToolsModule.loadAvailableToolsForSchool).toHaveBeenCalledWith(schoolId);
			});
		});

		describe("when updating an existing configuration", () => {
			it("should load the template", async () => {
				const { schoolExternalToolsModule } = getWrapper({
					configId: "configId",
				});

				await nextTick();

				expect(schoolExternalToolsModule.loadConfigurationTemplateForSchoolExternalTool).toHaveBeenCalledWith(
					"configId"
				);
			});

			it("should load the configuration", async () => {
				const { schoolExternalToolsModule } = getWrapper({
					configId: "configId",
				});

				await nextTick();

				expect(schoolExternalToolsModule.loadSchoolExternalTool).toHaveBeenCalledWith("configId");
			});
		});
	});

	describe("onCancel", () => {
		it("should change page when cancel button was clicked", async () => {
			const { wrapper, router } = getWrapper({});

			wrapper.findComponent(ExternalToolConfigurator as Component).vm.$emit("cancel");
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

				const { wrapper, router, schoolExternalToolsModule, schoolId } = getWrapper(
					{},
					{
						getSchoolExternalToolConfigurationTemplates: [template],
					}
				);

				return {
					wrapper,
					router,
					schoolExternalToolsModule,
					template,
					schoolId,
				};
			};

			it("should call store action to save tool", async () => {
				const { wrapper, template, schoolExternalToolsModule, schoolId } = setup();
				const testValue = "test";

				wrapper.findComponent(ExternalToolConfigurator as Component).vm.$emit("save", template, [
					{
						name: template.parameters[0].name,
						value: testValue,
					},
				]);
				await nextTick();

				expect(schoolExternalToolsModule.createSchoolExternalTool).toHaveBeenCalledWith<[SchoolExternalToolSave]>({
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

				wrapper.findComponent(ExternalToolConfigurator as Component).vm.$emit("save", template, []);
				await nextTick();

				expect(router.push).toHaveBeenCalledWith({
					path: "/administration/school-settings",
					query: { openPanels: "tools" },
				});
			});

			it("should display a notification when created", async () => {
				const { wrapper, template } = setup();

				wrapper.findComponent(ExternalToolConfigurator as Component).vm.$emit("save", template, []);
				await nextTick();

				expectNotification("success");
			});
		});

		describe("when editing a configuration", () => {
			const setup = () => {
				const template = schoolExternalToolConfigurationTemplateFactory.build();

				const schoolExternalToolId = "configId";

				const { wrapper, router, schoolExternalToolsModule, schoolId } = getWrapper(
					{ configId: schoolExternalToolId },
					{
						getSchoolExternalToolConfigurationTemplates: [template],
					}
				);

				return {
					wrapper,
					router,
					schoolExternalToolsModule,
					template,
					schoolId,
					schoolExternalToolId,
				};
			};

			it("should call store action to update tool", async () => {
				const { wrapper, schoolExternalToolsModule, template, schoolExternalToolId, schoolId } = setup();

				wrapper.findComponent(ExternalToolConfigurator as Component).vm.$emit("save", template, []);
				await nextTick();

				expect(schoolExternalToolsModule.updateSchoolExternalTool).toHaveBeenCalledWith<
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

				wrapper.findComponent(ExternalToolConfigurator as Component).vm.$emit("save", template, []);
				await nextTick();

				expect(router.push).toHaveBeenCalledWith({
					path: "/administration/school-settings",
					query: { openPanels: "tools" },
				});
			});

			it("should display a notification when updated", async () => {
				const { wrapper, template } = setup();

				wrapper.findComponent(ExternalToolConfigurator as Component).vm.$emit("save", template, []);
				await nextTick();

				expectNotification("success");
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
					.vm.$emit("save", schoolExternalToolConfigurationTemplateFactory.build(), []);
				await nextTick();

				expect(wrapper.find(".v-alert__content").exists()).toBeTruthy();
			});

			it("should not redirect", async () => {
				const { wrapper, router } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator as Component)
					.vm.$emit("save", schoolExternalToolConfigurationTemplateFactory.build(), []);
				await nextTick();

				expect(router.push).not.toHaveBeenCalled();
			});
		});
	});

	describe("ExternalToolMediumDetails", () => {
		const setup = async (selectedTemplate: SchoolExternalToolConfigurationTemplate) => {
			const { wrapper } = getWrapper({});

			const externalToolConfigurator = wrapper.findComponent(ExternalToolConfigurator as Component);

			(externalToolConfigurator.vm as unknown as typeof SchoolExternalToolConfigurator).selectedTemplate =
				selectedTemplate;
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
