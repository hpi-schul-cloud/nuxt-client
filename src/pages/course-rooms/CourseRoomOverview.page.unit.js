import RoomModal from "@/components/molecules/RoomModal";
import { courseRoomListModule } from "@/store";
import CopyModule from "@/store/copy";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import CourseRoomListModule from "@/store/course-room-list";
import CommonCartridgeImportModule from "@/store/common-cartridge-import";
import {
	LOADING_STATE_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	COURSE_ROOM_LIST_MODULE_KEY,
	COMMON_CARTRIDGE_IMPORT_MODULE_KEY,
	COPY_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
import CourseRoomOverviewPage from "./CourseRoomOverview.page.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { nextTick } from "vue";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestAuthStore } from "../../../tests/test-utils/index.js";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

vi.mock("vue-router");

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
		isLocked: false,
	},
];

setupStores({
	courseRoomListModule: CourseRoomListModule,
});

const spyMocks = {
	storeRoomAlignMock: vi
		.spyOn(courseRoomListModule, "align")
		.mockImplementation(() => {
			return {};
		}),
	storeModuleFetchMock: vi
		.spyOn(courseRoomListModule, "fetch")
		.mockImplementation(() => {
			return {};
		}),
	storeModuleFetchAllMock: vi
		.spyOn(courseRoomListModule, "fetchAllElements")
		.mockImplementation(() => {
			return {};
		}),
	storeModuleUpdateMock: vi
		.spyOn(courseRoomListModule, "update")
		.mockImplementation(() => {
			return {};
		}),
};

let copyModuleMock;
let loadingStateModuleMock;
let notifierModuleMock;

const defaultMocks = {
	$route: { query: {} },
	$router: { replace: vi.fn() },
};

const getWrapper = () => {
	copyModuleMock = createModuleMocks(CopyModule, {
		getIsResultModalOpen: false,
	});
	loadingStateModuleMock = createModuleMocks(LoadingStateModule);
	notifierModuleMock = createModuleMocks(NotifierModule);
	const courseRoomListModuleMock = createModuleMocks(courseRoomListModule);
	return mount(CourseRoomOverviewPage, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
				loadingStateModule: loadingStateModuleMock,
				[NOTIFIER_MODULE_KEY]: notifierModuleMock,
				[COMMON_CARTRIDGE_IMPORT_MODULE_KEY.valueOf()]: createModuleMocks(
					CommonCartridgeImportModule
				),
				[COURSE_ROOM_LIST_MODULE_KEY.valueOf()]: courseRoomListModuleMock,
				[LOADING_STATE_MODULE_KEY.valueOf()]: loadingStateModuleMock,
			},
			mocks: defaultMocks,
		},
	});
};

