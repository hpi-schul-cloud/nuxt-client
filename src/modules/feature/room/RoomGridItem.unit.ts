import RoomGridItem from "./RoomGridItem.vue";
import { RoomColor } from "@/types/room/Room";
import { roomItemFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import { VBadge } from "vuetify/lib/components/index";

describe("@feature-room/RoomGridItem", () => {
	const mockRoom = roomItemFactory.build({ color: RoomColor.Magenta, isLocked: false, name: "Mathe" });

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
});
