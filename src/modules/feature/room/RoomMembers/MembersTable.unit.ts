import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import MembersTable from "./MembersTable.vue";
import { ref, Ref } from "vue";
import {
	mdiMenuDown,
	mdiMenuUp,
	mdiMagnify,
	mdiTrashCanOutline,
} from "@icons/material";
import { roomMemberResponseFactory } from "@@/tests/test-utils";
import { RoomMember } from "@data-room";
import { VueWrapper } from "@vue/test-utils";
import { VBtn, VDataTable } from "vuetify/lib/components/index.mjs";
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

	const setup = () => {
		const mockMembers = roomMemberResponseFactory.buildList(3);
		const wrapper = mount(MembersTable, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: { members: mockMembers },
		});

		return { wrapper, mockMembers };
	};

	describe("when component is mounted", () => {
		it("should render member's table", () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
		});
	});

	describe("DataTable component", () => {
		const tableHeaders = [
			"common.labels.firstName",
			"common.labels.lastName",
			"common.labels.role",
			"common.words.mainSchool",
			"",
		];

		it("should render the table component", () => {
			const { wrapper, mockMembers } = setup();

			const dataTable = wrapper.getComponent(VDataTable);

			expect(dataTable.props("headers")!.map((header) => header.title)).toEqual(
				tableHeaders
			);
			expect(dataTable.props("items")).toEqual(mockMembers);
			expect(dataTable.props("sortAscIcon")).toEqual(mdiMenuDown);
			expect(dataTable.props("sortDescIcon")).toEqual(mdiMenuUp);
		});

		describe("when the remove button is clicked", () => {
			const triggerMemberRemoval = async (
				index: number,
				wrapper: VueWrapper
			) => {
				const dataTable = wrapper.getComponent(VDataTable);
				const removeButton: VueWrapper<VBtn> = dataTable
					.findAllComponents(VBtn)
					.filter(
						(btn: VueWrapper<VBtn>) => btn.props("icon") === mdiTrashCanOutline
					)[index];
				await removeButton.trigger("click");
			};

			it("opens confirmation dialog with remove message for single member ", async () => {
				const { wrapper } = setup();

				askConfirmationMock.mockResolvedValue(true);

				await triggerMemberRemoval(0, wrapper);

				expect(askConfirmationMock).toHaveBeenCalledWith({
					confirmActionLangKey: "common.actions.remove",
					message: "pages.rooms.members.remove.confirmation",
				});
			});

			it("should call remove:members even after confirmation", async () => {
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

		// ToDo: refactor those tests not using vm
		describe("multiple selection", () => {
			it("should render checkBoxes", async () => {
				const { wrapper, mockMembers } = setup();

				const dataTable = wrapper.findComponent(VDataTable);
				const checkBoxes = dataTable.findAll("input[type='checkbox']");

				expect(checkBoxes.length).toEqual(mockMembers.length + 1);
			});

			// describe("when checkboxes are clicked", () => {
			// describe("bulk remove button", () => {
			// 	it("should be visible", async () => {
			// 		const { wrapper, mockMembers } = setup();
			// 		const dataTable = wrapper.findComponent(VDataTable);

			// 		const bulkRemoveButtonBefore = wrapper.findComponent({
			// 			ref: "removeSelectedMembers",
			// 		});
			// 		expect(bulkRemoveButtonBefore.exists()).toBe(false);

			// 		dataTable.vm.$emit("update:modelValue", [
			// 			mockMembers[0].userId,
			// 			mockMembers[1].userId,
			// 		]);
			// 		await flushPromises();
			// 		const bulkRemoveButtonAfter = wrapper.findComponent({
			// 			ref: "removeSelectedMembers",
			// 		});
			// 		expect(bulkRemoveButtonAfter.exists()).toBe(true);
			// 	});
			// 			describe("when the bulk remove button is clicked", () => {
			// 				it("should emit the 'remove:members'", async () => {
			// 					const { wrapper } = setup();
			// 					const dataTable = wrapper.findComponent({ name: "v-data-table" });
			// 					dataTable.vm.$emit("update:modelValue", [
			// 						mockMembers[0].userId,
			// 						mockMembers[1].userId,
			// 					]);
			// 					await flushPromises();
			// 					const bulkRemoveButton = wrapper.findComponent({
			// 						ref: "removeSelectedMembers",
			// 					});
			// 					await bulkRemoveButton.vm.$emit("click");
			// 					expect(wrapper.emitted()).toHaveProperty("remove:members");
			// 				});
			// 			});
		});
		// 		describe("when reset button is clicked", () => {
		// 			it("should reset the selected members", async () => {
		// 				// const { wrapper, wrapperVM } = setup();
		// 				// const dataTable = wrapper.findComponent({ name: "v-data-table" });
		// 				// dataTable.vm.$emit("update:modelValue", [
		// 				// 	mockMembers[0].userId,
		// 				// 	mockMembers[1].userId,
		// 				// ]);
		// 				// await flushPromises();
		// 				// expect(wrapperVM.selectedUserIds).toStrictEqual([
		// 				// 	mockMembers[0].userId,
		// 				// 	mockMembers[1].userId,
		// 				// ]);
		// 				// const resetButton = wrapper.findComponent({
		// 				// 	ref: "resetSelectedMembers",
		// 				// });
		// 				// resetButton.vm.$emit("click");
		// 				// expect(wrapperVM.selectedUserIds).toStrictEqual([]);
		// 			});
		// 		});
		// 		});
		// 	});
	});

	// describe("Search component", () => {
	// 	it("should render the search component", () => {
	// 		const { wrapper, wrapperVM } = setup();
	// 		const search = wrapper.findComponent({ name: "v-text-field" });

	// 		expect(search).toBeTruthy();
	// 		expect(search.vm["label"]).toEqual("common.labels.search");
	// 		expect(search.vm["prependInnerIcon"]).toEqual(mdiMagnify);
	// 		expect(search.vm["vModel"]).toEqual(wrapperVM.search.value);
	// 	});

	// 	it("should filter the members based on the search value", async () => {
	// 		const { wrapper, wrapperVM } = setup();
	// 		const search = wrapper.findComponent({ name: "v-text-field" });

	// 		await search.vm.$emit("update:modelValue", mockMembers[0].firstName);
	// 		expect(wrapperVM.search).toBe(mockMembers[0].firstName);
	// 		const dataTable = wrapper.findComponent({ name: "v-data-table" });

	// 		expect(dataTable.vm.search).toEqual(mockMembers[0].firstName);
	// 	});
	// });
});
