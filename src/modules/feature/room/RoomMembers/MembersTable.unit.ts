import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import MembersTable from "./MembersTable.vue";
import { Ref } from "vue";
import { mdiMenuDown, mdiMenuUp, mdiMagnify } from "@icons/material";
import { roomMemberResponseFactory } from "@@/tests/test-utils";
import { RoomMember } from "@data-room";
import { flushPromises } from "@vue/test-utils";

const mockMembers = roomMemberResponseFactory.buildList(3);

describe("MembersTable", () => {
	const setup = () => {
		const wrapper = mount(MembersTable, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: { members: mockMembers, selectedMembers: [] },
		});

		const wrapperVM = wrapper.vm as unknown as {
			members: RoomMember[];
			search: Ref<string>;
			tableTitle: string;
			tableHeader: { title: string; key: string }[];
			selectedMemberList: string[];
		};

		return { wrapper, wrapperVM };
	};

	describe("when component is mounted", () => {
		it("should render member's table", () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
			expect(wrapper.findComponent(MembersTable)).toBeTruthy();
		});
	});

	describe("DataTable component", () => {
		it("should render the table component", () => {
			const { wrapper, wrapperVM } = setup();
			const dataTable = wrapper.findComponent({ name: "v-data-table" });

			expect(dataTable).toBeTruthy();
			expect(dataTable.vm.items).toEqual(mockMembers);
			expect(dataTable.vm.headers).toEqual(wrapperVM.tableHeader);
			expect(dataTable.vm["sortAscIcon"]).toEqual(mdiMenuDown);
			expect(dataTable.vm["sortDescIcon"]).toEqual(mdiMenuUp);
		});

		describe("when the remove button is clicked", () => {
			it("should emit the remove event", async () => {
				const { wrapper } = setup();
				const removeButton = wrapper.findComponent({
					name: "v-btn",
					ref: "removeMember",
				});

				await removeButton.vm.$emit("click");
				expect(wrapper.emitted()).toHaveProperty("remove:members");
			});
		});

		describe("multiple selection", () => {
			it("should render checkBoxes", async () => {
				const { wrapper } = setup();
				const dataTable = wrapper.findComponent({ name: "v-data-table" });

				const checkBoxes = dataTable.findAll("tr input[type='checkbox']");
				expect(checkBoxes.length).toBeGreaterThan(0);
			});

			describe("when checkboxes are clicked", () => {
				describe("bulk remove button", () => {
					it("should be visible", async () => {
						const { wrapper } = setup();
						const dataTable = wrapper.findComponent({ name: "v-data-table" });
						const bulkRemoveButtonBefore = wrapper.findComponent({
							ref: "removeSelectedMembers",
						});

						expect(bulkRemoveButtonBefore.exists()).toBe(false);
						dataTable.vm.$emit("update:modelValue", [
							mockMembers[0].userId,
							mockMembers[1].userId,
						]);
						await flushPromises();
						const bulkRemoveButtonAfter = wrapper.findComponent({
							ref: "removeSelectedMembers",
						});
						expect(bulkRemoveButtonAfter.exists()).toBe(true);
					});

					describe("when the bulk remove button is clicked", () => {
						it("should emit the 'remove:members'", async () => {
							const { wrapper } = setup();
							const dataTable = wrapper.findComponent({ name: "v-data-table" });
							dataTable.vm.$emit("update:modelValue", [
								mockMembers[0].userId,
								mockMembers[1].userId,
							]);
							await flushPromises();
							const bulkRemoveButton = wrapper.findComponent({
								ref: "removeSelectedMembers",
							});
							await bulkRemoveButton.vm.$emit("click");
							expect(wrapper.emitted()).toHaveProperty("remove:members");
						});
					});
				});

				describe("when reset button is clicked", () => {
					it("should reset the selected members", async () => {
						// const { wrapper, wrapperVM } = setup();
						// const dataTable = wrapper.findComponent({ name: "v-data-table" });
						// dataTable.vm.$emit("update:modelValue", [
						// 	mockMembers[0].userId,
						// 	mockMembers[1].userId,
						// ]);
						// await flushPromises();
						// expect(wrapperVM.selectedUserIds).toStrictEqual([
						// 	mockMembers[0].userId,
						// 	mockMembers[1].userId,
						// ]);
						// const resetButton = wrapper.findComponent({
						// 	ref: "resetSelectedMembers",
						// });
						// resetButton.vm.$emit("click");
						// expect(wrapperVM.selectedUserIds).toStrictEqual([]);
					});
				});
			});
		});
	});

	describe("Search component", () => {
		it("should render the search component", () => {
			const { wrapper, wrapperVM } = setup();
			const search = wrapper.findComponent({ name: "v-text-field" });

			expect(search).toBeTruthy();
			expect(search.vm["label"]).toEqual("common.labels.search");
			expect(search.vm["prependInnerIcon"]).toEqual(mdiMagnify);
			expect(search.vm["vModel"]).toEqual(wrapperVM.search.value);
		});

		it("should filter the members based on the search value", async () => {
			const { wrapper, wrapperVM } = setup();
			const search = wrapper.findComponent({ name: "v-text-field" });

			await search.vm.$emit("update:modelValue", mockMembers[0].firstName);
			expect(wrapperVM.search).toBe(mockMembers[0].firstName);
			const dataTable = wrapper.findComponent({ name: "v-data-table" });

			expect(dataTable.vm.search).toEqual(mockMembers[0].firstName);
		});
	});
});