describe("@/pages/CourseRoomOverview.page", () => {
	beforeAll(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		createTestAuthStore();
		createTestEnvStore();
	});

	beforeEach(() => {
		courseRoomListModule.setRoomData(mockRoomStoreData);
		courseRoomListModule.setAllElements(mockCourseData);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should fetch the room data", async () => {
		const wrapper = getWrapper();
		await nextTick();

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
		await nextTick();

		const expected = [
			{
				id: "1234",
				name: "Mathe",
				isLocked: false,
			},
		];

		expect(spyMocks.storeModuleFetchAllMock).toHaveBeenCalled();
		expect(wrapper.vm.courses).toStrictEqual(expected);
	});

	it("should display 6 avatars component", async () => {
		const wrapper = getWrapper();
		await nextTick();
		await nextTick();
		const avatarComponents = wrapper.findAll(".room-avatar");
		expect(avatarComponents).toHaveLength(6);
	});

	it("should display 1 group-avatar component", async () => {
		const wrapper = getWrapper();
		await nextTick();
		await nextTick();
		const groupAvatarComponents = wrapper.findAll(".room-group-avatar");
		expect(groupAvatarComponents).toHaveLength(1);
	});

	it("should call 'openDialog' event if groupAvatar component clicked", async () => {
		const wrapper = getWrapper();
		await nextTick();
		await nextTick();
		const cardComponent = wrapper.find(".card-component");
		await cardComponent.trigger("click");
		const customDialog = wrapper.findComponent({ name: "room-modal" });
		expect(customDialog.props("isOpen")).toBe(true);
	});

	it("custom-dialog component should be visible", async () => {
		const wrapper = getWrapper();
		await nextTick();
		await nextTick();
		const cardComponent = wrapper.find(".card-component");
		await cardComponent.trigger("click");
		await nextTick();
		const customDialog = wrapper.findComponent({ name: "room-modal" });
		await nextTick();
		const input = customDialog.findComponent({ name: "v-text-field" });
		expect(customDialog.props("isOpen")).toBe(true);
		expect(input.props("modelValue")).toBe("Fourth");
	});

	it("'$refs' should be placed correctly for the components", async () => {
		const wrapper = getWrapper();
		await nextTick();
		await nextTick();
		expect(
			wrapper
				.findComponent('[data-test-position="1-1"]')
				.attributes("data-avatar-type")
		).toStrictEqual("vRoomAvatar");
		expect(
			wrapper
				.findComponent('[data-test-position="2-2"]')
				.attributes("data-avatar-type")
		).toStrictEqual("vRoomAvatar");
		expect(
			wrapper
				.findComponent('[data-test-position="0-0"]')
				.attributes("data-avatar-type")
		).toStrictEqual("vRoomAvatar");
		expect(
			wrapper
				.findComponent('[data-test-position="3-2"]')
				.attributes("data-avatar-type")
		).toStrictEqual("vRoomGroupAvatar");
		expect(
			wrapper
				.findComponent('[data-test-position="3-3"]')
				.attributes("data-avatar-type")
		).toStrictEqual("vRoomEmptyAvatar");
	});

	it("should set the column count 4", async () => {
		const wrapper = getWrapper();
		await nextTick();
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
		await nextTick();
		await nextTick();

		const avatarComponent = wrapper.findComponent('[data-test-position="0-0"]');
		await avatarComponent.trigger("dragstart");

		const emptyAvatarComponent = wrapper.findComponent(
			'[data-test-position="2-3"]'
		);
		await emptyAvatarComponent.trigger("drop");

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
		await nextTick();
		await nextTick();

		const fromAvatarComponent = wrapper.findComponent(
			'[data-test-position="1-1"]'
		);
		await fromAvatarComponent.trigger("dragstart");

		const toAvatarComponent = wrapper.findComponent(
			'[data-test-position="3-2"]'
		);
		await toAvatarComponent.trigger("drop");

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
				x: 1,
				y: 2,
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

		const roomModal = wrapper.findComponent(RoomModal);
		roomModal.vm.$emit(
			"drag-from-group",
			wrapper.vm.groupDialog.groupData.groupElements[0]
		);

		const emptyAvatarComponent = wrapper.findComponent(
			'[data-test-position="2-1"]'
		);
		await emptyAvatarComponent.trigger("drop");

		expect(spyMocks.storeRoomAlignMock.mock.calls[0][0]).toStrictEqual(
			expectedPayload
		);
	});

	it("should search elements on dashboard", async () => {
		const wrapper = getWrapper();

		expect(
			wrapper.find('[data-test-position="1-1"]').attributes("data-avatar-type")
		).toStrictEqual("vRoomAvatar");

		const searchInput = wrapper.findComponent({ ref: "search" });
		await searchInput.vm.$emit("update:modelValue", "thi");

		expect(
			wrapper.find('[data-test-position="1-1"]').attributes("data-avatar-type")
		).toStrictEqual("vRoomEmptyAvatar");
		expect(
			wrapper.find('[data-test-position="0-0"]').attributes("data-avatar-type")
		).toStrictEqual("vRoomAvatar");

		const avatarComponents = wrapper.findAll(".room-avatar");
		expect(avatarComponents).toHaveLength(1);
	});

	it("should reset search text while dragging", async () => {
		const wrapper = getWrapper();

		await wrapper.setData({ allowDragging: true });

		expect(
			wrapper.find('[data-test-position="1-1"]').attributes("data-avatar-type")
		).toStrictEqual("vRoomAvatar");

		const searchInput = wrapper.findComponent({ ref: "search" });
		await searchInput.vm.$emit("update:modelValue", "thi");

		const avatarComponents = wrapper.findAll(".room-avatar");
		expect(avatarComponents).toHaveLength(1);

		const avatarComponent = wrapper.findComponent('[data-test-position="0-0"]');
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
		await nextTick();
		await nextTick();
		expect(
			wrapper.find('[data-test-position="1-1"]').attributes("data-avatar-type")
		).toStrictEqual("vRoomAvatar");
		expect(
			wrapper.find('[data-test-position="2-2"]').attributes("data-avatar-type")
		).toStrictEqual("vRoomAvatar");

		const fromAvatarComponent = wrapper.findComponent(
			'[data-test-position="1-1"]'
		);
		await fromAvatarComponent.trigger("dragstart");

		const toAvatarComponent = wrapper.findComponent(
			'[data-test-position="2-2"]'
		);
		await toAvatarComponent.trigger("drop");

		await nextTick();
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

		courseRoomListModule.setRoomData(roomData);
		const wrapper = getWrapper();
		expect(wrapper.findComponent('[data-test-position="8-0"]').exists()).toBe(
			false
		);
		await nextTick();
		await nextTick();
		expect(wrapper.vm.dimensions.rowCount).toStrictEqual(9);
	});
});
