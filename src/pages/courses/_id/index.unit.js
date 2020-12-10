import { default as CoursePage } from "./index";
import mock$objects from "@@/tests/test-utils/pageStubs";
import EmptyState from "@components/molecules/EmptyState";

describe("courses/new", () => {
	let mockStore;
	let mockRoute;
	let courseId;

	beforeEach(() => {
		// given
		courseId = "0000dcfbfb5c7a3f00bf21ab";
		mockRoute = {
			params: {
				id: courseId,
			},
		};
		mockStore = {
			courses: {
				actions: {
					get: jest.fn(),
				},
				getters: {
					current: () => {
						return {
							_id: "0000dcfbfb5c7a3f00bf21ab",
							name: "Mathe",
							id: "0000dcfbfb5c7a3f00bf21ab",
						};
					},
				},
				state: () => ({}),
			},
			homeworks: {
				actions: {
					find: jest.fn(),
				},
				getters: {
					list: () => [],
				},
				state: () => ({}),
			},
			lessons: {
				actions: {
					find: jest.fn(),
				},
				getters: {
					list: () => [],
				},
				state: () => ({}),
			},
		};
	});

	it(...isValidComponent(CoursePage));

	it("should render empty state component if the course content is not available", () => {
		// when
		const wrapper = mount(CoursePage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
				$route: mockRoute,
			}),
		});
		// then
		expect(wrapper.findComponent(EmptyState).exists()).toBeTrue();
	});

	it("should render a proper url prop for the task item in order to redirect to the task details page", () => {
		// given
		const lessonId = "5fae757c83b4223660b2e648";
		const homeworkId = "59cce3f6c6abf042248e888d";
		const expectedTopicUrl = `/courses/${courseId}/topics/${lessonId}`;
		const expectedHomeworkUrl = `/homework/${homeworkId}`;
		const customMockStore = { ...mockStore };
		customMockStore.homeworks.getters.list = () => [
			{
				private: true,
				name: "testLesson1",
				_id: "59cce3f6c6abf042248e888d",
				courseId: {
					_id: "0000dcfbfb5c7a3f00bf21ab",
				},
				dueDate: "2300-06-28T13:00:00.000Z",
			},
		];
		customMockStore.lessons.getters.list = () => [
			{
				_id: "5fae757c83b4223660b2e648",
				courseId: "0000dcfbfb5c7a3f00bf21ab",
				hidden: true,
				name: "testName",
			},
		];
		// when
		const wrapper = mount(CoursePage, {
			...createComponentMocks({
				i18n: true,
				store: customMockStore,
				$route: mockRoute,
			}),
		});
		const homeworkLink = wrapper.find(`a#id-${homeworkId}`);
		const lessonLink = wrapper.find(`a#id-${lessonId}`);

		// then
		expect(homeworkLink.attributes().href).toStrictEqual(expectedHomeworkUrl);
		expect(lessonLink.attributes().href).toStrictEqual(expectedTopicUrl);
	});

	it("should redirect to the proper edit page when the edit button of the topic is clicked", async () => {
		// given
		const lessonId = "5fae757c83b4223660b2e648";
		const expectedTopicEditPath = {
			path: `/courses/${courseId}/topics/${lessonId}/edit`,
		};
		const customMockStore = { ...mockStore };
		customMockStore.lessons.getters.list = () => [
			{
				_id: "5fae757c83b4223660b2e648",
				courseId: "0000dcfbfb5c7a3f00bf21ab",
				hidden: true,
				name: "testName",
			},
		];
		// when
		const wrapper = mount(CoursePage, {
			...createComponentMocks({
				i18n: true,
				store: customMockStore,
				$route: mockRoute,
				$router: true,
			}),
			data() {
				return {
					actions: [
						{
							text: "edit",
							event: "edit",
							icon: "create",
						},
					],
				};
			},
		});
		mock$objects(wrapper);
		await wrapper.find(".card-action button").trigger("click");
		await wrapper.find(".context-menu__button").trigger("click");
		// then
		expect(wrapper.vm.$router.push).toHaveBeenCalledWith(expectedTopicEditPath);
	});

	it("should redirect to the proper edit page when the edit button of the homework is clicked", async () => {
		// given
		const homeworkId = "59cce3f6c6abf042248e888d";
		const expectedHomeworkEditPath = { path: `/homework/${homeworkId}/edit` };
		const customMockStore = { ...mockStore };
		customMockStore.homeworks.getters.list = () => [
			{
				private: true,
				name: "testLesson1",
				_id: "59cce3f6c6abf042248e888d",
				courseId: {
					_id: "0000dcfbfb5c7a3f00bf21ab",
				},
				dueDate: "2300-06-28T13:00:00.000Z",
			},
		];
		// when
		const wrapper = mount(CoursePage, {
			...createComponentMocks({
				i18n: true,
				store: customMockStore,
				$route: mockRoute,
				$router: true,
			}),
			data() {
				return {
					taskActions: [
						{
							text: "edit",
							event: "edit",
							icon: "create",
						},
					],
				};
			},
		});
		mock$objects(wrapper);
		await wrapper.find(".card-action button").trigger("click");
		await wrapper.find(".context-menu__button").trigger("click");
		// then
		expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
			expectedHomeworkEditPath
		);
	});

	it.todo(
		"should open a delete modal when the delete button of the task is clicked"
	);
});
