import RoomModule from "@store/room";
import AuthModule from "@/store/auth";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import Room from "./index.vue";
import { User } from "@/store/types/auth";
import EnvConfigModule from "@/store/env-config";

const mockData = {
	roomId: "123",
	title: "Sample Course",
	displayColor: "black",
	elements: [
		{
			type: "task",
			content: {
				courseName: "Mathe",
				id: "59cce1d381297026d02cdc4b",
				name: "Private Aufgabe von Marla - mit Kurs, offen",
				createdAt: "2017-09-28T11:49:39.924Z",
				updatedAt: "2017-09-28T11:49:39.924Z",
				status: {
					submitted: 0,
					maxSubmissions: 2,
					graded: 0,
					isDraft: false,
					isSubstitutionTeacher: false,
					isFinished: false,
				},
				availableDate: "2017-09-20T11:00:00.000Z",
				duedate: "2300-09-28T13:00:00.000Z",
				displayColor: "#54616e",
				description: "",
			},
		},
		{
			type: "task",
			content: {
				courseName: "Mathe",
				id: "59cce4c3c6abf042248e888e",
				name: "Private Aufgabe von Cord - mit Kurs, offen",
				createdAt: "2017-09-28T12:02:11.432Z",
				updatedAt: "2017-09-28T12:02:11.432Z",
				status: {
					submitted: 0,
					maxSubmissions: 2,
					graded: 0,
					isDraft: true,
					isSubstitutionTeacher: false,
					isFinished: false,
				},
				availableDate: "2017-09-28T12:00:00.000Z",
				duedate: "2300-06-28T13:00:00.000Z",
				displayColor: "#54616e",
				description: "",
			},
		},
	],
};

const mockAuthStoreDataStudentInvalid = {
	__v: 0,
	_id: "asdf",
	id: "asdf",
	firstName: "Arthur",
	lastName: "Dent",
	email: "arthur.dent@hitchhiker.org",
	roles: [{ name: "student" }],
	permissions: ["ABC", "DEF"],
};

const mockAuthStoreDataTeacher = {
	__v: 1,
	_id: "asdfg",
	id: "asdfg",
	firstName: "Peter",
	lastName: "Parker",
	email: "peter.parker@hitchhiker.org",
	roles: [{ name: "teacher" }],
	permissions: ["COURSE_CREATE", "COURSE_EDIT"],
};

const $route = {
	params: {
		id: "123",
	},
	path: "/rooms/",
};

const $router = { push: jest.fn() };
const getWrapper: any = () => {
	return mount(Room, {
		...createComponentMocks({
			i18n: true,
			$router,
			$route,
		}),
	});
};

