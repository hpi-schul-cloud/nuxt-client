import { courseRoomListModule } from "@/store";
import { mount } from "@vue/test-utils";
import CourseRoomList from "./CourseRoomList.page.vue";
import setupStores from "@@/tests/test-utils/setupStores";
import CourseRoomListModule from "@/store/course-room-list";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import {
	COMMON_CARTRIDGE_IMPORT_MODULE_KEY,
	LOADING_STATE_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	COURSE_ROOM_LIST_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import { nextTick } from "vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import CommonCartridgeImportModule from "@/store/common-cartridge-import";
import { CourseMetadataResponse } from "@/serverApi/v3";

vi.mock("vue-router");

const getWrapper = () => {
	return mount(CourseRoomList, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				[LOADING_STATE_MODULE_KEY.valueOf()]:
					createModuleMocks(LoadingStateModule),
				[NOTIFIER_MODULE_KEY.valueOf()]: createModuleMocks(NotifierModule),
				[COURSE_ROOM_LIST_MODULE_KEY.valueOf()]:
					createModuleMocks(CourseRoomListModule),
				[COMMON_CARTRIDGE_IMPORT_MODULE_KEY.valueOf()]: createModuleMocks(
					CommonCartridgeImportModule
				),
			},
		},
	});
};

const mockData: CourseMetadataResponse[] = [
	{
		id: "123",
		title: "Mathe",
		shortTitle: "Ma",
		displayColor: "#54616e",
		startDate: "2019-12-07T23:00:00.000Z",
		untilDate: "2020-12-16T23:00:00.000Z",
		isLocked: false,
	},
	{
		id: "234",
		title: "History",
		shortTitle: "Hi",
		displayColor: "#EF6C00",
		startDate: "2015-07-31T22:00:00.000Z",
		untilDate: "2018-07-30T22:00:00.000Z",
		isLocked: false,
	},
	{
		id: "345",
		title: "Spanish",
		shortTitle: "Sp",
		displayColor: "#009688",
		startDate: "2021-07-31T22:00:00.000Z",
		untilDate: "2021-11-05T23:00:00.000Z",
		isLocked: false,
	},
	{
		id: "456",
		title: "English",
		shortTitle: "En",
		displayColor: "#EC407A",
		startDate: "2021-07-31T22:00:00.000Z",
		untilDate: "2022-07-30T22:00:00.000Z",
		isLocked: false,
	},
];

describe("@/pages/CourseRoomListPage", () => {
	const setup = () => {
		const wrapper = getWrapper();

		return { wrapper };
	};

	beforeEach(() => {
		setupStores({
			courseRoomListModule: CourseRoomListModule,
			authModule: AuthModule,
			envConfigModule: EnvConfigModule,
		});
		courseRoomListModule.setAllElements(mockData);
		courseRoomListModule.fetchAllElements = vi.fn();
	});

	describe("when data is not loaded yet", () => {
		it("should fetch data", async () => {
			const { wrapper } = setup();
			await nextTick();

			const expectedItem = {
				id: "123",
				title: "Mathe",
				shortTitle: "Ma",
				displayColor: "#54616e",
				startDate: "2019-12-07T23:00:00.000Z",
				untilDate: "2020-12-16T23:00:00.000Z",
				titleDate: "2019/20",
				searchText: "Mathe 2019/20",
				isArchived: true,
				to: "/rooms/123",
			};

			expect(wrapper.vm.rooms[0]).toStrictEqual(expectedItem);
		});
	});

	describe("when data is loaded", () => {
		describe("and data is not empty", () => {
			it("should search elements on list", async () => {
				const { wrapper } = setup();

				expect(wrapper.vm.rooms.length).toEqual(4);

				wrapper.vm.searchText = "math";
				expect(wrapper.vm.rooms.length).toEqual(1);

				wrapper.vm.searchText = "";
				expect(wrapper.vm.rooms.length).toEqual(4);

				wrapper.vm.searchText = "15";
				expect(wrapper.vm.rooms.length).toEqual(1);

				expect(wrapper.vm.rooms[0]).toEqual({
					id: "234",
					title: "History",
					shortTitle: "Hi",
					displayColor: "#EF6C00",
					startDate: "2015-07-31T22:00:00.000Z",
					untilDate: "2018-07-30T22:00:00.000Z",
					titleDate: "2015-2018",
					searchText: "History 2015-2018",
					isArchived: true,
					to: "/rooms/234",
				});
			});
		});
	});
});
