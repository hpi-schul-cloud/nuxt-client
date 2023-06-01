import { roomsModule } from "@/store";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, Wrapper } from "@vue/test-utils";
import RoomList from "./RoomList.page.vue";
import setupStores from "@@/tests/test-utils/setupStores";
import RoomsModule from "@/store/rooms";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import Vue from "vue";

const getWrapper = (computed: any = {}, device = "desktop") => {
	return mount(RoomList, {
		...createComponentMocks({
			i18n: true,
		}),
		computed: {
			$mq: () => device,
			...computed,
		},
		mocks: {
			$theme: {
				short_name: "nbc",
			},
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

describe("@/pages/room-list.vue", () => {
	let wrapper: Wrapper<Vue>;

	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		setupStores({
			roomsModule: RoomsModule,
			authModule: AuthModule,
			envConfigModule: EnvConfigModule,
		});
		roomsModule.setAllElements(mockData as any);
	});

	describe("when data is not loaded yet", () => {
		beforeEach(() => {
			wrapper = getWrapper({ isLoading: () => true });
		});

		afterEach(() => {
			wrapper.destroy();
			jest.clearAllMocks();
		});

		it("should fetch data", async () => {
			await wrapper.vm.$nextTick();

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
			expect(wrapper.vm.rooms[0]).toStrictEqual(expectedItem);
		});
	});

	describe("when data is loaded", () => {
		describe("when data is not empty", () => {
			it("should search elements on list", async () => {
				wrapper = getWrapper({
					isLoading: () => false,
					hasRooms: () => true,
				});
				await wrapper.vm.$nextTick();

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				expect(wrapper.vm.rooms.length).toEqual(4);
				wrapper.vm.$data.searchText = "math";
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				expect(wrapper.vm.rooms.length).toEqual(1);
				wrapper.vm.$data.searchText = "";
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				expect(wrapper.vm.rooms.length).toEqual(4);
				wrapper.vm.$data.searchText = "15";
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				expect(wrapper.vm.rooms.length).toEqual(1);
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
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

				wrapper.destroy();
			});
		});
	});
});
