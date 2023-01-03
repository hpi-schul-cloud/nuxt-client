import { mount, shallowMount, Wrapper, WrapperArray } from "@vue/test-utils";
import ExternalToolsModule from "@store/external-tools";
import { createModuleMocks } from "@utils/mock-store-module";
import createComponentMocks from "../../../tests/test-utils/componentMocks";
import { provide } from "@vue/composition-api";
import ExternalToolsSection from "./ExternalToolsSection.vue";
import { ExternalToolStatus } from "@store/types/school-external-tool";

describe("ExternalToolSection", () => {
	let wrapper: Wrapper<any>;
	let externalToolsModule: ExternalToolsModule;

	function setup(getters: Partial<ExternalToolsModule> = {}) {
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
	}

	describe("when component is used", () => {
		it("should be found in the dom", () => {
			setup();
			expect(wrapper.findComponent(ExternalToolsSection).exists()).toBe(true);
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
					expect(e.message.includes("Injection \"i18n\" not found")).toBeTruthy();
				}
			});
		})

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
						e.message.includes("Injection \"externalToolsModule\" not found")
					).toBeTruthy();
				}
			});
		})
	});

	describe("onMounted is called", () => {
		describe("when component is mounted", () => {
			it("should load the external tools", () => {
				setup();
				expect(externalToolsModule.loadSchoolExternalTools).toHaveBeenCalled();
			});
		})
	});

	describe("t is called", () => {
		describe("when translation key exists", () => {
			it("should return translation", () => {
				setup();
				const testKey = "testKey";

				const result: string = wrapper.vm.t(testKey);

				expect(result).toEqual(testKey);
			});
		})

		describe("when tranlsation key not exists", () => {
			it("should return unknown translation-key", () => {
				setup();
				const testKey = 123;

				const result: string = wrapper.vm.t(testKey);

				expect(result.includes("unknown translation-key:")).toBeTruthy();
			});
		})
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
				expect(vueWrapperArray.at(2).find("span").text()).toEqual(
					""
				);
			});
		})
	});

	describe("items is called", () => {
		const setupItems = () => {
			const firstToolName = "Test";
			const secondToolName = "Test2";
			setup({
				getSchoolExternalTools: [
					{ id: "testId", name: firstToolName, status: ExternalToolStatus.Latest },
					{ id: "testId2", name: secondToolName, status: ExternalToolStatus.Outdated }
				]
			});
			return {
				firstToolName,
				secondToolName,
			}
		}

		describe("when external tools were loaded", () => {
			it("names should be rendered in the datatable", () => {
				const { firstToolName, secondToolName } = setupItems();

				const tableRows: WrapperArray<any> = wrapper.find("tbody").findAll("tr");
				const firstRow: WrapperArray<any> = tableRows.at(0).findAll("td");
				const secondRow: WrapperArray<any> = tableRows.at(1).findAll("td");

				expect(firstRow.at(0).text()).toEqual(firstToolName);
				expect(secondRow.at(0).text()).toEqual(secondToolName);
			})

			it("names should be rendered in the datatable", () => {
				setupItems();

				const tableRows: WrapperArray<any> = wrapper.find("tbody").findAll("tr");
				const firstRow: WrapperArray<any> = tableRows.at(0).findAll("td");
				const secondRow: WrapperArray<any> = tableRows.at(1).findAll("td");

				expect(firstRow.at(1).text()).toEqual("components.administration.externalToolsSection.table.header.status.latest");
				expect(secondRow.at(1).text()).toEqual("components.administration.externalToolsSection.table.header.status.outdated");
			})

			describe("when actions buttons are rendered", () => {
				it("the buttons should be displayed", () => {
					setupItems();

					const tableRows: WrapperArray<any> = wrapper.find("tbody").findAll("tr");

					const firstRowButtons: WrapperArray<any> = tableRows.at(1).findAll("button");
					expect(firstRowButtons.at(0).classes().includes('v-icon')).toBeTruthy();
					expect(firstRowButtons.at(1).classes().includes('v-icon')).toBeTruthy();
				})

				it("a dialog should be displayed with click on delete", async () => {
					setupItems();

					const tableRows: WrapperArray<any> = wrapper.find("tbody").findAll("tr");
					const firstRowButtons: WrapperArray<any> = tableRows.at(0).findAll("button");
					const deleteButton = firstRowButtons.at(1);

					deleteButton.trigger("click");
					await wrapper.vm.$nextTick()

					expect(wrapper.find('div[role="dialog"]').text()).toBeDefined();
					expect(wrapper.vm.isDeleteDialogOpen).toBeTruthy();
				})
			});

			describe("when status is rendered", () => {
				it("should have a red text color when status is outdated", () => {
					setupItems();

					const tableRows: WrapperArray<any> = wrapper.find("tbody").findAll("tr");

					const secondRow: WrapperArray<any> = tableRows.at(1).findAll("td");
					expect(secondRow.at(0).find("span").classes().includes("outdated")).toBeTruthy();
					expect(secondRow.at(1).find("span").classes().includes("outdated")).toBeTruthy();
				})


				it("should have a normal text color when status is latest", () => {
					setupItems();

					const tableRows: WrapperArray<any> = wrapper.find("tbody").findAll("tr");

					const firstRow: WrapperArray<any> = tableRows.at(0).findAll("td");
					expect(firstRow.at(0).find("span").classes().includes("outdated")).toBeFalsy();
					expect(firstRow.at(1).find("span").classes().includes("outdated")).toBeFalsy();
				})
			})
		})
	})
});
