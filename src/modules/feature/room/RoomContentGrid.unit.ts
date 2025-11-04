import RoomContentGrid from "./RoomContentGrid.vue";
import RoomContentGridItem from "./RoomContentGridItem.vue";
import { Permission } from "@/serverApi/v3";
import { roomBoardGridItemFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useRoomDetailsStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("@feature-room/RoomContentGrid", () => {
	beforeEach(() => {
		useRoomDetailsStore(createTestingPinia({ stubActions: true }));
		vi.clearAllMocks();
	});

	const setup = () => {
		const boards = roomBoardGridItemFactory.buildList(3);

		const wrapper = mount(RoomContentGrid, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				roomId: "test-room",
				boards,
			},
		});

		return { wrapper, boards };
	};

	it("should render RoomContentGridItem for each board", () => {
		const { wrapper } = setup();
		const boardItems = wrapper.findAllComponents(RoomContentGridItem);
		expect(boardItems).toHaveLength(3);
	});

	it("should call reorderRoom when drag and drop changes position", () => {
		const { wrapper, boards } = setup();

		const sortable = wrapper.findComponent({ name: "Sortable" });
		sortable.vm.$emit("end", { oldIndex: 0, newIndex: 2 });

		expect(useRoomDetailsStore().moveBoard).toHaveBeenCalledWith("test-room", boards[0].id, 2);
	});

	it("should not call reorderRoom when position unchanged", () => {
		const { wrapper } = setup();

		const sortable = wrapper.findComponent({ name: "Sortable" });
		sortable.vm.$emit("end", { oldIndex: 1, newIndex: 1 });

		expect(useRoomDetailsStore().moveBoard).not.toHaveBeenCalled();
	});

	describe("when using arrow key reorder features", () => {
		beforeEach(() => {
			useRoomDetailsStore().$patch({ room: { permissions: [Permission.RoomEditContent] } });
		});

		it("should handle keyboard navigation - ArrowRight", () => {
			const { wrapper, boards } = setup();

			const boardItem = wrapper.findAllComponents(RoomContentGridItem).at(0);
			boardItem?.vm.$emit("keydown", { key: "ArrowRight" });

			expect(useRoomDetailsStore().moveBoard).toHaveBeenCalledWith("test-room", boards[0].id, 1);
		});

		it("should handle keyboard navigation - ArrowLeft", () => {
			const { wrapper, boards } = setup();

			const boardItem = wrapper.findAllComponents(RoomContentGridItem).at(2);
			boardItem?.vm.$emit("keydown", { key: "ArrowLeft" });

			expect(useRoomDetailsStore().moveBoard).toHaveBeenCalledWith("test-room", boards[2].id, 1);
		});

		it("should handle keyboard navigation - ArrowDown", () => {
			const { wrapper, boards } = setup();

			const boardItem = wrapper.findAllComponents(RoomContentGridItem)[0];
			boardItem.vm.$emit("keydown", { key: "ArrowDown" });

			expect(useRoomDetailsStore().moveBoard).toHaveBeenCalledWith("test-room", boards[0].id, 1);
		});

		it("should handle keyboard navigation - ArrowUp", () => {
			const { wrapper, boards } = setup();

			const boardItem = wrapper.findAllComponents(RoomContentGridItem)[2];
			boardItem.vm.$emit("keydown", { key: "ArrowUp" });

			expect(useRoomDetailsStore().moveBoard).toHaveBeenCalledWith("test-room", boards[2].id, 1);
		});
	});

	it("should respect board boundaries in keyboard navigation", () => {
		const { wrapper } = setup();

		const boardItems = wrapper.findAllComponents(RoomContentGridItem);

		// Attempt to go left at first index
		boardItems[0].vm.$emit("keydown", { key: "ArrowLeft" });
		expect(useRoomDetailsStore().moveBoard).not.toHaveBeenCalled();

		// Attempt to go right at last index
		boardItems[2].vm.$emit("keydown", { key: "ArrowRight" }, 2);
		expect(useRoomDetailsStore().moveBoard).not.toHaveBeenCalled();
	});

	it("should disable sorting when user cannot edit room content", async () => {
		useRoomDetailsStore().$patch({ room: { permissions: [] } });
		const { wrapper } = setup();
		const sortable = wrapper.findComponent({ name: "Sortable" });
		expect(sortable.props("options").disabled).toBe(true);
	});
});
