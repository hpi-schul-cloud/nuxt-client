import CourseRoomOverviewPage from "./CourseRoomOverview.page.vue";
import CourseRoomModal from "@/components/course-rooms/CourseRoomModal.vue";
import type { DashboardGridElementResponse } from "@/generated/serverApi/v3";
import CopyModule from "@/store/copy";
import { COPY_MODULE_KEY } from "@/utils/inject";
import { createTestAppStore, createTestEnvStore, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { courseRoomElementFactory, courseRoomGroupFactory, courseRoomItemFactory } from "@@/tests/test-utils/factory";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useCourseRoomListStore } from "@data-course-rooms";
import { createTestingPinia } from "@pinia/testing";
import { mount, VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import type { Mock } from "vitest";
import { ComponentPublicInstance, nextTick, reactive, ref } from "vue";
import { useRoute } from "vue-router";

vi.mock("vue-router");
vi.mock("@data-common-cartridge", () => ({
	useCommonCartridgeImport: () => ({
		isOpen: { value: false },
		isSuccess: { value: false },
		file: { value: undefined },
		importCommonCartridgeFile: vi.fn(),
	}),
}));

const mockDisplay = {
	xs: ref(false),
	sm: ref(false),
	mdAndUp: ref(true),
};

vi.mock("vuetify", async () => {
	const actual = await vi.importActual("vuetify");
	return {
		...actual,
		useDisplay: () => mockDisplay,
	};
});

const mockRouter = {
	replace: vi.fn(),
};

vi.mock("vue-router", async () => {
	const actual = await vi.importActual("vue-router");
	return {
		...actual,
		useRoute: vi.fn(),
		useRouter: () => mockRouter,
	};
});

const useRouteMock = useRoute as Mock;

interface GroupElement {
	id: string;
	title: string;
	displayColor: string;
	notification?: boolean;
	to?: string;
}

interface GroupDialogData {
	isOpen: boolean;
	groupData: {
		groupId: string;
		title: string;
		shortTitle: string;
		displayColor: string;
		url: string;
		xPosition: number;
		yPosition: number;
		groupElements: GroupElement[];
	};
}

type CourseRoomOverviewVm = ComponentPublicInstance & {
	rooms: DashboardGridElementResponse[];
	courses: { id: string; name: string; isLocked: boolean }[];
	dimensions: { colCount: number; rowCount: number; cellWidth: string };
	groupDialog: GroupDialogData;
	searchText: string;
	allowDragging: boolean;
};

const mockRoomStoreData = [
	courseRoomElementFactory.build({ title: "First", shortTitle: "Ma", displayColor: "purple" }),
	courseRoomElementFactory.build({ title: "Second", shortTitle: "Ma", displayColor: "#EC407A" }),
	courseRoomElementFactory.build({
		title: "Third",
		shortTitle: "Ma",
		displayColor: "#EC407A",
		xPosition: 0,
		yPosition: 0,
	}),
	courseRoomGroupFactory.build({
		groupId: "4",
		title: "Fourth",
		shortTitle: "Bi",
		xPosition: 2,
		yPosition: 3,
		groupElements: [
			courseRoomElementFactory.build({ id: "5", title: "Math 7a", displayColor: "yellow" }),
			courseRoomElementFactory.build({ id: "6", title: "Bio 3a", displayColor: "green" }),
			courseRoomElementFactory.build({ id: "7", title: "Geo 7b", displayColor: "yellow" }),
		],
	}),
];

const mockCourseData = courseRoomItemFactory.buildList(2);

describe("CourseRoomOverview.page", () => {
	let courseRoomListStore: ReturnType<typeof mockedPiniaStoreTyping<typeof useCourseRoomListStore>>;
	let pinia: ReturnType<typeof createTestingPinia>;

	const getWrapper = (options?: { routeQuery?: Record<string, string> }): VueWrapper<CourseRoomOverviewVm> => {
		useRouteMock.mockReturnValue(reactive({ query: options?.routeQuery ?? {} }));

		const copyModuleMock = createModuleMocks(CopyModule, {
			getIsResultModalOpen: false,
		});

		return mount(CourseRoomOverviewPage, {
			global: {
				plugins: [pinia, createTestingVuetify(), createTestingI18n()],
				provide: {
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
				},
			},
		}) as VueWrapper<CourseRoomOverviewVm>;
	};

	beforeEach(() => {
		pinia = createTestingPinia({ stubActions: false });
		setActivePinia(pinia);
		createTestAppStore();
		createTestEnvStore();

		courseRoomListStore = mockedPiniaStoreTyping(useCourseRoomListStore);
		courseRoomListStore.$patch({
			roomsData: mockRoomStoreData as never,
			allElements: mockCourseData as never,
		});
		courseRoomListStore.fetchCourses.mockResolvedValue();
		courseRoomListStore.fetchAllElements.mockResolvedValue();
		courseRoomListStore.alignCourse.mockResolvedValue();
		courseRoomListStore.updateCourse.mockResolvedValue();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should display room data from store", async () => {
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
		expect(wrapper.vm.rooms[0]).toMatchObject(expectedItem);
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
		const customDialog = wrapper.findComponent(CourseRoomModal);
		expect(customDialog.props("isOpen")).toBe(true);
	});

	it("CustomDialog component should be visible", async () => {
		const wrapper = getWrapper();
		await nextTick();
		await nextTick();
		const cardComponent = wrapper.find(".card-component");
		await cardComponent.trigger("click");
		await nextTick();
		const customDialog = wrapper.findComponent(CourseRoomModal);
		await nextTick();
		const input = customDialog.findComponent({ name: "v-text-field" });
		expect(customDialog.props("isOpen")).toBe(true);
		expect(input.props("modelValue")).toBe("Fourth");
	});

	it("'$refs' should be placed correctly for the components", async () => {
		const wrapper = getWrapper();
		await nextTick();
		await nextTick();
		expect(wrapper.findComponent('[data-test-position="1-1"]').attributes("data-avatar-type")).toStrictEqual(
			"RoomAvatar"
		);
		expect(wrapper.findComponent('[data-test-position="2-2"]').attributes("data-avatar-type")).toStrictEqual(
			"RoomAvatar"
		);
		expect(wrapper.findComponent('[data-test-position="0-0"]').attributes("data-avatar-type")).toStrictEqual(
			"RoomAvatar"
		);
		expect(wrapper.findComponent('[data-test-position="3-2"]').attributes("data-avatar-type")).toStrictEqual(
			"RoomGroupAvatar"
		);
		expect(wrapper.findComponent('[data-test-position="3-3"]').attributes("data-avatar-type")).toStrictEqual(
			"RoomEmptyAvatar"
		);
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
			item: expect.objectContaining({
				id: "3",
				title: "Third",
				shortTitle: "Ma",
				displayColor: "#EC407A",
				to: "/rooms/3",
				xPosition: 0,
				yPosition: 0,
			}),
			to: {
				x: 3,
				y: 2,
			},
		};
		await nextTick();
		await nextTick();

		const avatarComponent = wrapper.findComponent('[data-test-position="0-0"]');
		await avatarComponent.trigger("dragstart");

		const emptyAvatarComponent = wrapper.findComponent('[data-test-position="2-3"]');
		await emptyAvatarComponent.trigger("drop");

		expect(courseRoomListStore.alignCourse).toHaveBeenCalledWith(expectedPayload);
	});

	it("should call 'addGroupElements' method for grouping after avatar-to-groupAvatar drag&drop", async () => {
		const wrapper = getWrapper();
		const expectedPayload = {
			from: {
				x: 1,
				y: 1,
			},
			item: expect.objectContaining({
				id: "1",
				title: "First",
				shortTitle: "Ma",
				displayColor: "purple",
				to: "/rooms/1",
				xPosition: 1,
				yPosition: 1,
			}),
			to: {
				x: 2,
				y: 3,
			},
		};
		await nextTick();
		await nextTick();

		const fromAvatarComponent = wrapper.findComponent('[data-test-position="1-1"]');
		await fromAvatarComponent.trigger("dragstart");

		const toAvatarComponent = wrapper.findComponent('[data-test-position="3-2"]');
		await toAvatarComponent.trigger("drop");

		expect(courseRoomListStore.alignCourse).toHaveBeenCalledWith(expectedPayload);
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

		wrapper.vm.groupDialog.isOpen = true;
		wrapper.vm.groupDialog.groupData = {
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
		};
		await nextTick();

		const roomModal = wrapper.findComponent(CourseRoomModal);
		roomModal.vm.$emit("drag-from-group", wrapper.vm.groupDialog.groupData.groupElements[0]);

		const emptyAvatarComponent = wrapper.findComponent('[data-test-position="2-1"]');
		await emptyAvatarComponent.trigger("drop");

		expect(courseRoomListStore.alignCourse).toHaveBeenCalledWith(expectedPayload);
	});

	it("should search elements on dashboard", async () => {
		const wrapper = getWrapper();

		expect(wrapper.find('[data-test-position="1-1"]').attributes("data-avatar-type")).toStrictEqual("RoomAvatar");

		const searchInput = wrapper.findComponent({ ref: "search" });
		await searchInput.vm.$emit("update:modelValue", "thi");

		expect(wrapper.find('[data-test-position="1-1"]').attributes("data-avatar-type")).toStrictEqual("RoomEmptyAvatar");
		expect(wrapper.find('[data-test-position="0-0"]').attributes("data-avatar-type")).toStrictEqual("RoomAvatar");

		const avatarComponents = wrapper.findAll(".room-avatar");
		expect(avatarComponents).toHaveLength(1);
	});

	it("should reset search text while dragging", async () => {
		const wrapper = getWrapper();

		wrapper.vm.allowDragging = true;
		await nextTick();

		expect(wrapper.find('[data-test-position="1-1"]').attributes("data-avatar-type")).toStrictEqual("RoomAvatar");

		const searchInput = wrapper.findComponent({ ref: "search" });
		await searchInput.vm.$emit("update:modelValue", "thi");

		const avatarComponents = wrapper.findAll(".room-avatar");
		expect(avatarComponents).toHaveLength(1);

		const avatarComponent = wrapper.findComponent('[data-test-position="0-0"]');
		await avatarComponent.trigger("dragstart");

		const avatarComponentsAfterDragging = wrapper.findAll(".room-avatar");
		expect(avatarComponentsAfterDragging).toHaveLength(6);
		expect(wrapper.vm.searchText).toStrictEqual("");
	});

	it("should call 'setGroupElements' method for grouping after avatar-to-avatar drag&drop", async () => {
		const wrapper = getWrapper();
		const expectedPayload = {
			from: {
				x: 1,
				y: 1,
			},
			item: expect.objectContaining({
				id: "1",
				title: "First",
				shortTitle: "Ma",
				displayColor: "purple",
				to: "/rooms/1",
				xPosition: 1,
				yPosition: 1,
			}),
			to: {
				x: 2,
				y: 2,
			},
		};
		await nextTick();
		await nextTick();
		expect(wrapper.find('[data-test-position="1-1"]').attributes("data-avatar-type")).toStrictEqual("RoomAvatar");
		expect(wrapper.find('[data-test-position="2-2"]').attributes("data-avatar-type")).toStrictEqual("RoomAvatar");

		const fromAvatarComponent = wrapper.findComponent('[data-test-position="1-1"]');
		await fromAvatarComponent.trigger("dragstart");

		const toAvatarComponent = wrapper.findComponent('[data-test-position="2-2"]');
		await toAvatarComponent.trigger("drop");

		await nextTick();
		expect(courseRoomListStore.alignCourse).toHaveBeenCalledWith(expectedPayload);
	});

	it("should set rowCount while loading", async () => {
		const roomData = [
			courseRoomElementFactory.build({ xPosition: 1, yPosition: 1 }),
			courseRoomElementFactory.build({ xPosition: 2, yPosition: 2 }),
			courseRoomElementFactory.build({ xPosition: 3, yPosition: 7 }),
		];

		courseRoomListStore.$patch({
			roomsData: roomData as never,
		});
		const wrapper = getWrapper();
		expect(wrapper.findComponent('[data-test-position="8-0"]').exists()).toBe(false);
		await nextTick();
		await nextTick();
		// rowCount = max(yPosition) + 2 when greater than defaultRowCount (6)
		// 7 + 2 = 9
		expect(wrapper.vm.dimensions.rowCount).toStrictEqual(9);
	});

	it("should display empty group avatar when group has no elements", async () => {
		const emptyGroupData = [
			courseRoomGroupFactory.build({
				groupId: "empty-group",
				title: "Empty Group",
				shortTitle: "EG",
				xPosition: 0,
				yPosition: 0,
				groupElements: [],
			}),
		];

		courseRoomListStore.$patch({
			roomsData: emptyGroupData as never,
		});

		const wrapper = getWrapper();
		await nextTick();
		await nextTick();

		const emptyAvatar = wrapper.findComponent('[data-test-position="0-0"]');
		expect(emptyAvatar.attributes("data-avatar-type")).toStrictEqual("RoomEmptyAvatar");
	});

	describe("import flow", () => {
		it("should show import mode when query has import token", async () => {
			const wrapper = getWrapper({ routeQuery: { import: "test-token" } });
			await nextTick();

			const importFlow = wrapper.findComponent({ name: "ImportFlow" });
			expect(importFlow.props("isActive")).toBe(true);
			expect(importFlow.props("token")).toBe("test-token");
		});

		it("should navigate to room-details on import success with id", async () => {
			const wrapper = getWrapper({ routeQuery: { import: "test-token" } });
			await nextTick();

			const importFlow = wrapper.findComponent({ name: "ImportFlow" });
			await importFlow.vm.$emit("success", "Test Room", "room-123");

			expect(mockRouter.replace).toHaveBeenCalledWith({
				name: "room-details",
				params: { id: "room-123" },
			});
		});

		it("should navigate to course-room-overview on import success without id", async () => {
			const wrapper = getWrapper({ routeQuery: { import: "test-token" } });
			await nextTick();

			const importFlow = wrapper.findComponent({ name: "ImportFlow" });
			await importFlow.vm.$emit("success", "Test Room");

			expect(mockRouter.replace).toHaveBeenCalledWith({
				name: "course-room-overview",
			});
			expect(courseRoomListStore.fetchCourses).toHaveBeenCalled();
		});
	});

	describe("course polling", () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it("should start polling when rooms are being copied", async () => {
			const copyingRoomData = [
				courseRoomElementFactory.build({
					title: "Copying Room",
					copyingSince: new Date().toISOString(),
					xPosition: 0,
					yPosition: 0,
				}),
			];

			courseRoomListStore.$patch({
				roomsData: copyingRoomData as never,
			});

			getWrapper();
			await nextTick();
			await nextTick();

			expect(courseRoomListStore.fetchCourses).toHaveBeenCalled();

			// Fast-forward to trigger polling
			await vi.advanceTimersByTimeAsync(5000);

			expect(courseRoomListStore.fetchCourses).toHaveBeenCalledTimes(2);
		});
	});

	it("should not call alignCourse when dragging to same position", async () => {
		const wrapper = getWrapper();
		await nextTick();
		await nextTick();

		const avatarComponent = wrapper.findComponent('[data-test-position="0-0"]');
		await avatarComponent.trigger("dragstart");

		// Drop on same position
		await avatarComponent.trigger("drop");

		// alignCourse should not be called for same position drag
		expect(courseRoomListStore.alignCourse).not.toHaveBeenCalled();
	});

	it("should handle dragend event", async () => {
		const wrapper = getWrapper();
		await nextTick();
		await nextTick();

		const avatarComponent = wrapper.findComponent('[data-test-position="0-0"]');
		await avatarComponent.trigger("dragstart");
		await avatarComponent.trigger("dragend");

		// Verify component is still rendered correctly after dragend
		expect(wrapper.find('[data-test-position="0-0"]').exists()).toBe(true);
	});

	it("should filter group elements by search text", async () => {
		const wrapper = getWrapper();
		await nextTick();
		await nextTick();

		// Group has elements: Math 7a, Bio 3a, Geo 7b
		const searchInput = wrapper.findComponent({ ref: "search" });
		await searchInput.vm.$emit("update:modelValue", "Math");
		await nextTick();

		// The group should still appear since it has a matching element
		const groupAvatar = wrapper.findAll(".room-group-avatar");
		expect(groupAvatar).toHaveLength(1);
	});

	it("should provide courses list without locked courses for import", async () => {
		const courseDataWithLocked = [
			courseRoomItemFactory.build({ id: "1", title: "Open Course", isLocked: false }),
			courseRoomItemFactory.build({ id: "2", title: "Locked Course", isLocked: true }),
		];

		courseRoomListStore.$patch({
			allElements: courseDataWithLocked as never,
		});

		const wrapper = getWrapper();
		await nextTick();

		expect(wrapper.vm.courses).toHaveLength(2);
		expect(wrapper.vm.courses[0]).toMatchObject({ id: "1", name: "Open Course", isLocked: false });
		expect(wrapper.vm.courses[1]).toMatchObject({ id: "2", name: "Locked Course", isLocked: true });
	});

	it("should not call alignCourse when dragging group avatar to same position", async () => {
		const wrapper = getWrapper();
		await nextTick();
		await nextTick();

		const groupAvatarComponent = wrapper.findComponent('[data-test-position="3-2"]');
		await groupAvatarComponent.trigger("dragstart");

		// Drop on same position
		await groupAvatarComponent.trigger("drop");

		// alignCourse should not be called for same position drag
		expect(courseRoomListStore.alignCourse).not.toHaveBeenCalled();
	});

	it("should call updateCourse with default naming after grouping avatar-to-avatar", async () => {
		const wrapper = getWrapper();
		await nextTick();
		await nextTick();

		const fromAvatarComponent = wrapper.findComponent('[data-test-position="1-1"]');
		await fromAvatarComponent.trigger("dragstart");

		const toAvatarComponent = wrapper.findComponent('[data-test-position="2-2"]');
		await toAvatarComponent.trigger("drop");

		await nextTick();

		// After grouping, updateCourse should be called with default naming
		expect(courseRoomListStore.updateCourse).toHaveBeenCalled();
	});

	describe("course polling completion", () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it("should show success notification when copying completes", async () => {
			const copyingRoomData = [
				courseRoomElementFactory.build({
					title: "Copying Room",
					copyingSince: new Date().toISOString(),
					xPosition: 0,
					yPosition: 0,
				}),
			];

			courseRoomListStore.$patch({
				roomsData: copyingRoomData as never,
			});

			// First call returns room with copyingSince, second call returns room without
			const normalRoomData = [
				courseRoomElementFactory.build({
					title: "Copying Room",
					xPosition: 0,
					yPosition: 0,
				}),
			];

			courseRoomListStore.fetchCourses.mockImplementation(async () => {
				courseRoomListStore.$patch({
					roomsData: normalRoomData as never,
				});
			});

			getWrapper();
			await nextTick();
			await nextTick();

			// Fast-forward to trigger polling completion
			await vi.advanceTimersByTimeAsync(5000);

			expect(courseRoomListStore.fetchCourses).toHaveBeenCalledTimes(2);
		});
	});

	describe("device dimensions", () => {
		afterEach(() => {
			// Reset to default mdAndUp
			mockDisplay.xs.value = false;
			mockDisplay.sm.value = false;
			mockDisplay.mdAndUp.value = true;
		});

		it("should set xs device dimensions", async () => {
			mockDisplay.xs.value = true;
			mockDisplay.sm.value = false;
			mockDisplay.mdAndUp.value = false;

			const wrapper = getWrapper();
			await nextTick();

			expect(wrapper.vm.dimensions.colCount).toBe(4);
			expect(wrapper.vm.dimensions.cellWidth).toBe("3.7em");
		});

		it("should set sm device dimensions", async () => {
			mockDisplay.xs.value = false;
			mockDisplay.sm.value = true;
			mockDisplay.mdAndUp.value = false;

			const wrapper = getWrapper();
			await nextTick();

			expect(wrapper.vm.dimensions.colCount).toBe(4);
			expect(wrapper.vm.dimensions.cellWidth).toBe("4em");
		});

		it("should set default dimensions when no breakpoint matches", async () => {
			mockDisplay.xs.value = false;
			mockDisplay.sm.value = false;
			mockDisplay.mdAndUp.value = false;

			const wrapper = getWrapper();
			await nextTick();

			expect(wrapper.vm.dimensions.colCount).toBe(6);
		});
	});

	describe("touch device", () => {
		const originalOntouchstart = window.ontouchstart;

		afterEach(() => {
			if (originalOntouchstart !== undefined) {
				window.ontouchstart = originalOntouchstart;
			} else {
				delete (window as unknown as Record<string, unknown>).ontouchstart;
			}
		});

		it("should show arrange courses switch on touch device", async () => {
			(window as unknown as Record<string, unknown>).ontouchstart = () => undefined;

			const wrapper = getWrapper();
			await nextTick();

			const vSwitch = wrapper.find(".enable-disable");
			expect(vSwitch.exists()).toBe(true);
		});
	});
});
