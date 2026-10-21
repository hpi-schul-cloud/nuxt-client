import RoomGrid from "./RoomGrid.vue";
import RoomGridItem from "./RoomGridItem.vue";
import { roomItemFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useRoomStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { enableAutoUnmount, flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("@feature-room/RoomGrid", () => {
	enableAutoUnmount(afterEach);

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: true }));
	});

	const setup = (isSortable?: boolean) => {
		const rooms = roomItemFactory.buildList(3);
		const wrapper = mount(RoomGrid, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { RoomGridItem: true },
			},
			props: { rooms, isSortable },
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

	describe("when the grid is not sortable", () => {
		it("should not call moveRoom on drag and drop", () => {
			const { wrapper } = setup(false);
			const sortable = wrapper.findComponent({ name: "Sortable" });
			sortable.vm.$emit("end", { oldIndex: 0, newIndex: 2 });
			expect(useRoomStore().moveRoom).not.toHaveBeenCalled();
		});

		it("should not call moveRoom on arrow keys", () => {
			const { wrapper } = setup(false);
			const first = wrapper.findAllComponents(RoomGridItem)[0];
			first.vm.$emit("keydown", { key: "ArrowRight" });
			expect(useRoomStore().moveRoom).not.toHaveBeenCalled();
		});

		it("should not mark the items as draggable", () => {
			const { wrapper } = setup(false);
			const items = wrapper.findAllComponents(RoomGridItem);
			expect(items.every((item) => !item.classes("draggable"))).toBe(true);
		});

		it("should not have the application role", () => {
			const { wrapper } = setup(false);
			expect(wrapper.attributes("role")).toBeUndefined();
		});
	});

	describe("when the grid is sortable", () => {
		it("should mark the items as draggable", () => {
			const { wrapper } = setup();
			const items = wrapper.findAllComponents(RoomGridItem);
			expect(items.every((item) => item.classes("draggable"))).toBe(true);
		});

		it("should have the application role", () => {
			const { wrapper } = setup();
			expect(wrapper.attributes("role")).toBe("application");
		});
	});

	describe("when the rooms change", () => {
		const focusFirstRoom = (wrapper: ReturnType<typeof setup>["wrapper"]) => {
			const room = wrapper.findAllComponents(RoomGridItem)[0].element as HTMLElement;
			room.tabIndex = 0;
			room.focus();
			return room;
		};

		it("should move the focus back to the last focused room", async () => {
			const { wrapper, rooms } = setup();
			const room = focusFirstRoom(wrapper);
			room.blur();

			await wrapper.setProps({ rooms: [...rooms] });
			await flushPromises();

			expect(document.activeElement).toBe(room);
		});

		describe("and the focus is outside the grid", () => {
			it("should keep the focus where it is", async () => {
				const { wrapper, rooms } = setup();
				focusFirstRoom(wrapper);
				const input = document.createElement("input");
				document.body.appendChild(input);
				input.focus();

				await wrapper.setProps({ rooms: rooms.slice(0, 2) });
				await flushPromises();

				expect(document.activeElement).toBe(input);
				input.remove();
			});
		});
	});
});
