import { createTestingPinia } from "@pinia/testing";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import ConfirmationTable from "./ConfirmationTable.vue";
import {
	mockedPiniaStoreTyping,
	roomMemberFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import { RoomMember, useRoomMembersStore } from "@data-room";
import { useI18n } from "vue-i18n";
import { RoleName } from "@/serverApi/v3";
import SchoolsModule from "@/store/schools";
import setupStores from "@@/tests/test-utils/setupStores";
import { schoolsModule } from "@/store";

vi.mock("vue-i18n", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-i18n")>();
	return {
		...actual,
		useI18n: vi.fn().mockReturnValue({
			t: vi.fn().mockImplementation((key: string) => key),
		}),
	};
});
const mockI18n = vi.mocked(useI18n());

describe("ConfirmationTable", () => {
	beforeEach(() => {
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
		options: Partial<{
			currentUserRole: RoleName;
			changePermissionFlag: boolean;
			windowWidth: number;
			members: RoomMember[];
			isRoomOwner: boolean;
			currentUserId: string;
		}> = {}
	) => {
		const roomMembersWithoutApplicants =
			options?.members ??
			roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomadmin,
			});
		const roomApplicants =
			options?.members ??
			roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomapplicant,
			});

		const wrapper = mount(ConfirmationTable, {
			global: {
				plugins: [
					createTestingI18n(),
					createTestingVuetify(),
					createTestingPinia({
						initialState: {
							roomMembersStore: {
								roomMembers: [
									...roomMembersWithoutApplicants,
									...roomApplicants,
								],
								isRoomOwner: vi.fn(),
							},
						},
					}),
				],
			},
			stubs: {
				KebabMenuActionConfirmRequest: true,
				KebabMenuActionRejectRequest: true,
				DataTable: true,
				BatchActionMenu: true,
			},
		});

		const roomMembersStore = mockedPiniaStoreTyping(useRoomMembersStore);
		roomMembersStore.roomMembers = [
			...roomMembersWithoutApplicants,
			...roomApplicants,
		];

		return {
			wrapper,
			roomMembersStore,
		};
	};

	describe("rendering", () => {
		it("renders properly", () => {
			const { wrapper } = setup();

			const dataTable = wrapper.findComponent({ name: "DataTable" });

			expect(wrapper.exists()).toBe(true);
			expect(dataTable.exists()).toBe(true);
			expect(mockI18n.t).toHaveBeenCalled();
		});

		it("should pass tableHeader prop to DataTable", () => {
			const headers = [
				"common.labels.firstName",
				"common.labels.lastName",
				"pages.rooms.members.tableHeader.schoolRole",
				"common.words.mainSchool",
				"pages.rooms.members.tableHeader.actions",
			];
			const { wrapper } = setup();
			const dataTable = wrapper.getComponent({ name: "DataTable" });

			expect(
				dataTable
					.props("tableHeaders")!
					.map((header: { title: string }) => header.title)
			).toEqual(headers);
			headers.forEach((header) => {
				expect(mockI18n.t).toHaveBeenCalledWith(header);
			});
		});
	});

	describe("actions", () => {
		it("should set 'confirmationSelectedIds'", async () => {
			const { wrapper, roomMembersStore } = setup();
			const dataTable = wrapper.findComponent({ name: "DataTable" });

			expect(roomMembersStore.confirmationSelectedIds).toEqual([]);
			await dataTable.vm.$emit("update:selected-ids", ["id1", "id2"]);
			expect(roomMembersStore.confirmationSelectedIds).toEqual(["id1", "id2"]);
		});

		describe("table row actions", () => {
			describe("when 'confirmInvitation' is called", () => {
				it("should call 'confirmInvitation'", async () => {
					const { wrapper, roomMembersStore } = setup();

					const applicantId = roomMembersStore.roomApplicants[0].userId;
					const dataTable = wrapper.findComponent({ name: "DataTable" });

					const kebabMenu = dataTable.findComponent(
						`[data-testid="kebab-menu-${applicantId}"]`
					);
					await kebabMenu.trigger("click");

					const confirmButton = wrapper.findComponent(
						`[data-testid="kebab-menu-confirm-${applicantId}"]`
					);
					await confirmButton.trigger("click");

					expect(roomMembersStore.confirmInvitations).toHaveBeenCalledWith([
						applicantId,
					]);
				});
			});

			describe("when 'rejectInvitation' is called", () => {
				it("should call 'rejectInvitation'", async () => {
					const { wrapper, roomMembersStore } = setup();

					const applicantId = roomMembersStore.roomApplicants[0].userId;
					const dataTable = wrapper.findComponent({ name: "DataTable" });

					const kebabMenu = dataTable.findComponent(
						`[data-testid="kebab-menu-${applicantId}"]`
					);
					await kebabMenu.trigger("click");

					const rejectButton = wrapper.findComponent(
						`[data-testid="kebab-menu-reject-${applicantId}"]`
					);
					await rejectButton.trigger("click");

					expect(roomMembersStore.rejectInvitations).toHaveBeenCalledWith([
						applicantId,
					]);
				});
			});
		});
	});
});
