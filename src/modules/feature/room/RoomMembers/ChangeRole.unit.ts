import { mount } from "@vue/test-utils";
import ChangeRole from "./ChangeRole.vue";
import { RoleName } from "@/serverApi/v3";
import { roomMemberFactory } from "@@/tests/test-utils/factory/room/roomMembersFactory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomMember, useRoomMembersStore } from "@data-room";
import { nextTick } from "vue";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier } from "@util-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import {
	meResponseFactory,
	mockedPiniaStoreTyping,
	roomFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import SchoolsModule from "@/store/schools";
import AuthModule from "@/store/auth";
import { authModule, schoolsModule } from "@/store";
import { VAlert, VRadio, VRadioGroup } from "vuetify/lib/components/index.mjs";

jest.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("ChangeRole.vue", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

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

	const setup = (
		options?: Partial<{
			membersForRoleChange: RoomMember[];
			currentUser: RoomMember;
		}>
	) => {
		const currentUser =
			options?.currentUser ??
			roomMemberFactory.build({ roomRoleName: RoleName.Roomadmin });
		const membersForRoleChange = options?.membersForRoleChange ?? [];

		const mockMe = meResponseFactory.build({
			user: { id: currentUser.userId },
		});
		authModule.setMe(mockMe);

		const roomMembers = [...membersForRoleChange, currentUser];
		const room = roomFactory.build();

		const wrapper = mount(ChangeRole, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia({
						initialState: {
							roomDetailsStore: { room },
							roomMembersStore: {
								roomMembers,
								selectedIds: membersForRoleChange,
							},
						},
					}),
				],
			},
			props: {
				members: membersForRoleChange,
			},
		});

		const roomMembersStore = mockedPiniaStoreTyping(useRoomMembersStore);

		return { wrapper, roomMembersStore };
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("when the component is rendered", () => {
		it("should render correctly", () => {
			const { wrapper } = setup();
			expect(wrapper.text()).toContain("pages.rooms.members.changePermission");

			const radioButtons = wrapper.findAllComponents(VRadio);
			expect(radioButtons.length).toBe(3);

			const cancelButton = wrapper.find(
				"[data-testid='change-role-cancel-btn']"
			);
			const confirmButton = wrapper.find(
				"[data-testid='change-role-confirm-btn']"
			);
			expect(cancelButton.exists()).toBe(true);
			expect(confirmButton.exists()).toBe(true);
		});

		it("should render correctly with single members", () => {
			const { wrapper } = setup({
				membersForRoleChange: [
					roomMemberFactory.build({ roomRoleName: RoleName.Roomadmin }),
				],
			});
			expect(wrapper.text()).toContain(
				"pages.rooms.members.roleChange.subTitle"
			);
		});

		it("renders correctly with multiple members", () => {
			const { wrapper } = setup({
				membersForRoleChange: [
					roomMemberFactory.build({ roomRoleName: RoleName.Roomadmin }),
					roomMemberFactory.build({ roomRoleName: RoleName.Roomviewer }),
				],
			});
			expect(wrapper.text()).toContain(
				"pages.rooms.members.roleChange.multipleUser.subTitle"
			);
			expect(wrapper.text()).toContain("pages.rooms.members.changePermission");
		});

		describe("when the current user is the owner and only one member selected", () => {
			it("should render the 'Own' option", () => {
				const { wrapper } = setup({
					membersForRoleChange: [
						roomMemberFactory.build({ roomRoleName: RoleName.Roomadmin }),
					],
					currentUser: roomMemberFactory.build({
						roomRoleName: RoleName.Roomowner,
					}),
				});

				const radioGroup = wrapper.getComponent(VRadioGroup);
				const ownRadioButton = radioGroup.find(
					'[data-testid="change-role-option-owner"]'
				);

				expect(ownRadioButton.exists()).toBe(true);

				const radioButtons = radioGroup.findAllComponents(VRadio);
				expect(radioButtons.length).toBe(4);
			});

			it("should render 'Alert' component", async () => {
				const { wrapper } = setup({
					membersForRoleChange: [
						roomMemberFactory.build({ roomRoleName: RoleName.Roomadmin }),
					],
					currentUser: roomMemberFactory.build({
						roomRoleName: RoleName.Roomowner,
					}),
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
						membersForRoleChange: [
							roomMemberFactory.build({
								roomRoleName: RoleName.Roomadmin,
							}),
						],
						currentUser: roomMemberFactory.build({
							roomRoleName: RoleName.Roomowner,
						}),
					});

					const radioGroup = wrapper.getComponent(VRadioGroup);
					const ownRadioButton = radioGroup.find(
						'[data-testid="change-role-option-owner"]'
					);
					expect(ownRadioButton.exists()).toBe(true);

					radioGroup.setValue(RoleName.Roomowner);
					await nextTick();

					const confirmButton = wrapper.find(
						"[data-testid='change-role-confirm-btn']"
					);
					await confirmButton.trigger("click");

					const radioButtons = wrapper.findAllComponents(VRadio);
					expect(radioButtons.length).toBe(0);
				});

				it("should show the confirmation alert and 'Handover' button", async () => {
					const { wrapper } = setup({
						membersForRoleChange: [
							roomMemberFactory.build({ roomRoleName: RoleName.Roomadmin }),
						],
						currentUser: roomMemberFactory.build({
							roomRoleName: RoleName.Roomowner,
						}),
					});

					const radioGroup = wrapper.getComponent(VRadioGroup);
					const ownRadioButton = radioGroup.find(
						'[data-testid="change-role-option-owner"]'
					);
					expect(ownRadioButton.exists()).toBe(true);

					radioGroup.setValue(RoleName.Roomowner);
					await nextTick();

					const confirmButton = wrapper.find(
						"[data-testid='change-role-confirm-btn']"
					);
					await confirmButton.trigger("click");

					const alertElementAfter = wrapper.findComponent(VAlert);
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
					membersForRoleChange: [
						roomMemberFactory.build({ roomRoleName: RoleName.Roomadmin }),
					],
				});

				const radioGroup = wrapper.getComponent(VRadioGroup);
				const ownRadioButton = radioGroup.find(
					'[data-testid="change-role-option-owner"]'
				);

				const radioButtons = radioGroup.findAllComponents(VRadio);

				expect(ownRadioButton.exists()).toBe(false);
				expect(radioButtons.length).toBe(3);
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
			it(`should have "${role}" pre-selected`, async () => {
				const members = roomMemberFactory.buildList(3, {
					roomRoleName: role,
				});
				const { wrapper } = setup({ membersForRoleChange: members });

				const radioGroup = wrapper.findComponent(VRadioGroup);
				expect(radioGroup.props("modelValue")).toBe(role);
			});
		});

		it("should have the common role pre-selected when multiple users with the same role are passed", () => {
			const members = roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomviewer,
			});
			const { wrapper } = setup({ membersForRoleChange: members });
			const radioGroup = wrapper.findComponent(VRadioGroup);

			expect(radioGroup.props("modelValue")).toBe(RoleName.Roomviewer);
		});

		it("should have no role pre-selected when multiple members with different roles are passed", () => {
			const { wrapper } = setup({
				membersForRoleChange: [
					roomMemberFactory.build({
						roomRoleName: RoleName.Roomviewer,
					}),
					roomMemberFactory.build({
						roomRoleName: RoleName.Roomeditor,
					}),
					roomMemberFactory.build({
						roomRoleName: RoleName.Roomadmin,
					}),
				],
			});

			const radioGroup = wrapper.findComponent(VRadioGroup);
			expect(radioGroup.props("modelValue")).toBe(null);
		});
	});

	describe("action buttons", () => {
		it("should emit 'close' event when cancel button is clicked", async () => {
			const { wrapper } = setup();
			await wrapper
				.find("[data-testid='change-role-cancel-btn']")
				.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("close");
		});

		describe("confirm button", () => {
			it("should call updateMembersRole when button is clicked", async () => {
				const memberForRoleChange = roomMemberFactory.build({
					roomRoleName: RoleName.Roomviewer,
				});
				const { wrapper, roomMembersStore } = setup({
					membersForRoleChange: [memberForRoleChange],
				});
				await wrapper
					.find("[data-testid='change-role-confirm-btn']")
					.trigger("click");

				expect(roomMembersStore.updateMembersRole).toHaveBeenCalledWith(
					RoleName.Roomviewer,
					memberForRoleChange.userId
				);

				expect(wrapper.emitted()).toHaveProperty("close");
			});

			it("should emit 'close' event when button is clicked", async () => {
				const memberForRoleChange = roomMemberFactory.build({
					roomRoleName: RoleName.Roomviewer,
				});
				const { wrapper } = setup({
					membersForRoleChange: [memberForRoleChange],
				});
				await wrapper
					.find("[data-testid='change-role-confirm-btn']")
					.trigger("click");

				expect(wrapper.emitted()).toHaveProperty("close");
				expect(wrapper.emitted("close")).toHaveLength(1);
			});

			it("should clear selectedIds when button is clicked", async () => {
				const memberForRoleChange = roomMemberFactory.build({
					roomRoleName: RoleName.Roomviewer,
				});
				const { wrapper, roomMembersStore } = setup({
					membersForRoleChange: [memberForRoleChange],
				});

				expect(roomMembersStore.selectedIds).toEqual([memberForRoleChange]);

				await wrapper
					.find("[data-testid='change-role-confirm-btn']")
					.trigger("click");

				expect(roomMembersStore.selectedIds).toEqual([]);
			});
		});

		describe("handover button", () => {
			it("should call changeRoomOwner when button is clicked", async () => {
				const memberForRoleChange = roomMemberFactory.build({
					roomRoleName: RoleName.Roomadmin,
				});
				const { wrapper, roomMembersStore } = setup({
					membersForRoleChange: [memberForRoleChange],
					currentUser: roomMemberFactory.build({
						roomRoleName: RoleName.Roomowner,
					}),
				});

				const radioGroup = wrapper.findComponent(VRadioGroup);
				radioGroup.setValue(RoleName.Roomowner);
				await nextTick();

				const confirmButton = wrapper.find(
					"[data-testid='change-role-confirm-btn']"
				);
				await confirmButton.trigger("click");

				const handOverButton = wrapper.find(
					"[data-testid='change-owner-confirm-btn']"
				);

				expect(handOverButton.exists()).toBe(true);
				await handOverButton.trigger("click");

				expect(roomMembersStore.changeRoomOwner).toHaveBeenCalledWith(
					memberForRoleChange.userId
				);
			});
			it("should emit 'close' event when button is clicked", async () => {
				const memberForRoleChange = roomMemberFactory.build({
					roomRoleName: RoleName.Roomadmin,
				});
				const { wrapper } = setup({
					membersForRoleChange: [memberForRoleChange],
					currentUser: roomMemberFactory.build({
						roomRoleName: RoleName.Roomowner,
					}),
				});

				const radioGroup = wrapper.findComponent(VRadioGroup);
				radioGroup.setValue(RoleName.Roomowner);
				await nextTick();

				const confirmButton = wrapper.find(
					"[data-testid='change-role-confirm-btn']"
				);
				await confirmButton.trigger("click");

				const handOverButton = wrapper.find(
					"[data-testid='change-owner-confirm-btn']"
				);
				await handOverButton.trigger("click");

				expect(wrapper.emitted()).toHaveProperty("close");
			});

			it("should clear selectedIds when button is clicked", async () => {
				const memberForRoleChange = roomMemberFactory.build({
					roomRoleName: RoleName.Roomadmin,
				});
				const { wrapper, roomMembersStore } = setup({
					membersForRoleChange: [memberForRoleChange],
					currentUser: roomMemberFactory.build({
						roomRoleName: RoleName.Roomowner,
					}),
				});
				expect(roomMembersStore.selectedIds).toEqual([memberForRoleChange]);

				const radioGroup = wrapper.findComponent(VRadioGroup);
				radioGroup.setValue(RoleName.Roomowner);
				await nextTick();

				const confirmButton = wrapper.find(
					"[data-testid='change-role-confirm-btn']"
				);
				await confirmButton.trigger("click");

				const handOverButton = wrapper.find(
					"[data-testid='change-owner-confirm-btn']"
				);
				await handOverButton.trigger("click");

				expect(roomMembersStore.selectedIds).toEqual([]);
			});
		});
	});
});