describe("@pages/rooms/_id/index.vue", () => {
	beforeEach(() => {
		RoomModule.setRoomData(mockData as any);
		AuthModule.setUser(mockAuthStoreDataTeacher as User);
	});

	it("should fetch data", async () => {
		const wrapper = getWrapper();
		expect(wrapper.vm.roomData).toStrictEqual(mockData);
	});

	it("'to course files' button should have correct path", async () => {
		const wrapper = getWrapper();
		const backButton = wrapper.find(".back-button");
		expect(backButton.vm.href).toStrictEqual("/files/courses/123");
	});

	it("title should be the course name", async () => {
		const wrapper = getWrapper();
		const title = wrapper.find(".course-title");
		expect(title.element.textContent).toContain("Sample Course");
	});

	it("should not show FAB if user does not have permission to create courses", () => {
		AuthModule.setUser(mockAuthStoreDataStudentInvalid as User);
		const wrapper = getWrapper();
		const fabComponent = wrapper.find(".wireframe-fab");
		expect(fabComponent.exists()).toBe(false);
	});

	it("should show FAB if user has permission to create courses", () => {
		const wrapper = getWrapper();
		const fabComponent = wrapper.find(".wireframe-fab");
		const actions = fabComponent.vm.actions.map((action: any) => {
			return action.label;
		});
		const hasNewTaskAction = actions.some((item: string) => {
			return item === wrapper.vm.$i18n.t("pages.rooms.fab.add.task");
		});
		const hasNewLessonAction = actions.some((item: string) => {
			return item === wrapper.vm.$i18n.t("pages.rooms.fab.add.lesson");
		});
		const hasImportLessonAction = actions.some((item: string) => {
			return item === wrapper.vm.$i18n.t("pages.rooms.fab.import.lesson");
		});
		expect(fabComponent.exists()).toBe(true);
		expect(hasNewTaskAction).toBe(true);
		expect(hasNewLessonAction).toBe(true);
		expect(hasImportLessonAction).toBe(false);
	});

	it("'add task' button should have correct path", async () => {
		const wrapper = getWrapper();
		const fabComponent = wrapper.find(".wireframe-fab");
		const newTaskAction = fabComponent.vm.actions[0];
		expect(newTaskAction.href).toStrictEqual("/homework/new?course=123&returnUrl=rooms/123");
	});

	it("'add lesson' button should have correct path", async () => {
		const wrapper = getWrapper();
		const fabComponent = wrapper.find(".wireframe-fab");
		const newTaskAction = fabComponent.vm.actions[1];
		expect(newTaskAction.href).toStrictEqual("/courses/123/topics/add?returnUrl=rooms/123");
	});

	it("should show import lesson FAB if FEATURE_LESSON_SHARE is set", () => {
		// @ts-ignore
		EnvConfigModule.setEnvs({ FEATURE_LESSON_SHARE: true });
		const wrapper = getWrapper();
		const fabComponent = wrapper.find(".wireframe-fab");
		const actions = fabComponent.vm.actions.map((action: any) => {
			return action.label;
		});
		const hasImportLessonAction = actions.some((item: string) => {
			return item === wrapper.vm.$i18n.t("pages.rooms.fab.import.lesson");
		});
		expect(hasImportLessonAction).toBe(true);
	});

	describe("headline menus", () => {
		beforeEach(() => {
			AuthModule.setUser(mockAuthStoreDataTeacher as User);
		});
		const findMenuItems = (itemName: string, menuItems: Array<any>) => {
			return menuItems.some((item: object | any) => item.name === itemName);
		};
		it("should have the menu button for teachers", () => {
			const wrapper = getWrapper();
			const menuButton = wrapper.findAll(`[data-testid="title-menu"]`);

			expect(menuButton).toHaveLength(1);
		});

		it("should not have the menu button for students", () => {
			AuthModule.setUser(mockAuthStoreDataStudentInvalid as User);
			const wrapper = getWrapper();
			const menuButton = wrapper.findAll(`[data-testid="title-menu"]`);
			expect(menuButton).toHaveLength(0);
		});

		it("should have the headline menu items", () => {
			const wrapper = getWrapper();
			const menuItems = wrapper.vm.headlineMenuItems;

			expect(menuItems).toHaveLength(2);
			expect(
				findMenuItems(
					wrapper.vm.$i18n.t("common.actions.edit") + "/" + wrapper.vm.$i18n.t("common.actions.remove"),
					menuItems
				)
			).toBe(true);
			expect(
				findMenuItems(
					wrapper.vm.$i18n.t("common.actions.invite"),
					menuItems
				)
			).toBe(true);
			expect(
				findMenuItems(
					wrapper.vm.$i18n.t("common.actions.duplicate"),
					menuItems
				)
			).toBe(false);
			expect(
				findMenuItems(
					wrapper.vm.$i18n.t("common.actions.share"),
					menuItems
				)
			).toBe(false);
		});

		it("should have 'Share Course' menu if 'FEATURE_COURSE_SHARE' flag set to true", () => {
			// @ts-ignore
			EnvConfigModule.setEnvs({ FEATURE_COURSE_SHARE: true });
			const wrapper = getWrapper();
			const menuItems = wrapper.vm.headlineMenuItems;

			expect(
				findMenuItems(
					wrapper.vm.$i18n.t("common.actions.share"),
					menuItems
				)
			).toBe(true);
		});

		it("should have 'Copy/Duplicate Course' menu if 'FEATURE_COURSE_COPY' flag set to true", () => {
			// @ts-ignore
			EnvConfigModule.setEnvs({ FEATURE_COURSE_COPY: true });
			const wrapper = getWrapper();
			const menuItems = wrapper.vm.headlineMenuItems;

			expect(
				findMenuItems(
					wrapper.vm.$i18n.t("common.actions.duplicate"),
					menuItems
				)
			).toBe(true);
		});

		it("should redirect the page when 'Edit/Delete' menu clicked", async () => {
			const location = window.location;
			const wrapper = getWrapper();

			const threeDotButton = wrapper.find(".three-dot-button");
			await threeDotButton.trigger("click");
			const moreActionButton = wrapper.find(
				`[data-testid=title-menu-edit-delete]`
			);
			await moreActionButton.trigger("click");

			expect(location.href).toStrictEqual("/courses/123/edit");
		});

		it("should redirect the page when 'Copy course' menu clicked", async () => {
			const location = window.location;
			const wrapper = getWrapper();

			const threeDotButton = wrapper.find(".three-dot-button");
			await threeDotButton.trigger("click");
			const moreActionButton = wrapper.find(`[data-testid=title-menu-copy]`);
			await moreActionButton.trigger("click");

			expect(location.href).toStrictEqual("/courses/123/copy");
		});

		it("should call inviteCourse method when 'Invite to the course' menu clicked", async () => {
			const inviteCourseSpy = jest.fn();
			const wrapper = getWrapper();
			wrapper.vm.inviteCourse = inviteCourseSpy;

			const threeDotButton = wrapper.find(".three-dot-button");
			await threeDotButton.trigger("click");
			const moreActionButton = wrapper.find(`[data-testid=title-menu-invite]`);
			await moreActionButton.trigger("click");

			expect(inviteCourseSpy).toHaveBeenCalled();
		});

		it("should call store action after 'Invite to the course' menu clicked", async () => {
			const createCourseInvitationSpy = jest.fn();
			RoomModule.createCourseInvitation = createCourseInvitationSpy;
			const wrapper = getWrapper();

			const threeDotButton = wrapper.find(".three-dot-button");
			await threeDotButton.trigger("click");
			const moreActionButton = wrapper.find(`[data-testid=title-menu-invite]`);
			await moreActionButton.trigger("click");

			expect(createCourseInvitationSpy).toHaveBeenCalled();
			expect(createCourseInvitationSpy.mock.calls[0][0]).toStrictEqual("123");
		});

		it("should call shareCourse method when 'Share Course ' menu clicked", async () => {
			// @ts-ignore
			EnvConfigModule.setEnvs({ FEATURE_COURSE_SHARE: true });
			const shareCourseSpy = jest.fn();
			const wrapper = getWrapper();
			wrapper.vm.shareCourse = shareCourseSpy;

			const threeDotButton = wrapper.find(".three-dot-button");
			await threeDotButton.trigger("click");
			const moreActionButton = wrapper.find(`[data-testid=title-menu-share]`);
			await moreActionButton.trigger("click");

			expect(shareCourseSpy).toHaveBeenCalled();
		});

		it("should call store action after 'Share Course' menu clicked", async () => {
			// @ts-ignore
			EnvConfigModule.setEnvs({ FEATURE_COURSE_SHARE: true });
			const createCourseShareTokenSpy = jest.fn();
			RoomModule.createCourseShareToken = createCourseShareTokenSpy;
			const wrapper = getWrapper();

			const threeDotButton = wrapper.find(".three-dot-button");
			await threeDotButton.trigger("click");
			const moreActionButton = wrapper.find(`[data-testid=title-menu-share]`);
			await moreActionButton.trigger("click");

			expect(createCourseShareTokenSpy).toHaveBeenCalled();
			expect(createCourseShareTokenSpy.mock.calls[0][0]).toStrictEqual("123");
		});

		describe("modal views", () => {
			it("should open modal for inviting action", async () => {
				const wrapper = getWrapper();
				wrapper.setData({
					dialog: {
						isOpen: true,
						model: "invite",
						header: wrapper.vm.$i18n.t("pages.room.modal.course.invite.header"),
						text: wrapper.vm.$i18n.t("pages.room.modal.course.invite.text"),
						inputText: "/link/123456",
						subText: "",
						courseInvitationLink: "123456",
					},
				});
				await wrapper.vm.$nextTick();

				const modalView = wrapper.find(`[data-testid="title-dialog"]`);
				const titleElement = modalView.find(".dialog-header");
				const textElement = modalView.find(".modal-text");
				const inputElement = modalView.find(`[data-testid="modal-input"]`);

				expect(modalView.vm.isOpen).toBe(true);
				expect(titleElement.element.textContent).toContain(
					wrapper.vm.dialog.header
				);
				expect(textElement.element.textContent).toContain(
					wrapper.vm.dialog.text
				);
				expect(inputElement.element.value).toStrictEqual(
					wrapper.vm.dialog.inputText
				);
			});

			it("should open modal for sharing action", async () => {
				const wrapper = getWrapper();
				wrapper.setData({
					dialog: {
						isOpen: true,
						model: "share",
						header: wrapper.vm.$i18n.t("pages.room.modal.course.share.header"),
						text: wrapper.vm.$i18n.t("pages.room.modal.course.share.text"),
						inputText: "shareToken_123456",
						subText: wrapper.vm.$i18n.t(
							"pages.room.modal.course.share.subText"
						),
						courseShareToken: "shareToken_123456",
						qrUrl: "/courses?import=shareToken_123456",
					},
				});

				await wrapper.vm.$nextTick();
				const modalView = wrapper.find(`[data-testid="title-dialog"]`);
				const titleElement = modalView.find(".dialog-header");
				const textElement = modalView.find(".modal-text");
				const subTextElement = modalView.find(".modal-sub-text");
				const inputElement = modalView.find(`[data-testid="modal-input"]`);
				const qrComponent = modalView.find(`[data-testid="modal-qrcode"]`);

				expect(modalView.vm.isOpen).toBe(true);
				expect(titleElement.element.textContent).toContain(
					wrapper.vm.dialog.header
				);
				expect(textElement.element.textContent).toContain(
					wrapper.vm.dialog.text
				);
				expect(subTextElement.element.textContent).toContain(
					wrapper.vm.dialog.subText
				);
				expect(inputElement.element.value).toStrictEqual(
					wrapper.vm.dialog.inputText
				);
				expect(qrComponent.vm.$options._componentTag).toStrictEqual(
					"base-qr-code"
				);
				expect(qrComponent.vm.url).toStrictEqual(wrapper.vm.dialog.qrUrl);
			});

			it("should close the modal and call 'closeDialog' method", async () => {
				const closeDialogSpy = jest.fn();
				const wrapper = getWrapper();
				wrapper.vm.closeDialog = closeDialogSpy;
				wrapper.setData({
					dialog: {
						isOpen: true,
						model: "share",
						header: wrapper.vm.$i18n.t("pages.room.modal.course.share.header"),
						text: wrapper.vm.$i18n.t("pages.room.modal.course.share.text"),
						inputText: "shareToken_123456",
						subText: wrapper.vm.$i18n.t(
							"pages.room.modal.course.share.subText"
						),
						courseShareToken: "shareToken_123456",
						qrUrl: "/courses?import=shareToken_123456",
					},
				});

				await wrapper.vm.$nextTick();
				const modalView = wrapper.find(`[data-testid="title-dialog"]`);
				const closeButton = modalView.find(`[data-testid="dialog-close"]`);
				await closeButton.trigger("click");

				expect(closeDialogSpy).toHaveBeenCalled();
			});
		});
	});
});
