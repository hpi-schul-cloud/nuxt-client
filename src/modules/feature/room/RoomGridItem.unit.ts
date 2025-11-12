import RoomGridItem from "./RoomGridItem.vue";
import { RoomColor, RoomItem } from "@/types/room/Room";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";

const mockRoom: RoomItem = {
	id: "123",
	name: "A11Y for Beginners",
	color: RoomColor.Magenta,
	schoolId: "123",
	createdAt: "2024-10-11T16:36:06.434Z",
	updatedAt: "2024-10-11T16:36:06.434Z",
	isLocked: false,
};

describe("@feature-room/RoomGridItem", () => {
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

	it("should render in correct color", () => {
		const { wrapper } = setup({ room: mockRoom });

		const avatar = wrapper.find(".room-color--magenta");
		expect(avatar.exists()).toStrictEqual(true);
	});

	it("should compute short title correctly", () => {
		const { wrapper } = setup({ room: mockRoom });

		const shortTitle = wrapper.find("[data-testid=room-short-title]");
		expect(shortTitle.text()).toStrictEqual("A1");
	});
});
