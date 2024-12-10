import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import RoomDetails from "./RoomDetails.vue";
import { RoomDetails as RoomDetailsType } from "@/types/room/Room";
import { RoomColor } from "@/serverApi/v3";

const mockRoom: RoomDetailsType = {
	id: "59cce2c61113d1132c98dc06",
	name: "A11Y for Beginners",
	color: RoomColor.Magenta,
	schoolId: "123",
	startDate: "",
	endDate: "",
	permissions: [],
	createdAt: "2017-09-28T11:49:39.924Z",
	updatedAt: "2017-09-28T11:49:39.924Z",
};

describe("@feature-room/RoomDetails", () => {
	const setup = (props: ComponentProps<typeof RoomDetails>) => {
		const wrapper = mount(RoomDetails, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

		return { wrapper };
	};

	it("should render BoardGrid", async () => {
		const { wrapper } = setup({ room: mockRoom });

		const boardGrid = wrapper.findComponent({ name: "BoardGrid" });
		expect(boardGrid.exists()).toStrictEqual(true);
	});
});
