import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import MembersTable from "./MembersTable.vue";
import { ref } from "vue";
import { mdiMenuDown, mdiMenuUp, mdiMagnify } from "@icons/material";
import { roomMemberResponseFactory } from "@@/tests/test-utils";
import { DOMWrapper, VueWrapper } from "@vue/test-utils";
import { VDataTable, VTextField } from "vuetify/lib/components/index.mjs";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";

jest.mock("@ui-confirmation-dialog");
const mockedUseRemoveConfirmationDialog = jest.mocked(useConfirmationDialog);

describe("MembersTable", () => {
	let askConfirmationMock: jest.Mock;

	beforeEach(() => {
		askConfirmationMock = jest.fn();
		setupConfirmationComposableMock({
			askConfirmationMock,
		});
		mockedUseRemoveConfirmationDialog.mockReturnValue({
			askConfirmation: askConfirmationMock,
			isDialogOpen: ref(false),
		});
	});

	const tableHeaders = [
		"common.labels.firstName",
		"common.labels.lastName",
		"common.labels.role",
		"common.words.mainSchool",
		"pages.rooms.members.tableHeader.actions",
	];

	const setup = () => {
		const mockMembers = roomMemberResponseFactory.buildList(3);
		const wrapper = mount(MembersTable, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: { members: mockMembers },
		});

		return { wrapper, mockMembers };
	};

	// index 0 is the header checkbox
	const selectCheckboxes = async (indices: number[], wrapper: VueWrapper) => {
		const dataTable = wrapper.getComponent(VDataTable);
		const checkboxes = dataTable.findAll("input[type='checkbox']");

		for (const index of indices) {
			const checkbox = checkboxes[index];
			await checkbox.trigger("click");
		}

		return { checkboxes };
	};

	const getCheckedIndices = (checkboxes: DOMWrapper<Element>[]) =>
		checkboxes.reduce((selectedIndices, checkbox, index) => {
			if (checkbox.attributes("checked") === "") {
				selectedIndices.push(index);
			}
			return selectedIndices;
		}, [] as Array<number>);

	it("should render members table component", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should render data table", () => {
		const { wrapper, mockMembers } = setup();

		const dataTable = wrapper.getComponent(VDataTable);

		expect(dataTable.props("headers")!.map((header) => header.title)).toEqual(
			tableHeaders
		);
		expect(dataTable.props("items")).toEqual(mockMembers);
		expect(dataTable.props("sortAscIcon")).toEqual(mdiMenuDown);
		expect(dataTable.props("sortDescIcon")).toEqual(mdiMenuUp);
	});

	it("should render checkboxes", async () => {
		const { wrapper, mockMembers } = setup();

		const dataTable = wrapper.findComponent(VDataTable);
		const checkboxes = dataTable.findAll("input[type='checkbox']");

		expect(checkboxes.length).toEqual(mockMembers.length + 1); // all checkboxes including header checkbox
	});

	describe("when selecting members", () => {
		it("should select all members when header checkbox is clicked", async () => {
			const { wrapper } = setup();

			const { checkboxes } = await selectCheckboxes([0], wrapper);
			const checkedIndices = getCheckedIndices(checkboxes);

			const expectedIndices = [0, 1, 2, 3];

			expect(checkedIndices).toEqual(expectedIndices);
		});

		it("should emit select:members", async () => {
			const { wrapper, mockMembers } = setup();

			await selectCheckboxes([1], wrapper);

			const selectEvents = wrapper.emitted("select:members");
			expect(selectEvents).toHaveLength(1);
			expect(selectEvents![0]).toEqual([[mockMembers[0].userId]]);
		});

		it("should render the multi action menu", async () => {
			const { wrapper } = setup();

			await selectCheckboxes([1], wrapper);

			const multiActionMenu = wrapper.find("[data-testid=multi-action-menu]");

			expect(multiActionMenu.exists()).toBe(true);
		});

		it("should render selected members remove button", async () => {
			const { wrapper } = setup();

			await selectCheckboxes([1], wrapper);

			const removeButton = wrapper.findComponent({
				ref: "removeSelectedMembers",
			});

			expect(removeButton.exists()).toBe(true);
		});

		it("should render selected members reset button", async () => {
			const { wrapper } = setup();

			await selectCheckboxes([1, 2], wrapper);

			const resetButton = wrapper.findComponent({
				ref: "resetSelectedMembers",
			});

			expect(resetButton.exists()).toBe(true);
		});

		it("should reset member selection when clicking reset button", async () => {
			const { wrapper } = setup();

			askConfirmationMock.mockResolvedValue(false);

			await selectCheckboxes([0], wrapper);

			const resetButton = wrapper.findComponent({
				ref: "resetSelectedMembers",
			});
			await resetButton.trigger("click");

			const checkboxes = wrapper
				.getComponent(VDataTable)
				.findAll("input[type='checkbox']");

			const checkedIndices = getCheckedIndices(checkboxes);

			expect(checkedIndices).toEqual([]);
		});

		it.each([
			{
				description: "one member",
				checkboxesToSelect: [1],
			},
			{
				description: "multiple members",
				checkboxesToSelect: [1, 2],
			},
		])(
			"should render number of selected users in multi action menu, when $description selected",
			async ({ checkboxesToSelect }) => {
				const { wrapper } = setup();

				await selectCheckboxes(checkboxesToSelect, wrapper);

				const multiActionMenu = wrapper.get("[data-testid=multi-action-menu]");

				expect(multiActionMenu.text()).toBe(
					`${checkboxesToSelect.length} pages.administration.selected`
				);
			}
		);

		it("should emit remove:members when selected members remove button is clicked", async () => {
			const { wrapper, mockMembers } = setup();

			askConfirmationMock.mockResolvedValue(true);

			await selectCheckboxes([1], wrapper);

			const removeButton = wrapper.findComponent({
				ref: "removeSelectedMembers",
			});
			await removeButton.trigger("click");

			const removeEvents = wrapper.emitted("remove:members");
			expect(removeEvents).toHaveLength(1);
			expect(removeEvents![0]).toEqual([[mockMembers[0].userId]]);
		});

		it("should not emit remove:members event when remove was cancled", async () => {
			const { wrapper } = setup();

			askConfirmationMock.mockResolvedValue(false);

			await selectCheckboxes([1], wrapper);

			const removeButton = wrapper.findComponent({
				ref: "removeSelectedMembers",
			});
			await removeButton.trigger("click");

			expect(wrapper.emitted()).not.toHaveProperty("remove:members");
		});

		it.each([
			{
				description: "single member",
				checkboxesToSelect: [1],
				expectedMessage: "pages.rooms.members.remove.confirmation",
			},
			{
				description: "multiple members",
				checkboxesToSelect: [1, 2],
				expectedMessage: "pages.rooms.members.multipleRemove.confirmation",
			},
		])(
			"should render confirmation dialog with text for $description when remove button is clicked",
			async ({ checkboxesToSelect, expectedMessage }) => {
				const { wrapper } = setup();

				askConfirmationMock.mockResolvedValue(true);

				await selectCheckboxes(checkboxesToSelect, wrapper);

				const removeButton = wrapper.findComponent({
					ref: "removeSelectedMembers",
				});
				await removeButton.trigger("click");

				expect(wrapper.emitted()).toHaveProperty("remove:members");

				expect(askConfirmationMock).toHaveBeenCalledWith({
					confirmActionLangKey: "common.actions.remove",
					message: expectedMessage,
				});
			}
		);

		it("should keep selection if confirmation dialog is canceled", async () => {
			const { wrapper } = setup();

			askConfirmationMock.mockResolvedValue(false);

			await selectCheckboxes([1], wrapper);

			const removeButton = wrapper.getComponent({
				ref: "removeSelectedMembers",
			});
			await removeButton.trigger("click");

			const checkboxes = wrapper
				.getComponent(VDataTable)
				.findAll("input[type='checkbox']");

			const checkedIndices = getCheckedIndices(checkboxes);

			expect(checkedIndices).toEqual([1]);
		});
	});

	describe("when no members are selected", () => {
		it("should not render multi action menu when no members are selected", async () => {
			const { wrapper } = setup();
			const multiActionMenu = wrapper.find("[data-testid=multi-action-menu]");

			expect(multiActionMenu.exists()).toBe(false);
		});

		describe("when the remove button in the user row is clicked", () => {
			const triggerMemberRemoval = async (
				index: number,
				wrapper: VueWrapper
			) => {
				const dataTable = wrapper.getComponent(VDataTable);
				const removeButton = dataTable.findComponent(
					`[data-testid=remove-member-${index}]`
				);

				await removeButton.trigger("click");
			};

			it("should open confirmation dialog with remove message for single member ", async () => {
				const { wrapper } = setup();

				askConfirmationMock.mockResolvedValue(true);

				await triggerMemberRemoval(0, wrapper);

				expect(askConfirmationMock).toHaveBeenCalledWith({
					confirmActionLangKey: "common.actions.remove",
					message: "pages.rooms.members.remove.confirmation",
				});
			});

			it("should call remove:members event after confirmation", async () => {
				const { wrapper, mockMembers } = setup();

				askConfirmationMock.mockResolvedValue(true);

				await triggerMemberRemoval(0, wrapper);

				expect(wrapper.emitted()).toHaveProperty("remove:members");

				const removeEvents = wrapper.emitted("remove:members");
				expect(removeEvents).toHaveLength(1);
				expect(removeEvents![0]).toEqual([[mockMembers[0].userId]]);
			});

			it("should not call remove:members event when dialog is cancelled", async () => {
				const { wrapper } = setup();

				askConfirmationMock.mockResolvedValue(false);

				await triggerMemberRemoval(0, wrapper);

				expect(wrapper.emitted()).not.toHaveProperty("remove:members");
			});
		});
	});

	describe("when searching for members", () => {
		it("should render the search component", () => {
			const { wrapper } = setup();

			const search = wrapper.getComponent(VTextField);

			expect(search.props("label")).toEqual("common.labels.search");
			expect(search.props("prependInnerIcon")).toEqual(mdiMagnify);
		});

		it("should filter the members based on the search value", async () => {
			const { wrapper, mockMembers } = setup();

			const search = wrapper.getComponent(VTextField);
			const searchValue = mockMembers[0].firstName;

			await search.setValue(searchValue);

			const dataTable = wrapper.getComponent(VDataTable);
			const dataTableTextContent = dataTable.text();

			expect(dataTable.props("search")).toEqual(searchValue);
			expect(dataTableTextContent).toContain(mockMembers[0].firstName);
			expect(dataTableTextContent).not.toContain(mockMembers[1].firstName);
			expect(dataTableTextContent).not.toContain(mockMembers[2].firstName);
		});
	});
});
