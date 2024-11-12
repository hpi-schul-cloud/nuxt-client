import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import MembersTable from "./MembersTable.vue";
import { Ref } from "vue";
import { mdiMenuDown, mdiMenuUp, mdiMagnify } from "@icons/material";
import { roomMemberResponseFactory } from "@@/tests/test-utils";
import { RoomMember } from "@data-room";

const mockMembers = roomMemberResponseFactory.buildList(3);

describe("MembersTable", () => {
	const setup = () => {
		const wrapper = mount(MembersTable, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: { members: mockMembers },
		});

		const wrapperVM = wrapper.vm as unknown as {
			members: RoomMember[];
			search: Ref<string>;
			tableTitle: string;
			tableHeader: { title: string; key: string }[];
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

		it("should render the table title", () => {
			const { wrapper, wrapperVM } = setup();
			const title = wrapper.find(".table-title");

			expect(title.text()).toBe(wrapperVM.tableTitle);
		});

		describe("when the remove button is clicked", () => {
			it("should emit the remove event", async () => {
				const { wrapper } = setup();
				const removeButton = wrapper.findComponent({
					name: "v-btn",
					ref: "removeMember",
				});

				await removeButton.vm.$emit("click");
				expect(wrapper.emitted()).toHaveProperty("remove:member");
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

			const title = wrapper.find(".table-title");
			expect(title.text()).toContain(`(${mockMembers.length})`);
			await search.vm.$emit("update:modelValue", mockMembers[0].firstName);
			expect(wrapperVM.search).toBe(mockMembers[0].firstName);
			const dataTable = wrapper.findComponent({ name: "v-data-table" });

			expect(dataTable.vm.search).toEqual(mockMembers[0].firstName);
			expect(title.text()).toContain("(1)");
		});
	});
});
