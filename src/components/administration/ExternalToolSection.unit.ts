import { ConfigResponse } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import { SchoolExternalToolMetadata } from "@/store/external-tool";
import NotifierModule from "@/store/notifier";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	SCHOOL_EXTERNAL_TOOLS_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	envsFactory,
	meResponseFactory,
	schoolExternalToolFactory,
	schoolExternalToolMetadataFactory,
	schoolToolConfigurationStatusFactory,
} from "@@/tests/test-utils/factory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useSchoolExternalToolUsage } from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mdiAlert, mdiCheckCircle } from "@icons/material";
import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";
import { Router, useRouter } from "vue-router";
import { VCardText } from "vuetify/lib/components/index.mjs";
import ExternalToolSection from "./ExternalToolSection.vue";

jest.mock("@data-external-tool");

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;

describe("ExternalToolSection", () => {
	let el: HTMLDivElement;

	let useSchoolExternalToolUsageMock: DeepMocked<
		ReturnType<typeof useSchoolExternalToolUsage>
	>;

	const createDatasheetButtonIndex = 1;

	const getWrapper = (
		getters: Partial<SchoolExternalToolsModule> = {},
		envs: Partial<ConfigResponse> = {}
	) => {
		el = document.createElement("div");
		el.setAttribute("data-app", "true");
		document.body.appendChild(el);

		const schoolExternalToolsModule = createModuleMocks(
			SchoolExternalToolsModule,
			{
				getSchoolExternalTools: [],
				...getters,
			}
		);

		const notifierModule = createModuleMocks(NotifierModule);

		const mockMe = meResponseFactory.build({ school: { id: "schoolId" } });
		const authModule = createModuleMocks(AuthModule, {
			getSchool: mockMe.school,
		});

		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getEnv: envsFactory.build(envs),
		});

		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);

		const wrapper = mount(ExternalToolSection, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					vueDompurifyHTMLPlugin,
				],

				provide: {
					[SCHOOL_EXTERNAL_TOOLS_MODULE_KEY.valueOf()]:
						schoolExternalToolsModule,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[AUTH_MODULE_KEY.valueOf()]: authModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
			},

			stubs: {
				VIcon: true,
			},
		});

		return {
			wrapper,
			schoolExternalToolsModule,
			notifierModule,
		};
	};

	beforeEach(() => {
		useSchoolExternalToolUsageMock =
			createMock<ReturnType<typeof useSchoolExternalToolUsage>>();

		jest
			.mocked(useSchoolExternalToolUsage)
			.mockReturnValue(useSchoolExternalToolUsageMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("when component is used", () => {
		it("should be found in the dom", () => {
			const { wrapper } = getWrapper();
			expect(wrapper.findComponent(ExternalToolSection).exists()).toBeTruthy();
		});
	});

	describe("onMounted is called", () => {
		describe("when component is mounted", () => {
			it("should load the external tools", () => {
				const { schoolExternalToolsModule } = getWrapper();

				expect(
					schoolExternalToolsModule.loadSchoolExternalTools
				).toHaveBeenCalledWith("schoolId");
			});
		});
	});

	describe("items is called", () => {
		const setupItems = () => {
			const firstToolName = "Test";
			const secondToolName = "Test2";
			const schoolExternalTool = schoolExternalToolFactory.build({
				id: "testId",
				toolId: "toolId",
				schoolId: "schoolId",
				parameters: [],
				name: firstToolName,
				status: schoolToolConfigurationStatusFactory.build(),
				isDeactivated: false,
			});

			const { wrapper, schoolExternalToolsModule } = getWrapper({
				getSchoolExternalTools: [
					schoolExternalTool,
					{
						id: "testId2",
						toolId: "toolId",
						schoolId: "schoolId",
						parameters: [],
						name: secondToolName,
						status: schoolToolConfigurationStatusFactory.build({
							isOutdatedOnScopeSchool: true,
						}),
						isDeactivated: false,
					},
					{
						id: "testId3",
						toolId: "toolId",
						schoolId: "schoolId",
						parameters: [],
						name: "Test3",
						status: schoolToolConfigurationStatusFactory.build({
							isGloballyDeactivated: true,
						}),
						isDeactivated: true,
					},
				],
			});

			const windowMock = createMock<Window>();
			jest.spyOn(window, "open").mockImplementation(() => windowMock);

			return {
				wrapper,
				schoolExternalToolsModule,
				firstToolName,
				secondToolName,
				schoolExternalTool,
			};
		};

		describe("when table is rendered", () => {
			it("should display dataTableHeaders in v-data-table", () => {
				const { wrapper } = setupItems();

				const vueWrapperArray = wrapper
					.findComponent({
						name: "v-data-table",
					})
					.findAll("th");

				expect(vueWrapperArray[0].find("span").text()).toEqual(
					"common.labels.name"
				);
				expect(vueWrapperArray[1].find("span").text()).toEqual(
					"components.administration.externalToolsSection.table.header.status"
				);
				expect(vueWrapperArray[2].find("span").text()).toEqual(
					"components.administration.externalToolsSection.table.header.restrictedTo"
				);
				expect(vueWrapperArray[3].find("span").text()).toEqual("");
			});
		});

		describe("when external tools were loaded", () => {
			it("names should be rendered in the datatable", () => {
				const { wrapper, firstToolName, secondToolName } = setupItems();

				const tableRows = wrapper
					.findComponent({
						name: "v-data-table",
					})
					.findAll("tr");
				const firstRow = tableRows[1].findAll("td");
				const secondRow = tableRows[2].findAll("td");

				expect(firstRow[0].text()).toEqual(firstToolName);
				expect(secondRow[0].text()).toEqual(secondToolName);
			});

			it("status should be rendered in the datatable", () => {
				const { wrapper } = setupItems();

				const tableRows = wrapper.find("tbody").findAll("tr");

				const firstRow = tableRows[0].findAll("td");
				const secondRow = tableRows[1].findAll("td");
				const thirdRow = tableRows[2].findAll("td");

				expect(true).toBeTruthy();
				expect(firstRow[1].find("span").text()).toEqual(
					"components.externalTools.status.latest"
				);
				expect(firstRow[1].html()).toContain(mdiCheckCircle);
				expect(secondRow[1].find("span").text()).toEqual(
					"components.externalTools.status.outdated"
				);
				expect(secondRow[1].html()).toContain(mdiAlert);
				expect(secondRow[1].find("span").text()).toEqual(
					"components.externalTools.status.outdated"
				);
				expect(thirdRow[1].html()).toContain(mdiAlert);
				expect(thirdRow[1].find("span").text()).toEqual(
					"components.externalTools.status.deactivated"
				);
			});

			describe("when actions buttons are rendered", () => {
				it("the buttons should be displayed", () => {
					const { wrapper } = setupItems();

					const tableRows = wrapper.find("tbody").findAll("tr");

					const firstRowButtons = tableRows[1].findAll("button");
					expect(
						firstRowButtons[0].classes().includes("v-btn--icon")
					).toBeTruthy();
					expect(
						firstRowButtons[1].classes().includes("v-btn--icon")
					).toBeTruthy();
					expect(
						firstRowButtons.at(2)?.classes().includes("v-btn--icon")
					).toBeTruthy();
				});

				it("should open a new tab with click on create datasheet", async () => {
					const { wrapper, schoolExternalTool } = setupItems();
					const toolId = schoolExternalTool.toolId;

					const tableRows = wrapper.find("tbody").findAll("tr");
					const firstRowButtons = tableRows.at(0)?.findAll("button");
					const datasheetButton = firstRowButtons?.at(
						createDatasheetButtonIndex
					);

					await datasheetButton!.trigger("click");
					await nextTick();

					expect(window.open).toHaveBeenCalledWith(
						`/api/v3/tools/external-tools/${toolId}/datasheet`
					);
				});

				it("a dialog should be displayed with click on delete", async () => {
					const { wrapper } = setupItems();

					const tableRows = wrapper.find("tbody").findAll("tr");
					const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

					await deleteButton.trigger("click");

					expect(wrapper.findComponent({ name: "v-dialog" })).toBeDefined();
					expect(wrapper.vm.isDeleteDialogOpen).toBeTruthy();
				});

				describe("when dialog is rendered", () => {
					it("should have tool name in text", async () => {
						const { wrapper } = setupItems();

						const tableRows = wrapper.find("tbody").findAll("tr");
						const deleteButton = tableRows[0].get(
							'[data-testid="deleteAction"]'
						);

						await deleteButton.trigger("click");

						expect(wrapper.find("p").html()).toContain(
							"components.administration.externalToolsSection.info"
						);
					});
				});

				describe("when deletion is confirmed", () => {
					it("should call externalToolsModule.deleteSchoolExternalTool", async () => {
						const { wrapper, schoolExternalToolsModule } = getWrapper({
							getSchoolExternalTools: [
								{
									id: "testId",
									toolId: "toolId",
									schoolId: "schoolId",
									parameters: [],
									name: "firstToolName",
									status: schoolToolConfigurationStatusFactory.build(),
									isDeactivated: false,
								},
							],
						});

						const tableRows = wrapper.find("tbody").findAll("tr");
						const deleteButton = tableRows[0].get(
							'[data-testid="deleteAction"]'
						);

						await deleteButton.trigger("click");

						const confirmButton = wrapper.getComponent(
							"[data-testId=delete-dialog-confirm]"
						);
						await confirmButton.trigger("click");

						expect(
							schoolExternalToolsModule.deleteSchoolExternalTool
						).toHaveBeenCalled();
					});

					it("should call notifierModule.show", async () => {
						const { wrapper, notifierModule } = getWrapper({
							getSchoolExternalTools: [
								{
									id: "testId",
									toolId: "toolId",
									schoolId: "schoolId",
									parameters: [],
									name: "firstToolName",
									status: schoolToolConfigurationStatusFactory.build(),
									isDeactivated: false,
								},
							],
						});

						const tableRows = wrapper.find("tbody").findAll("tr");
						const deleteButton = tableRows[0].get(
							'[data-testid="deleteAction"]'
						);

						await deleteButton.trigger("click");

						const confirmButton = wrapper.findComponent(
							"[data-testId='delete-dialog-confirm']"
						);
						await confirmButton.trigger("click");

						expect(notifierModule.show).toHaveBeenCalled();
					});
				});
			});
		});
	});

	describe("getItemName is called", () => {
		describe("when itemToDelete is set", () => {
			it("should return the name", () => {
				const { wrapper } = getWrapper();

				const expectedName = "Name";

				wrapper.vm.itemToDelete = {
					id: "id",
					name: expectedName,
					externalToolId: "externalToolId",
					statusText: "statusText",
					isOutdated: false,
					isDeactivated: false,
					restrictToContexts: "",
				};

				const itemName: string = wrapper.vm.getItemName;

				expect(itemName).toEqual(expectedName);
			});
		});

		describe("when itemToDelete is not set", () => {
			it("should return an empty string", () => {
				const { wrapper } = getWrapper();

				wrapper.vm.itemToDelete = undefined;

				const itemName: string = wrapper.vm.getItemName;

				expect(itemName).toEqual("");
			});
		});
	});

	describe("when deleting a schoolExternalTool", () => {
		describe("when metadata is given", () => {
			const setup = () => {
				const schoolExternalToolMetadata =
					schoolExternalToolMetadataFactory.build({ mediaBoard: 0 });

				useSchoolExternalToolUsageMock.metadata = ref(
					schoolExternalToolMetadata
				);

				const { wrapper, notifierModule } = getWrapper({
					getSchoolExternalTools: [
						schoolExternalToolFactory.build(),
						schoolExternalToolFactory.build(),
					],
				});

				return {
					wrapper,
					notifierModule,
					schoolExternalToolMetadata,
				};
			};

			it("should display delete dialog", async () => {
				const { wrapper } = setup();

				const tableRows = wrapper.find("tbody").findAll("tr");
				const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

				await deleteButton.trigger("click");

				const dialog = wrapper.findComponent({ name: "v-dialog" });

				expect(dialog.isVisible()).toEqual(true);
			});

			it("should display the delete dialog header", async () => {
				const { wrapper } = setup();

				const tableRows = wrapper.find("tbody").findAll("tr");
				const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

				await deleteButton.trigger("click");

				const cardText = wrapper.findComponent(VCardText);
				const headerDialogLine = cardText.find(
					'[data-testid="delete-dialog-content-header"]'
				);

				expect(headerDialogLine.exists()).toEqual(true);
				expect(headerDialogLine.getCurrentComponent()?.props.html).toEqual(
					"components.administration.externalToolsSection.dialog.content.header"
				);
			});

			it("should display dialogs for course tools and boards", async () => {
				const { wrapper, schoolExternalToolMetadata } = setup();
				const expectedCourseDialog = `${schoolExternalToolMetadata.course} common.tool.context.type.courses`;
				const expectedBoardDialog = `${schoolExternalToolMetadata.boardElement} common.tool.context.type.boardElements`;

				const tableRows = wrapper.find("tbody").findAll("tr");
				const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

				await deleteButton.trigger("click");

				const cardText = wrapper.findComponent(VCardText);
				const courseDialogLine = cardText.find(
					'[data-testid="delete-dialog-content-courses"]'
				);
				const boardDialogLine = cardText.find(
					'[data-testid="delete-dialog-content-board-elements"]'
				);

				expect(courseDialogLine.exists()).toEqual(true);
				expect(courseDialogLine.text()).toEqual(expectedCourseDialog);

				expect(boardDialogLine.exists()).toEqual(true);
				expect(boardDialogLine.text()).toEqual(expectedBoardDialog);
			});

			it("should display a blank line below the dialog for boards", async () => {
				const { wrapper } = setup();

				const tableRows = wrapper.find("tbody").findAll("tr");
				const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

				await deleteButton.trigger("click");

				const cardText = wrapper.findComponent(VCardText);
				const boardDialogLine = cardText.find(
					'[data-testid="delete-dialog-content-board-elements"]'
				);

				expect(boardDialogLine.exists()).toEqual(true);
				expect(boardDialogLine.classes()).not.toContain("mb-0");
			});

			it("should display the warning dialog line", async () => {
				const { wrapper } = setup();

				const tableRows = wrapper.find("tbody").findAll("tr");
				const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

				await deleteButton.trigger("click");

				const cardText = wrapper.findComponent(VCardText);
				const warningDialogLine = cardText.find(
					'[data-testid="delete-dialog-content-media-warning"]'
				);

				expect(warningDialogLine.exists()).toEqual(true);
				expect(warningDialogLine.getCurrentComponent()?.props.html).toEqual(
					"components.administration.externalToolsSection.dialog.content.warning"
				);
			});

			it("should not display notification", async () => {
				const { wrapper, notifierModule } = setup();

				const tableRows = wrapper.find("tbody").findAll("tr");
				const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

				await deleteButton.trigger("click");

				expect(notifierModule.show).not.toHaveBeenCalled();
			});
		});

		describe("when the tool is being used in media boards", () => {
			const setup = (isMediaShelfEnabled: boolean) => {
				const metadata: SchoolExternalToolMetadata = {
					course: 3,
					boardElement: 2,
					mediaBoard: 1,
				};

				const schoolExternalToolMetadata =
					schoolExternalToolMetadataFactory.build(metadata);

				useSchoolExternalToolUsageMock.metadata = ref(
					schoolExternalToolMetadata
				);

				const { wrapper } = getWrapper(
					{
						getSchoolExternalTools: [schoolExternalToolFactory.build()],
					},
					{
						FEATURE_MEDIA_SHELF_ENABLED: isMediaShelfEnabled,
					}
				);

				const expectedDialogText = `${metadata.mediaBoard} common.tool.context.type.mediaShelves`;

				return {
					wrapper,
					expectedDialogText,
				};
			};

			describe("when FEATURE_MEDIA_SHELF_ENABLED is true", () => {
				it("should show tool usage count for media board", async () => {
					const { wrapper, expectedDialogText } = setup(true);

					const tableRows = wrapper.find("tbody").findAll("tr");
					const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

					await deleteButton.trigger("click");

					const cardText = wrapper.findComponent(VCardText);
					const mediaBoardDialogLine = cardText.find(
						'[data-testid="delete-dialog-content-media-shelves"]'
					);

					expect(mediaBoardDialogLine.exists()).toEqual(true);
					expect(mediaBoardDialogLine.text()).toEqual(expectedDialogText);
				});

				it("should show a blank line below the media shelf dialog", async () => {
					const { wrapper } = setup(true);

					const tableRows = wrapper.find("tbody").findAll("tr");
					const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

					await deleteButton.trigger("click");

					const cardText = wrapper.findComponent(VCardText);
					const mediaBoardDialogLine = cardText.find(
						'[data-testid="delete-dialog-content-media-shelves"]'
					);

					expect(mediaBoardDialogLine.exists()).toEqual(true);
					expect(mediaBoardDialogLine.classes()).not.toContain("mb-0");
				});
			});

			describe("when FEATURE_MEDIA_SHELF_ENABLED is false", () => {
				it("should show tool usage count for media board", async () => {
					const { wrapper, expectedDialogText } = setup(false);

					const tableRows = wrapper.find("tbody").findAll("tr");
					const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

					await deleteButton.trigger("click");

					const cardText = wrapper.findComponent(VCardText);
					const mediaBoardDialogLine = cardText.find(
						'[data-testid="delete-dialog-content-media-shelves"]'
					);

					expect(mediaBoardDialogLine.exists()).toEqual(true);
					expect(mediaBoardDialogLine.text()).toEqual(expectedDialogText);
				});

				it("should show a blank line below the media shelf dialog", async () => {
					const { wrapper } = setup(false);

					const tableRows = wrapper.find("tbody").findAll("tr");
					const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

					await deleteButton.trigger("click");

					const cardText = wrapper.findComponent(VCardText);
					const mediaBoardDialogLine = cardText.find(
						'[data-testid="delete-dialog-content-media-shelves"]'
					);

					expect(mediaBoardDialogLine.exists()).toEqual(true);
					expect(mediaBoardDialogLine.classes()).not.toContain("mb-0");
				});
			});
		});

		describe("when the tool is not being used in media boards", () => {
			const setup = (isMediaShelfEnabled: boolean) => {
				const metadata: SchoolExternalToolMetadata = {
					course: 3,
					boardElement: 2,
					mediaBoard: 0,
				};

				const schoolExternalToolMetadata =
					schoolExternalToolMetadataFactory.build(metadata);

				useSchoolExternalToolUsageMock.metadata = ref(
					schoolExternalToolMetadata
				);

				const { wrapper } = getWrapper(
					{
						getSchoolExternalTools: [schoolExternalToolFactory.build()],
					},
					{
						FEATURE_MEDIA_SHELF_ENABLED: isMediaShelfEnabled,
					}
				);

				const expectedDialogText = `${metadata.mediaBoard} common.tool.context.type.mediaShelves`;

				return {
					wrapper,
					expectedDialogText,
				};
			};

			describe("when FEATURE_MEDIA_SHELF_ENABLED is true", () => {
				it("should show tool usage count for media board", async () => {
					const { wrapper, expectedDialogText } = setup(true);

					const tableRows = wrapper.find("tbody").findAll("tr");
					const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

					await deleteButton.trigger("click");

					const cardText = wrapper.findComponent(VCardText);
					const mediaBoardDialogLine = cardText.find(
						'[data-testid="delete-dialog-content-media-shelves"]'
					);

					expect(mediaBoardDialogLine.exists()).toEqual(true);
					expect(mediaBoardDialogLine.text()).toEqual(expectedDialogText);
				});

				it("should show a blank line below the media shelf dialog", async () => {
					const { wrapper } = setup(true);

					const tableRows = wrapper.find("tbody").findAll("tr");
					const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

					await deleteButton.trigger("click");

					const cardText = wrapper.findComponent(VCardText);
					const mediaBoardDialogLine = cardText.find(
						'[data-testid="delete-dialog-content-media-shelves"]'
					);

					expect(mediaBoardDialogLine.exists()).toEqual(true);
					expect(mediaBoardDialogLine.classes()).not.toContain("mb-0");
				});
			});

			describe("when FEATURE_MEDIA_SHELF_ENABLED is false", () => {
				it("should not show tool usage count for media board", async () => {
					const { wrapper } = setup(false);

					const tableRows = wrapper.find("tbody").findAll("tr");
					const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

					await deleteButton.trigger("click");

					const cardText = wrapper.findComponent(VCardText);
					const mediaBoardDialogLine = cardText.find(
						'[data-testid="delete-dialog-content-media-shelves"]'
					);

					expect(mediaBoardDialogLine.exists()).toEqual(false);
				});

				it("should show a blank line below the board elements dialog", async () => {
					const { wrapper } = setup(false);

					const tableRows = wrapper.find("tbody").findAll("tr");
					const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

					await deleteButton.trigger("click");

					const cardText = wrapper.findComponent(VCardText);
					const boardElementsDialogLine = cardText.find(
						'[data-testid="delete-dialog-content-board-elements"]'
					);

					expect(boardElementsDialogLine.classes()).not.toContain("mb-0");
				});
			});
		});

		describe("when metadata is undefined", () => {
			const setup = () => {
				useSchoolExternalToolUsageMock.metadata = ref(undefined);

				const { wrapper, notifierModule } = getWrapper({
					getSchoolExternalTools: [
						schoolExternalToolFactory.build({}),
						schoolExternalToolFactory.build(),
					],
				});

				return {
					wrapper,
					notifierModule,
				};
			};

			it("should not display delete dialog", async () => {
				const { wrapper } = setup();

				const tableRows = wrapper.find("tbody").findAll("tr");
				const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

				await deleteButton.trigger("click");

				const dialog = wrapper.find('[data-testid="delete-dialog"]');

				expect(dialog.exists()).toEqual(false);
			});

			it("should display notification", async () => {
				const { wrapper, notifierModule } = setup();

				const tableRows = wrapper.find("tbody").findAll("tr");
				const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

				await deleteButton.trigger("click");

				expect(notifierModule.show).toHaveBeenCalledWith({
					status: "error",
					text: "components.administration.externalToolsSection.dialog.content.metadata.error",
				});
			});
		});
	});
});
