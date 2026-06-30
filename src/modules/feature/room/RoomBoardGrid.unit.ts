import RoomBoardGrid from "./RoomBoardGrid.vue";
import RoomBoardGridItem from "./RoomBoardGridItem.vue";
import { roomBoardGridItemFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoomItemResponseAllowedOperations } from "@api-server";
import { useRoomDetailsStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("@feature-room/RoomBoardGrid", () => {
	beforeEach(() => {
		useRoomDetailsStore(createTestingPinia({ stubActions: true }));
		vi.clearAllMocks();
	});

	const setup = (
		options: Partial<{
			allowedOperations: Partial<RoomItemResponseAllowedOperations> | undefined;
		}> = {}
	) => {
		const boards = roomBoardGridItemFactory.buildList(3);

		const wrapper = mount(RoomBoardGrid, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia({
						initialState: {
							roomDetailsStore: {
								room: {
									id: "test-room",
									name: "Test Room",
									allowedOperations: options?.allowedOperations,
								},
							},
						},
					}),
				],
				stubs: { RoomContentGridItem: true },
			},
			props: {
				roomId: "test-room",
				boards,
			},
		});

		return { wrapper, boards };
	};

	it("should render RoomBoardGridItem for each board", () => {
		const { wrapper, boards } = setup();
		expect(wrapper.findAllComponents(RoomBoardGridItem)).toHaveLength(boards.length);
	});

	it("should call moveBoard on drag and drop reorder", () => {
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
		it("should handle keyboard navigation - ArrowRight", () => {
			const { wrapper, boards } = setup({ allowedOperations: { editContent: true } });

			const boardItem = wrapper.findAllComponents(RoomBoardGridItem).at(0);
			boardItem?.vm.$emit("keydown", { key: "ArrowRight" });

			expect(useRoomDetailsStore().moveBoard).toHaveBeenCalledWith("test-room", boards[0].id, 1);
		});

		it("should handle keyboard navigation - ArrowLeft", () => {
			const { wrapper, boards } = setup({ allowedOperations: { editContent: true } });

			const boardItem = wrapper.findAllComponents(RoomBoardGridItem).at(2);
			boardItem?.vm.$emit("keydown", { key: "ArrowLeft" });

			expect(useRoomDetailsStore().moveBoard).toHaveBeenCalledWith("test-room", boards[2].id, 1);
		});

		it("should handle keyboard navigation - ArrowDown", () => {
			const { wrapper, boards } = setup({ allowedOperations: { editContent: true } });

			const boardItem = wrapper.findAllComponents(RoomBoardGridItem)[0];
			boardItem.vm.$emit("keydown", { key: "ArrowDown" });

			expect(useRoomDetailsStore().moveBoard).toHaveBeenCalledWith("test-room", boards[0].id, 1);
		});

		it("should handle keyboard navigation - ArrowUp", () => {
			const { wrapper, boards } = setup({ allowedOperations: { editContent: true } });

			const boardItem = wrapper.findAllComponents(RoomBoardGridItem)[2];
			boardItem.vm.$emit("keydown", { key: "ArrowUp" });

			expect(useRoomDetailsStore().moveBoard).toHaveBeenCalledWith("test-room", boards[2].id, 1);
		});
	});

	it("should respect board boundaries in keyboard navigation", () => {
		const { wrapper } = setup();
		const boardItems = wrapper.findAllComponents(RoomBoardGridItem);
		// Attempt to go left at first index
		boardItems[0].vm.$emit("keydown", { key: "ArrowLeft" });
		// Attempt to go right at last index
		boardItems[2].vm.$emit("keydown", { key: "ArrowRight" }, 2);
		expect(useRoomDetailsStore().moveBoard).not.toHaveBeenCalled();
	});

	it("should disable sorting when user cannot edit room content", async () => {
		const { wrapper } = setup({ allowedOperations: { editContent: false } });
		const sortable = wrapper.findComponent({ name: "Sortable" });
		expect(sortable.props("options").disabled).toBe(true);
	});

	it("should render board items with default cursor and no editable outline marker for view-only users", () => {
		const { wrapper } = setup({ allowedOperations: { editContent: false } });

		const boardItem = wrapper.get("[data-testid='board-grid-item-0']");

		expect(boardItem.classes()).toContain("cursor-default");
		expect(boardItem.classes()).not.toContain("room-content-grid-item-editable");
	});

	it("should render board items with grab cursor and editable outline marker for editors", () => {
		const { wrapper } = setup({ allowedOperations: { editContent: true } });

		const boardItem = wrapper.get("[data-testid='board-grid-item-0']");

		expect(boardItem.classes()).toContain("cursor-grab");
		expect(boardItem.classes()).toContain("room-content-grid-item-editable");
		expect(boardItem.classes()).not.toContain("room-content-grid-item--view-only");
	});
});
