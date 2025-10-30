import RoomAdminMembersTable from "./RoomAdminMembersTable.vue";
import { RoleName } from "@/serverApi/v3";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import {
	createTestAppStoreWithUser,
	mockedPiniaStoreTyping,
	roomMemberFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup/createTestingI18n";
import { createTestingVuetify } from "@@/tests/test-utils/setup/createTestingVuetify";
import setupStores from "@@/tests/test-utils/setupStores";
import { RoomMember, useRoomMembersStore } from "@data-room";
import { ChangeRole } from "@feature-room";
import { mdiAccountClockOutline, mdiAccountOutline, mdiAccountSchoolOutline } from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { DataTable } from "@ui-data-table";
import { DOMWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { VDataTable, VIcon } from "vuetify/components";

describe("RoomAdminMembersTable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());

		setupStores({
			schoolsModule: SchoolsModule,
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

	const setup = (
		options?: Partial<{
			members: RoomMember[];
		}>
	) => {
		const currentUser = roomMemberFactory.build({});
		createTestAppStoreWithUser(currentUser.userId);

		const members = options?.members ?? [
			...roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomadmin,
			}),
			...roomMemberFactory.buildList(2, {
				schoolId: "different-school-id",
				schoolName: "Different School",
				firstName: "---",
				lastName: "---",
				roomRoleName: RoleName.Roomviewer,
				schoolRoleNames: [RoleName.Student],
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

		describe("school role column", () => {
			const getSchoolRoleCell = (row: DOMWrapper<Element>) => row.findAll("td")[4];

			it.each([
				{
					description: "teacher icon for teacher",
					schoolRoleNames: [RoleName.Teacher],
					expectedIcon: mdiAccountSchoolOutline,
				},
				{
					description: "student icon for students",
					schoolRoleNames: [RoleName.Student],
					expectedIcon: mdiAccountOutline,
				},
				{
					description: "expert icon for external experts",
					schoolRoleNames: [RoleName.Expert],
					expectedIcon: mdiAccountClockOutline,
				},
				{
					description: "teacher icon if teacher and admin roles are present",
					schoolRoleNames: [RoleName.Administrator, RoleName.Teacher],
					expectedIcon: mdiAccountSchoolOutline,
				},
			])("should render $description", ({ schoolRoleNames, expectedIcon }) => {
				const { wrapper } = setup({
					members: [
						roomMemberFactory.build({
							schoolRoleNames,
						}),
					],
				});

				const dataTable = wrapper.getComponent(VDataTable);
				const row = dataTable.find("tbody tr");

				const schoolRoleCell = getSchoolRoleCell(row);
				expect(schoolRoleCell.findComponent(VIcon).props("icon")).toBe(expectedIcon);
			});

			it("should not render icon if no school role is present", () => {
				const { wrapper } = setup({
					members: [
						roomMemberFactory.build({
							schoolRoleNames: [],
						}),
					],
				});

				const dataTable = wrapper.getComponent(VDataTable);
				const row = dataTable.find("tbody tr");

				const schoolRoleCell = getSchoolRoleCell(row);
				expect(schoolRoleCell.findComponent(VIcon).exists()).toBe(false);
			});
		});
	});

	describe("Anonymization", () => {
		it("should not render kebab menu for anonymized members", () => {
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

		it("should render kebab menu only for users belonging to admin school", () => {
			const { wrapper, roomMembersForAdmins } = setup();

			roomMembersForAdmins.forEach(async (member) => {
				await nextTick();
				const kebabMenu = wrapper.findComponent(`[data-testid="kebab-menu-${member.userId}"]`);

				expect(kebabMenu.exists()).toBe(member.schoolId === "school-id" ? true : false);
			});
		});

		it("should render kebab menu actions for same school members", () => {
			const { wrapper, roomMembersForAdmins } = setup();

			const sameSchoolMembers = roomMembersForAdmins.filter(
				(member) => member.schoolName === "Paul-Gerhardt-Gymnasium"
			);

			sameSchoolMembers.forEach(async (member) => {
				await nextTick();

				const removeMemberAction = wrapper.findComponent(`[data-testid="kebab-menu-${member.userId}-remove-member"]`);
				const changePermissionAction = wrapper.findComponent(
					`[data-testid="kebab-menu-${member.userId}-change-permission"]`
				);

				const userIsRoomOwner = member.roomRoleName === RoleName.Roomowner;

				if (userIsRoomOwner) {
					expect(removeMemberAction.exists()).toBe(false);
					expect(changePermissionAction.exists()).toBe(false);
				}
				if (member.schoolId === "school-id" && !userIsRoomOwner) {
					expect(removeMemberAction.exists()).toBe(true);
				}

				if (member.schoolId === "other-school-id") {
					expect(removeMemberAction.exists()).toBe(false);
					expect(changePermissionAction.exists()).toBe(false);
				}
			});
		});
	});

	describe("when selecting members", () => {
		it("should update 'selectedIds' value when a member is selected", async () => {
			const { wrapper, roomMembersStore, roomMembers } = setup();

			const dataTable = wrapper.getComponent(DataTable);
			const checkboxes = dataTable.findAll("input[type='checkbox']");
			checkboxes.at(3)?.trigger("click");
			await nextTick();

			const userIds = roomMembers.slice(2, 3).map((m) => m.userId);
			expect(roomMembersStore.selectedIds).toEqual(expect.arrayContaining(userIds));
		});
	});

	describe("when closing the dialog", () => {
		it("should reset 'selectedIds' value", async () => {
			const { wrapper, roomMembersStore } = setup();

			const dataTable = wrapper.getComponent(DataTable);
			const checkboxes = dataTable.findAll("input[type='checkbox']");
			checkboxes.at(3)?.trigger("click");
			await nextTick();

			const changeRoleDialog = wrapper.getComponent(ChangeRole);
			changeRoleDialog.vm.$emit("close");
			await nextTick();

			expect(roomMembersStore.selectedIds).toEqual([]);
			expect(roomMembersStore.fetchMembers).toHaveBeenCalled();
		});
	});
});
