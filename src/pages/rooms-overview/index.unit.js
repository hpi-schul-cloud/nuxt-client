import { default as RoomsPage } from "./index.vue";

import RoomsModule from "@/store/rooms";

const mockStoreData = [
	{
		id: "1",
		title: "First",
		shortTitle: "Ma",
		displayColor: "purple",
		url: "/api/xxxx/1234w",
		xPosition: 1,
		yPosition: 1,
	},
	{
		id: "2",
		title: "Second",
		shortTitle: "Ma",
		displayColor: "#EC407A",
		url: "/api/xxxx/1234w",
		notification: true,
		xPosition: 2,
		yPosition: 2,
	},
	{
		id: "3",
		title: "Third",
		shortTitle: "Ma",
		displayColor: "#EC407A",
		url: "/api/xxxx/1234w",
		xPosition: 1,
		yPosition: 4,
	},
	{
		id: "4",
		title: "Fourth",
		shortTitle: "Bi",
		displayColor: "#EC407A",
		url: "/api/xxxx/1234w",
		xPosition: 2,
		yPosition: 4,
		group: [
			{
				id: "5",
				title: "Math 7a",
				displayColor: "yellow",
			},
			{
				id: "6",
				title: "Bio 3a",
				displayColor: "green",
				notification: true,
			},
			{
				id: "7",
				title: "Geo 7b",
				displayColor: "yellow",
			},
		],
	},
];

const mockStore = {
	rooms: {
		getters: {
			getRoomsData: () => mockStoreData,
			getLoading: () => false,
			getError: () => null,
		},
		actions: {
			fetch: jest.fn(),
		},
	},
};

describe("RoomPage", () => {
	beforeEach(() => {
		RoomsModule.setRoomData(mockStoreData);
	});

	it(...isValidComponent(RoomsPage));

	it("should fetch the room data", async () => {
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});

		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.$data.roomsData).toStrictEqual(mockStoreData);
	});

	it("should display 3 avatars component", async () => {
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const avatarComponents = wrapper.findAll(".room-avatar");

		expect(avatarComponents).toHaveLength(3);
	});

	it("should display 1 group-avatar component", async () => {
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const groupAvatarComponents = wrapper.findAll(".room-group-avatar");

		expect(groupAvatarComponents).toHaveLength(1);
	});

	it("should call 'openDialog' event if groupAvatar component clicked", async () => {
		const mockMethod = jest.spyOn(RoomsPage.methods, "openDialog");
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const cardComponent = wrapper.find(".card-component");

		await cardComponent.trigger("click");

		expect(mockMethod).toHaveBeenCalled();
	});

	it("custom-dialog component should be visible with the correct data", async () => {
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const cardComponent = wrapper.find(".card-component");

		await cardComponent.trigger("click");

		const customDialog = wrapper.find(".custom-dialog");
		expect(customDialog.vm.$slots.title[0].elm.innerHTML).toContain("Fourth");
		expect(customDialog.vm.$slots.content[0].children).toHaveLength(3);
		expect(
			customDialog.vm.$slots.content[0].children[0].elm.innerHTML
		).toContain("Math 7a");
	});

	it("should call the necessary methods for positioning while the page loading", async () => {
		const getDataObjectMock = jest.spyOn(RoomsPage.methods, "getDataObject");
		const hasGroupMock = jest.spyOn(RoomsPage.methods, "hasGroup");
		const findDataByPosMock = jest.spyOn(RoomsPage.methods, "findDataByPos");
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});
		await wrapper.vm.$nextTick();

		expect(getDataObjectMock).toHaveBeenCalled();
		expect(findDataByPosMock).toHaveBeenCalled();

		await wrapper.vm.$nextTick();
		expect(hasGroupMock).toHaveBeenCalled();
	});

	it("'$refs' should be placed correctly for the components", async () => {
		const wrapper = mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});

		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.$refs["1-1"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);
		expect(wrapper.vm.$refs["2-2"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);
		expect(wrapper.vm.$refs["4-1"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);
		expect(wrapper.vm.$refs["4-2"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomGroupAvatar"
		);
		expect(wrapper.vm.$refs["3-3"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomEmptyAvatar"
		);
	});
});
