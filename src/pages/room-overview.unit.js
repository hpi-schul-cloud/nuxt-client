import { authModule, roomsModule } from "@/store";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import RoomsModule from "@/store/rooms";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import setupStores from "@@/tests/test-utils/setupStores";
import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import CopyModule from "../store/copy";
import LoadingStateModule from "../store/loading-state";
import NotifierModule from "../store/notifier";
import { createModuleMocks } from "../utils/mock-store-module";
import RoomOverview from "./RoomOverview.page.vue";

const mockRoomStoreData = [
	{
		id: "1",
		title: "First",
		shortTitle: "Ma",
		displayColor: "purple",
		xPosition: 1,
		yPosition: 1,
	},
	{
		id: "2",
		title: "Second",
		shortTitle: "Ma",
		displayColor: "#EC407A",
		xPosition: 2,
		yPosition: 2,
	},
	{
		id: "3",
		title: "Third",
		shortTitle: "Ma",
		displayColor: "#EC407A",
		xPosition: 0,
		yPosition: 0,
	},
	{
		groupId: "4",
		title: "Fourth",
		shortTitle: "Bi",
		displayColor: "#EC407A",
		xPosition: 2,
		yPosition: 3,
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
			},
			{
				id: "7",
				title: "Geo 7b",
				displayColor: "yellow",
			},
		],
	},
];

const mockAuthStoreData = {
	__v: 0,
	_id: "asdf",
	id: "asdf",
	firstName: "Arthur",
	lastName: "Dent",
	email: "arthur.dent@hitchhiker.org",
	roles: ["student"],
	permissions: ["COURSE_CREATE", "COURSE_EDIT"],
};

setupStores({
	auth: AuthModule,
	"env-config": EnvConfigModule,
	rooms: RoomsModule,
});

const spyMocks = {
	storeRoomAlignMock: jest
		.spyOn(roomsModule, "align")
		.mockImplementation(async () => {}),
	storeModuleFetchMock: jest
		.spyOn(roomsModule, "fetch")
		.mockImplementation(async () => {}),
	storeModuleFetchAllMock: jest
		.spyOn(roomsModule, "fetchAllElements")
		.mockImplementation(async () => {}),
	getElementNameByRefMock: jest.spyOn(
		RoomOverview.methods,
		"getElementNameByRef"
	),
	openDialogMock: jest.spyOn(RoomOverview.methods, "openDialog"),
	getDataObjectMock: jest.spyOn(RoomOverview.methods, "getDataObject"),
	hasGroupMock: jest.spyOn(RoomOverview.methods, "hasGroup"),
	findDataByPosMock: jest.spyOn(RoomOverview.methods, "findDataByPos"),
	getDeviceDimsMock: jest.spyOn(RoomOverview.methods, "getDeviceDims"),
	setDropElementMock: jest.spyOn(RoomOverview.methods, "setDropElement"),
	setGroupElementsMock: jest.spyOn(RoomOverview.methods, "setGroupElements"),
	addGroupElementsMock: jest.spyOn(RoomOverview.methods, "addGroupElements"),
	savePositionMock: jest.spyOn(RoomOverview.methods, "savePosition"),
	dragFromGroupMock: jest.spyOn(RoomOverview.methods, "dragFromGroup"),
	defaultNamingMock: jest.spyOn(RoomOverview.methods, "defaultNaming"),
};

let copyModuleMock;
let loadingStateModuleMock;
let notifierModuleMock;

const defaultMocks = {
	$route: { query: {} },
	$router: { replace: jest.fn() },
	$t: (key) => key,
};

const getWrapper = (
	device = "desktop",
	isLoading = false,
	options = {},
	attrs = {}
) => {
	copyModuleMock = createModuleMocks(CopyModule, {
		getIsResultModalOpen: false,
	});
	loadingStateModuleMock = createModuleMocks(LoadingStateModule);
	notifierModuleMock = createModuleMocks(NotifierModule);
	return mount(RoomOverview, {
		...createComponentMocks({
			vuetify: true,
			...options,
		}),
		computed: {
			$mq: () => device,
			isLoading: () => isLoading,
		},
		mocks: defaultMocks,
		setup() {
			provide("i18n", { t: (key) => key });
			provide("copyModule", copyModuleMock);
			provide("loadingStateModule", loadingStateModuleMock);
			provide("notifierModule", notifierModuleMock);
		},
		...attrs,
	});
};

