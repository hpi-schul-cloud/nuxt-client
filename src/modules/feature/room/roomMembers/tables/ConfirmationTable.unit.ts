import { createTestingPinia } from "@pinia/testing";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import ConfirmationTable from "./ConfirmationTable.vue";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { roomInvitationLinkFactory } from "@@/tests/test-utils/factory/room/roomInvitationLinkFactory";
import {
	meResponseFactory,
	mockedPiniaStoreTyping,
	roomMemberFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import {
	InvitationStep,
	RoomMember,
	useRoomInvitationLinkStore,
	useRoomMembersStore,
} from "@data-room";
import { nextTick, ref } from "vue";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import {
	useConfirmationDialog,
	useDeleteConfirmationDialog,
} from "@ui-confirmation-dialog";
import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";
import { useI18n } from "vue-i18n";
import { RoleName } from "@/serverApi/v3";
import SchoolsModule from "@/store/schools";
import setupStores from "@@/tests/test-utils/setupStores";
import AuthModule from "@/store/auth";
import { schoolsModule } from "@/store";

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: jest.fn().mockReturnValue({
			t: jest.fn().mockImplementation((key: string) => key),
		}),
	};
});
const mockI18n = jest.mocked(useI18n());

describe("ConfirmationTable", () => {
	const notifierModule = createModuleMocks(NotifierModule);
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
		jest.clearAllMocks();
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
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
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
								isRoomOwner: jest.fn(),
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
