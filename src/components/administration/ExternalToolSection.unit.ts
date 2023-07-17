import { mount } from "@vue/test-utils";
import ExternalToolsModule from "@/store/external-tools";
import { createModuleMocks } from "@/utils/mock-store-module";
import { i18nMock } from "@@/tests/test-utils/i18nMock";
import NotifierModule from "@/store/notifier";
import ExternalToolSection from "./ExternalToolSection.vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { ToolConfigurationStatus } from "@/store/external-tool";
import {
	EXTERNAL_TOOLS_MODULE_KEY,
	I18N_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";

describe("ExternalToolSection", () => {
	let el: HTMLDivElement;

	const setup = (getters: Partial<ExternalToolsModule> = {}) => {
		el = document.createElement("div");
		el.setAttribute("data-app", "true");
		document.body.appendChild(el);

		const externalToolsModule = createModuleMocks(ExternalToolsModule, {
			getSchoolExternalTools: [],
			...getters,
		});

		const notifierModule = createModuleMocks(NotifierModule);

		const wrapper = mount(ExternalToolSection, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
				[EXTERNAL_TOOLS_MODULE_KEY.valueOf()]: externalToolsModule,
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
			},
		});

		return { wrapper, externalToolsModule };
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
				const { externalToolsModule } = setup();
				expect(externalToolsModule.loadSchoolExternalTools).toHaveBeenCalled();
			});
		});
	});

	describe("headers is called", () => {
		describe("when table is rendered", () => {
			it("should display dataTableHeaders in v-data-table", () => {
				const { wrapper } = setup();

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
	});

	describe("items is called", () => {
		const setupItems = () => {
			const firstToolName = "Test";
			const secondToolName = "Test2";
			const { wrapper, externalToolsModule } = setup({
				getSchoolExternalTools: [
					{
						id: "testId",
						toolId: "toolId",
						parameters: [],
						name: firstToolName,
						status: ToolConfigurationStatus.Latest,
						version: 1,
					},
					{
						id: "testId2",
						toolId: "toolId",
						parameters: [],
						name: secondToolName,
						status: ToolConfigurationStatus.Outdated,
						version: 1,
					},
				],
			});
			return {
				wrapper,
				externalToolsModule,
				firstToolName,
				secondToolName,
			};
		};

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

				expect(firstRow.at(1).text()).toEqual(
					"components.externalTools.status.latest"
				);
				expect(secondRow.at(1).text()).toEqual(
					"components.externalTools.status.outdated"
				);
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

						expect(wrapper.find("p").text()).toContain(firstToolName);
					});
				});

				describe("when deletion is confirmed", () => {
					it("should call externalToolsModule.deleteSchoolExternalTool", async () => {
						const { wrapper, externalToolsModule } = setup({
							getSchoolExternalTools: [
								{
									id: "testId",
									toolId: "toolId",
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

						const confirmButton = wrapper.find("[data-testId=dialog-confirm]");
						await confirmButton.trigger("click");

						expect(
							externalToolsModule.deleteSchoolExternalTool
						).toHaveBeenCalled();
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
				const { wrapper } = setup();

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
});
