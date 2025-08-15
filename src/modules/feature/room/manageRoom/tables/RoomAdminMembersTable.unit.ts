import {
	meResponseFactory,
	mockedPiniaStoreTyping,
	roomMemberFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import RoomAdminMembersTable from "./RoomAdminMembersTable.vue";
import { authModule, schoolsModule } from "@/store";
import { createTestingVuetify } from "@@/tests/test-utils/setup/createTestingVuetify";
import { createTestingI18n } from "@@/tests/test-utils/setup/createTestingI18n";
import { createTestingPinia } from "@pinia/testing";
import { RoleName } from "@/serverApi/v3";
import { useRoomMembersStore } from "@data-room";
import setupStores from "@@/tests/test-utils/setupStores";
import AuthModule from "@/store/auth";
import { useBoardNotifier } from "@util-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import SchoolsModule from "@/store/schools";

vi.mock("@util-board/BoardNotifier.composable");
const boardNotifier = vi.mocked(useBoardNotifier);

describe("RoomAdminMembersTable", () => {
	let boardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		boardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		boardNotifier.mockReturnValue(boardNotifierCalls);

		setupStores({
			schoolsModule: SchoolsModule,
			authModule: AuthModule,
		});

		schoolsModule.setSchool(
			schoolFactory.build({
				id: "school-id",
				name: "Paul-Gerhardt-Gymnasium",
			})
		);
	});

	const setup = () => {
		const members = roomMemberFactory.buildList(3, {
			roomRoleName: RoleName.Roomadmin,
		});

		const currentUser = roomMemberFactory.build({});
		const mockMe = meResponseFactory.build({
			user: { id: currentUser.userId },
		});
		authModule.setMe(mockMe);

		const wrapper = mount(RoomAdminMembersTable, {
			attachTo: document.body,
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia({
						initialState: {
							roomMembersStore: {
								roomMembers: [...members, currentUser],
								isRoomOwner: vi.fn(),
							},
						},
					}),
				],
			},
		});

		const roomMembersStore = mockedPiniaStoreTyping(useRoomMembersStore);
		roomMembersStore.isRoomOwner.mockReturnValue(false);
		const roomMembers = roomMembersStore.roomMembers;

		return { wrapper, roomMembersStore, roomMembers };
	};

	describe("rendering", () => {
		it("should render the component", () => {
			const { wrapper } = setup();
			expect(wrapper.exists()).toBe(true);
		});
	});
});
