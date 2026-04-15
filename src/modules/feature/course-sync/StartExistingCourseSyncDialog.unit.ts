import GroupSelectionDialog from "./GroupSelectionDialog.vue";
import StartExistingCourseSyncDialog from "./StartExistingCourseSyncDialog.vue";
import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import { createTestAppStore, expectNotification, groupResponseFactory, mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { MeResponse, RoleName } from "@api-server";
import { useCourseApi } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { expect, Mocked } from "vitest";
import { nextTick } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";

vi.mock("@data-room");

describe("StartExistingCourseSyncDialog", () => {
	let courseApiMock: Mocked<ReturnType<typeof useCourseApi>>;

	const getWrapper = (
		props: ComponentProps<typeof StartExistingCourseSyncDialog> = {
			isOpen: true,
			courseId: "courseId",
			courseName: "courseName",
			courseTeachers: ["firstName lastName"],
		},
		admin?: Partial<MeResponse>
	) => {
		const { mockedMe } = createTestAppStore({ me: admin ?? {} });

		const wrapper = mount(StartExistingCourseSyncDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					GroupSelectionDialog: true,
				},
			},
			props,
		});

		return {
			wrapper,
			me: mockedMe,
		};
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		courseApiMock = mockComposable(useCourseApi);

		vi.mocked(useCourseApi).mockReturnValue(courseApiMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when the dialog is open", () => {
		it("should open the group dialog", () => {
			const { wrapper } = getWrapper({ isOpen: true });

			const groupSelectionDialog = wrapper.getComponent(GroupSelectionDialog);

			expect(groupSelectionDialog.props().isOpen).toEqual(true);
		});
	});

	describe("when the dialog is closed", () => {
		it("should close the dialog", () => {
			const { wrapper } = getWrapper({ isOpen: false });

			const groupSelectionDialog = wrapper.getComponent(GroupSelectionDialog);
			expect(groupSelectionDialog.props().isOpen).toEqual(false);
		});
	});

	describe("when confirming the group selection dialog", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			const group = groupResponseFactory.build();

			return {
				wrapper,
				group,
			};
		};

		it("should open the confirmation dialog", async () => {
			const spy = vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(true);
			const { wrapper, group } = setup();

			wrapper.getComponent(GroupSelectionDialog).vm.$emit("confirm", group);
			await nextTick();

			const groupSelectionDialog = wrapper.getComponent(GroupSelectionDialog);

			expect(groupSelectionDialog.props().isOpen).toEqual(false);
			expect(spy).toHaveBeenCalled();
		});
	});

	describe("when confirming the confirm dialog", () => {
		const setup = async () => {
			vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(true);
			const { wrapper } = getWrapper();

			const group = groupResponseFactory.build();

			wrapper.getComponent(GroupSelectionDialog).vm.$emit("confirm", group);
			await nextTick();

			return {
				wrapper,
				group,
			};
		};

		it("should close the dialog", async () => {
			const { wrapper } = await setup();

			expect(wrapper.vm.isOpen).toEqual(false);
			expect(wrapper.emitted("update:isOpen")).toBeDefined();
		});

		it("should call the api", async () => {
			const { group } = await setup();

			expect(courseApiMock.startSynchronization).toHaveBeenCalledWith("courseId", group.id);
		});

		it("should show a success notification", async () => {
			await setup();

			expectNotification("success");
		});

		it("should emit a success event", async () => {
			const { wrapper } = await setup();

			expect(wrapper.emitted("success")).toBeDefined();
		});
	});

	describe("when starting the sync fails", () => {
		const setup = async () => {
			vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(true);
			const { wrapper } = getWrapper();

			courseApiMock.startSynchronization.mockRejectedValueOnce(new Error());

			const group = groupResponseFactory.build();

			wrapper.getComponent(GroupSelectionDialog).vm.$emit("confirm", group);
			await nextTick();

			return {
				wrapper,
				group,
			};
		};

		it("should show an error notification", async () => {
			await setup();
			expectNotification("error");
		});

		it("should not emit a success event", async () => {
			const { wrapper } = await setup();

			expect(wrapper.emitted("success")).toBeUndefined();
		});
	});

	describe("when data is missing on confirming the group", () => {
		const setup = async () => {
			vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(true);

			const { wrapper } = getWrapper({
				isOpen: true,
			});

			wrapper.getComponent(GroupSelectionDialog).vm.$emit("confirm", undefined);
			await nextTick();

			return {
				wrapper,
			};
		};

		it("should show an error notification", async () => {
			await setup();
			expectNotification("error");
		});

		it("should not emit a success event", async () => {
			const { wrapper } = await setup();

			expect(wrapper.emitted("success")).toBeUndefined();
		});
	});

	describe("when the user is part of the selected group", () => {
		const setup = async () => {
			const { wrapper, me } = getWrapper();

			const group = groupResponseFactory.build({
				users: [
					{
						id: me.user?.id,
						firstName: me.user.firstName,
						lastName: me.user.lastName,
						role: RoleName.TEACHER,
					},
				],
			});

			wrapper.getComponent(GroupSelectionDialog).vm.$emit("confirm", group);
			await nextTick();

			return {
				wrapper,
				group,
			};
		};

		it("should display the correct warning in the confirmation dialog", async () => {
			const spy = vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(true);
			await setup();

			expect(spy).toHaveBeenCalledWith(
				expect.objectContaining({
					message: "feature-course-sync.StartExistingCourseSyncDialog.confirmation.userInGroupWarning",
				})
			);
		});
	});

	describe("when the user is not part of the selected group", () => {
		const setup = async () => {
			const { wrapper } = getWrapper();

			const group = groupResponseFactory.build({
				users: [
					{
						id: "otherUserId",
						firstName: "firstname",
						lastName: "lastname",
						role: RoleName.TEACHER,
					},
				],
			});

			wrapper.getComponent(GroupSelectionDialog).vm.$emit("confirm", group);
			await nextTick();

			return {
				wrapper,
				group,
			};
		};

		it("should display the correct warning in the confirmation dialog", async () => {
			const spy = vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(true);
			await setup();

			expect(spy).toHaveBeenCalledWith(
				expect.objectContaining({
					message: "feature-course-sync.StartExistingCourseSyncDialog.confirmation.userNotInGroupWarning",
				})
			);
		});
	});

	describe("when the user is not part of the selected group and course teacher are part of group", () => {
		const setup = async () => {
			const { wrapper } = getWrapper(
				{
					isOpen: true,
					courseId: "courseId",
					courseName: "courseName",
					courseTeachers: ["firstname lastname"],
				},
				{
					roles: [{ id: "0", name: RoleName.ADMINISTRATOR }],
				}
			);

			const group = groupResponseFactory.build({
				users: [
					{
						id: "otherUserId",
						firstName: "firstname",
						lastName: "lastname",
						role: RoleName.TEACHER,
					},
					{
						id: "otherUserId1",
						firstName: "firstname1",
						lastName: "lastname1",
						role: RoleName.TEACHER,
					},
					{
						id: "otherUserId2",
						firstName: "firstname2",
						lastName: "lastname2",
						role: RoleName.TEACHER,
					},
				],
			});

			wrapper.getComponent(GroupSelectionDialog).vm.$emit("confirm", group);
			await nextTick();

			return {
				wrapper,
				group,
			};
		};

		it("should display the correct warning in the confirmation dialog", async () => {
			const spy = vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(true);
			await setup();

			expect(spy).toHaveBeenCalledWith(
				expect.objectContaining({
					message: "feature-course-sync.StartExistingCourseSyncDialog.confirmation.userInGroupWarning",
				})
			);
		});
	});

	describe("when the user is not part of the selected group and course teacher are not part of group", () => {
		const setup = async () => {
			const { wrapper } = getWrapper(
				{
					isOpen: true,
					courseId: "courseId",
					courseName: "courseName",
					courseTeachers: ["Firstname Lastname", "another teacher"],
				},
				{
					roles: [{ id: "0", name: RoleName.ADMINISTRATOR }],
				}
			);

			const group = groupResponseFactory.build({
				users: [
					{
						id: "otherUserId",
						firstName: "Firstname",
						lastName: "Lastname",
						role: RoleName.TEACHER,
					},
				],
			});

			wrapper.getComponent(GroupSelectionDialog).vm.$emit("confirm", group);
			await nextTick();

			return {
				wrapper,
				group,
			};
		};

		it("should display the correct warning in the confirmation dialog", async () => {
			const spy = vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(true);
			await setup();

			expect(spy).toHaveBeenCalledWith(
				expect.objectContaining({
					message: "feature-course-sync.StartExistingCourseSyncDialog.confirmation.userNotInGroupWarning",
				})
			);
		});
	});
});
