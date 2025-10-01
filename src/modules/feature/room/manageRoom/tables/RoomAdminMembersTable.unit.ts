import RoomAdminMembersTable from "./RoomAdminMembersTable.vue";
import { RoleName } from "@/serverApi/v3";
import { authModule, schoolsModule } from "@/store";
import AuthModule from "@/store/auth";
import SchoolsModule from "@/store/schools";
import { meResponseFactory, mockedPiniaStoreTyping, roomMemberFactory, schoolFactory } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup/createTestingI18n";
import { createTestingVuetify } from "@@/tests/test-utils/setup/createTestingVuetify";
import setupStores from "@@/tests/test-utils/setupStores";
import { useRoomMembersStore } from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { DataTable } from "@ui-data-table";
import { useBoardNotifier } from "@util-board";
import { nextTick } from "vue";

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
			expect(dataTable.props("tableHeaders")!.map((header) => header.title)).toEqual(tableHeaders);
		});
	});

	describe("Anonymization", () => {
		it("should not render kebab menu for anonymized members", async () => {
			const { wrapper, roomMembersForAdmins } = setup();

			const anonymizedMembers = roomMembersForAdmins.filter(
				(member) => member.firstName === "pages.rooms.administration.roomDetail.anonymized"
			);

			anonymizedMembers.forEach(async (member) => {
				await nextTick();
				const kebabMenu = wrapper.findComponent(`[data-testid="kebab-menu-${member?.userId}"]`);

				const checkBox = wrapper.findComponent(`[data-testid="select-checkbox-${member?.fullName}"]`).find("input");

				expect(kebabMenu.exists()).toBe(false);
				expect(checkBox.attributes()).toHaveProperty("disabled");
			});
		});

		it("should not render kebab menu for the other school members but room owners", async () => {
			const { wrapper, roomMembersForAdmins } = setup();

			const otherSchoolMembers = roomMembersForAdmins.filter((member) => member.schoolId === "different-school-id");

			otherSchoolMembers.forEach(async (member) => {
				if (member.roomRoleName === RoleName.Roomowner) {
					await nextTick();
					const kebabMenu = wrapper.findComponent(`[data-testid="kebab-menu-${member.userId}"]`);

					expect(kebabMenu.exists()).toBe(true);
					return;
				}
				await nextTick();
				const kebabMenu = wrapper.findComponent(`[data-testid="kebab-menu-${member.userId}"]`);

				const checkBox = wrapper.findComponent(`[data-testid="select-checkbox-${member?.fullName}"]`).find("input");

				expect(checkBox.attributes()).toHaveProperty("disabled");
				expect(kebabMenu.exists()).toBe(false);
			});
		});

		it("should render kebab menu for same school members", () => {
			const { wrapper, roomMembersForAdmins } = setup();

			const sameSchoolMembers = roomMembersForAdmins.filter(
				(member) => member.schoolName === "Paul-Gerhardt-Gymnasium"
			);

			sameSchoolMembers.forEach(async (member) => {
				await nextTick();

				const kebabMenu = wrapper.findComponent(`[data-testid="kebab-menu-${member.userId}"]`);

				const checkBox = wrapper.findComponent(`[data-testid="select-checkbox-${member?.fullName}"]`).find("input");

				expect(checkBox.attributes()).not.toHaveProperty("disabled");
				expect(kebabMenu.exists()).toBe(true);
			});
		});
	});

	describe("selection", () => {
		it("should update 'selectedIds' value when a member is selected", async () => {
			const { wrapper, roomMembersStore } = setup();

			const dataTable = wrapper.getComponent(DataTable);
			const emittedIds = ["123", "456"];
			dataTable.vm.$emit("update:selected-ids", emittedIds);
			await nextTick();

			expect(roomMembersStore.selectedIds).toEqual(expect.arrayContaining(emittedIds));
		});
	});
});
