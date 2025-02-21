import { DOMWrapper, mount } from "@vue/test-utils";
import ChangeRole from "./ChangeRole.vue";
import { RoleName } from "@/serverApi/v3";
import { roomMemberFactory } from "@@/tests/test-utils/factory/room/roomMembersFactory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomMember } from "@data-room";
import { nextTick } from "vue";

describe("ChangeRole.vue", () => {
	const members = [
		roomMemberFactory(RoleName.Roomadmin).build(),
		roomMemberFactory(RoleName.Roomviewer).build(),
	];

	const currentUser = roomMemberFactory(RoleName.Roomowner).build();

	const roomName = "Test Room";

	const setup = (options?: { members: RoomMember[] }) => {
		return mount(ChangeRole, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				members: options?.members || members,
				roomName,
				currentUser,
			},
		});
	};

	describe("when the component is rendered", () => {
		it("should render correctly", () => {
			const wrapper = setup();
			expect(wrapper.text()).toContain("pages.rooms.members.changePermission");

			const radioButtons = wrapper.findAllComponents({ name: "v-radio" });
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
			const wrapper = setup({ members: [members[0]] });
			expect(wrapper.text()).toContain(
				"pages.rooms.members.roleChange.subTitle"
			);
		});

		it("renders correctly with multiple members", () => {
			const wrapper = setup();
			expect(wrapper.text()).toContain(
				"pages.rooms.members.roleChange.multipleUser.subTitle"
			);
			expect(wrapper.text()).toContain("pages.rooms.members.changePermission");
		});

		describe("when the current user is the owner and only one member selected", () => {
			it("should render the 'Own' option", () => {
				const wrapper = setup({ members: [members[0]] });

				const radioButtons = wrapper.findAllComponents({ name: "v-radio" });
				expect(radioButtons.length).toBe(4);
			});

			it("should render 'Alert' component", async () => {
				const wrapper = setup({ members: [members[0]] });

				const alertElementBefore = wrapper.findComponent({ name: "v-alert" });
				expect(alertElementBefore.exists()).toBe(false);

				const radioGroup = wrapper.findComponent({
					name: "v-radio-group",
				});
				radioGroup.setValue(RoleName.Roomowner);
				await nextTick();

				const alertElementAfter = wrapper.findComponent({ name: "v-alert" });
				expect(alertElementAfter.exists()).toBe(true);
				expect(alertElementAfter.text()).toContain(
					"pages.rooms.members.handOverAlert.label"
				);
			});

			describe("when the confirm button clicked", () => {
				it("should not render the radio buttons", async () => {
					const wrapper = setup({ members: [members[0]] });

					const radioGroup = wrapper.findComponent({
						name: "v-radio-group",
					});
					radioGroup.setValue(RoleName.Roomowner);
					await nextTick();

					const confirmButton = wrapper.find(
						"[data-testid='change-role-confirm-btn']"
					);
					await confirmButton.trigger("click");

					const radioButtons = wrapper.findAllComponents({ name: "v-radio" });
					expect(radioButtons.length).toBe(0);
				});

				it("should show the confirmation alert and 'Handover' button", async () => {
					const wrapper = setup({ members: [members[0]] });

					const radioGroup = wrapper.findComponent({
						name: "v-radio-group",
					});
					radioGroup.setValue(RoleName.Roomowner);
					await nextTick();

					const confirmButton = wrapper.find(
						"[data-testid='change-role-confirm-btn']"
					);
					await confirmButton.trigger("click");

					const alertElementAfter = wrapper.findComponent({
						name: "v-alert",
					});
					expect(alertElementAfter.exists()).toBe(true);
					expect(alertElementAfter.text()).toContain(
						"pages.rooms.members.handOverAlert.confirm.label"
					);
				});
			});
		});
	});

	describe("@selectedRole", () => {
		const roleTestCases = [
			{ role: RoleName.Roomviewer, checkedIndex: 0 },
			{ role: RoleName.Roomeditor, checkedIndex: 1 },
			{ role: RoleName.Roomadmin, checkedIndex: 2 },
		];

		describe.each(roleTestCases)(
			'when member role is "$role" ',
			({ role, checkedIndex }) => {
				it(`should have the correct input "${role}" is pre-selected`, async () => {
					const members = roomMemberFactory(role).buildList(3);
					const wrapper = setup({ members });
					const radioButtons: DOMWrapper<HTMLInputElement>[] = wrapper.findAll(
						"input[type='radio']"
					);

					radioButtons.forEach((radioButton, index) => {
						expect(radioButton.element.checked).toBe(index === checkedIndex);
					});
				});
			}
		);

		it("should have no input pre-selected when multiple members with multiple roles are passed", () => {
			const wrapper = setup();
			const radioButtons: DOMWrapper<HTMLInputElement>[] = wrapper.findAll(
				"input[type='radio']"
			);

			radioButtons.forEach((radioButton) => {
				expect(radioButton.element.checked).toBe(false);
			});
		});
	});

	describe("@emits", () => {
		it("should emit 'cancel' event when cancel button is clicked", async () => {
			const wrapper = setup();
			await wrapper
				.find("[data-testid='change-role-cancel-btn']")
				.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("cancel");
		});

		it("should emit 'confirm' event when confirm button is clicked", async () => {
			const wrapper = setup({ members: [members[1]] });
			await wrapper
				.find("[data-testid='change-role-confirm-btn']")
				.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("confirm");
			expect(wrapper.emitted("confirm")?.[0]).toEqual([
				RoleName.Roomviewer,
				members[0].userId,
			]);
		});

		it("should emit 'change-room-owner' when the Handover button is clicked", async () => {
			const wrapper = setup({ members: [members[0]] });

			const radioGroup = wrapper.findComponent({
				name: "v-radio-group",
			});
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

			const emitted = wrapper.emitted();
			expect(emitted).toHaveProperty("change-room-owner");
			expect(emitted["change-room-owner"][0]).toEqual([members[0].userId]);
		});
	});
});
