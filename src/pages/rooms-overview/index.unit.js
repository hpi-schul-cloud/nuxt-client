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
		groupElements: [
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
			align: jest.fn(),
			group: jest.fn(),
		},
	},
};

const spyMocks = {
	storeRoomAlignMock: jest.spyOn(RoomsModule, "align"),
	storeModuleFetchMock: jest.spyOn(RoomsModule, "fetch"),
	getElementNameByRefMock: jest.spyOn(RoomsPage.methods, "getElementNameByRef"),
	openDialogMock: jest.spyOn(RoomsPage.methods, "openDialog"),
	getDataObjectMock: jest.spyOn(RoomsPage.methods, "getDataObject"),
	hasGroupMock: jest.spyOn(RoomsPage.methods, "hasGroup"),
	findDataByPosMock: jest.spyOn(RoomsPage.methods, "findDataByPos"),
	getDeviceDimsMock: jest.spyOn(RoomsPage.methods, "getDeviceDims"),
	setDropElementMock: jest.spyOn(RoomsPage.methods, "setDropElement"),
	setGroupElementsMock: jest.spyOn(RoomsPage.methods, "setGroupElements"),
	addGroupElementsMock: jest.spyOn(RoomsPage.methods, "addGroupElements"),
};

describe("RoomPage", () => {
	beforeEach(() => {
		RoomsModule.setRoomData(mockStoreData);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it(...isValidComponent(RoomsPage));

	it("should fetch the room data", async () => {
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			computed: {
				$mq: () => "desktop",
			},
		});

		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		expect(spyMocks.storeModuleFetchMock).toHaveBeenCalled();
		expect(wrapper.vm.$data.roomsData).toStrictEqual(mockStoreData);
	});

	it("should display 3 avatars component", async () => {
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			computed: {
				$mq: () => "desktop",
			},
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const avatarComponents = wrapper.findAll(".room-avatar");

		expect(avatarComponents).toHaveLength(3);
	});

	it("should display 2 avatars component in 'mobile' device", async () => {
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			computed: {
				$mq: () => "mobile",
			},
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const avatarComponents = wrapper.findAll(".room-avatar");

		expect(avatarComponents).toHaveLength(2);
	});

	it("should display 1 group-avatar component", async () => {
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			computed: {
				$mq: () => "desktop",
			},
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const groupAvatarComponents = wrapper.findAll(".room-group-avatar");

		expect(groupAvatarComponents).toHaveLength(1);
	});

	it("should call 'openDialog' event if groupAvatar component clicked", async () => {
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			computed: {
				$mq: () => "desktop",
			},
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const cardComponent = wrapper.find(".card-component");

		await cardComponent.trigger("click");

		expect(spyMocks.openDialogMock).toHaveBeenCalled();
	});

	it("custom-dialog component should be visible with the correct data", async () => {
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			computed: {
				$mq: () => "desktop",
			},
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
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			computed: {
				$mq: () => "desktop",
			},
		});
		await wrapper.vm.$nextTick();

		expect(spyMocks.getDataObjectMock).toHaveBeenCalled();
		expect(spyMocks.findDataByPosMock).toHaveBeenCalled();

		await wrapper.vm.$nextTick();
		expect(spyMocks.getDeviceDimsMock).toHaveBeenCalled();
		expect(spyMocks.hasGroupMock).toHaveBeenCalled();
	});

	it("'$refs' should be placed correctly for the components", async () => {
		const wrapper = mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			computed: {
				$mq: () => "desktop",
			},
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

	it("should set the column count '2' if the device is 'mobile'", async () => {
		const wrapper = mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			computed: {
				$mq: () => "mobile",
			},
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		expect(spyMocks.getDeviceDimsMock).toHaveBeenCalled();
		expect(wrapper.vm.dimensions.colCount).toBe(2);
	});

	it("should set the column count '4' if the device is 'tablet'", async () => {
		const wrapper = mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			computed: {
				$mq: () => "tablet",
			},
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		expect(spyMocks.getDeviceDimsMock).toHaveBeenCalled();
		expect(wrapper.vm.dimensions.colCount).toBe(4);
	});

	it("should set the column count '6' if the device is 'desktop'", async () => {
		const wrapper = mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			computed: {
				$mq: () => "desktop",
			},
		});
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		expect(spyMocks.getDeviceDimsMock).toHaveBeenCalled();
		expect(wrapper.vm.dimensions.colCount).toBe(6);
	});

	it("should call 'setDropElement' method for grouping after avatar-to-emptyAvatar drag&drop", async () => {
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			computed: {
				$mq: () => "desktop",
			},
		});
		const expectedPayload = {
			from: {
				x: 1,
				y: 4,
			},
			item: {
				id: "3",
				title: "Third",
				shortTitle: "Ma",
				displayColor: "#EC407A",
				url: "/api/xxxx/1234w",
				xPosition: 1,
				yPosition: 4,
			},
			to: {
				x: 4,
				y: 4,
			},
		};

		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.$refs["4-1"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);
		expect(wrapper.vm.$refs["2-4"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomEmptyAvatar"
		);

		const avatarComponent = wrapper.findComponent({ ref: "4-1" });
		avatarComponent.trigger("dragstart");

		const emptyAvatarComponent = wrapper.findComponent({ ref: "4-4" });
		emptyAvatarComponent.trigger("drop");

		expect(spyMocks.setDropElementMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock).toHaveBeenCalled();
		expect(spyMocks.getElementNameByRefMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock.mock.calls[0][0]).toStrictEqual(
			expectedPayload
		);
	});

	it("should call 'setGroupElements' method for grouping after avatar-to-avatar drag&drop", async () => {
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			computed: {
				$mq: () => "desktop",
			},
		});
		const expectedPayload = {
			from: {
				x: 1,
				y: 4,
			},
			item: {
				id: "3",
				title: "Third",
				shortTitle: "Ma",
				displayColor: "#EC407A",
				url: "/api/xxxx/1234w",
				xPosition: 1,
				yPosition: 4,
			},
			to: {
				x: 2,
				y: 2,
			},
		};

		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.$refs["4-1"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);
		expect(wrapper.vm.$refs["2-2"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);

		const fromAvatarComponent = wrapper.findComponent({ ref: "4-1" });
		fromAvatarComponent.trigger("dragstart");

		const toAvatarComponent = wrapper.findComponent({ ref: "2-2" });
		toAvatarComponent.trigger("drop");

		expect(spyMocks.setGroupElementsMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock).toHaveBeenCalled();
		expect(spyMocks.getElementNameByRefMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock.mock.calls[0][0]).toStrictEqual(
			expectedPayload
		);
	});

	it("should call 'addGroupElements' method for grouping after avatar-to-groupAvatar drag&drop", async () => {
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			computed: {
				$mq: () => "tablet",
			},
		});
		const expectedPayload = {
			from: {
				x: 1,
				y: 4,
			},
			item: {
				id: "3",
				title: "Third",
				shortTitle: "Ma",
				displayColor: "#EC407A",
				url: "/api/xxxx/1234w",
				xPosition: 1,
				yPosition: 4,
			},
			to: {
				x: 2,
				y: 4,
			},
		};
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.$refs["4-1"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);
		expect(wrapper.vm.$refs["4-2"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomGroupAvatar"
		);

		const fromAvatarComponent = wrapper.findComponent({ ref: "4-1" });
		fromAvatarComponent.trigger("dragstart");

		const toAvatarComponent = wrapper.findComponent({ ref: "4-2" });
		toAvatarComponent.trigger("drop");

		expect(spyMocks.addGroupElementsMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock).toHaveBeenCalled();
		expect(spyMocks.getElementNameByRefMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock.mock.calls[0][0]).toStrictEqual(
			expectedPayload
		);
	});

	it("should call 'setDropElement' method for grouping after ungroup action", async () => {
		const wrapper = await mount(RoomsPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			computed: {
				$mq: () => "desktop",
			},
		});

		const expectedPayload = {
			to: {
				x: 4,
				y: 4,
			},
			item: {
				id: "5",
				title: "Math 7a",
				displayColor: "yellow",
			},
			from: {
				x: -1,
				y: -1,
			},
			group: {
				groupIndex: 0,
				id: "4",
			},
		};

		await wrapper.setData({
			groupDialog: {
				isOpen: true,
				groupData: {
					id: "4",
					title: "Fourth",
					shortTitle: "Bi",
					displayColor: "#EC407A",
					url: "/api/xxxx/1234w",
					xPosition: 2,
					yPosition: 4,
					groupElements: [
						{
							id: "5",
							title: "Math 7a",
							displayColor: "yellow",
						},
					],
				},
			},
		});

		const groupAvatarComponent = wrapper.findComponent({ ref: "index-0" });
		groupAvatarComponent.trigger("dragstart");

		await wrapper.vm.$nextTick();

		expect(
			wrapper.vm.$refs["index-0"][0].$options["_componentTag"]
		).toStrictEqual("vRoomAvatar");
		expect(wrapper.vm.$refs["2-4"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomEmptyAvatar"
		);

		const emptyAvatarComponent = wrapper.findComponent({ ref: "4-4" });
		emptyAvatarComponent.trigger("drop");

		expect(spyMocks.setDropElementMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock.mock.calls[0][0]).toStrictEqual(
			expectedPayload
		);
	});
});
