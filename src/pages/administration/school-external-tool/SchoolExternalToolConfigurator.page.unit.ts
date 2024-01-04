import ExternalToolConfigurator from "@/components/external-tools/configuration/ExternalToolConfigurator.vue";
import AuthModule from "@/store/auth";
import { SchoolExternalToolSave } from "@/store/external-tool";
import NotifierModule from "@/store/notifier";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import { User } from "@/store/types/auth";
import {
	AUTH_MODULE_KEY,
	I18N_KEY,
	NOTIFIER_MODULE_KEY,
	SCHOOL_EXTERNAL_TOOLS_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { i18nMock } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import {
	businessErrorFactory,
	schoolExternalToolConfigurationTemplateFactory,
	toolParameterFactory,
} from "@@/tests/test-utils/factory";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import SchoolExternalToolConfigurator from "./SchoolExternalToolConfigurator.page.vue";

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

describe("SchoolExternalToolConfigurator", () => {
	const routerPush = jest.fn();

	const getWrapper = (
		propsData: { configId?: string },
		getters: Partial<SchoolExternalToolsModule> = {}
	) => {
		document.body.setAttribute("data-app", "true");

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
		const authModule = createModuleMocks(AuthModule, {
			getUser: {
				schoolId,
			} as User,
		});

		const notifierModule = createModuleMocks(NotifierModule);

		const $router = {
			push: routerPush,
		};

		const wrapper: Wrapper<Vue> = mount(
			SchoolExternalToolConfigurator as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: {
					[I18N_KEY.valueOf()]: i18nMock,
					[SCHOOL_EXTERNAL_TOOLS_MODULE_KEY.valueOf()]:
						schoolExternalToolsModule,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
				propsData: {
					...propsData,
				},
				mocks: {
					$router,
				},
			}
		);

		return {
			wrapper,
			schoolExternalToolsModule,
			authModule,
			notifierModule,
			schoolId,
		};
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("breadcrumbs", () => {
		it("should render static breadcrumbs", () => {
			const { wrapper } = getWrapper({});

			const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

			expect(breadcrumbs.at(0).text()).toEqual(
				"pages.administration.index.title"
			);
			expect(breadcrumbs.at(1).text()).toEqual(
				"pages.administration.school.index.title"
			);
			expect(breadcrumbs.at(2).text()).toEqual("pages.tool.title");
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

				await Vue.nextTick();

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

				await Vue.nextTick();

				expect(
					schoolExternalToolsModule.loadConfigurationTemplateForSchoolExternalTool
				).toHaveBeenCalledWith("configId");
			});

			it("should load the configuration", async () => {
				const { schoolExternalToolsModule } = getWrapper({
					configId: "configId",
				});

				await Vue.nextTick();

				expect(
					schoolExternalToolsModule.loadSchoolExternalTool
				).toHaveBeenCalledWith("configId");
			});
		});
	});

	describe("onCancel", () => {
		it("should change page when cancel button was clicked", async () => {
			const { wrapper } = getWrapper({});

			wrapper.findComponent(ExternalToolConfigurator).vm.$emit("cancel");
			await Vue.nextTick();

			expect(routerPush).toHaveBeenCalledWith({
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

				const { wrapper, schoolExternalToolsModule, schoolId, notifierModule } =
					getWrapper(
						{},
						{
							getSchoolExternalToolConfigurationTemplates: [template],
						}
					);

				return {
					wrapper,
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
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, [
						{
							name: template.parameters[0].name,
							value: testValue,
						},
					]);
				await Vue.nextTick();

				expect(
					schoolExternalToolsModule.createSchoolExternalTool
				).toHaveBeenCalledWith<[SchoolExternalToolSave]>({
					toolId: template.externalToolId,
					version: template.version,
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
				const { wrapper, template } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);
				await Vue.nextTick();

				expect(routerPush).toHaveBeenCalledWith({
					path: "/administration/school-settings",
					query: { openPanels: "tools" },
				});
			});

			it("should display a notification when created", async () => {
				const { wrapper, notifierModule, template } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);
				await Vue.nextTick();

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

				const { wrapper, schoolExternalToolsModule, schoolId, notifierModule } =
					getWrapper(
						{ configId: schoolExternalToolId },
						{
							getSchoolExternalToolConfigurationTemplates: [template],
						}
					);

				return {
					wrapper,
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
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);
				await Vue.nextTick();

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
						version: template.version,
						parameters: [],
						schoolId,
					},
				});
			});

			it("should redirect back to school settings page when there is no error", async () => {
				const { wrapper, template } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);
				await Vue.nextTick();

				expect(routerPush).toHaveBeenCalledWith({
					path: "/administration/school-settings",
					query: { openPanels: "tools" },
				});
			});

			it("should display a notification when updated", async () => {
				const { wrapper, notifierModule, template } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit("save", template, []);
				await Vue.nextTick();

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "components.administration.externalToolsSection.notification.updated",
					status: "success",
				});
			});
		});

		describe("when an error occurs during saving", () => {
			const setup = () => {
				const { wrapper } = getWrapper(
					{},
					{
						getBusinessError: businessErrorFactory.build(),
					}
				);

				return {
					wrapper,
				};
			};

			it("should display an alert", async () => {
				const { wrapper } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit(
						"save",
						schoolExternalToolConfigurationTemplateFactory.build(),
						[]
					);
				await Vue.nextTick();

				expect(wrapper.find(".v-alert__content").exists()).toBeTruthy();
			});

			it("should not redirect", async () => {
				const { wrapper } = setup();

				wrapper
					.findComponent(ExternalToolConfigurator)
					.vm.$emit(
						"save",
						schoolExternalToolConfigurationTemplateFactory.build(),
						[]
					);
				await Vue.nextTick();

				expect(routerPush).not.toHaveBeenCalled();
			});
		});
	});
});
