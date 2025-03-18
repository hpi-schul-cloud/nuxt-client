import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { VueWrapper } from "@vue/test-utils";
import RoomMenu from "./RoomMenu.vue";
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useRoomAuthorization } from "./roomAuthorization.composable";
import { createTestingPinia } from "@pinia/testing";
import {
	KebabMenuActionDelete,
	KebabMenuActionEdit,
	KebabMenuActionRoomMembers,
	KebabMenuActionLeaveRoom,
} from "@ui-kebab-menu";

jest.mock("@feature-room/roomAuthorization.composable");
const roomPermissions: ReturnType<typeof useRoomAuthorization> = {
	canAddRoomMembers: ref(false),
	canCreateRoom: ref(false),
	canChangeOwner: ref(false),
	canViewRoom: ref(false),
	canEditRoom: ref(false),
	canDeleteRoom: ref(false),
	canLeaveRoom: ref(false),
	canRemoveRoomMembers: ref(false),
	canEditRoomBoard: ref(false),
};
(useRoomAuthorization as jest.Mock).mockReturnValue(roomPermissions);

describe("@feature-room/RoomMenu", () => {
	const setup = () => {
		const wrapper = shallowMount(RoomMenu, {
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

		return {
			kebabActionEdit,
			kebabActionRoomMembers,
			kebabActionDelete,
			kebabActionLeaveRoom,
		};
	};

	describe("when user has no edit and delete permissions", () => {
		it("should contain no menu items", async () => {
			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const menuItems = wrapper.findAllComponents({ name: "VListItem" });

			expect(menuItems.length).toEqual(0);
		});
	});

	describe("when user only has edit permission", () => {
		it("should contain edit and manage members menu items", async () => {
			roomPermissions.canViewRoom.value = false;
			roomPermissions.canEditRoom.value = true;
			roomPermissions.canDeleteRoom.value = false;

			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const { kebabActionEdit, kebabActionRoomMembers, kebabActionDelete } =
				findKebabActions(wrapper);

			expect(kebabActionEdit.exists()).toBe(true);
			expect(kebabActionRoomMembers.exists()).toBe(false);
			expect(kebabActionDelete.exists()).toBe(false);
		});
	});

	describe("when user only has delete permission", () => {
		it("should only contain delete menu item", async () => {
			roomPermissions.canViewRoom.value = false;
			roomPermissions.canEditRoom.value = false;
			roomPermissions.canDeleteRoom.value = true;

			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const { kebabActionEdit, kebabActionRoomMembers, kebabActionDelete } =
				findKebabActions(wrapper);

			expect(kebabActionEdit.exists()).toBe(false);
			expect(kebabActionRoomMembers.exists()).toBe(false);
			expect(kebabActionDelete.exists()).toBe(true);
		});
	});

	describe("when user only has view members permission", () => {
		it("should only contain add members menu item", async () => {
			roomPermissions.canViewRoom.value = true;
			roomPermissions.canEditRoom.value = false;
			roomPermissions.canDeleteRoom.value = false;

			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const { kebabActionEdit, kebabActionRoomMembers, kebabActionDelete } =
				findKebabActions(wrapper);

			expect(kebabActionEdit.exists()).toBe(false);
			expect(kebabActionRoomMembers.exists()).toBe(true);
			expect(kebabActionDelete.exists()).toBe(false);
		});
	});

	describe("when user has view room, edit and delete permissions", () => {
		it("should show all menu items", async () => {
			roomPermissions.canViewRoom.value = true;
			roomPermissions.canEditRoom.value = true;
			roomPermissions.canDeleteRoom.value = true;

			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const { kebabActionEdit, kebabActionRoomMembers, kebabActionDelete } =
				findKebabActions(wrapper);

			expect(kebabActionEdit.exists()).toBe(true);
			expect(kebabActionRoomMembers.exists()).toBe(true);
			expect(kebabActionDelete.exists()).toBe(true);
		});
	});

	describe("when clicking on menu button", () => {
		roomPermissions.canViewRoom.value = true;
		roomPermissions.canEditRoom.value = true;
		roomPermissions.canDeleteRoom.value = true;

		describe("and clicking on edit button", () => {
			it("should emit 'room:edit' event", async () => {
				const { wrapper, menuBtn } = setup();
				await menuBtn.trigger("click");

				const { kebabActionEdit } = findKebabActions(wrapper);
				await kebabActionEdit.trigger("click");

				expect(wrapper.emitted("room:edit")).toHaveLength(1);
			});
		});

		describe("and clicking on manage members button", () => {
			it("should emit 'room:manage-members' event", async () => {
				const { wrapper, menuBtn } = setup();
				await menuBtn.trigger("click");

				const { kebabActionRoomMembers } = findKebabActions(wrapper);
				await kebabActionRoomMembers.trigger("click");

				expect(wrapper.emitted("room:manage-members")).toHaveLength(1);
			});
		});

		describe("and clicking on delete button", () => {
			it("should emit 'room:delete' event", async () => {
				const { wrapper, menuBtn } = setup();
				await menuBtn.trigger("click");

				const { kebabActionDelete } = findKebabActions(wrapper);
				await kebabActionDelete.trigger("click");

				expect(wrapper.emitted("room:delete")).toHaveLength(1);
			});
		});

		describe("and clicking on leave button", () => {
			it("should emit 'room:leave' event", async () => {
				roomPermissions.canLeaveRoom.value = true;
				const { wrapper, menuBtn } = setup();
				await menuBtn.trigger("click");

				const { kebabActionLeaveRoom } = findKebabActions(wrapper);
				await kebabActionLeaveRoom.trigger("click");

				expect(wrapper.emitted("room:leave")).toHaveLength(1);
			});
		});
	});
});
