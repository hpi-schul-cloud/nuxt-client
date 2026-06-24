import RoomGridItem from "./RoomGridItem.vue";
import { RoomColor } from "@/types/room/Room";
import { roomItemFactory } from "@@/tests/test-utils";
import { createTestSchoolStore } from "@@/tests/test-utils/factory/school-test.utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
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
});
