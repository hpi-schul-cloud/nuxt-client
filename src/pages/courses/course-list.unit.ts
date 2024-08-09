import { coursesModule } from "@/store";
import { mount } from "@vue/test-utils";
import CourseList from "./CourseList.page.vue";
import setupStores from "@@/tests/test-utils/setupStores";
import CoursesModule from "@/store/courses";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import {
	COMMON_CARTRIDGE_IMPORT_MODULE_KEY,
	LOADING_STATE_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	COURSES_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import { nextTick } from "vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import CommonCartridgeImportModule from "@/store/common-cartridge-import";

const getWrapper = (device = "desktop") => {
	return mount(CourseList, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				mq: { current: device },
			},
		},
		provide: {
			[LOADING_STATE_MODULE_KEY.valueOf()]:
				createModuleMocks(LoadingStateModule),
			[NOTIFIER_MODULE_KEY.valueOf()]: createModuleMocks(NotifierModule),
			[COURSES_MODULE_KEY.valueOf()]: createModuleMocks(CoursesModule),
			[COMMON_CARTRIDGE_IMPORT_MODULE_KEY.valueOf()]: createModuleMocks(
				CommonCartridgeImportModule
			),
		},
	});
};

const mockData = [
	{
		id: "123",
		title: "Mathe",
		shortTitle: "Ma",
		displayColor: "#54616e",
		startDate: "2019-12-07T23:00:00.000Z",
		untilDate: "2020-12-16T23:00:00.000Z",
		titleDate: "2019/20",
	},
	{
		id: "234",
		title: "History",
		shortTitle: "Hi",
		displayColor: "#EF6C00",
		startDate: "2015-07-31T22:00:00.000Z",
		untilDate: "2018-07-30T22:00:00.000Z",
		titleDate: "2015-2018",
	},
	{
		id: "345",
		title: "Spanish",
		shortTitle: "Sp",
		displayColor: "#009688",
		startDate: "2021-07-31T22:00:00.000Z",
		untilDate: "2021-11-05T23:00:00.000Z",
		titleDate: "2021",
	},
	{
		id: "456",
		title: "English",
		shortTitle: "En",
		displayColor: "#EC407A",
		startDate: "2021-07-31T22:00:00.000Z",
		untilDate: "2022-07-30T22:00:00.000Z",
	},
];

describe("@/pages/course-list.vue", () => {
	beforeEach(() => {
		setupStores({
			coursesModule: CoursesModule,
			authModule: AuthModule,
			envConfigModule: EnvConfigModule,
		});
		coursesModule.setAllElements(mockData);
	});

	describe("when data is not loaded yet", () => {
		const setup = () => {
			const wrapper = getWrapper();

			return { wrapper };
		};

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
			// tslint ignored because it gives
			// "Property 'items' does not exist on type 'Vue'" error
			// TODO: better solution should be found

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			expect(wrapper.vm.courses[0]).toStrictEqual(expectedItem);
		});
	});

	describe("when data is loaded", () => {
		const setup = () => {
			const wrapper = getWrapper();

			return { wrapper };
		};

		describe("when data is not empty", () => {
			it("should search elements on list", async () => {
				const { wrapper } = setup();
				await nextTick();

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				expect(wrapper.vm.courses.length).toEqual(4);
				wrapper.vm.searchText = "math";
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				expect(wrapper.vm.courses.length).toEqual(1);
				wrapper.vm.searchText = "";
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				expect(wrapper.vm.courses.length).toEqual(4);
				wrapper.vm.searchText = "15";
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				expect(wrapper.vm.courses.length).toEqual(1);
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				expect(wrapper.vm.courses[0]).toEqual({
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
