import CourseRoomList from "./CourseRoomList.page.vue";
import { mockedPiniaStoreTyping, ProcessedRoomItem, processedRoomItemFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useCourseRoomListStore } from "@data-course-rooms";
import { createTestingPinia } from "@pinia/testing";
import { mount, VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { ComponentPublicInstance, nextTick } from "vue";

vi.mock("vue-router");
vi.mock("@data-common-cartridge", () => ({
	useCommonCartridgeImport: () => ({
		isOpen: { value: false },
		isSuccess: { value: false },
		file: { value: undefined },
		importCommonCartridgeFile: vi.fn(),
	}),
}));

const mockProcessedData = [
	{ title: "Mathe", searchText: "Mathe 2019/20" },
	{ title: "History", searchText: "History 2015-2018" },
	{ title: "Spanish", searchText: "Spanish" },
	{ title: "English", searchText: "English" },
].map((data) => processedRoomItemFactory.build(data));

type CourseRoomListVm = ComponentPublicInstance & {
	rooms: ProcessedRoomItem[];
	searchText: string;
};

describe("CourseRoomListPage", () => {
	const setup = () => {
		const pinia = createTestingPinia({ stubActions: false });
		setActivePinia(pinia);

		const courseRoomListStore = mockedPiniaStoreTyping(useCourseRoomListStore);
		courseRoomListStore.$patch({
			allElements: mockProcessedData as never,
		});
		courseRoomListStore.fetchAllElements.mockResolvedValue();

		const wrapper = mount(CourseRoomList, {
			global: {
				plugins: [pinia, createTestingVuetify(), createTestingI18n()],
			},
		}) as VueWrapper<CourseRoomListVm>;

		return { wrapper, courseRoomListStore };
	};

	describe("when data is loaded", () => {
		it("should display rooms from store", async () => {
			const { wrapper } = setup();
			await nextTick();

			expect(wrapper.vm.rooms[0]).toStrictEqual(mockProcessedData[0]);
		});

		describe("and data is not empty", () => {
			it("should search elements on list", async () => {
				const { wrapper } = setup();
				await nextTick();

				expect(wrapper.vm.rooms.length).toEqual(4);

				wrapper.vm.searchText = "math";
				await nextTick();
				expect(wrapper.vm.rooms.length).toEqual(1);

				wrapper.vm.searchText = "";
				await nextTick();
				expect(wrapper.vm.rooms.length).toEqual(4);

				wrapper.vm.searchText = "15";
				await nextTick();
				expect(wrapper.vm.rooms.length).toEqual(1);
				expect(wrapper.vm.rooms[0].title).toBe("History");
			});

			it("should filter rooms when typing in search field", async () => {
				const { wrapper } = setup();
				await nextTick();

				expect(wrapper.vm.rooms.length).toEqual(4);

				const searchField = wrapper.find('[data-testid="search-field-course"] input');
				await searchField.setValue("Mathe");
				await nextTick();

				expect(wrapper.vm.rooms.length).toEqual(1);
				expect(wrapper.vm.rooms[0].title).toBe("Mathe");
			});
		});
	});
});
