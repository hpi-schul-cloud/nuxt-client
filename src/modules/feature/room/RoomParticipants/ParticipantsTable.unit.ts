import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import ParticipantsTable from "./ParticipantsTable.vue";
import { participants } from "../../../data/room/roomParticipants/mockParticipantsList";
import { Participants } from "./types";
import { Ref } from "vue";
import { mdiMenuDown, mdiMenuUp, mdiMagnify } from "@icons/material";

describe("ParticipantsTable", () => {
	const setup = () => {
		const wrapper = mount(ParticipantsTable, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: { participants },
		});

		const wrapperVM = wrapper.vm as unknown as {
			participants: Participants[];
			search: Ref<string>;
			tableTitle: string;
			tableHeader: { title: string; key: string }[];
		};

		return { wrapper, wrapperVM };
	};

	describe("when component is mounted", () => {
		it("should render participants", () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
			expect(wrapper.findComponent(ParticipantsTable)).toBeTruthy();
		});
	});

	describe("DataTable component", () => {
		it("should render the table component", () => {
			const { wrapper, wrapperVM } = setup();
			const dataTable = wrapper.findComponent({ name: "v-data-table" });

			expect(dataTable).toBeTruthy();
			expect(dataTable.vm.items).toEqual(participants);
			expect(dataTable.vm.headers).toEqual(wrapperVM.tableHeader);
			expect(dataTable.vm["itemsPerPageText"]).toEqual(
				"pages.rooms.participants.participantTable.itemsPerPage"
			);
			expect(dataTable.vm["sortAscIcon"]).toEqual(mdiMenuDown);
			expect(dataTable.vm["sortDescIcon"]).toEqual(mdiMenuUp);
		});

		it("should render the table title", () => {
			const { wrapper, wrapperVM } = setup();
			const title = wrapper.find(".table-title");

			expect(title.text()).toBe(wrapperVM.tableTitle);
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

		it("should filter the participants based on the search value", async () => {
			const { wrapper, wrapperVM } = setup();
			const search = wrapper.findComponent({ name: "v-text-field" });

			const title = wrapper.find(".table-title");
			expect(title.text()).toContain(`(${participants.length})`);
			await search.vm.$emit("update:modelValue", "Alice");
			expect(wrapperVM.search).toBe("Alice");
			const dataTable = wrapper.findComponent({ name: "v-data-table" });

			expect(dataTable.vm.search).toEqual("Alice");
			expect(title.text()).toContain("(1)");
		});
	});
});
