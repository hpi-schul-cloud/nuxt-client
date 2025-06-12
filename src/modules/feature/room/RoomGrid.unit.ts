import { RoomItem } from "@/types/room/Room";
import { roomFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { EmptyState } from "@ui-empty-state";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import { VSkeletonLoader } from "vuetify/lib/components/index";
import RoomGrid from "./RoomGrid.vue";
import RoomTile from "./RoomTile.vue";

jest.mock("@data-room");

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
		jest.clearAllMocks();
	});

	it("should render loading state when rooms are loading", () => {
		const { wrapper } = setup({
			isLoading: true,
			isEmpty: false,
			rooms: [] as Array<RoomItem>,
		});

		const loader = wrapper.findComponent(VSkeletonLoader);
		expect(loader.exists()).toBe(true);
	});

	it("should render empty state when no rooms were found", () => {
		const { wrapper } = setup({
			isLoading: false,
			isEmpty: true,
			rooms: [] as Array<RoomItem>,
		});

		const emptyState = wrapper.findComponent(EmptyState);
		expect(emptyState.exists()).toBe(true);
		expect(emptyState.props("title")).toBe("pages.rooms.emptyState");
	});

	it("should render tiles for each room", () => {
		const mockRooms = roomFactory.buildList(2);

		const { wrapper } = setup({
			isLoading: false,
			isEmpty: false,
			rooms: mockRooms,
		});

		const tiles = wrapper.findAllComponents(RoomTile);
		expect(tiles.length).toEqual(2);
	});
});
