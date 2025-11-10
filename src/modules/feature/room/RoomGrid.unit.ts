import RoomGrid from "./RoomGrid.vue";
import RoomGridItem from "./RoomGridItem.vue";
import { roomItemFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";

vi.mock("@data-room");

describe("@feature-room/RoomGrid", () => {
	const setup = (props?: ComponentProps<typeof RoomGrid>) => {
		const wrapper = mount(RoomGrid, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					RouterLink: RouterLinkStub,
				},
			},
			props,
		});

		return { wrapper };
	};

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should render grid items for each room", () => {
		const mockRooms = roomItemFactory.buildList(2);

		const { wrapper } = setup({
			rooms: mockRooms,
		});

		const gridItems = wrapper.findAllComponents(RoomGridItem);
		expect(gridItems.length).toEqual(2);
	});
});
