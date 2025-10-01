import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { VueWrapper } from "@vue/test-utils";
import RoomMenu from "./RoomMenu.vue";
import { RouterLink } from "vue-router";
import { computed } from "vue";
import { useRoomAuthorization } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import {
	KebabMenuActionDelete,
	KebabMenuActionEdit,
	KebabMenuActionRoomMembers,
	KebabMenuActionLeaveRoom,
	KebabMenuActionRoomCopy,
	KebabMenuActionShare,
} from "@ui-kebab-menu";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";
import { ConfigResponse } from "@/serverApi/v3";
import { Mock } from "vitest";
import { createTestEnvStore } from "@@/tests/test-utils";

vi.mock("@data-room/roomAuthorization.composable");
const roomAuthorization = vi.mocked(useRoomAuthorization);

vi.mock("@ui-confirmation-dialog");
vi.mocked(useDeleteConfirmationDialog);

describe("@feature-room/RoomMenu", () => {
	let roomPermissions: ReturnType<typeof useRoomAuthorization>;
	let askDeleteConfirmationMock: Mock;

	beforeEach(() => {
		roomPermissions = {
			canAddRoomMembers: computed(() => false),
			canCreateRoom: computed(() => false),
			canChangeOwner: computed(() => false),
			canViewRoom: computed(() => false),
			canAddAllStudents: computed(() => false),
			canEditRoom: computed(() => false),
			canDeleteRoom: computed(() => false),
			canCopyRoom: computed(() => false),
			canLeaveRoom: computed(() => false),
			canRemoveRoomMembers: computed(() => false),
			canEditRoomContent: computed(() => false),
			canSeeAllStudents: computed(() => false),
			canShareRoom: computed(() => false),
			canListDrafts: computed(() => false),
			canManageRoomInvitationLinks: computed(() => false),
			canManageVideoconferences: computed(() => false),
		};
		roomAuthorization.mockReturnValue(roomPermissions);

		askDeleteConfirmationMock = vi.fn();
		setupDeleteConfirmationComposableMock({
			askDeleteConfirmationMock,
		});
	});

	const setup = (envs: Partial<ConfigResponse> = {}) => {
		createTestEnvStore({
			FEATURE_ROOM_COPY_ENABLED: true,
			FEATURE_ROOM_SHARE: true,
			...envs,
		});

		const wrapper = mount(RoomMenu, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia(),
				],
				stubs: {
					RouterLink,
				},
			},
		});

		const menuBtn = wrapper.findComponent("[data-testid=room-menu]");

		return { wrapper, menuBtn };
	};

	const findKebabActions = (wrapper: VueWrapper) => {
		const kebabActionDelete = wrapper.findComponent(KebabMenuActionDelete);
		const kebabActionEdit = wrapper.findComponent(KebabMenuActionEdit);
		const kebabActionRoomMembers = wrapper.findComponent(
			KebabMenuActionRoomMembers
		);
		const kebabActionLeaveRoom = wrapper.findComponent(
			KebabMenuActionLeaveRoom
		);
		const kebabActionRoomCopy = wrapper.findComponent(KebabMenuActionRoomCopy);
		const kebabActionRoomShare = wrapper.findComponent(KebabMenuActionShare);

		return {
			kebabActionEdit,
			kebabActionRoomMembers,
			kebabActionDelete,
			kebabActionRoomCopy,
			kebabActionLeaveRoom,
			kebabActionRoomShare,
		};
	};

	it("should render menu", () => {
		const { menuBtn } = setup();

		expect(menuBtn.exists()).toBe(true);
	});

	describe("when user only has edit permission", () => {
		it("should contain edit menu and leave items", async () => {
			roomPermissions.canEditRoom = computed(() => true);

			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const {
				kebabActionEdit,
				kebabActionRoomMembers,
				kebabActionDelete,
				kebabActionLeaveRoom,
			} = findKebabActions(wrapper);

			expect(kebabActionEdit.exists()).toBe(true);
			expect(kebabActionRoomMembers.exists()).toBe(false);
			expect(kebabActionDelete.exists()).toBe(false);
			expect(kebabActionLeaveRoom.exists()).toBe(true);
		});
	});

	describe("when user only has delete permission", () => {
		it("should only contain delete and leave menu items", async () => {
			roomPermissions.canDeleteRoom = computed(() => true);

			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const {
				kebabActionEdit,
				kebabActionRoomMembers,
				kebabActionDelete,
				kebabActionLeaveRoom,
			} = findKebabActions(wrapper);

			expect(kebabActionDelete.exists()).toBe(true);
			expect(kebabActionEdit.exists()).toBe(false);
			expect(kebabActionRoomMembers.exists()).toBe(false);
			expect(kebabActionLeaveRoom.exists()).toBe(true);
		});
	});

	describe("when user only has view members permission", () => {
		it("should contain room members menu item with correct membersInfoText and leave menu item", async () => {
			roomPermissions.canViewRoom = computed(() => true);
			roomPermissions.canAddRoomMembers = computed(() => false);

			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const {
				kebabActionEdit,
				kebabActionRoomMembers,
				kebabActionDelete,
				kebabActionLeaveRoom,
			} = findKebabActions(wrapper);

			expect(kebabActionRoomMembers.exists()).toBe(true);
			expect(kebabActionRoomMembers.props("membersInfoText")).toBe(
				"pages.rooms.members.view"
			);
			expect(kebabActionEdit.exists()).toBe(false);
			expect(kebabActionDelete.exists()).toBe(false);
			expect(kebabActionLeaveRoom.exists()).toBe(true);
		});
	});

	describe("when user has view room, edit, delete and leave permissions", () => {
		it("should show all menu items", async () => {
			roomPermissions.canViewRoom = computed(() => true);
			roomPermissions.canEditRoom = computed(() => true);
			roomPermissions.canDeleteRoom = computed(() => true);

			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const {
				kebabActionEdit,
				kebabActionRoomMembers,
				kebabActionDelete,
				kebabActionLeaveRoom,
			} = findKebabActions(wrapper);

			expect(kebabActionEdit.exists()).toBe(true);
			expect(kebabActionRoomMembers.exists()).toBe(true);
			expect(kebabActionDelete.exists()).toBe(true);
			expect(kebabActionLeaveRoom.exists()).toBe(true);
		});
	});

	describe("when user can copy room", () => {
		describe("and copy feature is enabled", () => {
			it("should show copy menu item", async () => {
				roomPermissions.canCopyRoom = computed(() => true);

				const { wrapper, menuBtn } = setup({ FEATURE_ROOM_COPY_ENABLED: true });
				await menuBtn.trigger("click");

				const { kebabActionRoomCopy } = findKebabActions(wrapper);

				expect(kebabActionRoomCopy.exists()).toBe(true);
			});
		});

		describe("and copy feature is NOT enabled", () => {
			it("should NOT show copy menu item", async () => {
				roomPermissions.canCopyRoom = computed(() => true);

				const { wrapper, menuBtn } = setup({
					FEATURE_ROOM_COPY_ENABLED: false,
				});
				await menuBtn.trigger("click");

				const { kebabActionRoomCopy } = findKebabActions(wrapper);

				expect(kebabActionRoomCopy.exists()).toBe(false);
			});
		});
	});

	describe("when user can NOT copy room", () => {
		describe("and copy feature is enabled", () => {
			it("should NOT show copy menu item", async () => {
				roomPermissions.canCopyRoom = computed(() => false);

				const { wrapper, menuBtn } = setup({ FEATURE_ROOM_COPY_ENABLED: true });
				await menuBtn.trigger("click");

				const { kebabActionRoomCopy } = findKebabActions(wrapper);

				expect(kebabActionRoomCopy.exists()).toBe(false);
			});
		});
	});

	describe("when user can share room", () => {
		describe("and share feature is enabled", () => {
			it("should show share menu item", async () => {
				roomPermissions.canShareRoom = computed(() => true);

				const { wrapper, menuBtn } = setup({ FEATURE_ROOM_SHARE: true });
				await menuBtn.trigger("click");

				const { kebabActionRoomShare } = findKebabActions(wrapper);

				expect(kebabActionRoomShare.exists()).toBe(true);
			});
		});

		describe("and share feature is NOT enabled", () => {
			it("should NOT show share menu item", async () => {
				roomPermissions.canShareRoom = computed(() => true);

				const { wrapper, menuBtn } = setup({ FEATURE_ROOM_SHARE: false });
				await menuBtn.trigger("click");

				const { kebabActionRoomShare } = findKebabActions(wrapper);

				expect(kebabActionRoomShare.exists()).toBe(false);
			});
		});
	});

	describe("when user can NOT share room", () => {
		describe("and share feature is enabled", () => {
			it("should NOT show share menu item", async () => {
				roomPermissions.canShareRoom = computed(() => false);

				const { wrapper, menuBtn } = setup({ FEATURE_ROOM_SHARE: true });
				await menuBtn.trigger("click");

				const { kebabActionRoomShare } = findKebabActions(wrapper);

				expect(kebabActionRoomShare.exists()).toBe(false);
			});
		});
	});

	describe("when user can add room members", () => {
		it("should show the correct membersInfoText", async () => {
			roomPermissions.canViewRoom = computed(() => true);
			roomPermissions.canAddRoomMembers = computed(() => true);

			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const { kebabActionRoomMembers } = findKebabActions(wrapper);

			expect(kebabActionRoomMembers.exists()).toBe(true);
			expect(kebabActionRoomMembers.props("membersInfoText")).toBe(
				"pages.rooms.members.manage"
			);
		});
	});

	describe("when clicking on menu button", () => {
		beforeEach(() => {
			roomPermissions.canViewRoom = computed(() => true);
			roomPermissions.canEditRoom = computed(() => true);
			roomPermissions.canDeleteRoom = computed(() => true);
		});

		describe("and clicking on edit menu item", () => {
			it("should emit 'room:edit' event", async () => {
				const { wrapper, menuBtn } = setup();
				await menuBtn.trigger("click");

				const { kebabActionEdit } = findKebabActions(wrapper);
				await kebabActionEdit.trigger("click");

				expect(wrapper.emitted("room:edit")).toHaveLength(1);
			});
		});

		describe("and clicking on room members menu item", () => {
			it("should emit 'room:manage-members' event", async () => {
				const { wrapper, menuBtn } = setup();
				await menuBtn.trigger("click");

				const { kebabActionRoomMembers } = findKebabActions(wrapper);
				await kebabActionRoomMembers.trigger("click");

				expect(wrapper.emitted("room:manage-members")).toHaveLength(1);
			});
		});

		describe("and clicking on delete menu item", () => {
			it("should emit 'room:delete' event if confirmed", async () => {
				askDeleteConfirmationMock.mockResolvedValue(true);
				const { wrapper, menuBtn } = setup();
				await menuBtn.trigger("click");

				const { kebabActionDelete } = findKebabActions(wrapper);
				await kebabActionDelete.trigger("click");

				expect(wrapper.emitted()).toHaveProperty("room:delete");
			});

			it("should not emit 'room:delete' if not confirmed ", async () => {
				askDeleteConfirmationMock.mockResolvedValue(false);
				const { wrapper, menuBtn } = setup();
				await menuBtn.trigger("click");

				const { kebabActionDelete } = findKebabActions(wrapper);
				await kebabActionDelete.trigger("click");

				expect(wrapper.emitted()).not.toHaveProperty("room:delete");
			});
		});

		describe("and clicking on leave button", () => {
			it("should emit 'room:leave' event", async () => {
				roomPermissions.canLeaveRoom = computed(() => true);
				const { wrapper, menuBtn } = setup();
				await menuBtn.trigger("click");

				const { kebabActionLeaveRoom } = findKebabActions(wrapper);
				await kebabActionLeaveRoom.trigger("click");

				expect(wrapper.emitted("room:leave")).toHaveLength(1);
			});
		});
	});
});
