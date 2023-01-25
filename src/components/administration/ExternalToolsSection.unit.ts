import { mount, shallowMount, Wrapper, WrapperArray } from "@vue/test-utils";
import ExternalToolsModule from "@store/external-tools";
import { createModuleMocks } from "@utils/mock-store-module";
import createComponentMocks from "../../../tests/test-utils/componentMocks";
import { provide } from "@vue/composition-api";
import ExternalToolsSection from "./ExternalToolsSection.vue";
import { SchoolExternalToolStatusEnum } from "@store/external-tool/school-external-tool-status.enum";

describe("ExternalToolsSection", () => {
	let wrapper: Wrapper<any>;
	let externalToolsModule: ExternalToolsModule;

	const setup = (getters: Partial<ExternalToolsModule> = {}) => {
		document.body.setAttribute("data-app", "true");
		externalToolsModule = createModuleMocks(ExternalToolsModule, {
			getSchoolExternalTools: [],
			...getters,
		});
		wrapper = mount(ExternalToolsSection, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {
				provide("i18n", { t: (key: string) => key });
				provide("externalToolsModule", externalToolsModule);
			},
		});

		return {};
	};

	describe("when component is used", () => {
		it("should be found in the dom", () => {
			setup();
			expect(wrapper.findComponent(ExternalToolsSection).exists()).toBeTruthy();
		});
	});

	describe("inject is called", () => {
		describe("when i18n injection fails", () => {
			it("should throw an error", () => {
				try {
					wrapper = shallowMount(ExternalToolsSection, {
						setup() {
							provide("externalToolsModule", externalToolsModule);
						},
					});
				} catch (e) {
					expect(e.message.includes('Injection "i18n" not found')).toBeTruthy();
				}
			});
		});

		describe("when externalToolsModule injection fails", () => {
			it("should throw an error", () => {
				try {
					wrapper = shallowMount(ExternalToolsSection, {
						setup() {
							provide("i18n", { t: (key: string) => key });
						},
					});
				} catch (e) {
					expect(
						e.message.includes('Injection "externalToolsModule" not found')
					).toBeTruthy();
				}
			});
		});
	});

	describe("onMounted is called", () => {
		describe("when component is mounted", () => {
			it("should load the external tools", () => {
				setup();
				expect(externalToolsModule.loadSchoolExternalTools).toHaveBeenCalled();
			});
		});
	});

	describe("t is called", () => {
		describe("when translation key exists", () => {
			it("should return translation", () => {
				setup();
				const testKey = "testKey";

				const result: string = wrapper.vm.t(testKey);

				expect(result).toEqual(testKey);
			});
		});

		describe("when tranlsation key not exists", () => {
			it("should return unknown translation-key", () => {
				setup();
				const testKey = 123;

				const result: string = wrapper.vm.t(testKey);

				expect(result.includes("unknown translation-key:")).toBeTruthy();
			});
		});
	});

	describe("headers is called", () => {
		describe("when table is rendered", () => {
			it("should display dataTableHeaders in v-data-table", () => {
				setup();

				const vueWrapperArray: WrapperArray<any> = wrapper
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
			setup({
				getSchoolExternalTools: [
					{
						id: "testId",
						name: firstToolName,
						status: SchoolExternalToolStatusEnum.Latest,
						version: 1,
					},
					{
						id: "testId2",
						name: secondToolName,
						status: SchoolExternalToolStatusEnum.Outdated,
						version: 1,
					},
				],
			});
			return {
				firstToolName,
				secondToolName,
			};
		};

		describe("when external tools were loaded", () => {
			it("names should be rendered in the datatable", () => {
				const { firstToolName, secondToolName } = setupItems();

				const tableRows: WrapperArray<any> = wrapper
					.find("tbody")
					.findAll("tr");
				const firstRow: WrapperArray<any> = tableRows.at(0).findAll("td");
				const secondRow: WrapperArray<any> = tableRows.at(1).findAll("td");

				expect(firstRow.at(0).text()).toEqual(firstToolName);
				expect(secondRow.at(0).text()).toEqual(secondToolName);
			});

			it("status should be rendered in the datatable", () => {
				setupItems();

				const tableRows: WrapperArray<any> = wrapper
					.find("tbody")
					.findAll("tr");
				const firstRow: WrapperArray<any> = tableRows.at(0).findAll("td");
				const secondRow: WrapperArray<any> = tableRows.at(1).findAll("td");

				expect(firstRow.at(1).text()).toEqual(
					"components.administration.externalToolsSection.table.header.status.latest"
				);
				expect(secondRow.at(1).text()).toEqual(
					"components.administration.externalToolsSection.table.header.status.outdated"
				);
			});

			describe("when actions buttons are rendered", () => {
				it("the buttons should be displayed", () => {
					setupItems();

					const tableRows: WrapperArray<any> = wrapper
						.find("tbody")
						.findAll("tr");

					const firstRowButtons: WrapperArray<any> = tableRows
						.at(1)
						.findAll("button");
					expect(
						firstRowButtons.at(0).classes().includes("v-btn--icon")
					).toBeTruthy();
					expect(
						firstRowButtons.at(1).classes().includes("v-btn--icon")
					).toBeTruthy();
				});

				it("a dialog should be displayed with click on delete", async () => {
					setupItems();

					const tableRows: WrapperArray<any> = wrapper
						.find("tbody")
						.findAll("tr");
					const firstRowButtons: WrapperArray<any> = tableRows
						.at(0)
						.findAll("button");
					const deleteButton = firstRowButtons.at(1);

					await deleteButton.trigger("click");

					expect(wrapper.find('div[role="dialog"]')).toBeDefined();
					expect(wrapper.vm.isDeleteDialogOpen).toBeTruthy();
				});

				describe("when dialog is rendered", () => {
					it("should have tool name in text", async () => {
						const { firstToolName } = setupItems();

						const tableRows: WrapperArray<any> = wrapper
							.find("tbody")
							.findAll("tr");
						const firstRowButtons: WrapperArray<any> = tableRows
							.at(0)
							.findAll("button");
						const deleteButton = firstRowButtons.at(1);

						await deleteButton.trigger("click");

						expect(wrapper.find("p").text()).toContain(firstToolName);
					});
				});

				describe("when deletion is confirmed", () => {
					it("should call externalToolsModule.deleteSchoolExternalTool", async () => {
						setup({
							getSchoolExternalTools: [
								{
									id: "testId",
									name: "firstToolName",
									status: SchoolExternalToolStatusEnum.Latest,
									version: 1,
								},
							],
						});

						const tableRows: WrapperArray<any> = wrapper
							.find("tbody")
							.findAll("tr");

						const firstRowButtons: WrapperArray<any> = tableRows
							.at(0)
							.findAll("button");

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

			describe("when status is rendered", () => {
				it("should have a red text color when status is outdated", () => {
					setupItems();

					const tableRows: WrapperArray<any> = wrapper
						.find("tbody")
						.findAll("tr");

					const secondRow: WrapperArray<any> = tableRows.at(1).findAll("td");
					expect(
						secondRow.at(0).find("span").classes().includes("outdated")
					).toBeTruthy();
					expect(
						secondRow.at(1).find("span").classes().includes("outdated")
					).toBeTruthy();
				});

				it("should have a normal text color when status is latest", () => {
					setupItems();

					const tableRows: WrapperArray<any> = wrapper
						.find("tbody")
						.findAll("tr");

					const firstRow: WrapperArray<any> = tableRows.at(0).findAll("td");
					expect(
						firstRow.at(0).find("span").classes().includes("outdated")
					).toBeFalsy();
					expect(
						firstRow.at(1).find("span").classes().includes("outdated")
					).toBeFalsy();
				});
			});
		});
	});

	describe("getItemName is called", () => {
		describe("when itemToDelete is set", () => {
			it("should return the name", () => {
				setup();

				const expectedName = "Name";
				wrapper.vm.itemToDelete = {
					name: expectedName,
					status: SchoolExternalToolStatusEnum.Latest,
					outdated: false,
				};

				const itemName: string = wrapper.vm.getItemName;

				expect(itemName).toEqual(expectedName);
			});
		});

		describe("when itemToDelete is not set", () => {
			it("should return an empty string", () => {
				setup();

				wrapper.vm.itemToDelete = undefined;

				const itemName: string = wrapper.vm.getItemName;

				expect(itemName).toEqual("");
			});
		});
	});
});
