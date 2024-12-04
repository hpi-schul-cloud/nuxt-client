import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import RoomTile from "./RoomTile.vue";
import { RoomItem, RoomColorEnum } from "@/types/room/Room";

const mockRoom: RoomItem = {
	id: "123",
	name: "A11Y for Beginners",
	color: RoomColorEnum.Magenta,
	createdAt: "2024-10-11T16:36:06.434Z",
	updatedAt: "2024-10-11T16:36:06.434Z",
};

describe("@feature-room/RoomTile", () => {
	const setup = (props?: ComponentProps<typeof RoomTile>) => {
		const wrapper = mount(RoomTile, {
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
