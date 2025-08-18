import {
	meResponseFactory,
	mockedPiniaStoreTyping,
	mockStatusAlerts,
	roomMemberFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import RoomAdminMembersTable from "./RoomAdminMembersTable.vue";
import { authModule, schoolsModule } from "@/store";
import { createTestingVuetify } from "@@/tests/test-utils/setup/createTestingVuetify";
import { createTestingI18n } from "@@/tests/test-utils/setup/createTestingI18n";
import { createTestingPinia } from "@pinia/testing";
import { Permission, RoleName } from "@/serverApi/v3";
import { useRoomMembersStore } from "@data-room";
import setupStores from "@@/tests/test-utils/setupStores";
import AuthModule from "@/store/auth";
import { useBoardNotifier } from "@util-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import SchoolsModule from "@/store/schools";

vi.mock("@util-board/BoardNotifier.composable");
const boardNotifier = vi.mocked(useBoardNotifier);

const ADD_USER_PERMISSION = [Permission.RoomAddMembers]]; // TODO is that right?

const getUser = (permissions: string[] = []) => {
	const currentUser = roomMemberFactory.build({});
	const mockUser = meResponseFactory.build({
		user: { id: currentUser.userId },
	});
	return { ...mockUser, permissions};
};

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

	describe("Anonymization", () => {
		it("should not happen for students of the same school as the admin", () => {
			const { wrapper } = setup();
			const user = getUser([...ADD_USER_PERMISSION]);
			authModule.setMe(user);
			expect(wrapper.exists()).toBe(true);
		});

		it("should happen for students of other schools", () => {
			// different setup with different school
			const { wrapper } = setup();
			const user = getUser([...ADD_USER_PERMISSION]);
			authModule.setMe(user);
			expect(wrapper.exists()).toBe(true);
		});
	});

	describe("Data Table", () => {
		it("should show the correct items", () => {
		});
		it("should show the three dot menu for users with correct persmissions", () => {
		});
	});

	describe("Floating action button", () => {
		it("should be shown to users with the add permission", () => {
			const { wrapper } = setup();
			const user = getUser([...ADD_USER_PERMISSION]);
			authModule.setMe(user);
						const deleteAction = wrapper.findComponent(
							`[data-testid="menu-delete-room-${roomList[0].roomId}"]`
						);
		});
		it("should not appear for other users", () => {
			const { wrapper } = setup();
			const user = getUser();
			authModule.setMe(user);
		});
	});

	describe("a user who who can add members", () => {
		it("should see the kebab menu to add users", () => {
			const { wrapper } = setup();
			const user = getUser([...ADD_USER_PERMISSION]);
			authModule.setMe(user);
			expect(wrapper.exists()).toBe(true);
		});

		it("should see the correct table headers", () => {
			const { wrapper } = setup();
			const currentUser = roomMemberFactory.build({});
			const mockMe = meResponseFactory.build({
				user: { id: currentUser.userId },
			});
			authModule.setMe({ ...mockMe, permissions: [] });// TODO add right permissions
			// const expectedText = t("pages.rooms.members.tableHeader.actions");
			const expectedText = "Aktionen";
			// TODO find right element
			expect(wrapper.exists()).toBe(true);
		});

		it("should see the add room members action in the table", () => {
			const { wrapper } = setup();
			const currentUser = roomMemberFactory.build({});
			const mockMe = meResponseFactory.build({
				user: { id: currentUser.userId },
			});
			authModule.setMe({ ...mockMe, permissions: [] });// TODO add right permissions
			// const expectedText = t("pages.rooms.members.tableHeader.actions");
			const expectedText = "Aktionen";
			// TODO find right element
			expect(wrapper.exists()).toBe(true);
		});
	});

	describe("a user who who cannot add members", () => {
		it("should not the three dot menu in the table", () => {
			const { wrapper } = setup();
			const currentUser = roomMemberFactory.build({});
			const mockMe = meResponseFactory.build({
				user: { id: currentUser.userId },
			});
			authModule.setMe({ ...mockMe, permissions: [] });// TODO add right permissions
			// const expectedText = t("pages.rooms.members.tableHeader.actions");
			const expectedText = "Aktionen";
			// TODO find right element
			expect(wrapper.exists()).toBe(true);
		});
	});

});
