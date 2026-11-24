import RoomGrid from "./RoomGrid.vue";
import RoomGridItem from "./RoomGridItem.vue";
import { RoomItem } from "@/types/room/Room";
import { roomItemFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoomItemResponseAllowedOperations } from "@api-server";
import { useRoomStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

const { notifyOnScreenReader } = vi.hoisted(() => ({ notifyOnScreenReader: vi.fn() }));
vi.mock("@/composables/ariaLiveNotifier", () => ({ useAriaLiveNotifier: () => ({ notifyOnScreenReader }) }));

describe("@feature-room/RoomGrid", () => {
	beforeEach(() => {
		notifyOnScreenReader.mockClear();
		setActivePinia(createTestingPinia({ stubActions: true }));
	});

	const setup = () => {
		const rooms = roomItemFactory.buildList(3);
		const wrapper = mount(RoomGrid, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { RoomGridItem: true },
			},
			props: { rooms },
		});
		return { wrapper, rooms };
	};

	it("should render one RoomGridItem per room", () => {
		const { wrapper, rooms } = setup();
		expect(wrapper.findAllComponents(RoomGridItem)).toHaveLength(rooms.length);
	});

	it("should call moveRoom on drag and drop reorder", () => {
		const { wrapper, rooms } = setup();
		const sortable = wrapper.findComponent({ name: "Sortable" });
		sortable.vm.$emit("end", { oldIndex: 0, newIndex: 2 });
		expect(useRoomStore().moveRoom).toHaveBeenCalledWith({ id: rooms[0].id, toPosition: 2 });
	});

	it("should not call moveRoom when position unchanged", () => {
		const { wrapper } = setup();
		const sortable = wrapper.findComponent({ name: "Sortable" });
		sortable.vm.$emit("end", { oldIndex: 1, newIndex: 1 });
		expect(useRoomStore().moveRoom).not.toHaveBeenCalled();
	});

	describe("keyboard reordering", () => {
		it("should move item right with ArrowRight", () => {
			const { wrapper, rooms } = setup();
			const first = wrapper.findAllComponents(RoomGridItem)[0];
			first.vm.$emit("keydown", { key: "ArrowRight" });
			expect(useRoomStore().moveRoom).toHaveBeenCalledWith({ id: rooms[0].id, toPosition: 1 });
		});

		it("should move item left with ArrowLeft", () => {
			const { wrapper, rooms } = setup();
			const last = wrapper.findAllComponents(RoomGridItem)[2];
			last.vm.$emit("keydown", { key: "ArrowLeft" });
			expect(useRoomStore().moveRoom).toHaveBeenCalledWith({ id: rooms[2].id, toPosition: 1 });
		});

		it("should move item down with ArrowDown (same as +cols simplified)", () => {
			const { wrapper } = setup();
			const first = wrapper.findAllComponents(RoomGridItem)[0];
			first.vm.$emit("keydown", { key: "ArrowDown" });
			expect(useRoomStore().moveRoom).toHaveBeenCalled();
		});

		it("should move item up with ArrowUp", () => {
			const { wrapper } = setup();
			const last = wrapper.findAllComponents(RoomGridItem)[2];
			last.vm.$emit("keydown", { key: "ArrowUp" });
			expect(useRoomStore().moveRoom).toHaveBeenCalled();
		});
	});

	it("should not move beyond left or right boundaries", () => {
		const { wrapper } = setup();
		const items = wrapper.findAllComponents(RoomGridItem);
		items[0].vm.$emit("keydown", { key: "ArrowLeft" });
		items[2].vm.$emit("keydown", { key: "ArrowRight" });
		expect(useRoomStore().moveRoom).not.toHaveBeenCalled();
	});

	describe("grouped mode", () => {
		const setupGrouped = () => {
			const rooms = roomItemFactory.buildList(3, {
				allowedOperations: { arrangeRooms: true } as unknown as RoomItemResponseAllowedOperations,
			});
			const wrapper = mount(RoomGrid, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					stubs: { RoomGridItem: true },
				},
				props: { rooms, sectionKey: "group-a", indexOffset: 5 },
			});
			return { wrapper, rooms };
		};

		const sectionElement = (key: string) => {
			const element = document.createElement("div");
			element.dataset.sectionKey = key;
			return element;
		};

		it("uses the global index offset for the room cards", () => {
			const { wrapper } = setupGrouped();
			expect(wrapper.findAllComponents(RoomGridItem).map((item) => item.props("index"))).toEqual([5, 6, 7]);
		});

		it("emits a drop intent instead of calling the legacy API", () => {
			const { wrapper, rooms } = setupGrouped();
			const item = document.createElement("div");
			item.dataset.roomId = rooms[0].id;

			const sortable = wrapper.findComponent({ name: "Sortable" });
			sortable.vm.$emit("end", {
				item,
				from: sectionElement("group-a"),
				to: sectionElement("ungrouped"),
				oldIndex: 0,
				newIndex: 1,
			});

			expect(wrapper.emitted("drop")).toEqual([
				[{ roomId: rooms[0].id, fromKey: "group-a", toKey: "ungrouped", oldIndex: 0, newIndex: 1, appendOnly: false }],
			]);
			expect(useRoomStore().moveRoom).not.toHaveBeenCalled();
			expect(useRoomStore().fetchRooms).not.toHaveBeenCalled();
		});

		it("does not save moves with arrow keys", () => {
			const { wrapper } = setupGrouped();
			const items = wrapper.findAllComponents(RoomGridItem);
			["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].forEach((key) => items[1].vm.$emit("keydown", { key }));

			expect(wrapper.emitted("drop")).toBeUndefined();
			expect(useRoomStore().moveRoom).not.toHaveBeenCalled();
		});

		it("is not an application widget and gives no arrow key instruction", async () => {
			const { wrapper } = setupGrouped();

			expect(wrapper.attributes("role")).toBeUndefined();
			await wrapper.trigger("focusin");
			expect(notifyOnScreenReader).not.toHaveBeenCalledWith("common.instructions.orderBy.arrowKeys");
		});

		it("keeps the application role and the arrow key instruction in the legacy flat grid", async () => {
			const { wrapper } = setup();

			expect(wrapper.attributes("role")).toBe("application");
			await wrapper.trigger("focusin");
			expect(notifyOnScreenReader).toHaveBeenCalledWith("common.instructions.orderBy.arrowKeys");
		});

		it("emits reorder intents from the card menu", () => {
			const { wrapper, rooms } = setupGrouped();
			wrapper.findAllComponents(RoomGridItem)[2].vm.$emit("move-earlier");

			expect(wrapper.emitted("drop")).toEqual([
				[{ roomId: rooms[2].id, fromKey: "group-a", toKey: "group-a", oldIndex: 2, newIndex: 1 }],
			]);
		});

		it("turns dragging and keyboard reordering off in selection mode", async () => {
			const { wrapper } = setupGrouped();
			await wrapper.setProps({ selectable: true });

			expect(wrapper.findAllComponents(RoomGridItem).every((item) => item.props("selectable"))).toBe(true);
			expect(wrapper.findAll(".draggable")).toHaveLength(0);
			wrapper.findAllComponents(RoomGridItem)[0].vm.$emit("keydown", { key: "ArrowRight" });
			expect(wrapper.emitted("drop")).toBeUndefined();
		});

		it("forwards room selections with the room id", () => {
			const { wrapper, rooms } = setupGrouped();
			wrapper.findAllComponents(RoomGridItem)[1].vm.$emit("select", true);

			expect(wrapper.emitted("select-room")).toEqual([[rooms[1].id, true]]);
		});

		it("does not emit anything while disabled", async () => {
			const { wrapper } = setupGrouped();
			await wrapper.setProps({ disabled: true });
			wrapper.findAllComponents(RoomGridItem)[0].vm.$emit("move-later");

			expect(wrapper.emitted("drop")).toBeUndefined();
		});
	});

	describe("focus restoration", () => {
		const arrangeable = { arrangeRooms: true } as unknown as RoomItemResponseAllowedOperations;
		const mounted: ReturnType<typeof mount<typeof RoomGrid>>[] = [];

		afterEach(() => {
			mounted.splice(0).forEach((wrapper) => wrapper.unmount());
		});

		const mountGrid = (sectionKey: string, indexOffset: number, props: { sectionKey?: string } = {}) => {
			const rooms = roomItemFactory.buildList(2, { allowedOperations: arrangeable });
			const wrapper = mount(RoomGrid, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					stubs: { RouterLink: true },
				},
				props: { rooms, sectionKey, indexOffset, ...props },
				attachTo: document.body,
			});
			mounted.push(wrapper);
			return { wrapper, rooms };
		};

		const menuButton = (wrapper: ReturnType<typeof mount<typeof RoomGrid>>, roomId: string) => {
			const element = wrapper.get(`[data-room-id='${roomId}'] [data-testid='room-card-menu']`).element;
			if (!(element instanceof HTMLElement)) throw new Error("menu button not found");
			return element;
		};

		const reverseBoth = async (
			a: { wrapper: ReturnType<typeof mount<typeof RoomGrid>>; rooms: RoomItem[] },
			b: { wrapper: ReturnType<typeof mount<typeof RoomGrid>>; rooms: RoomItem[] }
		) => {
			await a.wrapper.setProps({ rooms: [...a.rooms].reverse() });
			await b.wrapper.setProps({ rooms: [...b.rooms].reverse() });
			await flushPromises();
		};

		it("keeps focus in grid A when a change reorders both grids after focus moved from B to A", async () => {
			const gridA = mountGrid("group-a", 0);
			const gridB = mountGrid("group-b", 2);
			menuButton(gridB.wrapper, gridB.rooms[0].id).focus();
			const focusedInA = menuButton(gridA.wrapper, gridA.rooms[0].id);
			focusedInA.focus();

			await reverseBoth(gridA, gridB);

			expect(document.activeElement).toBe(focusedInA);
		});

		it("does not let a grid with stale focus steal focus from another grid", async () => {
			const gridA = mountGrid("group-a", 0);
			const gridB = mountGrid("group-b", 2);
			const focusedInB = menuButton(gridB.wrapper, gridB.rooms[0].id);
			focusedInB.focus();
			focusedInB.blur();
			const focusedInA = menuButton(gridA.wrapper, gridA.rooms[1].id);
			focusedInA.focus();

			await reverseBoth(gridA, gridB);

			expect(document.activeElement).toBe(focusedInA);
		});

		it("restores lost focus to the moved card of its own grid", async () => {
			const gridA = mountGrid("group-a", 0);
			const focused = menuButton(gridA.wrapper, gridA.rooms[0].id);
			focused.focus();
			focused.blur();

			await gridA.wrapper.setProps({ rooms: [...gridA.rooms].reverse() });
			await flushPromises();

			expect(document.activeElement).toBe(focused);
		});

		it("does not restore focus when only the array identity changed", async () => {
			const gridA = mountGrid("group-a", 0);
			const focused = menuButton(gridA.wrapper, gridA.rooms[0].id);
			focused.focus();
			focused.blur();

			await gridA.wrapper.setProps({ rooms: [...gridA.rooms] });
			await flushPromises();

			expect(document.activeElement).toBe(document.body);
		});
	});

	describe("room title heading level", () => {
		it.each([
			{ props: {}, expected: "h2" },
			{ props: { sectionKey: "group-a" }, expected: "h3" },
			{ props: { sectionKey: "ungrouped", titleTag: "h2" as const }, expected: "h2" },
		])("renders $expected titles for $props", ({ props, expected }) => {
			const rooms = roomItemFactory.buildList(1);
			const wrapper = mount(RoomGrid, {
				global: { plugins: [createTestingVuetify(), createTestingI18n()], stubs: { RoomGridItem: true } },
				props: { rooms, ...props },
			});

			expect(wrapper.findComponent(RoomGridItem).props("titleTag")).toBe(expected);
		});
	});
});
