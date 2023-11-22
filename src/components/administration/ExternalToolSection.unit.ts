import AuthModule from "@/store/auth";
import { ToolConfigurationStatus } from "@/store/external-tool";
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
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { i18nMock } from "@@/tests/test-utils/i18nMock";
import { mdiCheckCircle, mdiRefreshCircle } from "@mdi/js";
import { mount, Wrapper } from "@vue/test-utils";
import Vue, { ref } from "vue";
import ExternalToolSection from "./ExternalToolSection.vue";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useSchoolExternalToolUsage } from "@data-external-tool";
import {
	schoolExternalToolFactory,
	schoolExternalToolMetadataFactory,
} from "@@/tests/test-utils/factory";

jest.mock("@data-external-tool");

describe("ExternalToolSection", () => {
	let el: HTMLDivElement;

	let useSchoolExternalToolUsageMock: DeepMocked<
		ReturnType<typeof useSchoolExternalToolUsage>
	>;

	const getWrapper = (getters: Partial<SchoolExternalToolsModule> = {}) => {
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

		const authModule = createModuleMocks(AuthModule, {
			getUser: {
				schoolId: "schoolId",
			} as User,
		});

		const wrapper: Wrapper<Vue> = mount(ExternalToolSection, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
				[SCHOOL_EXTERNAL_TOOLS_MODULE_KEY.valueOf()]: schoolExternalToolsModule,
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				[AUTH_MODULE_KEY.valueOf()]: authModule,
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
			const { wrapper, schoolExternalToolsModule } = getWrapper({
				getSchoolExternalTools: [
					{
						id: "testId",
						toolId: "toolId",
						schoolId: "schoolId",
						parameters: [],
						name: firstToolName,
						status: ToolConfigurationStatus.Latest,
						version: 1,
					},
					{
						id: "testId2",
						toolId: "toolId",
						schoolId: "schoolId",
						parameters: [],
						name: secondToolName,
						status: ToolConfigurationStatus.Outdated,
						version: 1,
					},
				],
			});
			return {
				wrapper,
				schoolExternalToolsModule,
				firstToolName,
				secondToolName,
			};
		};

		describe("when table is rendered", () => {
			it("should display dataTableHeaders in v-data-table", () => {
				const { wrapper } = setupItems();

				const vueWrapperArray = wrapper
					.find(".v-data-table-header")
					.findAll("th");

				expect(vueWrapperArray.at(0).find("span").text()).toEqual(
					"common.labels.name"
				);
				expect(vueWrapperArray.at(1).find("span").text()).toEqual(
					"components.administration.externalToolsSection.table.header.status"
				);
				expect(vueWrapperArray.at(2).find("span").text()).toEqual("");
			});
		});

		describe("when external tools were loaded", () => {
			it("names should be rendered in the datatable", () => {
				const { wrapper, firstToolName, secondToolName } = setupItems();

				const tableRows = wrapper.find("tbody").findAll("tr");
				const firstRow = tableRows.at(0).findAll("td");
				const secondRow = tableRows.at(1).findAll("td");

				expect(firstRow.at(0).text()).toEqual(firstToolName);
				expect(secondRow.at(0).text()).toEqual(secondToolName);
			});

			it("status should be rendered in the datatable", () => {
				const { wrapper } = setupItems();

				const tableRows = wrapper.find("tbody").findAll("tr");
				const firstRow = tableRows.at(0).findAll("td");
				const secondRow = tableRows.at(1).findAll("td");

				expect(firstRow.at(1).find("span").text()).toEqual(
					"components.externalTools.status.latest"
				);
				expect(firstRow.at(1).findComponent({ name: "v-icon" }).text()).toEqual(
					mdiCheckCircle
				);
				expect(secondRow.at(1).find("span").text()).toEqual(
					"components.externalTools.status.outdated"
				);
				expect(
					secondRow.at(1).findComponent({ name: "v-icon" }).text()
				).toEqual(mdiRefreshCircle);
			});

			describe("when actions buttons are rendered", () => {
				it("the buttons should be displayed", () => {
					const { wrapper } = setupItems();

					const tableRows = wrapper.find("tbody").findAll("tr");

					const firstRowButtons = tableRows.at(1).findAll("button");
					expect(
						firstRowButtons.at(0).classes().includes("v-btn--icon")
					).toBeTruthy();
					expect(
						firstRowButtons.at(1).classes().includes("v-btn--icon")
					).toBeTruthy();
				});

				it("a dialog should be displayed with click on delete", async () => {
					const { wrapper } = setupItems();

					const tableRows = wrapper.find("tbody").findAll("tr");
					const firstRowButtons = tableRows.at(0).findAll("button");
					const deleteButton = firstRowButtons.at(1);

					await deleteButton.trigger("click");

					expect(wrapper.find('div[role="dialog"]')).toBeDefined();
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-ignore
					expect(wrapper.vm.isDeleteDialogOpen).toBeTruthy();
				});

				describe("when dialog is rendered", () => {
					it("should have tool name in text", async () => {
						const { wrapper, firstToolName } = setupItems();

						const tableRows = wrapper.find("tbody").findAll("tr");
						const firstRowButtons = tableRows.at(0).findAll("button");
						const deleteButton = firstRowButtons.at(1);

						await deleteButton.trigger("click");

						expect(wrapper.findAll("p").at(1).text()).toContain(firstToolName);
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
									status: ToolConfigurationStatus.Latest,
									version: 1,
								},
							],
						});

						const tableRows = wrapper.find("tbody").findAll("tr");

						const firstRowButtons = tableRows.at(0).findAll("button");

						const deleteButton = firstRowButtons.at(1);
						await deleteButton.trigger("click");

						const confirmButton = wrapper.find(
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
									status: ToolConfigurationStatus.Latest,
									version: 1,
								},
							],
						});

						const tableRows = wrapper.find("tbody").findAll("tr");

						const firstRowButtons = tableRows.at(0).findAll("button");

						const deleteButton = firstRowButtons.at(1);
						await deleteButton.trigger("click");

						const confirmButton = wrapper.find(
							"[data-testId=delete-dialog-confirm]"
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
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				wrapper.vm.itemToDelete = {
					name: expectedName,
					status: ToolConfigurationStatus.Latest,
					outdated: false,
				};

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				const itemName: string = wrapper.vm.getItemName;

				expect(itemName).toEqual(expectedName);
			});
		});

		describe("when itemToDelete is not set", () => {
			it("should return an empty string", () => {
				const { wrapper } = getWrapper();

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				wrapper.vm.itemToDelete = undefined;

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				const itemName: string = wrapper.vm.getItemName;

				expect(itemName).toEqual("");
			});
		});
	});

	describe("when deleting a schoolExternalTool", () => {
		describe("when metadata is given", () => {
			const setup = () => {
				const schoolExternalToolMetadata =
					schoolExternalToolMetadataFactory.build();

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

				const firstRowButtons = tableRows.at(0).findAll("button");

				const deleteButton = firstRowButtons.at(1);
				await deleteButton.trigger("click");

				const dialog = wrapper.find('[data-testid="delete-dialog"]');

				expect(dialog.isVisible()).toBeTruthy();
			});

			it("should display tool usage count", async () => {
				const { wrapper, schoolExternalToolMetadata } = setup();

				const tableRows = wrapper.find("tbody").findAll("tr");

				const firstRowButtons = tableRows.at(0).findAll("button");

				const deleteButton = firstRowButtons.at(1);
				await deleteButton.trigger("click");

				const dialogContent = wrapper.find(
					'[data-testid="delete-dialog-content"]'
				);

				expect(dialogContent.text()).toEqual(
					`components.administration.externalToolsSection.dialog.content {"itemName":"name","courseCount":${schoolExternalToolMetadata.course},"boardElementCount":${schoolExternalToolMetadata.boardElement}}`
				);
			});

			it("should not display notification", async () => {
				const { wrapper, notifierModule } = setup();

				const tableRows = wrapper.find("tbody").findAll("tr");

				const firstRowButtons = tableRows.at(0).findAll("button");

				const deleteButton = firstRowButtons.at(1);
				await deleteButton.trigger("click");

				expect(notifierModule.show).not.toHaveBeenCalled();
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

				const firstRowButtons = tableRows.at(0).findAll("button");

				const deleteButton = firstRowButtons.at(1);
				await deleteButton.trigger("click");

				const dialog = wrapper.find('[data-testid="delete-dialog"]');

				expect(dialog).not.toBe("visible");
			});

			it("should display notification", async () => {
				const { wrapper, notifierModule } = setup();

				const tableRows = wrapper.find("tbody").findAll("tr");

				const firstRowButtons = tableRows.at(0).findAll("button");

				const deleteButton = firstRowButtons.at(1);
				await deleteButton.trigger("click");

				expect(notifierModule.show).toHaveBeenCalledWith({
					status: "error",
					text: "components.administration.externalToolsSection.dialog.content.metadata.error",
				});
			});
		});
	});
});
