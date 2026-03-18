import RoomMenu from "./RoomMenu.vue";
import * as confirmDialogUtils from "@/utils/confirm-dialog.utils";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ConfigResponse, RoomItemResponseAllowedOperations } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import {
	KebabMenuActionDelete,
	KebabMenuActionEdit,
	KebabMenuActionLeaveRoom,
	KebabMenuActionRoomCopy,
	KebabMenuActionRoomMembers,
	KebabMenuActionShare,
} from "@ui-kebab-menu";
import { flushPromises, VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { RouterLink } from "vue-router";

describe("@feature-room/RoomMenu", () => {
	const setup = (
		envs: Partial<ConfigResponse> = {},
		options?: { allowedOperations: Partial<RoomItemResponseAllowedOperations>; roomName?: string }
	) => {
		options ??= { allowedOperations: {} };
		setActivePinia(createTestingPinia());
		createTestEnvStore({
			FEATURE_ROOM_COPY_ENABLED: true,
			FEATURE_ROOM_SHARE: true,
			...envs,
		});

		const wrapper = mount(RoomMenu, {
			props: {
				roomName: options.roomName ?? "My Room",
			},
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia({
						initialState: {
							roomDetailsStore: {
								room: {
									allowedOperations: options.allowedOperations,
								},
							},
						},
					}),
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
		const kebabActionRoomMembers = wrapper.findComponent(KebabMenuActionRoomMembers);
		const kebabActionLeaveRoom = wrapper.findComponent(KebabMenuActionLeaveRoom);
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
			const { wrapper, menuBtn } = setup({}, { allowedOperations: { updateRoom: true } });
			await menuBtn.trigger("click");

			const { kebabActionEdit, kebabActionRoomMembers, kebabActionDelete, kebabActionLeaveRoom } =
				findKebabActions(wrapper);

			expect(kebabActionEdit.exists()).toBe(true);
			expect(kebabActionRoomMembers.exists()).toBe(false);
			expect(kebabActionDelete.exists()).toBe(false);
			expect(kebabActionLeaveRoom.exists()).toBe(true);
		});
	});

	describe("when user only has delete permission", () => {
		it("should only contain delete and leave menu items", async () => {
			const { wrapper, menuBtn } = setup({}, { allowedOperations: { deleteRoom: true } });
			await menuBtn.trigger("click");

			const { kebabActionEdit, kebabActionRoomMembers, kebabActionDelete, kebabActionLeaveRoom } =
				findKebabActions(wrapper);

			expect(kebabActionDelete.exists()).toBe(true);
			expect(kebabActionEdit.exists()).toBe(false);
			expect(kebabActionRoomMembers.exists()).toBe(false);
			expect(kebabActionLeaveRoom.exists()).toBe(true);
		});
	});

	describe("when user only has view members permission", () => {
		it("should contain room members menu item with correct membersInfoText and leave menu item", async () => {
			const { wrapper, menuBtn } = setup({}, { allowedOperations: { addMembers: false, viewMemberlist: true } });
			await menuBtn.trigger("click");

			const { kebabActionEdit, kebabActionRoomMembers, kebabActionDelete, kebabActionLeaveRoom } =
				findKebabActions(wrapper);

			expect(kebabActionRoomMembers.exists()).toBe(true);
			expect(kebabActionRoomMembers.props("membersInfoText")).toBe("pages.rooms.members.view");
			expect(kebabActionEdit.exists()).toBe(false);
			expect(kebabActionDelete.exists()).toBe(false);
			expect(kebabActionLeaveRoom.exists()).toBe(true);
		});
	});

	describe("when user has view room, edit, delete and leave permissions", () => {
		it("should show all menu items", async () => {
			const { wrapper, menuBtn } = setup(
				{},
				{ allowedOperations: { deleteRoom: true, updateRoom: true, viewMemberlist: true } }
			);

			await menuBtn.trigger("click");

			const { kebabActionEdit, kebabActionRoomMembers, kebabActionDelete, kebabActionLeaveRoom } =
				findKebabActions(wrapper);

			expect(kebabActionEdit.exists()).toBe(true);
			expect(kebabActionRoomMembers.exists()).toBe(true);
			expect(kebabActionDelete.exists()).toBe(true);
			expect(kebabActionLeaveRoom.exists()).toBe(true);
		});
	});

	describe("when user can copy room", () => {
		describe("and copy feature is enabled", () => {
			it("should show copy menu item", async () => {
				const { wrapper, menuBtn } = setup(
					{ FEATURE_ROOM_COPY_ENABLED: true },
					{ allowedOperations: { copyRoom: true } }
				);
				await menuBtn.trigger("click");

				const { kebabActionRoomCopy } = findKebabActions(wrapper);

				expect(kebabActionRoomCopy.exists()).toBe(true);
			});
		});

		describe("and copy feature is NOT enabled", () => {
			it("should NOT show copy menu item", async () => {
				const { wrapper, menuBtn } = setup(
					{
						FEATURE_ROOM_COPY_ENABLED: false,
					},
					{ allowedOperations: { copyRoom: true } }
				);
				await menuBtn.trigger("click");

				const { kebabActionRoomCopy } = findKebabActions(wrapper);

				expect(kebabActionRoomCopy.exists()).toBe(false);
			});
		});
	});

	describe("when user can NOT copy room", () => {
		describe("and copy feature is enabled", () => {
			it("should NOT show copy menu item", async () => {
				const { wrapper, menuBtn } = setup(
					{ FEATURE_ROOM_COPY_ENABLED: true },
					{ allowedOperations: { copyRoom: false } }
				);
				await menuBtn.trigger("click");

				const { kebabActionRoomCopy } = findKebabActions(wrapper);

				expect(kebabActionRoomCopy.exists()).toBe(false);
			});
		});
	});

	describe("when user can share room", () => {
		describe("and share feature is enabled", () => {
			it("should show share menu item", async () => {
				const { wrapper, menuBtn } = setup({ FEATURE_ROOM_SHARE: true }, { allowedOperations: { shareRoom: true } });
				await menuBtn.trigger("click");

				const { kebabActionRoomShare } = findKebabActions(wrapper);

				expect(kebabActionRoomShare.exists()).toBe(true);
			});
		});

		describe("and share feature is NOT enabled", () => {
			it("should NOT show share menu item", async () => {
				const { wrapper, menuBtn } = setup({ FEATURE_ROOM_SHARE: false }, { allowedOperations: { shareRoom: true } });
				await menuBtn.trigger("click");

				const { kebabActionRoomShare } = findKebabActions(wrapper);

				expect(kebabActionRoomShare.exists()).toBe(false);
			});
		});
	});

	describe("when user can NOT share room", () => {
		describe("and share feature is enabled", () => {
			it("should NOT show share menu item", async () => {
				const { wrapper, menuBtn } = setup({ FEATURE_ROOM_SHARE: true }, { allowedOperations: { shareRoom: false } });
				await menuBtn.trigger("click");

				const { kebabActionRoomShare } = findKebabActions(wrapper);

				expect(kebabActionRoomShare.exists()).toBe(false);
			});
		});
	});

	describe("when user can add room members", () => {
		it("should show the correct membersInfoText", async () => {
			const { wrapper, menuBtn } = setup({}, { allowedOperations: { addMembers: true, viewMemberlist: true } });
			await menuBtn.trigger("click");

			const { kebabActionRoomMembers } = findKebabActions(wrapper);

			expect(kebabActionRoomMembers.exists()).toBe(true);
			expect(kebabActionRoomMembers.props("membersInfoText")).toBe("pages.rooms.members.manage");
		});
	});

	describe("when roomName is provided", () => {
		it("should pass roomName to delete action", async () => {
			const { wrapper, menuBtn } = setup({}, { allowedOperations: { deleteRoom: true }, roomName: "My Room" });
			await menuBtn.trigger("click");

			const { kebabActionDelete } = findKebabActions(wrapper);

			expect(kebabActionDelete.exists()).toBe(true);
		});
	});

	describe("when clicking on menu button", () => {
		describe("and clicking on edit menu item", () => {
			it("should emit 'room:edit' event", async () => {
				const { wrapper, menuBtn } = setup(
					{},
					{ allowedOperations: { deleteRoom: true, updateRoom: true, viewMemberlist: true } }
				);
				await menuBtn.trigger("click");

				const { kebabActionEdit } = findKebabActions(wrapper);
				await kebabActionEdit.trigger("click");

				expect(wrapper.emitted("room:edit")).toHaveLength(1);
			});
		});

		describe("and clicking on room members menu item", () => {
			it("should emit 'room:manage-members' event", async () => {
				const { wrapper, menuBtn } = setup(
					{},
					{ allowedOperations: { deleteRoom: true, updateRoom: true, viewMemberlist: true } }
				);
				await menuBtn.trigger("click");

				const { kebabActionRoomMembers } = findKebabActions(wrapper);
				await kebabActionRoomMembers.trigger("click");

				expect(wrapper.emitted("room:manage-members")).toHaveLength(1);
			});
		});

		describe("and clicking on copy menu item", () => {
			it("should emit 'room:copy' event", async () => {
				const { wrapper, menuBtn } = setup({}, { allowedOperations: { copyRoom: true } });
				await menuBtn.trigger("click");

				const { kebabActionRoomCopy } = findKebabActions(wrapper);
				await kebabActionRoomCopy.trigger("click");

				expect(wrapper.emitted("room:copy")).toHaveLength(1);
			});
		});

		describe("and clicking on share menu item", () => {
			it("should emit 'room:share' event", async () => {
				const { wrapper, menuBtn } = setup({}, { allowedOperations: { shareRoom: true } });
				await menuBtn.trigger("click");

				const { kebabActionRoomShare } = findKebabActions(wrapper);
				await kebabActionRoomShare.trigger("click");

				expect(wrapper.emitted("room:share")).toHaveLength(1);
			});
		});

		describe("and clicking on delete menu item", () => {
			it("should emit 'room:delete' event if confirmed", async () => {
				vi.spyOn(confirmDialogUtils, "askDeletionByTitle").mockResolvedValue(true);
				const { wrapper, menuBtn } = setup(
					{},
					{ allowedOperations: { deleteRoom: true, updateRoom: true, viewMemberlist: true } }
				);
				await menuBtn.trigger("click");

				const { kebabActionDelete } = findKebabActions(wrapper);
				await kebabActionDelete.trigger("click");
				await flushPromises();

				expect(wrapper.emitted()).toHaveProperty("room:delete");
			});

			it("should not emit 'room:delete' if not confirmed ", async () => {
				vi.spyOn(confirmDialogUtils, "askDeletionByTitle").mockResolvedValue(false);
				const { wrapper, menuBtn } = setup(
					{},
					{ allowedOperations: { deleteRoom: true, updateRoom: true, viewMemberlist: true } }
				);
				await menuBtn.trigger("click");

				const { kebabActionDelete } = findKebabActions(wrapper);
				await kebabActionDelete.trigger("click");
				await flushPromises();

				expect(wrapper.emitted()).not.toHaveProperty("room:delete");
			});
		});

		describe("and clicking on leave button", () => {
			it("should emit 'room:leave' event", async () => {
				const { wrapper, menuBtn } = setup(
					{},
					{ allowedOperations: { deleteRoom: true, leaveRoom: true, updateRoom: true, viewMemberlist: true } }
				);
				await menuBtn.trigger("click");

				const { kebabActionLeaveRoom } = findKebabActions(wrapper);
				await kebabActionLeaveRoom.trigger("click");

				expect(wrapper.emitted("room:leave")).toHaveLength(1);
			});
		});
	});
});
