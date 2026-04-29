import SchoolExternalToolConfigurator from "./SchoolExternalToolConfigurator.page.vue";
import ExternalToolConfigurator from "@/components/administration/external-tools-configuration/ExternalToolConfigurator.vue";
import ExternalToolMediumDetails from "@/components/administration/external-tools-configuration/ExternalToolMediumDetails.vue";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { createTestAppStoreWithSchool, expectNotification, mockComposable } from "@@/tests/test-utils";
import {
	expectNoNotification,
	schoolExternalToolConfigurationTemplateFactory,
	toolParameterFactory,
} from "@@/tests/test-utils/factory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ExternalToolMediumStatus } from "@api-server";
import {
	SchoolExternalToolConfigurationTemplate,
	SchoolExternalToolSave,
	useSchoolExternalToolConfigurator,
} from "@data-external-tool";
import { createTestingPinia } from "@pinia/testing";
import { DefaultWireframe } from "@ui-layout";
import { mount, VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { Component, nextTick, ref } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

vi.mock("@data-external-tool/school-external-tool-configurator.composable.ts");

describe("SchoolExternalToolConfigurator", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = (
		options?: Partial<{
			schoolExternalToolConfigurationTemplates: SchoolExternalToolConfigurationTemplate[];
			configId: string;
			createOrUpdateToolError: Error;
		}>
	) => {
		const { schoolExternalToolConfigurationTemplates, configId, createOrUpdateToolError } = {
			schoolExternalToolConfigurationTemplates: schoolExternalToolConfigurationTemplateFactory.buildList(2),
			configId: undefined,
			createOrUpdateToolError: undefined,
			...options,
		};

		const useSchoolExternalToolConfiguratorMock = mockComposable(useSchoolExternalToolConfigurator, {
			schoolExternalToolConfigurationTemplates: ref(schoolExternalToolConfigurationTemplates),
			createOrUpdateToolError: ref(createOrUpdateToolError),
		});
		vi.mocked(useSchoolExternalToolConfigurator).mockReturnValue(useSchoolExternalToolConfiguratorMock);

		const schoolId = "schoolId";
		createTestAppStoreWithSchool(schoolId);

		const { router } = injectRouterMock(createRouterMock());

		const wrapper = mount(SchoolExternalToolConfigurator, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: { configId },
		});

		return {
			wrapper,
			router,
			useSchoolExternalToolConfiguratorMock,
			schoolId,
		};
	};

	describe("breadcrumbs", () => {
		it("should render static breadcrumbs", () => {
			const { wrapper } = setup();

			const defaultWireframe = wrapper.getComponent(DefaultWireframe);
			const breadcrumbTitles = defaultWireframe.props("breadcrumbs")?.map((breadcrumb) => breadcrumb.title);

			const expectedBreadcrumbTitles = ["pages.administration.school.index.title", "pages.tool.title"];
			expect(breadcrumbTitles).toEqual(expectedBreadcrumbTitles);
		});
	});

	describe("title", () => {
		it("should render headline", () => {
			const { wrapper } = setup();

			const defaultWireframe = wrapper.getComponent(DefaultWireframe);

			expect(defaultWireframe.props("headline")).toBe("pages.tool.title");
		});
	});

	describe("onMounted", () => {
		describe("when creating a new configuration", () => {
			it("should load the available tools for a school", async () => {
				const { useSchoolExternalToolConfiguratorMock, schoolId } = setup();
				await nextTick();

				expect(useSchoolExternalToolConfiguratorMock.loadAvailableToolsForSchool).toHaveBeenCalledWith(schoolId);
			});
		});

		describe("when updating an existing configuration", () => {
			it("should load the template", async () => {
				const configId = "configId";
				const { useSchoolExternalToolConfiguratorMock } = setup({ configId });
				await nextTick();

				expect(
					useSchoolExternalToolConfiguratorMock.loadConfigurationTemplateForSchoolExternalTool
				).toHaveBeenCalledWith(configId);
			});

			it("should load the configuration", async () => {
				const configId = "configId";
				const { useSchoolExternalToolConfiguratorMock } = setup({ configId });
				await nextTick();

				expect(useSchoolExternalToolConfiguratorMock.loadSchoolExternalTool).toHaveBeenCalledWith(configId);
			});
		});
	});

	describe("onCancel", () => {
		it("should change page when cancel button was clicked", async () => {
			const { wrapper, router } = setup();

			wrapper.findComponent(ExternalToolConfigurator as Component).vm.$emit("cancel");
			await nextTick();

			expect(router.push).toHaveBeenCalledWith({
				path: "/administration/school-settings",
			});
		});
	});

	describe("onSave", () => {
		describe("when creating a new configuration", () => {
			it("should call store action to save tool", async () => {
				const template = schoolExternalToolConfigurationTemplateFactory.build({
					parameters: toolParameterFactory.buildList(1),
				});
				const { wrapper, useSchoolExternalToolConfiguratorMock, schoolId } = setup({
					schoolExternalToolConfigurationTemplates: [template],
				});
				const testValue = "test";

				wrapper.findComponent(ExternalToolConfigurator as Component).vm.$emit("save", template, [
					{
						name: template.parameters[0].name,
						value: testValue,
					},
				]);
				await nextTick();

				expect(useSchoolExternalToolConfiguratorMock.createSchoolExternalTool).toHaveBeenCalledWith<
					[SchoolExternalToolSave]
				>({
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
				const template = schoolExternalToolConfigurationTemplateFactory.build({
					parameters: toolParameterFactory.buildList(1),
				});
				const { wrapper, router } = setup({ schoolExternalToolConfigurationTemplates: [template] });

				wrapper.findComponent(ExternalToolConfigurator as Component).vm.$emit("save", template, []);
				await nextTick();

				expect(router.push).toHaveBeenCalledWith({
					path: "/administration/school-settings",
					query: { openPanels: "tools" },
				});
			});

			it("should display a notification when created", async () => {
				const template = schoolExternalToolConfigurationTemplateFactory.build({
					parameters: toolParameterFactory.buildList(1),
				});
				const { wrapper } = setup({ schoolExternalToolConfigurationTemplates: [template] });

				wrapper.findComponent(ExternalToolConfigurator as Component).vm.$emit("save", template, []);
				await nextTick();

				expectNotification("success");
			});
		});

		describe("when editing a configuration", () => {
			it("should call store action to update tool", async () => {
				const schoolExternalToolId = "configId";
				const template = schoolExternalToolConfigurationTemplateFactory.build();
				const { wrapper, useSchoolExternalToolConfiguratorMock, schoolId } = setup({
					configId: schoolExternalToolId,
					schoolExternalToolConfigurationTemplates: [template],
				});

				wrapper.findComponent(ExternalToolConfigurator as Component).vm.$emit("save", template, []);
				await nextTick();

				expect(useSchoolExternalToolConfiguratorMock.updateSchoolExternalTool).toHaveBeenCalledWith<
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
				const template = schoolExternalToolConfigurationTemplateFactory.build({
					parameters: toolParameterFactory.buildList(1),
				});
				const { wrapper, router } = setup({ schoolExternalToolConfigurationTemplates: [template] });

				wrapper.findComponent(ExternalToolConfigurator as Component).vm.$emit("save", template, []);
				await nextTick();

				expect(router.push).toHaveBeenCalledWith({
					path: "/administration/school-settings",
					query: { openPanels: "tools" },
				});
			});

			it("should display a notification when updated", async () => {
				const template = schoolExternalToolConfigurationTemplateFactory.build({
					parameters: toolParameterFactory.buildList(1),
				});
				const { wrapper } = setup({ schoolExternalToolConfigurationTemplates: [template] });

				wrapper.findComponent(ExternalToolConfigurator as Component).vm.$emit("save", template, []);
				await nextTick();

				expectNotification("success");
			});
		});

		describe("when an error occurs", () => {
			it("should display an error", async () => {
				const error = new Error("Save error");
				const { wrapper } = setup({
					createOrUpdateToolError: error,
				});

				const externalToolConfigurator = wrapper.findComponent({ name: "ExternalToolConfigurator" });

				const apiError = mapAxiosErrorToResponseError(error);
				expect(externalToolConfigurator.props("error")).toEqual({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});
			});

			it("should not redirect", async () => {
				const { wrapper, router } = setup({ createOrUpdateToolError: new Error("Save error") });

				wrapper
					.findComponent(ExternalToolConfigurator as Component)
					.vm.$emit("save", schoolExternalToolConfigurationTemplateFactory.build(), []);
				await nextTick();

				expect(router.push).not.toHaveBeenCalled();
			});

			it("should not display a success notification", async () => {
				const { wrapper } = setup({ createOrUpdateToolError: new Error("Save error") });

				wrapper
					.findComponent(ExternalToolConfigurator as Component)
					.vm.$emit("save", schoolExternalToolConfigurationTemplateFactory.build(), []);
				await nextTick();

				expectNoNotification();
			});
		});
	});

	describe("ExternalToolMediumDetails", () => {
		const setSelectedTemplate = async (
			wrapper: VueWrapper,
			selectedTemplate: SchoolExternalToolConfigurationTemplate
		) => {
			const externalToolConfigurator = wrapper.findComponent({ name: "ExternalToolConfigurator" });
			externalToolConfigurator.vm.selectedTemplate = selectedTemplate;

			await nextTick();
		};

		describe("when the selected template has medium", () => {
			it("should show the external tool medium details", async () => {
				const selectedTemplate = schoolExternalToolConfigurationTemplateFactory.build({
					medium: {
						status: ExternalToolMediumStatus.ACTIVE,
						mediaSourceId: "media-source-id",
						mediumId: "medium-id",
					},
				});
				const { wrapper } = setup({ schoolExternalToolConfigurationTemplates: [selectedTemplate] });
				await setSelectedTemplate(wrapper, selectedTemplate);

				const mediumDetails = wrapper.findComponent(ExternalToolMediumDetails);
				expect(mediumDetails.exists()).toBe(true);
			});
		});

		describe("when the selected template has no medium", () => {
			it("should not show the external tool medium details", async () => {
				const selectedTemplate = schoolExternalToolConfigurationTemplateFactory.build({
					medium: undefined,
				});
				const { wrapper } = setup({ schoolExternalToolConfigurationTemplates: [selectedTemplate] });
				await setSelectedTemplate(wrapper, selectedTemplate);

				const mediumDetails = wrapper.findComponent(ExternalToolMediumDetails);
				expect(mediumDetails.exists()).toBe(false);
			});
		});
	});
});
