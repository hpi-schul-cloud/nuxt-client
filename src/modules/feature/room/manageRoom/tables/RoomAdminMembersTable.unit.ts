import { nextTick } from "vue";
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
import { DataTable } from "@ui-data-table";

const { log } = console;

vi.mock("@util-board/BoardNotifier.composable");
const boardNotifier = vi.mocked(useBoardNotifier);

// const ADD_USER_PERMISSION = [Permission.RoomAddMembers]; // TODO is that right?

// const getUser = (permissions: string[] = []) => {
// 	const currentUser = roomMemberFactory.build({});
// 	const mockUser = meResponseFactory.build({
// 		user: { id: currentUser.userId },
// 	});
// 	return { ...mockUser, permissions };
// };

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

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = () => {
		const currentUser = roomMemberFactory.build({});
		const mockMe = meResponseFactory.build({
			user: { id: currentUser.userId },
		});
		authModule.setMe(mockMe);

		const members = [
			...roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomadmin,
			}),
			...roomMemberFactory.buildList(2, {
				schoolId: "different-school-id",
				schoolName: "Different School",
				firstName: "---",
				lastName: "---",
				roomRoleName: RoleName.Roomviewer,
			}),
			...roomMemberFactory.buildList(1, {
				schoolId: "different-school-id",
				schoolName: "Different School",
				roomRoleName: RoleName.Roomowner,
				userId: currentUser.userId,
			}),
		];

		const wrapper = mount(RoomAdminMembersTable, {
			attachTo: document.body,
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia({
						initialState: {
							roomMembersStore: {
								roomMembers: members,
								isRoomOwner: vi.fn(),
							},
						},
					}),
				],
			},
		});

		const roomMembersStore = mockedPiniaStoreTyping(useRoomMembersStore);
		roomMembersStore.roomMembers = members;
		roomMembersStore.isRoomOwner.mockReturnValue(false);
		const roomMembersForAdmins = roomMembersStore.roomMembersForAdmins;
		const roomMembers = roomMembersStore.roomMembers;

		return { wrapper, roomMembersStore, roomMembersForAdmins, roomMembers };
	};

	describe("rendering", () => {
		it("should render the component", () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
		});

		it("should pass the correct items and headers prop to DataTable", () => {
			const tableHeaders = [
				"common.labels.firstName",
				"common.labels.lastName",
				"pages.rooms.members.tableHeader.roomRole",
				"pages.rooms.members.tableHeader.schoolRole",
				"common.words.mainSchool",
				"pages.rooms.members.tableHeader.actions",
			];

			const { wrapper, roomMembersForAdmins } = setup();

			const dataTable = wrapper.getComponent(DataTable);
			expect(dataTable.props("items")).toEqual(roomMembersForAdmins);
			expect(
				dataTable.props("tableHeaders")!.map((header) => header.title)
			).toEqual(tableHeaders);
		});
	});

	describe("Anonymization", () => {
		it("should not render kebab menu for anonymized members", async () => {
			const { wrapper, roomMembersForAdmins } = setup();

			const anonymizedMembers = roomMembersForAdmins.filter(
				(member) =>
					member.firstName ===
					"pages.rooms.administration.roomDetail.anonymized"
			);

			anonymizedMembers.forEach(async (member) => {
				await nextTick();
				const kebabMenu = wrapper.findComponent(
					`[data-testid="kebab-menu-${member?.userId}"]`
				);

				const checkBox = wrapper
					.findComponent(`[data-testid="select-checkbox-${member?.fullName}"]`)
					.find("input");

				expect(kebabMenu.exists()).toBe(false);
				expect(checkBox.attributes()).toHaveProperty("disabled");
			});
		});

		it("should not render kebab menu for the other school members but room owners", async () => {
			const { wrapper, roomMembersForAdmins } = setup();

			const otherSchoolMembers = roomMembersForAdmins.filter(
				(member) => member.schoolId === "different-school-id"
			);

			otherSchoolMembers.forEach(async (member) => {
				if (member.roomRoleName === RoleName.Roomowner) {
					await nextTick();
					const kebabMenu = wrapper.findComponent(
						`[data-testid="kebab-menu-${member.userId}"]`
					);

					expect(kebabMenu.exists()).toBe(true);
					return;
				}
				await nextTick();
				const kebabMenu = wrapper.findComponent(
					`[data-testid="kebab-menu-${member.userId}"]`
				);

				const checkBox = wrapper
					.findComponent(`[data-testid="select-checkbox-${member?.fullName}"]`)
					.find("input");

				expect(checkBox.attributes()).toHaveProperty("disabled");
				expect(kebabMenu.exists()).toBe(false);
			});
		});

		it("should render kebab menu for same school members", () => {
			const { wrapper, roomMembersForAdmins } = setup();

			log("roomMembersForAdmins", roomMembersForAdmins);
			const sameSchoolMembers = roomMembersForAdmins.filter(
				(member) => member.schoolName === "Paul-Gerhardt-Gymnasium"
			);

			sameSchoolMembers.forEach(async (member) => {
				await nextTick();

				const kebabMenu = wrapper.findComponent(
					`[data-testid="kebab-menu-${member.userId}"]`
				);

				const checkBox = wrapper
					.findComponent(`[data-testid="select-checkbox-${member?.fullName}"]`)
					.find("input");

				expect(checkBox.attributes()).not.toHaveProperty("disabled");
				expect(kebabMenu.exists()).toBe(true);
			});
		});

		// ------------------------------------
		// });

		// it("should happen for students of other schools", () => {
		// 	// different setup with different school
		// 	const { wrapper } = setup();
		// 	const user = getUser([...ADD_USER_PERMISSION]);
		// 	authModule.setMe(user);
		// 	expect(wrapper.exists()).toBe(true);
		// });
	});

	// describe("Data Table", () => {
	// 	it("should show the correct items", () => {});
	// 	it("should show the three dot menu for users with correct persmissions", () => {});
	// });

	// describe("Floating action button", () => {
	// 	it("should be shown to users with the add permission", () => {
	// 		const { wrapper } = setup();
	// 		const user = getUser([...ADD_USER_PERMISSION]);
	// 		authModule.setMe(user);
	// 		const deleteAction = wrapper.findComponent(
	// 			`[data-testid="menu-delete-room-${roomList[0].roomId}"]`
	// 		);
	// 	});
	// 	it("should not appear for other users", () => {
	// 		const { wrapper } = setup();
	// 		const user = getUser();
	// 		authModule.setMe(user);
	// 	});
	// });

	// describe("a user who who can add members", () => {
	// 	it("should see the kebab menu to add users", () => {
	// 		const { wrapper } = setup();
	// 		const user = getUser([...ADD_USER_PERMISSION]);
	// 		authModule.setMe(user);
	// 		expect(wrapper.exists()).toBe(true);
	// 	});

	// 	it("should see the correct table headers", () => {
	// 		const { wrapper } = setup();
	// 		const currentUser = roomMemberFactory.build({});
	// 		const mockMe = meResponseFactory.build({
	// 			user: { id: currentUser.userId },
	// 		});
	// 		authModule.setMe({ ...mockMe, permissions: [] }); // TODO add right permissions
	// 		// const expectedText = t("pages.rooms.members.tableHeader.actions");
	// 		const expectedText = "Aktionen";
	// 		// TODO find right element
	// 		expect(wrapper.exists()).toBe(true);
	// 	});

	// 	it("should see the add room members action in the table", () => {
	// 		const { wrapper } = setup();
	// 		const currentUser = roomMemberFactory.build({});
	// 		const mockMe = meResponseFactory.build({
	// 			user: { id: currentUser.userId },
	// 		});
	// 		authModule.setMe({ ...mockMe, permissions: [] }); // TODO add right permissions
	// 		// const expectedText = t("pages.rooms.members.tableHeader.actions");
	// 		const expectedText = "Aktionen";
	// 		// TODO find right element
	// 		expect(wrapper.exists()).toBe(true);
	// 	});
	// });

	// describe("a user who who cannot add members", () => {
	// 	it("should not the three dot menu in the table", () => {
	// 		const { wrapper } = setup();
	// 		const currentUser = roomMemberFactory.build({});
	// 		const mockMe = meResponseFactory.build({
	// 			user: { id: currentUser.userId },
	// 		});
	// 		authModule.setMe({ ...mockMe, permissions: [] }); // TODO add right permissions
	// 		// const expectedText = t("pages.rooms.members.tableHeader.actions");
	// 		const expectedText = "Aktionen";
	// 		// TODO find right element
	// 		expect(wrapper.exists()).toBe(true);
	// 	});
	// });
});
