import { authModule, roomsModule } from "@/store";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import RoomsModule from "@/store/rooms";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
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

const mockCourseData = [
	{
		id: "1234",
		title: "Mathe",
		shortTitle: "Ma",
		displayColor: "#54616e",
	},
];

const mockAuthStoreData = {
	__v: 0,
	_id: "asdf",
	id: "asdf",
	firstName: "Arthur",
	lastName: "Dent",
	email: "arthur.dent@hitchhiker.org",
	roles: [{ name: "student", displayName: "Student" }],
	permissions: ["COURSE_CREATE", "COURSE_EDIT"],
};

setupStores({
	authModule: AuthModule,
	envConfigModule: EnvConfigModule,
	roomsModule: RoomsModule,
});

const spyMocks = {
	storeRoomAlignMock: jest
		.spyOn(roomsModule, "align")
		.mockImplementation(async () => ({})),
	storeModuleFetchMock: jest
		.spyOn(roomsModule, "fetch")
		.mockImplementation(async () => ({})),
	storeModuleFetchAllMock: jest
		.spyOn(roomsModule, "fetchAllElements")
		.mockImplementation(async () => ({})),
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
	$theme: {
		short_name: "instance name",
	},
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
		provide: {
			copyModule: copyModuleMock,
			loadingStateModule: loadingStateModuleMock,
			notifierModule: notifierModuleMock,
			i18n: { t: (key) => key },
		},
		propsData: {
			role: "student",
		},
		...attrs,
	});
};

describe("@/pages/RoomOverview", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		roomsModule.setRoomData(mockRoomStoreData);
		roomsModule.setAllElements(mockCourseData);
		authModule.setUser(mockAuthStoreData);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch the room data", async () => {
		const wrapper = getWrapper();
		await wrapper.vm.$nextTick();

		const expectedItem = {
			id: "1",
			title: "First",
			shortTitle: "Ma",
			displayColor: "purple",
			xPosition: 1,
			yPosition: 1,
			to: "/rooms/1",
		};
		expect(spyMocks.storeModuleFetchMock).toHaveBeenCalled();
		expect(wrapper.vm.rooms[0]).toStrictEqual(expectedItem);
	});

	it("should fetch the course data", async () => {
		const wrapper = getWrapper();
		await wrapper.vm.$nextTick();

		const expected = [
			{
				id: "1234",
				isArchived: undefined,
				searchText: "Mathe",
				title: "Mathe",
				shortTitle: "Ma",
				displayColor: "#54616e",
				to: "/rooms/1234",
			},
		];

		expect(spyMocks.storeModuleFetchAllMock).toHaveBeenCalled();
		expect(wrapper.vm.courses).toStrictEqual(expected);
	});

	it("should display 6 avatars component", async () => {
		const wrapper = getWrapper();
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const avatarComponents = wrapper.findAll(".room-avatar");
		expect(avatarComponents).toHaveLength(6);
	});

	it("should display 2 avatars component in 'mobile' device", async () => {
		const wrapper = getWrapper("mobile");
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const avatarComponents = wrapper.findAll(".room-avatar");
		expect(avatarComponents).toHaveLength(6);
	});

	it("should display 1 group-avatar component", async () => {
		const wrapper = getWrapper();
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const groupAvatarComponents = wrapper.findAll(".room-group-avatar");
		expect(groupAvatarComponents).toHaveLength(1);
	});

	it("should call 'openDialog' event if groupAvatar component clicked", async () => {
		const wrapper = getWrapper();
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const cardComponent = wrapper.find(".card-component");
		await cardComponent.trigger("click");
		expect(spyMocks.openDialogMock).toHaveBeenCalled();
	});

	it("custom-dialog component should be visible", async () => {
		const wrapper = getWrapper();
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const cardComponent = wrapper.find(".card-component");
		await cardComponent.trigger("click");
		await wrapper.vm.$nextTick();
		const customDialog = wrapper.find(".room-dialog");
		await wrapper.vm.$nextTick();
		const headline = customDialog.find("h2");
		expect(customDialog.vm.isOpen).toBe(true);
		expect(headline.element.innerHTML).toContain("Fourth");
	});

	it("should call the necessary methods for positioning while the page loading", async () => {
		const wrapper = getWrapper();
		await wrapper.vm.$nextTick();
		expect(spyMocks.getDataObjectMock).toHaveBeenCalled();
		expect(spyMocks.findDataByPosMock).toHaveBeenCalled();
		await wrapper.vm.$nextTick();
		expect(spyMocks.getDeviceDimsMock).toHaveBeenCalled();
		expect(spyMocks.hasGroupMock).toHaveBeenCalled();
	});

	it("'$refs' should be placed correctly for the components", async () => {
		const wrapper = getWrapper();
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
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
		await wrapper.vm.$nextTick();
		expect(spyMocks.getDeviceDimsMock).toHaveBeenCalled();
		expect(wrapper.vm.dimensions.colCount).toBe(4);
	});

	it("should set the column count '4' if the device is 'tablet'", async () => {
		const wrapper = getWrapper("tablet");
		await wrapper.vm.$nextTick();
		expect(spyMocks.getDeviceDimsMock).toHaveBeenCalled();
		expect(wrapper.vm.dimensions.colCount).toBe(4);
	});

	it("should set the column count '4' if the device is 'desktop'", async () => {
		const wrapper = getWrapper();
		await wrapper.vm.$nextTick();
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
				to: "/rooms/3",
				xPosition: 0,
				yPosition: 0,
			},
			to: {
				x: 3,
				y: 2,
			},
		};
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
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
				to: "/rooms/1",
				xPosition: 1,
				yPosition: 1,
			},
			to: {
				x: 2,
				y: 3,
			},
		};
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
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
				to: "/rooms/1",
				xPosition: 1,
				yPosition: 1,
			},
			to: {
				x: 2,
				y: 2,
			},
		};
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
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

		await wrapper.vm.$nextTick();
		expect(spyMocks.setGroupElementsMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock).toHaveBeenCalled();
		expect(spyMocks.getElementNameByRefMock).toHaveBeenCalled();
		expect(spyMocks.savePositionMock).toHaveBeenCalled();
		expect(spyMocks.defaultNamingMock).toHaveBeenCalled();
		expect(spyMocks.storeRoomAlignMock.mock.calls[0][0]).toStrictEqual(
			expectedPayload
		);
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
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.dimensions.rowCount).toStrictEqual(9);
	});
});