describe("@pages/RoomOverview", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		roomsModule.setRoomData(mockRoomStoreData);
		authModule.setUser(mockAuthStoreData);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it(...isValidComponent(RoomOverview));

	it("should fetch the room data", async () => {
		const wrapper = getWrapper();
		await flushPromises();

		const expectedItem = {
			id: "1",
			title: "First",
			shortTitle: "Ma",
			displayColor: "purple",
			xPosition: 1,
			yPosition: 1,
			href: "/courses/1",
		};
		expect(spyMocks.storeModuleFetchMock).toHaveBeenCalled();
		expect(wrapper.vm.rooms[0]).toStrictEqual(expectedItem);
	});

	it("should display 6 avatars component", async () => {
		const wrapper = getWrapper();
		await flushPromises();
		const avatarComponents = wrapper.findAll(".room-avatar");
		expect(avatarComponents).toHaveLength(6);
	});

	it("should display 2 avatars component in 'mobile' device", async () => {
		const wrapper = getWrapper("mobile");
		await flushPromises();
		const avatarComponents = wrapper.findAll(".room-avatar");
		expect(avatarComponents).toHaveLength(6);
	});

	it("should display 1 group-avatar component", async () => {
		const wrapper = getWrapper();
		await flushPromises();
		const groupAvatarComponents = wrapper.findAll(".room-group-avatar");
		expect(groupAvatarComponents).toHaveLength(1);
	});

	it("should call 'openDialog' event if groupAvatar component clicked", async () => {
		const wrapper = getWrapper();
		await flushPromises();
		const cardComponent = wrapper.find(".card-component");
		await cardComponent.trigger("click");
		expect(spyMocks.openDialogMock).toHaveBeenCalled();
	});

	it("custom-dialog component should be visible", async () => {
		const wrapper = getWrapper();
		await flushPromises();
		const cardComponent = wrapper.find(".card-component");
		await cardComponent.trigger("click");
		await flushPromises();
		const customDialog = wrapper.find(".room-dialog");
		await flushPromises();
		const headline = customDialog.find("h2");
		expect(customDialog.vm.isOpen).toBe(true);
		expect(headline.element.innerHTML).toContain("Fourth");
	});

	it("should call the necessary methods for positioning while the page loading", async () => {
		getWrapper();
		await flushPromises();
		expect(spyMocks.getDataObjectMock).toHaveBeenCalled();
		expect(spyMocks.findDataByPosMock).toHaveBeenCalled();
		await flushPromises();
		expect(spyMocks.getDeviceDimsMock).toHaveBeenCalled();
		expect(spyMocks.hasGroupMock).toHaveBeenCalled();
	});

	it("'$refs' should be placed correctly for the components", async () => {
		const wrapper = getWrapper();
		await flushPromises();
		expect(wrapper.vm.$refs["1-1"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);
		expect(wrapper.vm.$refs["2-2"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);
		expect(wrapper.vm.$refs["0-0"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);
		expect(wrapper.vm.$refs["3-2"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomGroupAvatar"
		);
		expect(wrapper.vm.$refs["3-3"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomEmptyAvatar"
		);
	});

	it("should set the column count '4' if the device is 'mobile'", async () => {
		const wrapper = getWrapper("mobile");
		await flushPromises();
		expect(spyMocks.getDeviceDimsMock).toHaveBeenCalled();
		expect(wrapper.vm.dimensions.colCount).toBe(4);
	});

	it("should set the column count '4' if the device is 'tablet'", async () => {
		const wrapper = getWrapper("tablet");
		await flushPromises();
		expect(spyMocks.getDeviceDimsMock).toHaveBeenCalled();
		expect(wrapper.vm.dimensions.colCount).toBe(4);
	});

	it("should set the column count '4' if the device is 'desktop'", async () => {
		const wrapper = getWrapper();
		await flushPromises();
		expect(spyMocks.getDeviceDimsMock).toHaveBeenCalled();
		expect(wrapper.vm.dimensions.colCount).toBe(4);
	});

	it("should call 'setDropElement' method after avatar-to-emptyAvatar drag&drop", async () => {
		const wrapper = getWrapper();
		const expectedPayload = {
			from: {
				x: 0,
				y: 0,
			},
			item: {
				id: "3",
				title: "Third",
				shortTitle: "Ma",
				displayColor: "#EC407A",
				href: "/courses/3",
				xPosition: 0,
				yPosition: 0,
			},
			to: {
				x: 3,
				y: 2,
			},
		};
		await flushPromises();
		expect(wrapper.vm.$refs["0-0"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);
		expect(wrapper.vm.$refs["2-3"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomEmptyAvatar"
		);
		const avatarComponent = wrapper.findComponent({ ref: "0-0" });
		await avatarComponent.trigger("dragstart");

		const emptyAvatarComponent = wrapper.findComponent({ ref: "2-3" });
		await emptyAvatarComponent.trigger("drop");

		expect(spyMocks.setDropElementMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock).toHaveBeenCalled();
		expect(spyMocks.getElementNameByRefMock).toHaveBeenCalled();
		expect(spyMocks.savePositionMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock.mock.calls[0][0]).toStrictEqual(
			expectedPayload
		);
	});

	it("should call 'setGroupElements' method for grouping after avatar-to-avatar drag&drop", async () => {
		const wrapper = getWrapper();
		const expectedPayload = {
			from: {
				x: 1,
				y: 1,
			},
			item: {
				id: "1",
				title: "First",
				shortTitle: "Ma",
				displayColor: "purple",
				href: "/courses/1",
				xPosition: 1,
				yPosition: 1,
			},
			to: {
				x: 2,
				y: 2,
			},
		};
		await flushPromises();
		expect(wrapper.vm.$refs["1-1"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);
		expect(wrapper.vm.$refs["2-2"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);

		const fromAvatarComponent = wrapper.findComponent({ ref: "1-1" });
		await fromAvatarComponent.trigger("dragstart");

		const toAvatarComponent = wrapper.findComponent({ ref: "2-2" });
		await toAvatarComponent.trigger("drop");

		await flushPromises();
		expect(spyMocks.setGroupElementsMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock).toHaveBeenCalled();
		expect(spyMocks.getElementNameByRefMock).toHaveBeenCalled();
		expect(spyMocks.savePositionMock).toHaveBeenCalled();
		expect(spyMocks.defaultNamingMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock.mock.calls[0][0]).toStrictEqual(
			expectedPayload
		);
	});

	it("should call 'addGroupElements' method for grouping after avatar-to-groupAvatar drag&drop", async () => {
		const wrapper = getWrapper();
		const expectedPayload = {
			from: {
				x: 1,
				y: 1,
			},
			item: {
				id: "1",
				title: "First",
				shortTitle: "Ma",
				displayColor: "purple",
				href: "/courses/1",
				xPosition: 1,
				yPosition: 1,
			},
			to: {
				x: 2,
				y: 3,
			},
		};
		await flushPromises();
		expect(wrapper.vm.$refs["1-1"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);
		expect(wrapper.vm.$refs["3-2"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomGroupAvatar"
		);

		const fromAvatarComponent = wrapper.findComponent({ ref: "1-1" });
		await fromAvatarComponent.trigger("dragstart");

		const toAvatarComponent = wrapper.findComponent({ ref: "3-2" });
		await toAvatarComponent.trigger("drop");

		expect(spyMocks.addGroupElementsMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock).toHaveBeenCalled();
		expect(spyMocks.getElementNameByRefMock).toHaveBeenCalled();
		expect(spyMocks.savePositionMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock.mock.calls[0][0]).toStrictEqual(
			expectedPayload
		);
	});

	it("should call 'setDropElement' method for grouping after ungroup action", async () => {
		const wrapper = getWrapper();
		const expectedPayload = {
			from: {
				x: 2,
				y: 3,
				groupIndex: 0,
			},
			item: {
				id: "5",
				title: "Math 7a",
				displayColor: "yellow",
			},
			to: {
				x: 2,
				y: 1,
			},
		};

		await wrapper.setData({
			groupDialog: {
				isOpen: true,
				groupData: {
					groupId: "4",
					title: "Fourth",
					shortTitle: "Bi",
					displayColor: "#EC407A",
					url: "/api/xxxx/1234w",
					xPosition: 2,
					yPosition: 3,
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
			},
		});

		await wrapper.vm.$refs.roomModal.$emit(
			"drag-from-group",
			wrapper.vm.groupDialog.groupData.groupElements[0]
		);

		expect(spyMocks.dragFromGroupMock).toHaveBeenCalled();

		const emptyAvatarComponent = wrapper.findComponent({ ref: "1-2" });
		await emptyAvatarComponent.trigger("drop");

		expect(spyMocks.setDropElementMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock).toHaveBeenCalled();
		expect(spyMocks.savePositionMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock.mock.calls[0][0]).toStrictEqual(
			expectedPayload
		);
	});

	it("should search elements on dashboard", async () => {
		const wrapper = getWrapper();

		expect(wrapper.vm.$refs["1-1"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);

		const searchInput = wrapper.vm.$refs["search"];
		await searchInput.$emit("input", "thi");

		expect(wrapper.vm.$refs["1-1"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomEmptyAvatar"
		);
		expect(wrapper.vm.$refs["0-0"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);

		const avatarComponents = wrapper.findAll(".room-avatar");
		expect(avatarComponents).toHaveLength(1);
	});

	it("should reset search text while dragging", async () => {
		const wrapper = getWrapper();

		await wrapper.setData({ allowDragging: true });

		expect(wrapper.vm.$refs["1-1"][0].$options["_componentTag"]).toStrictEqual(
			"vRoomAvatar"
		);

		const searchInput = wrapper.vm.$refs["search"];
		await searchInput.$emit("input", "thi");

		const avatarComponents = wrapper.findAll(".room-avatar");
		expect(avatarComponents).toHaveLength(1);

		const avatarComponent = wrapper.findComponent({ ref: "0-0" });
		await avatarComponent.trigger("dragstart");

		const avatarComponentsAfterDragging = wrapper.findAll(".room-avatar");
		expect(avatarComponentsAfterDragging).toHaveLength(6);
		expect(wrapper.vm.$data.searchText).toStrictEqual("");
	});

	it("should set rowCount while loading", async () => {
		const roomData = [
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
				xPosition: 3,
				yPosition: 7,
			},
		];

		roomsModule.setRoomData(roomData);
		const wrapper = getWrapper();
		expect(wrapper.findComponent({ ref: "8-0" }).exists()).toBe(false);
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.dimensions.rowCount).toStrictEqual(9);
	});
});
