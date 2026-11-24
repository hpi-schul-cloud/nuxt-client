import RoomGrid from "./RoomGrid.vue";
import RoomGroupSection from "./RoomGroupSection.vue";
import { RoomItem } from "@/types/room/Room";
import { roomItemFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoomGroupView } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

describe("RoomGroupSection", () => {
	let wrapper: ReturnType<typeof mount<typeof RoomGroupSection>> | undefined;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		wrapper?.unmount();
	});

	const setup = (
		options: {
			rooms?: RoomItem[];
			group?: RoomGroupView;
			groupIndex?: number;
			groupCount?: number;
			disabled?: boolean;
			showHeading?: boolean;
			isDraggingRoom?: boolean;
		} = {}
	) => {
		const rooms = options.rooms ?? [];
		wrapper = mount(RoomGroupSection, {
			props: {
				rooms,
				group: options.group,
				groupIndex: options.groupIndex ?? 0,
				groupCount: options.groupCount ?? 1,
				indexOffset: 3,
				disabled: options.disabled ?? false,
				showHeading: options.showHeading ?? true,
				isDraggingRoom: options.isDraggingRoom ?? false,
			},
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { RouterLink: true },
			},
			attachTo: document.body,
		});
		return wrapper;
	};

	const group = (overrides: Partial<RoomGroupView> = {}): RoomGroupView => ({
		id: "aaaaaaaaaaaaaaaaaaaaaaaa",
		name: "Informatik",
		collapsed: false,
		rooms: [],
		...overrides,
	});

	describe("named group", () => {
		it("renders a real heading, the room count and stable test ids", () => {
			const rooms = roomItemFactory.buildList(2);
			setup({ rooms, group: group({ rooms }), groupIndex: 1, groupCount: 2 });

			const section = wrapper?.get("[data-testid='room-group-1']");
			expect(section?.attributes("data-group-id")).toBe("aaaaaaaaaaaaaaaaaaaaaaaa");
			expect(section?.attributes("aria-labelledby")).toBe("room-group-heading-aaaaaaaaaaaaaaaaaaaaaaaa");
			expect(wrapper?.get("h2[data-testid='room-group-title']").text()).toBe("Informatik");
			expect(wrapper?.get("[data-testid='room-group-count']").text()).toBe("pages.rooms.groups.roomCount");
			expect(wrapper?.find("[data-testid='room-group-drag-handle']").exists()).toBe(true);
		});

		it("renders an empty drop target for an empty group", () => {
			setup({ group: group() });

			expect(wrapper?.find("[data-testid='room-group-empty']").exists()).toBe(true);
			expect(wrapper?.find("[data-testid='room-group-grid']").exists()).toBe(true);
		});

		it("passes the global index offset to the room grid", () => {
			const rooms = roomItemFactory.buildList(1);
			setup({ rooms, group: group({ rooms }) });

			expect(wrapper?.findComponent(RoomGrid).props("indexOffset")).toBe(3);
			expect(wrapper?.find("[data-testid='board-grid-item-3']").exists()).toBe(true);
		});

		it("exposes disclosure semantics on the toggle button", () => {
			setup({ group: group() });

			const toggle = wrapper?.get("[data-testid='room-group-toggle']");
			expect(toggle?.attributes("aria-expanded")).toBe("true");
			expect(toggle?.attributes("aria-controls")).toBe("room-group-content-aaaaaaaaaaaaaaaaaaaaaaaa");
			expect(document.getElementById("room-group-content-aaaaaaaaaaaaaaaaaaaaaaaa")).not.toBeNull();
		});

		it("emits the new collapsed state", async () => {
			setup({ group: group() });

			await wrapper?.get("[data-testid='room-group-toggle']").trigger("click");

			expect(wrapper?.emitted("toggle")).toEqual([[true]]);
		});

		it("hides the content of a collapsed group and offers an append drop zone", () => {
			const rooms = roomItemFactory.buildList(1);
			setup({ rooms, group: group({ collapsed: true, rooms }) });

			expect(wrapper?.get("[data-testid='room-group-toggle']").attributes("aria-expanded")).toBe("false");
			expect(wrapper?.get(".room-group-content").isVisible()).toBe(false);
			const dropZone = wrapper?.get("[data-testid='room-group-collapsed-drop']");
			expect(dropZone?.attributes("data-append-only")).toBe("true");
			expect(dropZone?.attributes("data-section-key")).toBe("aaaaaaaaaaaaaaaaaaaaaaaa");
		});

		it.each([
			{ groupIndex: 0, groupCount: 2, up: true, down: false },
			{ groupIndex: 1, groupCount: 2, up: false, down: true },
			{ groupIndex: 0, groupCount: 1, up: true, down: true },
		])(
			"disables move actions at the boundaries (index $groupIndex of $groupCount)",
			async ({ groupIndex, groupCount, up, down }) => {
				setup({ group: group(), groupIndex, groupCount });
				await wrapper?.get("[data-testid='room-group-menu']").trigger("click");

				const isDisabled = (testId: string) =>
					document.querySelector(`[data-testid='${testId}']`)?.classList.contains("v-list-item--disabled");
				expect(isDisabled("room-group-menu-move-up")).toBe(up);
				expect(isDisabled("room-group-menu-move-down")).toBe(down);
				const ariaDisabled = (testId: string) =>
					document.querySelector(`[data-testid='${testId}']`)?.getAttribute("aria-disabled") === "true";
				expect(ariaDisabled("room-group-menu-move-up")).toBe(up);
				expect(ariaDisabled("room-group-menu-move-down")).toBe(down);
			}
		);

		it.each([
			{ testId: "room-group-menu-rename", event: "rename" },
			{ testId: "room-group-menu-delete", event: "delete" },
		])("emits $event from the group menu", async ({ testId, event }) => {
			setup({ group: group() });
			await wrapper?.get("[data-testid='room-group-menu']").trigger("click");

			document.querySelector<HTMLElement>(`[data-testid='${testId}']`)?.click();

			expect(wrapper?.emitted(event)).toHaveLength(1);
		});
	});

	describe("compact collapsed state and naming", () => {
		it("marks a collapsed group so it takes less vertical space", () => {
			setup({ group: group({ collapsed: true }) });

			expect(wrapper?.get("section").classes()).toContain("room-group-section--collapsed");
		});

		it("names the room grid with the section heading", () => {
			setup({ group: group(), rooms: roomItemFactory.buildList(1) });

			const headingId = wrapper?.get("[data-testid='room-group-title']").attributes("id");
			expect(wrapper?.get("[data-testid='room-group-grid']").attributes("aria-labelledby")).toBe(headingId);
		});
	});

	describe("empty ungrouped section", () => {
		it("states that all rooms are assigned while nothing is dragged", () => {
			setup({ rooms: [] });

			expect(wrapper?.get("[data-testid='room-group-empty']").text()).toBe("pages.rooms.groups.ungroupedAllAssigned");
		});

		it("explains the drop target while a room is dragged", () => {
			setup({ rooms: [], isDraggingRoom: true });

			expect(wrapper?.get("[data-testid='room-group-empty']").text()).toBe("pages.rooms.groups.ungroupedEmpty");
		});
	});

	describe("ungrouped section", () => {
		it("is not renamable, deletable, collapsible or draggable", () => {
			setup({ rooms: roomItemFactory.buildList(1) });

			expect(wrapper?.find("[data-testid='room-group-ungrouped']").exists()).toBe(true);
			expect(wrapper?.find("[data-testid='room-group-drag-handle']").exists()).toBe(false);
			expect(wrapper?.find("[data-testid='room-group-menu']").exists()).toBe(false);
			expect(wrapper?.find("[data-testid='room-group-toggle']").exists()).toBe(false);
			expect(wrapper?.find(".room-group-sortable-item").exists()).toBe(false);
			expect(wrapper?.get("[data-testid='room-group-title']").text()).toBe("pages.rooms.groups.ungrouped");
		});
	});

	describe("while a change is being saved", () => {
		it("disables all group menu actions", async () => {
			setup({ group: group(), groupIndex: 1, groupCount: 3, disabled: true });
			await wrapper?.get("[data-testid='room-group-menu']").trigger("click");

			for (const testId of [
				"room-group-menu-rename",
				"room-group-menu-move-up",
				"room-group-menu-move-down",
				"room-group-menu-delete",
			]) {
				expect(document.querySelector(`[data-testid='${testId}']`)?.classList).toContain("v-list-item--disabled");
			}
		});

		it("keeps the toggle focusable but ignores it", async () => {
			setup({ group: group(), disabled: true });
			const toggle = wrapper?.get("[data-testid='room-group-toggle']");

			await toggle?.trigger("click");

			expect(toggle?.attributes("aria-disabled")).toBe("true");
			expect(toggle?.attributes("disabled")).toBeUndefined();
			expect(wrapper?.emitted("toggle")).toBeUndefined();
		});
	});

	describe("room title heading level", () => {
		it("uses h3 room titles below a visible section heading", () => {
			const rooms = roomItemFactory.buildList(1);
			setup({ rooms, group: group({ rooms }) });

			expect(wrapper?.findComponent(RoomGrid).props("titleTag")).toBe("h3");
		});

		it("uses h2 room titles when the section heading is hidden", () => {
			setup({ rooms: roomItemFactory.buildList(1), showHeading: false });

			expect(wrapper?.find("[data-testid='room-group-title']").exists()).toBe(false);
			expect(wrapper?.findComponent(RoomGrid).props("titleTag")).toBe("h2");
		});
	});
});
