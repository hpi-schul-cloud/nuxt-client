import ExternalToolSection from "./ExternalToolSection.vue";
import ExternalToolToolbar from "./ExternalToolToolbar.vue";
import VidisMediaSyncSection from "./VidisMediaSyncSection.vue";
import { SchoolExternalTool } from "@/store/external-tool";
import {
	createTestAppStoreWithSchool,
	createTestEnvStore,
	expectNotification,
	mockComposable,
	mockedPiniaStoreTyping,
	MockedStore,
} from "@@/tests/test-utils";
import { schoolExternalToolFactory, schoolExternalToolMetadataFactory } from "@@/tests/test-utils/factory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ConfigResponse, ExternalToolMediumStatus, MediaSourceLicenseType } from "@api-server";
import { useSchoolExternalTools, useSchoolExternalToolUsage } from "@data-external-tool";
import { useSchoolLicenseStore } from "@data-license";
import { mdiAlert, mdiCheckCircle } from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { flushPromises, mount, VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { expect, Mocked } from "vitest";
import { ref } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { VCardText, VDataTable, VIcon } from "vuetify/components";

vi.mock("@data-external-tool/SchoolExternalToolUsage.composable.ts");
const mockedSchoolExternalToolUsage = vi.mocked(useSchoolExternalToolUsage);

vi.mock("@data-external-tool/school-external-tools.composable.ts");

describe("ExternalToolSection", () => {
	let useSchoolExternalToolUsageMock: Mocked<ReturnType<typeof useSchoolExternalToolUsage>>;
	let schoolLicenseStore: MockedStore<typeof useSchoolLicenseStore>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		schoolLicenseStore = mockedPiniaStoreTyping(useSchoolLicenseStore);

		useSchoolExternalToolUsageMock = mockComposable(useSchoolExternalToolUsage);
		useSchoolExternalToolUsageMock.metadata = ref(schoolExternalToolMetadataFactory.build());
		mockedSchoolExternalToolUsage.mockReturnValue(useSchoolExternalToolUsageMock);
	});

	const setup = (
		options?: Partial<{
			schoolExternalTools: SchoolExternalTool[];
			envs: Partial<ConfigResponse>;
		}>
	) => {
		const schoolId = "schoolId";
		createTestAppStoreWithSchool(schoolId);
		createTestEnvStore(options?.envs);

		injectRouterMock(createRouterMock());

		const { schoolExternalTools } = {
			schoolExternalTools: schoolExternalToolFactory.buildList(2),
			...options,
		};

		const useSchoolExternalToolsMock = mockComposable(useSchoolExternalTools, {
			schoolExternalTools: ref(schoolExternalTools),
		});
		vi.mocked(useSchoolExternalTools).mockReturnValue(useSchoolExternalToolsMock);

		const wrapper = mount(ExternalToolSection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper, useSchoolExternalToolsMock, schoolId, schoolExternalTools };
	};

	afterEach(() => {
		vi.clearAllMocks();
	});

	const openfirstElementDeleteDialog = async (wrapper: VueWrapper) => {
		const firstElementToolbar = wrapper.findComponent(ExternalToolToolbar);
		firstElementToolbar.vm.$emit("delete");
		await flushPromises();
	};

	describe("when component is used", () => {
		it("should be found in the dom", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(ExternalToolSection).exists()).toBeTruthy();
		});
	});

	describe("onMounted is called", () => {
		describe("when component is mounted", () => {
			it("should load the external tools", () => {
				const { useSchoolExternalToolsMock, schoolId } = setup();

				expect(useSchoolExternalToolsMock.loadSchoolExternalTools).toHaveBeenCalledWith(schoolId);
			});

			it("should load the school licenses", () => {
				setup();

				expect(schoolLicenseStore.fetchMediaSchoolLicenses).toHaveBeenCalled();
			});
		});
	});

	describe("items is called", () => {
		describe("when table is rendered", () => {
			it("should display dataTableHeaders in data table", () => {
				const { wrapper } = setup({
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
				const schoolExternalTools = schoolExternalToolFactory.buildList(3);
				const { wrapper } = setup({
					schoolExternalTools,
					envs: { FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED: true },
				});
				const dataTable = wrapper.findComponent(VDataTable);
				const externalToolMediaNames = dataTable
					.findAll('[data-testid="external-tool-name"]')
					.map((item) => item.text());

				expect(externalToolMediaNames).toEqual(schoolExternalTools.map((tool) => tool.name));
			});

			it("status should be rendered in the datatable", () => {
				const deactivatedTool = schoolExternalToolFactory.build({ status: { isGloballyDeactivated: true } });
				const outdatedTool = schoolExternalToolFactory.build({ status: { isOutdatedOnScopeSchool: true } });

				const { wrapper } = setup({
					schoolExternalTools: [schoolExternalToolFactory.build(), outdatedTool, deactivatedTool],
					envs: { FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED: true },
				});
				const dataTable = wrapper.findComponent(VDataTable);
				const externalToolMediaStatuses = dataTable.findAll('[data-testid="external-tool-status"]');

				const expectedMediaStatuses = [
					{ icon: mdiCheckCircle, text: "components.externalTools.status.latest" },
					{ icon: mdiAlert, text: "components.externalTools.status.outdated" },
					{ icon: mdiAlert, text: "components.externalTools.status.deactivated" },
				];

				expect(
					externalToolMediaStatuses.map((cell) => ({
						icon: cell.findComponent(VIcon).props("icon"),
						text: cell.text(),
					}))
				).toEqual(expectedMediaStatuses);
			});

			it("medium status should be rendered in the datatable", () => {
				const toolWithMediaSourceName = schoolExternalToolFactory.build({
					medium: {
						mediumId: "tool1",
						mediaSourceId: "licensedSource",
						mediaSourceName: "Medium Source Name",
						mediaSourceLicenseType: MediaSourceLicenseType.USER_LICENSE,
					},
				});

				const toolWithoutSourceName = schoolExternalToolFactory.build({
					medium: {
						status: ExternalToolMediumStatus.ACTIVE,
						mediumId: "tool2",
						mediaSourceId: "notLicensedSource",
						mediaSourceName: undefined,
						mediaSourceLicenseType: MediaSourceLicenseType.SCHOOL_LICENSE,
					},
				});
				const toolWithoutMedium = schoolExternalToolFactory.build({ medium: undefined });

				const { wrapper } = setup({
					schoolExternalTools: [toolWithMediaSourceName, toolWithoutSourceName, toolWithoutMedium],
					envs: { FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED: true },
				});

				const dataTable = wrapper.findComponent(VDataTable);
				const externalToolMediumStatuses = dataTable.findAll('[data-testid="external-tool-medium"]');

				const expectedMediumStatuses = [
					{ icon: mdiCheckCircle, text: toolWithMediaSourceName.medium?.mediaSourceName },
					{ icon: mdiAlert, text: "pages.tool.medium.noMediaSource" },
					{ icon: null, text: "-" },
				];

				expect(
					externalToolMediumStatuses.map((cell) => ({
						text: cell.text(),
						icon: cell.findComponent(VIcon).exists() ? cell.findComponent(VIcon).props("icon") : null,
					}))
				).toEqual(expectedMediumStatuses);
			});

			describe("when actions buttons are rendered", () => {
				it("the external tool bar should be displayed", () => {
					const { wrapper } = setup();

					const externalToolBar = wrapper.findComponent(ExternalToolToolbar);
					expect(externalToolBar.exists()).toBe(true);
				});

				it("should open a new tab with click on create datasheet", async () => {
					window.open = vi.fn();
					const { wrapper, schoolExternalTools } = setup();

					const firstElementToolbar = wrapper.getComponent(ExternalToolToolbar);
					firstElementToolbar.vm.$emit("datasheet");
					await flushPromises();

					expect(window.open).toHaveBeenCalledWith(
						`/api/v3/tools/external-tools/${schoolExternalTools[0].toolId}/datasheet`
					);
				});

				it("a dialog should be displayed with click on delete", async () => {
					const { wrapper } = setup();

					await openfirstElementDeleteDialog(wrapper);

					const dialog = wrapper.findComponent(SvsDialog);
					expect(dialog.props("modelValue")).toBe(true);
				});

				describe("when deletion is confirmed", () => {
					it("should call deleteSchoolExternalTool", async () => {
						const { wrapper, useSchoolExternalToolsMock } = setup();

						await openfirstElementDeleteDialog(wrapper);

						const dialog = wrapper.getComponent(SvsDialog);
						dialog.vm.$emit("confirm");
						await flushPromises();

						expect(useSchoolExternalToolsMock.deleteSchoolExternalTool).toHaveBeenCalled();
					});

					it("should close dialog", async () => {
						const { wrapper } = setup();

						await openfirstElementDeleteDialog(wrapper);

						const dialog = wrapper.getComponent(SvsDialog);
						dialog.vm.$emit("confirm");
						await flushPromises();

						expect(dialog.props("modelValue")).toBe(false);
					});
				});
			});
		});
	});

	describe("getItemName is called", () => {
		describe("when itemToDelete is set", () => {
			it("should return the name", () => {
				const { wrapper } = setup();

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
				const { wrapper } = setup();

				const wrapperVm = wrapper.vm as unknown as typeof ExternalToolSection;

				wrapperVm.itemToDelete = undefined;

				const itemName: string = wrapperVm.getItemName;

				expect(itemName).toEqual("");
			});
		});
	});

	describe("when deleting a schoolExternalTool", () => {
		describe("when metadata is given", () => {
			beforeEach(() => {
				useSchoolExternalToolUsageMock.metadata = ref(schoolExternalToolMetadataFactory.build());
			});

			it("should display delete dialog", async () => {
				const { wrapper } = setup();

				await openfirstElementDeleteDialog(wrapper);

				const dialog = wrapper.findComponent(SvsDialog);
				expect(dialog.exists()).toEqual(true);
			});

			it("should display the delete dialog header", async () => {
				const { wrapper } = setup();

				await openfirstElementDeleteDialog(wrapper);

				const cardText = wrapper.findComponent(VCardText);
				expect(cardText.text()).toContain("components.administration.externalToolsSection.dialog.content.header");
			});

			it("should display dialogs for course tools and boards", async () => {
				const { wrapper } = setup();

				await openfirstElementDeleteDialog(wrapper);

				const cardText = wrapper.findComponent(VCardText);
				const courseDialogLine = cardText.get('[data-testid="delete-dialog-content-courses"]');
				const boardDialogLine = cardText.get('[data-testid="delete-dialog-content-board-elements"]');

				expect(courseDialogLine.text()).toEqual(
					`common.tool.context.type.courses (${useSchoolExternalToolUsageMock.metadata.value?.course})`
				);
				expect(boardDialogLine.text()).toEqual(
					`common.tool.context.type.boardElements (${useSchoolExternalToolUsageMock.metadata.value?.boardElement})`
				);
			});

			it("should display a blank line below the dialog for boards", async () => {
				const { wrapper } = setup();

				await openfirstElementDeleteDialog(wrapper);

				const cardText = wrapper.findComponent(VCardText);
				const boardDialogLine = cardText.find('[data-testid="delete-dialog-content-board-elements"]');

				expect(boardDialogLine.exists()).toEqual(true);
			});

			it("should display the warning dialog line", async () => {
				const { wrapper } = setup();

				await openfirstElementDeleteDialog(wrapper);

				const cardText = wrapper.findComponent(VCardText);
				const warningDialogLine = cardText.find('[data-testid="delete-dialog-content-media-warning"]');

				expect(warningDialogLine.exists()).toEqual(true);
				expect(warningDialogLine.text()).toEqual(
					"components.administration.externalToolsSection.dialog.content.warning"
				);
			});
		});

		describe("when the tool is being used in media boards", () => {
			let expectedDialogText: string;
			beforeEach(() => {
				const schoolExternalToolMetadata = schoolExternalToolMetadataFactory.build({
					mediaBoard: 1,
				});
				useSchoolExternalToolUsageMock.metadata = ref(schoolExternalToolMetadata);
				expectedDialogText = `common.tool.context.type.mediaShelves (${schoolExternalToolMetadata.mediaBoard})`;
			});

			describe("when FEATURE_MEDIA_SHELF_ENABLED is true", () => {
				it("should show tool usage count for media board", async () => {
					const { wrapper } = setup({
						envs: { FEATURE_MEDIA_SHELF_ENABLED: true },
					});

					await openfirstElementDeleteDialog(wrapper);

					const cardText = wrapper.findComponent(VCardText);
					const mediaBoardDialogLine = cardText.find('[data-testid="delete-dialog-content-media-shelves"]');

					expect(mediaBoardDialogLine.exists()).toEqual(true);
					expect(mediaBoardDialogLine.text()).toEqual(expectedDialogText);
				});
			});

			describe("when FEATURE_MEDIA_SHELF_ENABLED is false", () => {
				it("should show tool usage count for media board", async () => {
					const { wrapper } = setup({
						envs: { FEATURE_MEDIA_SHELF_ENABLED: false },
					});

					await openfirstElementDeleteDialog(wrapper);

					const cardText = wrapper.findComponent(VCardText);
					const mediaBoardDialogLine = cardText.find('[data-testid="delete-dialog-content-media-shelves"]');

					expect(mediaBoardDialogLine.exists()).toEqual(true);
					expect(mediaBoardDialogLine.text()).toEqual(expectedDialogText);
				});
			});
		});

		describe("when the tool is not being used in media boards", () => {
			let expectedDialogText: string;
			beforeEach(() => {
				const schoolExternalToolMetadata = schoolExternalToolMetadataFactory.build({
					mediaBoard: 0,
				});
				useSchoolExternalToolUsageMock.metadata = ref(schoolExternalToolMetadata);
				expectedDialogText = `common.tool.context.type.mediaShelves (${schoolExternalToolMetadata.mediaBoard})`;
			});

			describe("when FEATURE_MEDIA_SHELF_ENABLED is true", () => {
				it("should show tool usage count for media board", async () => {
					const { wrapper } = setup({
						envs: { FEATURE_MEDIA_SHELF_ENABLED: true },
					});

					await openfirstElementDeleteDialog(wrapper);

					const cardText = wrapper.findComponent(VCardText);
					const mediaBoardDialogLine = cardText.find('[data-testid="delete-dialog-content-media-shelves"]');

					expect(mediaBoardDialogLine.exists()).toEqual(true);
					expect(mediaBoardDialogLine.text()).toEqual(expectedDialogText);
				});
			});

			describe("when FEATURE_MEDIA_SHELF_ENABLED is false", () => {
				it("should not show tool usage count for media board", async () => {
					const { wrapper } = setup({
						envs: { FEATURE_MEDIA_SHELF_ENABLED: false },
					});

					await openfirstElementDeleteDialog(wrapper);

					const cardText = wrapper.findComponent(VCardText);
					const mediaBoardDialogLine = cardText.find('[data-testid="delete-dialog-content-media-shelves"]');

					expect(mediaBoardDialogLine.exists()).toEqual(false);
				});
			});
		});

		describe("when metadata is undefined", () => {
			beforeEach(() => {
				useSchoolExternalToolUsageMock.metadata = ref(undefined);
			});

			it("should not display delete dialog", async () => {
				const { wrapper } = setup();

				await openfirstElementDeleteDialog(wrapper);

				const dialog = wrapper.find('[data-testid="delete-dialog"]');

				expect(dialog.exists()).toEqual(false);
			});

			it("should display notification", async () => {
				const { wrapper } = setup({ schoolExternalTools: [schoolExternalToolFactory.build()] });

				await openfirstElementDeleteDialog(wrapper);

				expectNotification("error");
			});
		});
	});

	describe("VIDIS section", () => {
		describe("when VIDIS is enabled", () => {
			it("should display the VIDIS section", () => {
				const { wrapper } = setup({ envs: { FEATURE_VIDIS_MEDIA_ACTIVATIONS_ENABLED: true } });

				const vidisSection = wrapper.findComponent(VidisMediaSyncSection);

				expect(vidisSection.exists()).toEqual(true);
			});
		});

		describe("when VIDIS is disabled", () => {
			it("should not display the VIDIS section", () => {
				const { wrapper } = setup({ envs: { FEATURE_VIDIS_MEDIA_ACTIVATIONS_ENABLED: false } });

				const vidisSection = wrapper.findComponent(VidisMediaSyncSection);

				expect(vidisSection.exists()).toEqual(false);
			});
		});
	});
});
