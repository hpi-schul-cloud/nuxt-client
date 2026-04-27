import ExternalToolSection from "./ExternalToolSection.vue";
import VidisMediaSyncSection from "./VidisMediaSyncSection.vue";
import { SchoolExternalTool, SchoolExternalToolMetadata } from "@/store/external-tool";
import {
	createTestAppStoreWithSchool,
	createTestEnvStore,
	expectNotification,
	mockComposable,
	mockedPiniaStoreTyping,
	MockedStore,
} from "@@/tests/test-utils";
import {
	schoolExternalToolFactory,
	schoolExternalToolMetadataFactory,
	schoolToolConfigurationStatusFactory,
} from "@@/tests/test-utils/factory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ConfigResponse, ExternalToolMediumStatus, MediaSourceLicenseType } from "@api-server";
import { useNotificationStore } from "@data-app";
import { useSchoolExternalTools, useSchoolExternalToolUsage } from "@data-external-tool";
import { useSchoolLicenseStore } from "@data-license";
import { mdiAlert, mdiCheckCircle } from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { expect, Mocked } from "vitest";
import { nextTick, ref } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { VCardText, VDataTable, VIcon } from "vuetify/components";

vi.mock("@data-external-tool/SchoolExternalToolUsage.composable.ts");
const mockedSchoolExternalToolUsage = vi.mocked(useSchoolExternalToolUsage);

vi.mock("@data-external-tool/school-external-tools.composable.ts");

