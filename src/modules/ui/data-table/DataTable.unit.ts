import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { DataTable } from "@ui-data-table";
import { KebabMenuList } from "@ui-kebab-menu";
import { VDataTable, VTextField } from "vuetify/lib/components/index";
import BatchActionMenu from "./BatchActionMenu.vue";
import { nextTick } from "vue";

describe("DataTable", () => {
	const setupWrapper = (
		options?: Partial<{
			headers: {
				title: string;
				key: string;
			}[];
			showSelect: boolean;
			items: Record<string, unknown>[];
			selectItemKey: string;
			ariaLabelNameKey: string;
			windowWidth: number;
			actionMenuItemsSlot: string;
			leftOfSearchSlot: string;
			externalSelectedIds: string[];
		}>
	) => {
		const windowWidth = options?.windowWidth ?? 1280;

		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: windowWidth,
		});

		const wrapper = mount(DataTable, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			slots: {
				"action-menu-items": options?.actionMenuItemsSlot ?? "",
				"left-of-search": options?.leftOfSearchSlot ?? "",
			},
			props: {
				tableHeaders: options?.headers ?? [],
				items: options?.items ?? [],
				showSelect: options?.showSelect ?? false,
				selectItemKey: options?.selectItemKey ?? "",
				ariaLabelNameKey: options?.ariaLabelNameKey ?? "",
				headerBottom: 0,
				externalSelectedIds: options?.externalSelectedIds ?? [],
			},
			stubs: {
				DataTable: {
					name: "DataTable",
					watch: {
						externalSelectedIds: {
							immediate: true,
						},
					},
				},
			},
		});

		return { wrapper };
	};

	describe("when window width is less than 600px", () => {
		it("should have column style for extra small display sizes", async () => {
			const { wrapper } = setupWrapper({ windowWidth: 599 });

			const dataTable = wrapper.get(".table-title-header");

			expect(dataTable.classes()).toContain("flex-column");
		});

		it("should order-2 class on BatchActionMenu", async () => {
			const key = "name";
			const headers = [{ title: "name", key }];
			const name1 = "John Doe";
			const items = [{ [key]: name1 }, { [key]: "Jane Doe" }];
			const slotContent = "<div>Action Menu Items</div>";
			// Mock the action menu items slot
			const { wrapper } = setupWrapper({
				headers,
				items,
				actionMenuItemsSlot: slotContent,
				showSelect: true,
				selectItemKey: key,
				ariaLabelNameKey: key,
				windowWidth: 599,
			});

			const itemCheckbox = wrapper.find(
				`[data-testid='select-checkbox-${name1}']`
			);

			itemCheckbox.trigger("click");
			await wrapper.vm.$nextTick();

			const actionMenu = wrapper.findComponent(BatchActionMenu);

			expect(actionMenu.classes()).toContain("order-2");
		});

		it("should render search component with flex order 1 for extra small display sizes", async () => {
			const { wrapper } = setupWrapper({
				windowWidth: 599,
			});

			const search = wrapper.findComponent(VTextField);

			expect(search.classes()).toContain("order-1");
		});
	});

	describe("when window width is greater than 599px", () => {
		it("should not have column style", async () => {
			const { wrapper } = setupWrapper({ windowWidth: 800 });

			const dataTable = wrapper.get(".table-title-header");

			expect(dataTable.classes()).not.toContain("flex-column");
		});

		it("should not render search component with flex order 1 for display sizes greater than 599px", async () => {
			const { wrapper } = setupWrapper({
				windowWidth: 800,
			});

			const search = wrapper.findComponent(VTextField);

			expect(search.classes()).not.toContain("order-1");
		});
	});

	describe("when item is selected", () => {
		describe("when action-menu-items is defined", () => {
			const setup = async () => {
				const key = "name";
				const headers = [{ title: "name", key }];
				const name1 = "John Doe";
				const items = [{ [key]: name1 }, { [key]: "Jane Doe" }];
				const slotContent = "<div>Action Menu Items</div>";

				const { wrapper } = setupWrapper({
					headers,
					items,
					actionMenuItemsSlot: slotContent,
					showSelect: true,
					selectItemKey: key,
					ariaLabelNameKey: key,
				});

				const itemCheckbox = wrapper.find(
					`[data-testid='select-checkbox-${name1}']`
				);

				itemCheckbox.trigger("click");
				await wrapper.vm.$nextTick();

				const actionMenuButton = wrapper.find(
					`[data-testid='action-menu-button']`
				);
				actionMenuButton.trigger("click");

				return { wrapper, name1, slotContent };
			};

			it("should render action menu", async () => {
				const { wrapper } = await setup();

				const actionMenu = wrapper.findComponent(BatchActionMenu);

				expect(actionMenu.exists()).toBe(true);
			});

			it("should render action-menu-items slot content", async () => {
				const { wrapper, slotContent } = await setup();

				const actionMenu = wrapper.findComponent(KebabMenuList);

				expect(actionMenu.html()).toContain(slotContent);
			});
		});

		describe("when action-menu-items is not defined", () => {
			const setup = () => {
				const key = "name";
				const headers = [{ title: "name", key }];
				const name1 = "John Doe";
				const items = [{ [key]: name1 }, { [key]: "Jane Doe" }];

				const wrapper = mount(DataTable, {
					attachTo: document.body,
					global: {
						plugins: [createTestingVuetify(), createTestingI18n()],
					},
					props: {
						tableHeaders: headers,
						items: items,
						showSelect: true,
						selectItemKey: key,
						ariaLabelNameKey: key,
					},
				});

				return { wrapper, name1 };
			};

			it("should render action menu", async () => {
				const { wrapper, name1 } = setup();

				const itemCheckbox = wrapper.find(
					`[data-testid='select-checkbox-${name1}']`
				);

				itemCheckbox.trigger("click");
				await wrapper.vm.$nextTick();

				const actionMenu = wrapper.findComponent(BatchActionMenu);

				expect(actionMenu.exists()).toBe(false);
			});
		});

		describe("when externalSelectedIds prop is passed", () => {
			const setup = async () => {
				const key = "name";
				const headers = [{ title: "name", key }];
				const items = [
					{ [key]: "John Doe", id: "item-1" },
					{ [key]: "Jane Doe", id: "item-2" },
					{ [key]: "Jack Doe", id: "item-3" },
					{ [key]: "Jill Doe", id: "item-4" },
				];
				const slotContent = "<div>Action Menu Items</div>";
				const { wrapper } = setupWrapper({
					headers,
					items,
					actionMenuItemsSlot: slotContent,
					showSelect: true,
					selectItemKey: key,
					ariaLabelNameKey: key,
					externalSelectedIds: ["item-1", "item-2"],
				});

				return { wrapper };
			};

			it("should render batch action menu", async () => {
				const { wrapper } = await setup();
				wrapper.setProps({ externalSelectedIds: ["item-1", "item-2"] });
				await nextTick();

				const actionMenu = wrapper.findComponent(BatchActionMenu);

				expect(actionMenu.exists()).toBe(true);
			});

			it("should render amount of selected items", async () => {
				const { wrapper } = await setup();
				wrapper.setProps({ externalSelectedIds: ["item-1", "item-2"] });
				await nextTick();

				const actionMenu = wrapper.findComponent(BatchActionMenu);

				expect(actionMenu.text()).toContain(
					"2 pages.administration.selectedui.actionMenu.actions"
				);
			});
		});
	});

	describe("when all items are selected", () => {
		const setup = async () => {
			const key = "name";
			const headers = [{ title: "name", key }];
			const name1 = "John Doe";
			const items = [{ [key]: name1 }, { [key]: "Jane Doe" }];
			const slotContent = "<div>Action Menu Items</div>";
			// Mock the action menu items slot
			const { wrapper } = setupWrapper({
				headers,
				items,
				actionMenuItemsSlot: slotContent,
				showSelect: true,
				selectItemKey: key,
				ariaLabelNameKey: key,
			});

			const itemCheckbox = wrapper.find(`[data-testid='select-all-checkbox']`);

			itemCheckbox.trigger("click");
			await wrapper.vm.$nextTick();

			return { wrapper, name1, slotContent };
		};

		it("should render batch action menu", async () => {
			const { wrapper } = await setup();

			const actionMenu = wrapper.findComponent(BatchActionMenu);

			expect(actionMenu.exists()).toBe(true);
		});

		it("should render amount of selected items", async () => {
			const { wrapper } = await setup();

			const actionMenu = wrapper.findComponent(BatchActionMenu);

			expect(actionMenu.text()).toContain(
				"2 pages.administration.selectedui.actionMenu.actions"
			);
		});
	});

	describe("when all items are selected and then items are removed", () => {
		const setup = async () => {
			const key = "name";
			const headers = [{ title: "name", key }];
			const name1 = "John Doe";
			const items = [
				{ [key]: name1, id: 1 },
				{ [key]: "Jane Doe", id: 2 },
			];
			const slotContent = "<div>Action Menu Items</div>";
			// Mock the action menu items slot
			const { wrapper } = setupWrapper({
				headers,
				items,
				actionMenuItemsSlot: slotContent,
				showSelect: true,
				selectItemKey: key,
				ariaLabelNameKey: key,
			});

			const itemCheckbox = wrapper.find(`[data-testid='select-all-checkbox']`);

			itemCheckbox.trigger("click");
			await wrapper.vm.$nextTick();

			return { wrapper, name1, slotContent, items };
		};

		it("should render batch action menu", async () => {
			const { wrapper } = await setup();

			const actionMenu = wrapper.findComponent(BatchActionMenu);

			expect(actionMenu.exists()).toBe(true);
		});

		it("should render amount of selected items", async () => {
			const { wrapper, items } = await setup();

			const actionMenuBefore = wrapper.findComponent(BatchActionMenu);

			expect(actionMenuBefore.text()).toContain(
				"2 pages.administration.selectedui.actionMenu.actions"
			);

			await wrapper.setProps({ items: items.slice(0, 1) });

			const actionMenuAfter = wrapper.findComponent(BatchActionMenu);

			expect(actionMenuAfter.text()).toContain(
				"1 pages.administration.selectedui.actionMenu.actions"
			);
		});
	});

	describe("when showSelect is false", () => {
		const setup = () => {
			const key = "name";
			const headers = [{ title: "name", key }];
			const name1 = "John Doe";
			const items = [{ [key]: name1 }, { [key]: "Jane Doe" }];
			const { wrapper } = setupWrapper({
				headers,
				items,
				actionMenuItemsSlot: "<div>Action Menu Items</div>",
				showSelect: false,
				selectItemKey: key,
				ariaLabelNameKey: key,
			});

			return { wrapper, name1 };
		};

		it("should not render checkboxes", () => {
			const { wrapper, name1 } = setup();

			const itemCheckbox = wrapper.find(
				`[data-testid='select-checkbox-${name1}']`
			);

			expect(itemCheckbox.exists()).toBe(false);
		});
	});

	describe("when slot left-of-search is defined", () => {
		const setup = () => {
			const slotContent = "<div>Left of Search</div>";
			// Mock the action menu items slot
			const { wrapper } = setupWrapper({
				leftOfSearchSlot: slotContent,
			});

			return { wrapper, slotContent };
		};

		it("should render left-of-search slot content", () => {
			const { wrapper, slotContent } = setup();

			expect(wrapper.html()).toContain(slotContent);
		});
	});

	describe("when searching for items", () => {
		const setup = async () => {
			const key = "name";
			const headers = [{ title: "name", key }];
			const name1 = "John Doe";
			const name2 = "Jane Doe";
			const items = [{ [key]: name1 }, { [key]: name2 }];

			const { wrapper } = setupWrapper({
				headers,
				items,
				selectItemKey: key,
				ariaLabelNameKey: key,
			});

			const search = wrapper.getComponent(VTextField);
			const searchValue = items[0][key];

			await search.setValue(searchValue);

			return { wrapper, name1, name2, searchValue };
		};

		it("should filter the members based on the search value", async () => {
			const { wrapper, name1, name2, searchValue } = await setup();

			const dataTable = wrapper.getComponent(VDataTable);
			const dataTableTextContent = dataTable.text();

			expect(dataTable.props("search")).toEqual(searchValue);
			expect(dataTableTextContent).toContain(name1);
			expect(dataTableTextContent).not.toContain(name2);
		});
	});

	describe("when slot name is passed", () => {
		const setup = () => {
			const key = "name";
			const headers = [{ title: "name", key }];
			const name1 = "John Doe";
			const items = [{ [key]: name1 }, { [key]: "Jane Doe" }];
			const slotContent = "<span>test-span</span>";

			const wrapper = mount(DataTable, {
				attachTo: document.body,
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				slots: {
					"item.name": slotContent,
				},
				props: {
					tableHeaders: headers,
					items: items,
				},
			});

			return { wrapper, name1, slotContent };
		};

		it("should render slot content", () => {
			const { wrapper } = setup();

			const dataTable = wrapper.getComponent(VDataTable);

			expect(dataTable.text()).toContain("test-span");
		});
	});
});
