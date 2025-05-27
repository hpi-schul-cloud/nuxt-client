import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import RoomGrid from "./RoomGrid.vue";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useRoomsState } from "@data-room";
import { ref } from "vue";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import RoomTile from "./RoomTile.vue";
import { EmptyState } from "@ui-empty-state";

jest.mock("@data-room");

describe("@feature-room/RoomGrid", () => {
	let useRoomsStateMock: DeepMocked<ReturnType<typeof useRoomsState>>;
	const setup = (props?: ComponentProps<typeof RoomGrid>) => {
		const wrapper = mount(RoomGrid, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

		return { wrapper };
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should render loading state when rooms are loading", () => {
		useRoomsStateMock = createMock<ReturnType<typeof useRoomsState>>({
			isLoading: ref(true),
			isEmpty: ref(false),
			rooms: ref([]),
			fetchRooms: jest.fn(),
		});

		jest.mocked(useRoomsState).mockReturnValue(useRoomsStateMock);

		const { wrapper } = setup();

		const loader = wrapper.findComponent(VSkeletonLoader);
		expect(loader.exists()).toBe(true);
	});

	it("should render empty state when no rooms were found", () => {
		useRoomsStateMock = createMock<ReturnType<typeof useRoomsState>>({
			isLoading: ref(false),
			isEmpty: ref(true),
			rooms: ref([]),
			fetchRooms: jest.fn(),
		});

		jest.mocked(useRoomsState).mockReturnValue(useRoomsStateMock);

		const { wrapper } = setup();

		const emptyState = wrapper.findComponent(EmptyState);
		expect(emptyState.exists()).toBe(true);
		expect(emptyState.props("title")).toBe("pages.rooms.emptyState");
	});

	it("should render tiles for each room", () => {
		const mockRooms = [
			{ id: "1", name: "Room 1" },
			{ id: "2", name: "Room 2" },
		];
		useRoomsStateMock = createMock<ReturnType<typeof useRoomsState>>({
			isLoading: ref(false),
			isEmpty: ref(false),
			rooms: ref(mockRooms),
			fetchRooms: jest.fn(),
		});

		jest.mocked(useRoomsState).mockReturnValue(useRoomsStateMock);

		const { wrapper } = setup();

		const tiles = wrapper.findAllComponents(RoomTile);
		expect(tiles.length).toEqual(2);
	});
});