describe("ExternalToolSection", () => {
	const schoolId = "schoolId";
	let el: HTMLDivElement;

	let useSchoolExternalToolUsageMock: Mocked<ReturnType<typeof useSchoolExternalToolUsage>>;
	let schoolLicenseStore: MockedStore<typeof useSchoolLicenseStore>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		schoolLicenseStore = mockedPiniaStoreTyping(useSchoolLicenseStore);
	});

	const createDatasheetButtonIndex = 1;

	const setup = (
		options?: Partial<{
			schoolExternalTools: SchoolExternalTool[];
			envs: Partial<ConfigResponse>;
		}>
	) => {
		createTestAppStoreWithSchool(schoolId);
		createTestEnvStore(options?.envs);

		injectRouterMock(createRouterMock());

		const useSchoolExternalToolsMock = mockComposable(useSchoolExternalTools, {
			schoolExternalTools: ref(options?.schoolExternalTools || []),
			loadSchoolExternalTools: vi.fn(),
		});
		vi.mocked(useSchoolExternalTools).mockReturnValue(useSchoolExternalToolsMock);

		const wrapper = mount(ExternalToolSection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper, useSchoolExternalToolsMock };
	};

	beforeEach(() => {
		useSchoolExternalToolUsageMock = mockComposable(useSchoolExternalToolUsage);

		useSchoolExternalToolUsageMock.metadata = ref(schoolExternalToolMetadataFactory.build());

		mockedSchoolExternalToolUsage.mockReturnValue(useSchoolExternalToolUsageMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when component is used", () => {
		it("should be found in the dom", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(ExternalToolSection).exists()).toBeTruthy();
		});
	});

	describe("onMounted is called", () => {
		describe("when component is mounted", () => {
			it("should load the external tools", () => {
				const { useSchoolExternalToolsMock } = setup();

				expect(useSchoolExternalToolsMock.loadSchoolExternalTools).toHaveBeenCalledWith(schoolId);
			});

			it("should load the school licenses", () => {
				setup();

				expect(schoolLicenseStore.fetchMediaSchoolLicenses).toHaveBeenCalled();
			});
		});
	});

	describe("items is called", () => {
		// const setupItems = () => {
		// 	const firstToolName = "Test";
		// 	const secondToolName = "Test2";
		// 	const schoolExternalTool = schoolExternalToolFactory.build({
		// 		id: "testId",
		// 		toolId: "toolId",
		// 		schoolId,
		// 		parameters: [],
		// 		name: firstToolName,
		// 		status: schoolToolConfigurationStatusFactory.build(),
		// 		isDeactivated: false,
		// 		medium: {
		// 			mediumId: "tool1",
		// 			mediaSourceId: "licensedSource",
		// 			mediaSourceName: "Medium Source Name",
		// 			mediaSourceLicenseType: MediaSourceLicenseType.SCHOOL_LICENSE,
		// 		},
		// 	});

		// 	schoolLicenseStore.isLicensed.mockReturnValueOnce(true);
		// 	schoolLicenseStore.isLicensed.mockReturnValue(false);

		// 	const { wrapper, schoolExternalToolsModule } = getWrapper(
		// 		{
		// 			getSchoolExternalTools: [
		// 				schoolExternalTool,
		// 				{
		// 					id: "testId2",
		// 					toolId: "toolId",
		// 					schoolId,
		// 					parameters: [],
		// 					name: secondToolName,
		// 					status: schoolToolConfigurationStatusFactory.build({
		// 						isOutdatedOnScopeSchool: true,
		// 					}),
		// 					isDeactivated: false,
		// 					medium: {
		// 						status: ExternalToolMediumStatus.ACTIVE,
		// 						mediumId: "tool2",
		// 						mediaSourceId: "notLicensedSource",
		// 						mediaSourceName: undefined,
		// 						mediaSourceLicenseType: MediaSourceLicenseType.SCHOOL_LICENSE,
		// 					},
		// 				},
		// 				{
		// 					id: "testId3",
		// 					toolId: "toolId",
		// 					schoolId,
		// 					parameters: [],
		// 					name: "Test3",
		// 					status: schoolToolConfigurationStatusFactory.build({
		// 						isGloballyDeactivated: true,
		// 					}),
		// 					isDeactivated: true,
		// 					medium: undefined,
		// 				},
		// 			],
		// 		},
		// 		{
		// 			FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED: true,
		// 		}
		// 	);

		// 	const windowMock = mock<Window>();
		// 	vi.spyOn(window, "open").mockImplementation(() => windowMock);

		// 	return {
		// 		wrapper,
		// 		schoolExternalToolsModule,
		// 		firstToolName,
		// 		secondToolName,
		// 		schoolExternalTool,
		// 	};
		// };

		const setupItems = () => {
			// TODO: think about medium factory
			const firstTool = schoolExternalToolFactory.build({
				medium: {
					mediumId: "tool1",
					mediaSourceId: "licensedSource",
					mediaSourceName: "Medium Source Name",
					mediaSourceLicenseType: MediaSourceLicenseType.USER_LICENSE,
				},
			});
			const secondTool = schoolExternalToolFactory.build({
				medium: {
					status: ExternalToolMediumStatus.ACTIVE,
					mediumId: "tool2",
					mediaSourceId: "notLicensedSource",
					mediaSourceName: undefined,
					mediaSourceLicenseType: MediaSourceLicenseType.SCHOOL_LICENSE,
				},
			});

			const thirdTool = schoolExternalToolFactory.build({});

			const schoolExternalTools = [firstTool, secondTool, thirdTool];

			return {
				schoolExternalTools,
				firstTool,
				secondTool,
				thirdTool,
			};
		};

		describe("when table is rendered", () => {
			it("should display dataTableHeaders in v-data-table", () => {
				const { schoolExternalTools } = setupItems();
				const { wrapper } = setup({
					schoolExternalTools,
					envs: { FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED: true },
				});
				const dataTable = wrapper.findComponent(VDataTable);

				const expectedHeaders = [
					"common.labels.name",
					"components.administration.externalToolsSection.table.header.status",
					"components.administration.externalToolsSection.table.header.medium",
					"components.administration.externalToolsSection.table.header.restrictedTo",
					"",
				];

				expect(dataTable.props("headers")!.map((header) => header.title)).toEqual(expectedHeaders);
			});
		});

		describe("when external tools were loaded", () => {
			it("names should be rendered in the datatable", () => {
				const { schoolExternalTools, firstTool, secondTool } = setupItems();
				const { wrapper } = setup({
					schoolExternalTools,
					envs: { FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED: true },
				});

				const dataTable = wrapper.findComponent(VDataTable);
				const itemNames = dataTable.props("items")!.map((item) => item.name);

				expect(itemNames).toEqual([firstTool.name, secondTool.name]);
			});

			it("status should be rendered in the datatable", () => {
				const { schoolExternalTools } = setupItems();
				const { wrapper } = setup({
					schoolExternalTools,
					envs: { FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED: true },
				});

				const dataTable = wrapper.findComponent(VDataTable);
				const statusTexts = dataTable.props("items")!.map((item) => item.statusText);

				expect(statusTexts).toEqual([
					"components.externalTools.status.latest",
					"components.externalTools.status.outdated",
					"components.externalTools.status.deactivated",
				]);
			});

			it("medium status should be rendered in the datatable", () => {
				const { schoolExternalTools, firstTool } = setupItems();
				const { wrapper } = setup({
					schoolExternalTools,
					envs: { FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED: true },
				});

				const dataTable = wrapper.findComponent(VDataTable);
				const externalToolMediaStatus = dataTable.findAll('[data-testid="external-tool-medium"]');

				const expectedMediumStatuses = [
					{ icon: mdiCheckCircle, text: firstTool.medium?.mediaSourceName },
					{ icon: mdiAlert, text: "pages.tool.medium.noMediaSource" },
					{ icon: null, text: "-" },
				];

				expect(
					externalToolMediaStatus.map((cell) => ({
						text: cell.text(),
						icon: cell.findComponent(VIcon).exists() ? cell.findComponent(VIcon).props("icon") : null,
					}))
				).toEqual(expectedMediumStatuses);
			});

			describe("when actions buttons are rendered", () => {
				it("the buttons should be displayed", () => {
					const { wrapper } = setupItems();

					const tableRows = wrapper.find("tbody").findAll("tr");

					const firstRowButtons = tableRows[1].findAll("button");
					expect(firstRowButtons[0].classes().includes("v-btn--icon")).toBeTruthy();
					expect(firstRowButtons[1].classes().includes("v-btn--icon")).toBeTruthy();
					expect(firstRowButtons.at(2)?.classes().includes("v-btn--icon")).toBeTruthy();
				});

				it("should open a new tab with click on create datasheet", async () => {
					const { wrapper, schoolExternalTool } = setupItems();
					const toolId = schoolExternalTool.toolId;

					const tableRows = wrapper.find("tbody").findAll("tr");
					const firstRowButtons = tableRows.at(0)?.findAll("button");
					const datasheetButton = firstRowButtons?.at(createDatasheetButtonIndex);

					await datasheetButton!.trigger("click");
					await nextTick();

					expect(window.open).toHaveBeenCalledWith(`/api/v3/tools/external-tools/${toolId}/datasheet`);
				});

				it("a dialog should be displayed with click on delete", async () => {
					const { wrapper } = setupItems();

					const tableRows = wrapper.find("tbody").findAll("tr");
					const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

					await deleteButton.trigger("click");

					expect(wrapper.findComponent({ name: "v-dialog" })).toBeDefined();

					expect((wrapper.vm as unknown as typeof ExternalToolSection).isDeleteDialogOpen).toBeTruthy();
				});

				describe("when dialog is rendered", () => {
					it("should have tool name in text", async () => {
						const { wrapper } = setupItems();

						const tableRows = wrapper.find("tbody").findAll("tr");
						const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

						await deleteButton.trigger("click");

						expect(wrapper.find("p").html()).toContain("components.administration.externalToolsSection.info");
					});
				});

				describe("when deletion is confirmed", () => {
					it("should call externalToolsModule.deleteSchoolExternalTool", async () => {
						const { wrapper, schoolExternalToolsModule } = getWrapper({
							getSchoolExternalTools: [
								{
									id: "testId",
									toolId: "toolId",
									schoolId,
									parameters: [],
									name: "firstToolName",
									status: schoolToolConfigurationStatusFactory.build(),
									isDeactivated: false,
								},
							],
						});

						const tableRows = wrapper.find("tbody").findAll("tr");
						const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

						await deleteButton.trigger("click");

						const confirmButton = wrapper.getComponent("[data-testId=delete-dialog-confirm]");
						await confirmButton.trigger("click");

						expect(schoolExternalToolsModule.deleteSchoolExternalTool).toHaveBeenCalled();
					});

					it("should call notifySuccess", async () => {
						const { wrapper } = getWrapper({
							getSchoolExternalTools: [
								{
									id: "testId",
									toolId: "toolId",
									schoolId,
									parameters: [],
									name: "firstToolName",
									status: schoolToolConfigurationStatusFactory.build(),
									isDeactivated: false,
								},
							],
						});

						const tableRows = wrapper.find("tbody").findAll("tr");
						const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

						await deleteButton.trigger("click");

						const confirmButton = wrapper.findComponent("[data-testId='delete-dialog-confirm']");
						await confirmButton.trigger("click");
						expect(useNotificationStore().notify).toHaveBeenCalled();
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
				const wrapperVm = wrapper.vm as unknown as typeof ExternalToolSection;

				wrapperVm.itemToDelete = {
					id: "id",
					name: expectedName,
					externalToolId: "externalToolId",
					statusText: "statusText",
					isOutdated: false,
					isDeactivated: false,
					restrictToContexts: "",
				};

				const itemName: string = wrapperVm.getItemName;

				expect(itemName).toEqual(expectedName);
			});
		});

		describe("when itemToDelete is not set", () => {
			it("should return an empty string", () => {
				const { wrapper } = getWrapper();

				const wrapperVm = wrapper.vm as unknown as typeof ExternalToolSection;

				wrapperVm.itemToDelete = undefined;

				const itemName: string = wrapperVm.getItemName;

				expect(itemName).toEqual("");
			});
		});
	});

	describe("when deleting a schoolExternalTool", () => {
		describe("when metadata is given", () => {
			const setup = () => {
				const schoolExternalToolMetadata = schoolExternalToolMetadataFactory.build({ mediaBoard: 0 });

				useSchoolExternalToolUsageMock.metadata = ref(schoolExternalToolMetadata);

				const { wrapper } = getWrapper({
					getSchoolExternalTools: [schoolExternalToolFactory.build(), schoolExternalToolFactory.build()],
				});

				return {
					wrapper,
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
				expect(cardText.text()).toContain("components.administration.externalToolsSection.dialog.content.header");
			});

			it("should display dialogs for course tools and boards", async () => {
				const { wrapper, schoolExternalToolMetadata } = setup();
				const expectedCourseDialog = `common.tool.context.type.courses (${schoolExternalToolMetadata.course})`;
				const expectedBoardDialog = `common.tool.context.type.boardElements (${schoolExternalToolMetadata.boardElement})`;

				const tableRows = wrapper.find("tbody").findAll("tr");
				const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

				await deleteButton.trigger("click");

				const cardText = wrapper.findComponent(VCardText);
				const courseDialogLine = cardText.find('[data-testid="delete-dialog-content-courses"]');
				const boardDialogLine = cardText.find('[data-testid="delete-dialog-content-board-elements"]');

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
				const boardDialogLine = cardText.find('[data-testid="delete-dialog-content-board-elements"]');

				expect(boardDialogLine.exists()).toEqual(true);
				expect(boardDialogLine.classes()).not.toContain("mb-0");
			});

			it("should display the warning dialog line", async () => {
				const { wrapper } = setup();

				const tableRows = wrapper.find("tbody").findAll("tr");
				const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

				await deleteButton.trigger("click");

				const cardText = wrapper.findComponent(VCardText);
				const warningDialogLine = cardText.find('[data-testid="delete-dialog-content-media-warning"]');

				expect(warningDialogLine.exists()).toEqual(true);
				expect(warningDialogLine.text()).toEqual(
					"components.administration.externalToolsSection.dialog.content.warning"
				);
			});

			it("should not display notification", async () => {
				const { wrapper } = setup();

				const tableRows = wrapper.find("tbody").findAll("tr");
				const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

				await deleteButton.trigger("click");

				expect(useNotificationStore().notify).not.toHaveBeenCalled();
			});
		});

		describe("when the tool is being used in media boards", () => {
			const setup = (isMediaShelfEnabled: boolean) => {
				const metadata: SchoolExternalToolMetadata = {
					course: 3,
					boardElement: 2,
					mediaBoard: 1,
				};

				const schoolExternalToolMetadata = schoolExternalToolMetadataFactory.build(metadata);

				useSchoolExternalToolUsageMock.metadata = ref(schoolExternalToolMetadata);

				const { wrapper } = getWrapper(
					{
						getSchoolExternalTools: [schoolExternalToolFactory.build()],
					},
					{
						FEATURE_MEDIA_SHELF_ENABLED: isMediaShelfEnabled,
					}
				);

				const expectedDialogText = `common.tool.context.type.mediaShelves (${metadata.mediaBoard})`;

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
					const mediaBoardDialogLine = cardText.find('[data-testid="delete-dialog-content-media-shelves"]');

					expect(mediaBoardDialogLine.exists()).toEqual(true);
					expect(mediaBoardDialogLine.text()).toEqual(expectedDialogText);
				});

				it("should show a blank line below the media shelf dialog", async () => {
					const { wrapper } = setup(true);

					const tableRows = wrapper.find("tbody").findAll("tr");
					const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

					await deleteButton.trigger("click");

					const cardText = wrapper.findComponent(VCardText);
					const mediaBoardDialogLine = cardText.find('[data-testid="delete-dialog-content-media-shelves"]');

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
					const mediaBoardDialogLine = cardText.find('[data-testid="delete-dialog-content-media-shelves"]');

					expect(mediaBoardDialogLine.exists()).toEqual(true);
					expect(mediaBoardDialogLine.text()).toEqual(expectedDialogText);
				});

				it("should show a blank line below the media shelf dialog", async () => {
					const { wrapper } = setup(false);

					const tableRows = wrapper.find("tbody").findAll("tr");
					const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

					await deleteButton.trigger("click");

					const cardText = wrapper.findComponent(VCardText);
					const mediaBoardDialogLine = cardText.find('[data-testid="delete-dialog-content-media-shelves"]');

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

				const schoolExternalToolMetadata = schoolExternalToolMetadataFactory.build(metadata);

				useSchoolExternalToolUsageMock.metadata = ref(schoolExternalToolMetadata);

				const { wrapper } = getWrapper(
					{
						getSchoolExternalTools: [schoolExternalToolFactory.build()],
					},
					{
						FEATURE_MEDIA_SHELF_ENABLED: isMediaShelfEnabled,
					}
				);

				const expectedDialogText = `common.tool.context.type.mediaShelves (${metadata.mediaBoard})`;

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
					const mediaBoardDialogLine = cardText.find('[data-testid="delete-dialog-content-media-shelves"]');

					expect(mediaBoardDialogLine.exists()).toEqual(true);
					expect(mediaBoardDialogLine.text()).toEqual(expectedDialogText);
				});

				it("should show a blank line below the media shelf dialog", async () => {
					const { wrapper } = setup(true);

					const tableRows = wrapper.find("tbody").findAll("tr");
					const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

					await deleteButton.trigger("click");

					const cardText = wrapper.findComponent(VCardText);
					const mediaBoardDialogLine = cardText.find('[data-testid="delete-dialog-content-media-shelves"]');

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
					const mediaBoardDialogLine = cardText.find('[data-testid="delete-dialog-content-media-shelves"]');

					expect(mediaBoardDialogLine.exists()).toEqual(false);
				});

				it("should show a blank line below the board elements dialog", async () => {
					const { wrapper } = setup(false);

					const tableRows = wrapper.find("tbody").findAll("tr");
					const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

					await deleteButton.trigger("click");

					const cardText = wrapper.findComponent(VCardText);
					const boardElementsDialogLine = cardText.find('[data-testid="delete-dialog-content-board-elements"]');

					expect(boardElementsDialogLine.classes()).not.toContain("mb-0");
				});
			});
		});

		describe("when metadata is undefined", () => {
			const setup = () => {
				useSchoolExternalToolUsageMock.metadata = ref(undefined);

				const { wrapper } = getWrapper({
					getSchoolExternalTools: [schoolExternalToolFactory.build({}), schoolExternalToolFactory.build()],
				});

				return {
					wrapper,
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
				const { wrapper } = setup();

				const tableRows = wrapper.find("tbody").findAll("tr");
				const deleteButton = tableRows[0].get('[data-testid="deleteAction"]');

				await deleteButton.trigger("click");

				expectNotification("error");
			});
		});
	});

	describe("VIDIS section", () => {
		describe("when VIDIS is enabled", () => {
			const setup = () => {
				const { wrapper } = getWrapper(
					{},
					{
						FEATURE_VIDIS_MEDIA_ACTIVATIONS_ENABLED: true,
					}
				);

				return {
					wrapper,
				};
			};

			it("should display the VIDIS section", () => {
				const { wrapper } = setup();

				const vidisSection = wrapper.findComponent(VidisMediaSyncSection);

				expect(vidisSection.exists()).toEqual(true);
			});
		});

		describe("when VIDIS is disabled", () => {
			const setup = () => {
				const { wrapper } = getWrapper(
					{},
					{
						FEATURE_VIDIS_MEDIA_ACTIVATIONS_ENABLED: false,
					}
				);

				return {
					wrapper,
				};
			};

			it("should not display the VIDIS section", () => {
				const { wrapper } = setup();

				const vidisSection = wrapper.findComponent(VidisMediaSyncSection);

				expect(vidisSection.exists()).toEqual(false);
			});
		});
	});
});
