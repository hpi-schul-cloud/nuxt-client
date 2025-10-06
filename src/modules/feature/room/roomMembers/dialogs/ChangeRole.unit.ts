import { RoleName } from "@/serverApi/v3";
import {
	roomAdminFactory,
	roomEditorFactory,
	roomMemberFactory,
	roomOwnerFactory,
	roomViewerFactory,
} from "@@/tests/test-utils/factory/room/roomMembersFactory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomMember, useRoomMembersStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import {
	createTestAppStoreWithUser,
	mockedPiniaStoreTyping,
	roomFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import SchoolsModule from "@/store/schools";
import { schoolsModule } from "@/store";
import { VAlert, VRadio, VRadioGroup } from "vuetify/lib/components/index";
import ChangeRole from "./ChangeRole.vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap.mjs";
import { Mock } from "vitest";

vi.mock("@vueuse/integrations/useFocusTrap");

vi.mock("vue-i18n", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-i18n")>();
	return {
		...actual,
		useI18n: vi.fn().mockReturnValue({
			t: vi.fn().mockImplementation((key: string) => key),
		}),
	};
});

describe("ChangeRole.vue", () => {
	let pauseMock: Mock;
	let unpauseMock: Mock;
	let deactivateMock: Mock;

	beforeEach(() => {
		pauseMock = vi.fn();
		unpauseMock = vi.fn();
		deactivateMock = vi.fn();

		(useFocusTrap as Mock).mockReturnValue({
			pause: pauseMock,
			unpause: unpauseMock,
			deactivate: deactivateMock,
		});

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

	const setup = (
		options?: Partial<{
			modelValue: boolean;
			members: RoomMember[];
			membersForRoleChange: RoomMember[];
			currentUser: RoomMember;
			isRoomOwner: boolean;
		}>
	) => {
		const currentUser = options?.currentUser ?? roomAdminFactory.build();
		const membersForRoleChange = options?.membersForRoleChange ?? [];
		const { modelValue, isRoomOwner } = {
			modelValue: true,
			isRoomOwner: false,
			...options,
		};

		const roomMembers = [...membersForRoleChange, currentUser];
		const room = roomFactory.build();

		const pinia = createTestingPinia({
			initialState: {
				roomDetailsStore: { room },
			},
		});
		createTestAppStoreWithUser(currentUser.userId);

		const roomMembersStore = mockedPiniaStoreTyping(useRoomMembersStore);
		roomMembersStore.roomMembers = roomMembers;
		roomMembersStore.selectedIds = membersForRoleChange.map(
			(member) => member.userId
		);
		roomMembersStore.isRoomOwner = vi
			.fn()
			.mockReturnValue(isRoomOwner ?? false);

		roomMembersStore.getRoomOwnerFullName.mockReturnValue(
			isRoomOwner ? currentUser.fullName : undefined
		);

		const wrapper = mount(ChangeRole, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n(), pinia],
			},
			props: {
				modelValue,
				members: membersForRoleChange,
			},
			stubs: { useFocusTrap: true },
		});

		return { wrapper, roomMembersStore };
	};

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when the component is rendered", () => {
		it("should render correctly", () => {
			const { wrapper } = setup();

			const card = wrapper.findComponent({ name: "VCard" });
			const title = card.findComponent({ name: "VCardTitle" });
			expect(title.text()).toContain("pages.rooms.members.changePermission");

			const radioButtons = card.findAllComponents(VRadio);
			expect(radioButtons.length).toBe(3);

			const cancelButton = card.find("[data-testid='change-role-cancel-btn']");
			const confirmButton = card.find(
				"[data-testid='change-role-confirm-btn']"
			);
			expect(cancelButton.exists()).toBe(true);
			expect(confirmButton.exists()).toBe(true);
		});

		it("should render correctly with single members", () => {
			const { wrapper } = setup({
				membersForRoleChange: [roomAdminFactory.build()],
			});
			const card = wrapper.findComponent({ name: "VCard" });
			expect(card.text()).toContain("pages.rooms.members.roleChange.subTitle");
		});

		it("renders correctly with multiple members", () => {
			const { wrapper } = setup({
				membersForRoleChange: [
					roomAdminFactory.build(),
					roomViewerFactory.build(),
				],
			});

			const card = wrapper.findComponent({ name: "VCard" });
			expect(card.text()).toContain(
				"pages.rooms.members.roleChange.multipleUser.subTitle"
			);
			expect(card.text()).toContain("pages.rooms.members.changePermission");
		});

		describe("when the current user is the owner and only one member selected", () => {
			it("should render the 'Own' option", () => {
				const { wrapper } = setup({
					membersForRoleChange: [roomAdminFactory.build()],
					currentUser: roomOwnerFactory.build(),
					isRoomOwner: true,
				});

				const radioGroup = wrapper.getComponent(VRadioGroup);
				const ownerRadioButton = radioGroup.find(
					'[data-testid="change-role-option-owner"]'
				);

				expect(ownerRadioButton.exists()).toBe(true);

				const radioButtons = radioGroup.findAllComponents(VRadio);
				expect(radioButtons.length).toBe(4);
			});

			it("should render 'Alert' component", async () => {
				const currentUser = roomOwnerFactory.build();
				const { wrapper } = setup({
					membersForRoleChange: [roomAdminFactory.build()],
					currentUser,
					isRoomOwner: true,
				});

				const radioGroup = wrapper.getComponent(VRadioGroup);
				const ownRadioButton = radioGroup.find(
					'[data-testid="change-role-option-owner"]'
				);
				expect(ownRadioButton.exists()).toBe(true);

				const alertElementBefore = wrapper.findComponent(VAlert);
				expect(alertElementBefore.exists()).toBe(false);

				radioGroup.setValue(RoleName.Roomowner);
				await nextTick();

				const alertElementAfter = wrapper.findComponent(VAlert);
				expect(alertElementAfter.exists()).toBe(true);
				expect(alertElementAfter.text()).toContain(
					"pages.rooms.members.handOverAlert.label"
				);
			});

			describe("when the confirm button clicked", () => {
				it("should not render the radio buttons", async () => {
					const { wrapper } = setup({
						membersForRoleChange: [roomAdminFactory.build()],
						currentUser: roomOwnerFactory.build(),
						isRoomOwner: true,
					});

					const radioGroup = wrapper.getComponent(VRadioGroup);
					const ownRadioButton = radioGroup.find(
						'[data-testid="change-role-option-owner"]'
					);
					expect(ownRadioButton.exists()).toBe(true);

					radioGroup.setValue(RoleName.Roomowner);
					await nextTick();
					const card = wrapper.findComponent({ name: "VCard" });

					const confirmButton = card.find(
						"[data-testid='change-role-confirm-btn']"
					);
					await confirmButton.trigger("click");

					const radioButtons = card.findAllComponents(VRadio);
					expect(radioButtons.length).toBe(0);
				});

				it("should show the confirmation alert and 'Handover' button", async () => {
					const { wrapper } = setup({
						membersForRoleChange: [roomAdminFactory.build()],
						currentUser: roomOwnerFactory.build(),
						isRoomOwner: true,
					});
					const card = wrapper.findComponent({ name: "VCard" });

					const radioGroup = card.getComponent(VRadioGroup);
					const ownRadioButton = radioGroup.find(
						'[data-testid="change-role-option-owner"]'
					);
					expect(ownRadioButton.exists()).toBe(true);

					radioGroup.setValue(RoleName.Roomowner);
					await nextTick();

					const confirmButton = card.find(
						"[data-testid='change-role-confirm-btn']"
					);
					await confirmButton.trigger("click");

					const alertElementAfter = card.findComponent(VAlert);
					expect(alertElementAfter.exists()).toBe(true);
					expect(alertElementAfter.text()).toContain(
						"pages.rooms.members.handOverAlert.confirm.label"
					);
				});
			});
		});

		describe("when the current user is not the owner", () => {
			it("should not render the 'Own' option", () => {
				const { wrapper } = setup({
					membersForRoleChange: [roomAdminFactory.build()],
				});

				const radioGroup = wrapper.getComponent(VRadioGroup);
				const ownRadioButton = radioGroup.find(
					'[data-testid="change-role-option-owner"]'
				);

				const radioButtons = radioGroup.findAllComponents(VRadio);

				expect(ownRadioButton.exists()).toBe(false);
				expect(radioButtons.length).toBe(3);
			});

			it("should not render the 'Own' option if any member has the roomViewer role", () => {
				const { wrapper } = setup({
					membersForRoleChange: [
						roomAdminFactory.build(),
						roomViewerFactory.build(),
					],
					isRoomOwner: true,
				});

				const radioGroup = wrapper.getComponent(VRadioGroup);
				const ownRadioButton = radioGroup.find(
					'[data-testid="change-role-option-owner"]'
				);

				expect(ownRadioButton.exists()).toBe(false);

				const radioButtons = radioGroup.findAllComponents(VRadio);
				expect(radioButtons).toHaveLength(3);
			});
		});
	});

	describe("@selectedRole", () => {
		const roleTestCases = [
			RoleName.Roomviewer,
			RoleName.Roomeditor,
			RoleName.Roomadmin,
		];

		describe.each(roleTestCases)('when member role is "%s" ', (role) => {
			it(`should have "${role}" pre-selected`, () => {
				const members = roomMemberFactory.buildList(3, {
					roomRoleName: role,
				});
				const { wrapper } = setup({ membersForRoleChange: members });

				const radioGroup = wrapper.findComponent(VRadioGroup);
				expect(radioGroup.props("modelValue")).toBe(role);
			});
		});

		it("should have the common role pre-selected when multiple users with the same role are passed", () => {
			const members = roomViewerFactory.buildList(3);
			const { wrapper } = setup({ membersForRoleChange: members });
			const radioGroup = wrapper.findComponent(VRadioGroup);

			expect(radioGroup.props("modelValue")).toBe(RoleName.Roomviewer);
		});

		it("should have no role pre-selected when multiple members with different roles are passed", () => {
			const { wrapper } = setup({
				membersForRoleChange: [
					roomViewerFactory.build(),
					roomEditorFactory.build(),
					roomAdminFactory.build(),
				],
			});

			const radioGroup = wrapper.findComponent(VRadioGroup);
			expect(radioGroup.props("modelValue")).toBe(null);
		});
	});

	describe("action buttons", () => {
		it("should emit 'close' event when cancel button is clicked", async () => {
			const { wrapper } = setup();
			const card = wrapper.findComponent({ name: "VCard" });
			await card
				.find("[data-testid='change-role-cancel-btn']")
				.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("close");
		});

		describe("confirm button", () => {
			it("should call updateMembersRole when button is clicked", async () => {
				const memberForRoleChange = roomViewerFactory.build();
				const { wrapper, roomMembersStore } = setup({
					membersForRoleChange: [memberForRoleChange],
				});

				const card = wrapper.findComponent({ name: "VCard" });
				await card
					.find("[data-testid='change-role-confirm-btn']")
					.trigger("click");

				expect(roomMembersStore.updateMembersRole).toHaveBeenCalledWith(
					RoleName.Roomviewer,
					memberForRoleChange.userId
				);

				expect(wrapper.emitted()).toHaveProperty("close");
			});

			it("should emit 'close' event when button is clicked", async () => {
				const memberForRoleChange = roomViewerFactory.build();
				const { wrapper } = setup({
					membersForRoleChange: [memberForRoleChange],
				});

				const card = wrapper.findComponent({ name: "VCard" });
				await card
					.find("[data-testid='change-role-confirm-btn']")
					.trigger("click");

				expect(wrapper.emitted()).toHaveProperty("close");
				expect(wrapper.emitted("close")).toHaveLength(1);
			});

			it("should clear selectedIds when button is clicked", async () => {
				const memberForRoleChange = roomViewerFactory.build();
				const { wrapper, roomMembersStore } = setup({
					membersForRoleChange: [memberForRoleChange],
				});
				const membersForRoleChangeIds = [memberForRoleChange.userId];

				expect(roomMembersStore.selectedIds).toEqual(membersForRoleChangeIds);
				const card = wrapper.findComponent({ name: "VCard" });

				await card
					.find("[data-testid='change-role-confirm-btn']")
					.trigger("click");

				expect(roomMembersStore.selectedIds).toEqual([]);
			});
		});

		describe("handover button", () => {
			it("should call changeRoomOwner when button is clicked", async () => {
				const memberForRoleChange = roomAdminFactory.build();
				const { wrapper, roomMembersStore } = setup({
					membersForRoleChange: [memberForRoleChange],
					currentUser: roomMemberFactory.build({
						roomRoleName: RoleName.Roomowner,
					}),
				});
				const card = wrapper.findComponent({ name: "VCard" });

				const radioGroup = card.findComponent(VRadioGroup);
				radioGroup.setValue(RoleName.Roomowner);
				await nextTick();

				const confirmButton = card.find(
					"[data-testid='change-role-confirm-btn']"
				);
				await confirmButton.trigger("click");

				const handOverButton = card.find(
					"[data-testid='change-owner-confirm-btn']"
				);

				expect(handOverButton.exists()).toBe(true);
				await handOverButton.trigger("click");

				expect(roomMembersStore.changeRoomOwner).toHaveBeenCalledWith(
					memberForRoleChange.userId
				);
			});

			it("should emit 'close' event when button is clicked", async () => {
				const memberForRoleChange = roomAdminFactory.build();
				const { wrapper } = setup({
					membersForRoleChange: [memberForRoleChange],
					currentUser: roomOwnerFactory.build(),
				});

				const card = wrapper.findComponent({ name: "VCard" });
				const radioGroup = card.findComponent(VRadioGroup);
				radioGroup.setValue(RoleName.Roomowner);
				await nextTick();

				const confirmButton = card.find(
					"[data-testid='change-role-confirm-btn']"
				);
				await confirmButton.trigger("click");

				const handOverButton = card.find(
					"[data-testid='change-owner-confirm-btn']"
				);
				await handOverButton.trigger("click");

				expect(wrapper.emitted()).toHaveProperty("close");
			});

			it("should clear selectedIds when button is clicked", async () => {
				const memberForRoleChange = roomAdminFactory.build();
				const { wrapper, roomMembersStore } = setup({
					membersForRoleChange: [memberForRoleChange],
					currentUser: roomOwnerFactory.build(),
				});
				const selectedIds = [memberForRoleChange.userId];
				expect(roomMembersStore.selectedIds).toEqual(selectedIds);
				const card = wrapper.findComponent({ name: "VCard" });

				const radioGroup = card.findComponent(VRadioGroup);
				radioGroup.setValue(RoleName.Roomowner);
				await nextTick();

				const confirmButton = card.find(
					"[data-testid='change-role-confirm-btn']"
				);
				await confirmButton.trigger("click");

				const handOverButton = card.find(
					"[data-testid='change-owner-confirm-btn']"
				);
				await handOverButton.trigger("click");

				expect(roomMembersStore.selectedIds).toEqual([]);
			});
		});
	});
});
