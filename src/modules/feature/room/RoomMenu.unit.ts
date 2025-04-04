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
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";

jest.mock("@feature-room/roomAuthorization.composable");
const roomAuthorization = jest.mocked(useRoomAuthorization);

jest.mock("@ui-confirmation-dialog");
jest.mocked(useDeleteConfirmationDialog);

describe("@feature-room/RoomMenu", () => {
	let roomPermissions: ReturnType<typeof useRoomAuthorization>;
	let askDeleteConfirmationMock: jest.Mock;

	beforeEach(() => {
		roomPermissions = {
			canAddRoomMembers: ref(false),
			canCreateRoom: ref(false),
			canChangeOwner: ref(false),
			canViewRoom: ref(false),
			canEditRoom: ref(false),
			canDeleteRoom: ref(false),
			canLeaveRoom: ref(false),
			canRemoveRoomMembers: ref(false),
			canEditRoomContent: ref(false),
		};
		roomAuthorization.mockReturnValue(roomPermissions);

		askDeleteConfirmationMock = jest.fn();
		setupDeleteConfirmationComposableMock({
			askDeleteConfirmationMock,
		});
	});

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

	it("should render menu", async () => {
		const { menuBtn } = setup();

		expect(menuBtn.exists()).toBe(true);
	});

	describe("when user only has edit permission", () => {
		it("should contain edit menu and leave items", async () => {
			roomPermissions.canEditRoom.value = true;

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
			roomPermissions.canDeleteRoom.value = true;

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
		it("should contain room members and leave menu item", async () => {
			roomPermissions.canViewRoom.value = true;

			const { wrapper, menuBtn } = setup();
			await menuBtn.trigger("click");

			const {
				kebabActionEdit,
				kebabActionRoomMembers,
				kebabActionDelete,
				kebabActionLeaveRoom,
			} = findKebabActions(wrapper);

			expect(kebabActionRoomMembers.exists()).toBe(true);
			expect(kebabActionEdit.exists()).toBe(false);
			expect(kebabActionDelete.exists()).toBe(false);
			expect(kebabActionLeaveRoom.exists()).toBe(true);
		});
	});

	describe("when user has view room, edit, delete and leave permissions", () => {
		it("should show all menu items", async () => {
			roomPermissions.canViewRoom.value = true;
			roomPermissions.canEditRoom.value = true;
			roomPermissions.canDeleteRoom.value = true;

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

	describe("when clicking on menu button", () => {
		beforeEach(() => {
			roomPermissions.canViewRoom.value = true;
			roomPermissions.canEditRoom.value = true;
			roomPermissions.canDeleteRoom.value = true;
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
