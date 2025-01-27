import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import RoomMenu from "./RoomMenu.vue";
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useRoomAuthorization } from "./roomAuthorization.composable";
import { createTestingPinia } from "@pinia/testing";

jest.mock("@feature-room/roomAuthorization.composable");
const roomPermissions: ReturnType<typeof useRoomAuthorization> = {
	canCreateRoom: ref(false),
	canViewRoom: ref(false),
	canEditRoom: ref(false),
	canDeleteRoom: ref(false),
	canLeaveRoom: ref(false),
};
(useRoomAuthorization as jest.Mock).mockReturnValue(roomPermissions);

describe("@feature-room/RoomMenu", () => {
	const setup = () => {
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

	describe("when user has no edit and delete permissions", () => {
		it("should contain no menu items", async () => {
			roomPermissions.canEditRoom.value = false;
			roomPermissions.canDeleteRoom.value = false;

			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const menuItems = wrapper.findAllComponents({ name: "VListItem" });

			expect(menuItems.length).toEqual(0);
		});
	});

	describe("when user only has edit permission", () => {
		it("should contain edit and manage members menu items", async () => {
			roomPermissions.canEditRoom.value = true;
			roomPermissions.canDeleteRoom.value = false;

			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const menuItems = wrapper.findAllComponents({ name: "VListItem" });
			expect(menuItems.length).toEqual(2);

			const editMenuItem = wrapper.findComponent(
				"[data-testid=room-action-edit]"
			);
			const manageMembersMenuItem = wrapper.findComponent(
				"[data-testid=room-action-manage-members]"
			);
			const deleteMenuItem = wrapper.findComponent(
				"[data-testid=room-action-delete]"
			);

			expect(editMenuItem.exists()).toBe(true);
			expect(manageMembersMenuItem.exists()).toBe(true);
			expect(deleteMenuItem.exists()).toBe(false);
		});
	});

	describe("when user only has delete permission", () => {
		it("should only contain delete menu item", async () => {
			roomPermissions.canEditRoom.value = false;
			roomPermissions.canDeleteRoom.value = true;
			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const menuItems = wrapper.findAllComponents({ name: "VListItem" });
			expect(menuItems.length).toEqual(1);

			const editMenuItem = wrapper.findComponent(
				"[data-testid=room-action-edit]"
			);
			const manageMembersMenuItem = wrapper.findComponent(
				"[data-testid=room-action-manage-members]"
			);
			const deleteMenuItem = wrapper.findComponent(
				"[data-testid=room-action-delete]"
			);

			expect(editMenuItem.exists()).toBe(false);
			expect(manageMembersMenuItem.exists()).toBe(false);
			expect(deleteMenuItem.exists()).toBe(true);
		});
	});

	describe("when user has both edit and delete permissions", () => {
		it("should show all menu items", async () => {
			roomPermissions.canEditRoom.value = true;
			roomPermissions.canDeleteRoom.value = true;
			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const menuItems = wrapper.findAllComponents({ name: "VListItem" });

			expect(menuItems.length).toEqual(3);
		});
	});

	describe("when clicking on menu button", () => {
		roomPermissions.canEditRoom.value = true;
		roomPermissions.canDeleteRoom.value = true;

		describe("and clicking on edit button", () => {
			it("should emit 'room:edit' event", async () => {
				const { wrapper, menuBtn } = setup();
				await menuBtn.trigger("click");

				const editButton = wrapper.getComponent(
					"[data-testid=room-action-edit]"
				);
				await editButton.trigger("click");

				expect(wrapper.emitted("room:edit")).toHaveLength(1);
			});
		});

		describe("and clicking on manage members button", () => {
			it("should emit 'room:manage-members' event", async () => {
				const { wrapper, menuBtn } = setup();
				await menuBtn.trigger("click");

				const editButton = wrapper.getComponent(
					"[data-testid=room-action-manage-members]"
				);
				await editButton.trigger("click");

				expect(wrapper.emitted("room:manage-members")).toHaveLength(1);
			});
		});

		describe("and clicking on delete button", () => {
			it("should emit 'room:delete' event", async () => {
				const { wrapper, menuBtn } = setup();
				await menuBtn.trigger("click");

				const editButton = wrapper.getComponent(
					"[data-testid=room-action-delete]"
				);
				await editButton.trigger("click");

				expect(wrapper.emitted("room:delete")).toHaveLength(1);
			});
		});

		describe("and clicking on leave button", () => {
			it("should emit 'room:leave' event", async () => {
				roomPermissions.canLeaveRoom.value = true;
				const { wrapper, menuBtn } = setup();
				await menuBtn.trigger("click");

				const editButton = wrapper.getComponent(
					"[data-testid=room-action-leave-room]"
				);
				await editButton.trigger("click");

				expect(wrapper.emitted("room:leave")).toHaveLength(1);
			});
		});
	});
});
