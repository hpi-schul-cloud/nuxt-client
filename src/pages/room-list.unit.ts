import { roomsModule } from "@/store";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, Wrapper } from "@vue/test-utils";
import RoomList from "./RoomList.page.vue";
import flushPromises from "flush-promises";
import setupStores from "@@/tests/test-utils/setupStores";
import RoomsModule from "@/store/rooms";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";

const getWrapper = (computed: any = {}, device = "desktop") => {
	return mount(RoomList, {
		...createComponentMocks({
			i18n: true,
			//@ts-ignore
			vuetify: true,
		}),
		computed: {
			$mq: () => device,
			...computed,
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

describe("@pages/room-list.vue", () => {
	let wrapper: Wrapper<Vue>;

	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		setupStores({
			rooms: RoomsModule,
			auth: AuthModule,
			"env-config": EnvConfigModule,
		});
		roomsModule.setAllElements(mockData as any);
	});

	describe("when data is not loaded yet", () => {
		beforeEach(() => {
			wrapper = getWrapper({ isLoading: () => true });
		});

		afterEach(() => {
			wrapper.destroy();
		});

		it("should fetch data", async () => {
			await flushPromises();

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
				href: "/courses/123",
			};
			// tslint ignored because it gives
			// "Property 'items' does not exist on type 'Vue'" error
			// TODO: better solution should be found

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
				await flushPromises();

				const searchInput = wrapper.vm.$refs["search"] as any;

				// @ts-ignore
				expect(wrapper.vm.rooms.length).toEqual(4);
				searchInput.$emit("input", "math");
				// @ts-ignore
				expect(wrapper.vm.rooms.length).toEqual(1);
				searchInput.$emit("input", "");
				// @ts-ignore
				expect(wrapper.vm.rooms.length).toEqual(4);
				searchInput.$emit("input", "15");
				// @ts-ignore
				expect(wrapper.vm.rooms.length).toEqual(1);
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
					href: "/courses/234",
				});

				wrapper.destroy();
			});
		});
	});
});
