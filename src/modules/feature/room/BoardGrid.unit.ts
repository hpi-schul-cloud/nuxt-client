import BoardGrid from "./BoardGrid.vue";
import BoardGridItem from "./BoardGridItem.vue";
import { roomBoardGridItemFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useRoomDetailsStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("@feature-room/BoardGrid", () => {
	beforeEach(() => {
		useRoomDetailsStore(createTestingPinia({ stubActions: true }));
		vi.clearAllMocks();
	});

	const setup = () => {
		const boards = roomBoardGridItemFactory.buildList(3);

		const wrapper = mount(BoardGrid, {
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

	it("should render BoardGridItem for each board", () => {
		const { wrapper } = setup();
		const boardItems = wrapper.findAllComponents(BoardGridItem);
		expect(boardItems).toHaveLength(3);
	});

	it("should call reorderRoom when drag and drop changes position", async () => {
		const { wrapper, boards } = setup();

		const sortable = wrapper.findComponent({ name: "Sortable" });
		await sortable.vm.$emit("end", { oldIndex: 0, newIndex: 2 });

		expect(useRoomDetailsStore().moveBoard).toHaveBeenCalledWith("test-room", boards[0].id, 2);
	});

	it("should not call reorderRoom when position unchanged", async () => {
		const { wrapper } = setup();

		const sortable = wrapper.findComponent({ name: "Sortable" });
		await sortable.vm.$emit("end", { oldIndex: 1, newIndex: 1 });

		expect(useRoomDetailsStore().moveBoard).not.toHaveBeenCalled();
	});

	it("should handle keyboard navigation - ArrowRight", async () => {
		const { wrapper, boards } = setup();

		const boardItem = wrapper.findAllComponents(BoardGridItem).at(0);
		await boardItem?.vm.$emit("keydown", { key: "ArrowRight" });

		expect(useRoomDetailsStore().moveBoard).toHaveBeenCalledWith("test-room", boards[0].id, 1);
	});

	it("should handle keyboard navigation - ArrowLeft", async () => {
		const { wrapper, boards } = setup();

		const boardItem = wrapper.findAllComponents(BoardGridItem).at(2);
		await boardItem?.vm.$emit("keydown", { key: "ArrowLeft" });

		expect(useRoomDetailsStore().moveBoard).toHaveBeenCalledWith("test-room", boards[2].id, 1);
	});

	it("should handle keyboard navigation - ArrowDown", async () => {
		const { wrapper, boards } = setup();

		const boardItem = wrapper.findAllComponents(BoardGridItem)[0];
		await boardItem.vm.$emit("keydown", { key: "ArrowDown" });

		expect(useRoomDetailsStore().moveBoard).toHaveBeenCalledWith("test-room", boards[0].id, 1);
	});

	it("should handle keyboard navigation - ArrowUp", async () => {
		const { wrapper, boards } = setup();

		const boardItem = wrapper.findAllComponents(BoardGridItem)[2];
		await boardItem.vm.$emit("keydown", { key: "ArrowUp" });

		expect(useRoomDetailsStore().moveBoard).toHaveBeenCalledWith("test-room", boards[2].id, 1);
	});

	it("should respect board boundaries in keyboard navigation", async () => {
		const { wrapper } = setup();

		const boardItems = wrapper.findAllComponents(BoardGridItem);

		// Attempt to go left at first index
		await boardItems[0].vm.$emit("keydown", { key: "ArrowLeft" });
		expect(useRoomDetailsStore().moveBoard).not.toHaveBeenCalled();

		// Attempt to go right at last index
		await boardItems[2].vm.$emit("keydown", { key: "ArrowRight" }, 2);
		expect(useRoomDetailsStore().moveBoard).not.toHaveBeenCalled();
	});

	it("should disable sorting when user cannot edit room content", async () => {
		useRoomDetailsStore().$patch({ room: { permissions: [] } });
		const { wrapper } = setup();
		const sortable = wrapper.findComponent({ name: "Sortable" });
		expect(sortable.props("options").disabled).toBe(true);
	});
});
