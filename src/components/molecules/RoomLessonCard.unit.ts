import { mount } from "@vue/test-utils";
import RoomLessonCard from "./RoomLessonCard.vue";

declare let createComponentMocks: Function;

const baseTestProps = {
	room: {
		roomId: "456",
		displayColor: "#54616e",
	},
	lesson: {
		id: "123",
		name: "Test Name",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:58:46.601Z",
		updatedAt: "2017-09-28T11:58:46.601Z",
		hidden: false,
	},
	ariaLabel:
		"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
};

const hiddenTestProps = {
	room: {
		roomId: "456",
		displayColor: "#54616e",
	},
	lesson: {
		id: "123",
		name: "Test Name",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:58:46.601Z",
		updatedAt: "2017-09-28T11:58:46.601Z",
		hidden: true,
	},
	ariaLabel:
		"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(RoomLessonCard, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/molecules/RoomLessonCard", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
		window.location.pathname = "";
	});

	describe("common behaviors and actions", () => {
		const role = "teacher";
		it("should have correct props", () => {
			const wrapper = getWrapper({ ...baseTestProps, role });

			expect(wrapper.vm.ariaLabel).toStrictEqual(baseTestProps.ariaLabel);
			expect(wrapper.vm.lesson).toStrictEqual(baseTestProps.lesson);
			expect(wrapper.vm.room).toStrictEqual(baseTestProps.room);
		});

		it("should redirect to lesson page", () => {
			const location = window.location;
			const wrapper = getWrapper({ ...baseTestProps, role });
			const lessonCard = wrapper.find(".lesson-card");
			lessonCard.trigger("click");

			expect(location.pathname).toStrictEqual("/courses/456/topics/123");
		});

		it("should have correct title", () => {
			const wrapper = getWrapper({ ...baseTestProps, role });
			const title = wrapper.find(".title-section");

			expect(title.element.textContent).toContain("Test Name");
		});
	});

	describe("user role based behaviors and actions", () => {
		describe("teachers", () => {
			const role = "teacher";
			it("should have one action button if lesson is hidden with correct color", () => {
				const wrapper = getWrapper({ ...hiddenTestProps, role });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(1);
				expect(actionButtons.wrappers[0].vm._props.color).toContain("#54616e");
			});

			it("should have no action button when lesson is visible", () => {
				const wrapper = getWrapper({ ...baseTestProps, role });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(0);
			});

			it("should trigger the 'redirectAction' method when 'more action' edit button is clicked", async () => {
				const redirectActionMock = jest.fn();
				const wrapper = getWrapper({ ...baseTestProps, role });
				wrapper.vm.redirectAction = redirectActionMock;

				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findAll(".task-action");
				await moreActionButton.wrappers[0].trigger("click");

				expect(redirectActionMock).toHaveBeenCalled();
				expect(redirectActionMock.mock.calls[0][0]).toStrictEqual(
					"/courses/456/topics/123/edit"
				);
			});

			it("should trigger the 'post' method when 'post' button is clicked", async () => {
				const postLessonMock = jest.fn();
				const wrapper = getWrapper({ ...hiddenTestProps, role });
				wrapper.vm.postLesson = postLessonMock;

				const actionButton = wrapper.find(".action-button");
				await actionButton.trigger("click");

				expect(postLessonMock).toHaveBeenCalled();
			});

			it("should trigger the 'revertPublishedCard' method when 'more action' revert button is clicked", async () => {
				const revertPublishedCardMock = jest.fn();
				const wrapper = getWrapper({ ...baseTestProps, role });
				wrapper.vm.revertPublishedCard = revertPublishedCardMock;
				const threeDotButton = wrapper.find(".three-dot-button");
				await threeDotButton.trigger("click");

				const moreActionButton = wrapper.findAll(".task-action");
				await moreActionButton.wrappers[1].trigger("click");
				await wrapper.vm.$nextTick();
				expect(revertPublishedCardMock).toHaveBeenCalled();
			});
		});
		describe("students", () => {
			const role = "student";
			it("should have no action button", () => {
				const wrapper = getWrapper({ ...baseTestProps, role });
				const actionButtons = wrapper.findAll(".action-button");

				expect(actionButtons).toHaveLength(0);
			});
		});
	});
});
