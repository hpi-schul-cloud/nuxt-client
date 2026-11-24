import RoomGridItem from "./RoomGridItem.vue";
import { RoomColor } from "@/types/room/Room";
import { roomItemFactory } from "@@/tests/test-utils";
import { createTestSchoolStore } from "@@/tests/test-utils/factory/school-test.utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoomItemResponseAllowedOperations } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { KebabMenuAction } from "@ui-kebab-menu";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { ComponentProps } from "vue-component-type-helpers";
import { VBadge } from "vuetify/lib/components/index";

describe("@feature-room/RoomGridItem", () => {
	const SCHOOL_ID = "school-123";
	const mockRoom = roomItemFactory.build({
		color: RoomColor.MAGENTA,
		isLocked: false,
		name: "Mathe",
		schoolId: SCHOOL_ID,
	});

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestSchoolStore({ schoolDetails: { id: SCHOOL_ID } });
	});

	const setup = (props?: ComponentProps<typeof RoomGridItem>) => {
		const wrapper = mount(RoomGridItem, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: ["RouterLink"],
			},
			props,
		});
		return { wrapper };
	};

	it("should render avatar with correct color class", () => {
		const { wrapper } = setup({ room: mockRoom, index: 0 });
		const icon = wrapper.find(".room-color--magenta");
		expect(icon.exists()).toBe(true);
	});

	it("should compute short title (first two characters of name)", () => {
		const { wrapper } = setup({ room: mockRoom, index: 0 });
		const shortTitleEl = wrapper.get("[data-testid=room-short-title-0]");
		expect(shortTitleEl.text()).toEqual("Ma");
	});

	it("should render full title", () => {
		const { wrapper } = setup({ room: mockRoom, index: 0 });
		const fullTitleEl = wrapper.get("[data-testid=room--title-0]");
		expect(fullTitleEl.text()).toBe(mockRoom.name);
	});

	it("should show locked badge when room is locked", () => {
		const { wrapper } = setup({ room: { ...mockRoom, isLocked: true }, index: 0 });
		const badge = wrapper.findComponent(VBadge);
		expect(badge.props("modelValue")).toBe(true);
	});

	describe("external school chip", () => {
		it("should not show external chip when room belongs to user's school", () => {
			const { wrapper } = setup({ room: { ...mockRoom, schoolId: SCHOOL_ID }, index: 0 });
			expect(wrapper.find("[data-testid=room--external-school-0]").exists()).toBe(false);
		});

		it("should show external chip when room belongs to a different school", () => {
			const { wrapper } = setup({ room: { ...mockRoom, schoolId: "other-school-456" }, index: 0 });
			expect(wrapper.find("[data-testid=room--external-school-0]").exists()).toBe(true);
		});
	});

	describe("arrange menu", () => {
		const arrangeableRoom = {
			...mockRoom,
			allowedOperations: { arrangeRooms: true } as unknown as RoomItemResponseAllowedOperations,
		};

		it("is not shown outside the grouped overview", () => {
			const { wrapper } = setup({ room: arrangeableRoom, index: 0 });
			expect(wrapper.find("[data-testid=room-card-menu]").exists()).toBe(false);
		});

		it("is hidden for rooms that cannot be arranged", () => {
			const { wrapper } = setup({ room: mockRoom, index: 0, showArrangeMenu: true });
			expect(wrapper.find("[data-testid=room-card-menu]").exists()).toBe(false);
			expect(wrapper.find("[data-testid=room-open-button-0]").exists()).toBe(true);
		});

		it("keeps the existing test ids and adds the room id", () => {
			const { wrapper } = setup({ room: arrangeableRoom, index: 4, showArrangeMenu: true });
			const card = wrapper.get("[data-testid=board-grid-item-4]");
			expect(card.attributes("data-room-id")).toBe(mockRoom.id);
			expect(wrapper.find("[data-testid=room-card-menu]").exists()).toBe(true);
		});

		it.each([
			{ testId: "room-card-menu-move-to-group", event: "move-to-group" },
			{ testId: "room-card-menu-move-earlier", event: "move-earlier" },
			{ testId: "room-card-menu-move-later", event: "move-later" },
		])("emits $event", async ({ testId, event }) => {
			const { wrapper } = setup({
				room: arrangeableRoom,
				index: 0,
				showArrangeMenu: true,
				canMoveEarlier: true,
				canMoveLater: true,
			});
			await wrapper.get("[data-testid=room-card-menu]").trigger("click");
			await wrapper
				.findAllComponents(KebabMenuAction)
				.find((a) => a.attributes("data-testid") === testId)
				?.trigger("click");

			expect(wrapper.emitted(event)).toHaveLength(1);
		});

		it("hides moving to another section when there is none", async () => {
			const { wrapper } = setup({ room: arrangeableRoom, index: 0, showArrangeMenu: true, canMoveToGroup: false });
			await wrapper.get("[data-testid=room-card-menu]").trigger("click");

			const testIds = wrapper.findAllComponents(KebabMenuAction).map((a) => a.attributes("data-testid"));
			expect(testIds).not.toContain("room-card-menu-move-to-group");
			expect(testIds).toContain("room-card-menu-move-later");
		});

		it("disables moving beyond the section boundaries", async () => {
			const { wrapper } = setup({ room: arrangeableRoom, index: 0, showArrangeMenu: true, canMoveLater: true });
			await wrapper.get("[data-testid=room-card-menu]").trigger("click");

			const actions = wrapper.findAllComponents(KebabMenuAction);
			const byTestId = (testId: string) => actions.find((a) => a.attributes("data-testid") === testId);
			expect(byTestId("room-card-menu-move-earlier")?.props("disabled")).toBe(true);
			expect(byTestId("room-card-menu-move-later")?.props("disabled")).toBe(false);
		});

		it("disables all arrange actions while a change is being saved", async () => {
			const { wrapper } = setup({
				room: arrangeableRoom,
				index: 0,
				showArrangeMenu: true,
				arrangeDisabled: true,
			});
			await wrapper.get("[data-testid=room-card-menu]").trigger("click");

			const disabledStates = wrapper.findAllComponents(KebabMenuAction).map((action) => action.props("disabled"));
			expect(disabledStates).toEqual([true, true, true]);
		});

		describe("selection mode", () => {
			it("shows an accessible checkbox instead of the menu and emits the selection", async () => {
				const { wrapper } = setup({ room: arrangeableRoom, index: 0, showArrangeMenu: true, selectable: true });

				expect(wrapper.find("[data-testid=room-card-menu]").exists()).toBe(false);
				const input = wrapper.get("[data-testid=room-card-select] input");
				expect(input.attributes("aria-label")).toBe("pages.rooms.groups.selection.selectRoom");
				await input.setValue(true);

				expect(wrapper.emitted("select")).toEqual([[true]]);
				expect(wrapper.find("[data-testid=room-open-button-0]").exists()).toBe(true);
			});

			it("does not offer selecting rooms that cannot be arranged", () => {
				const { wrapper } = setup({ room: mockRoom, index: 0, selectable: true });

				expect(wrapper.find("[data-testid=room-card-select]").exists()).toBe(false);
			});
		});
	});

	describe("selection mode card behaviour", () => {
		const arrangeable = {
			...mockRoom,
			allowedOperations: { arrangeRooms: true } as unknown as RoomItemResponseAllowedOperations,
		};

		it("toggles the selection when the card body is clicked", async () => {
			const { wrapper } = setup({ room: arrangeable, index: 0, selectable: true, selected: false });

			await wrapper.get(".v-card-item").trigger("click");

			expect(wrapper.emitted("select")).toEqual([[true]]);
		});

		it("does not toggle twice when the checkbox itself is clicked", async () => {
			const { wrapper } = setup({ room: arrangeable, index: 0, selectable: true, selected: true });

			// The checkbox reports its own change; its click must not also reach the card body toggle.
			await wrapper.get(".room-card-menu").trigger("click");

			expect(wrapper.emitted("select")).toBeUndefined();
		});

		it("makes the room link inert and keeps the open button", () => {
			const { wrapper } = setup({ room: arrangeable, index: 0, selectable: true });

			expect(wrapper.findComponent({ name: "RouterLink" }).exists()).toBe(false);
			expect(wrapper.find("div.room-link-item").exists()).toBe(true);
			expect(wrapper.find("[data-testid=room-open-button-0]").exists()).toBe(true);
		});

		it("marks a selected card visibly", () => {
			const { wrapper } = setup({ room: arrangeable, index: 0, selectable: true, selected: true });

			expect(wrapper.get("[data-testid=board-grid-item-0]").classes()).toContain("room-grid-item--selected");
		});

		it("keeps the room link outside selection mode", () => {
			const { wrapper } = setup({ room: arrangeable, index: 0 });

			expect(wrapper.findComponent({ name: "RouterLink" }).exists()).toBe(true);
		});
	});
});
