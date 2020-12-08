import { default as CoursePage } from "./index";

describe("courses/new", () => {
	let mockStore;

	beforeEach(() => {
		mockStore = {
			courses: {
				namespaced: true,
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
					list: () => [
						{
							private: true,
							name: "testLesson1",
							_id: "59cce3f6c6abf042248e888d",
							courseId: {
								_id: "0000dcfbfb5c7a3f00bf21ab",
							},
							dueDate: "2300-06-28T13:00:00.000Z",
						},
					],
				},
				state: () => ({}),
			},
			lessons: {
				actions: {
					find: jest.fn(),
				},
				getters: {
					list: () => [
						{
							_id: "5fae757c83b4223660b2e648",
							courseId: "0000dcfbfb5c7a3f00bf21ab",
							hidden: true,
							name: "testName",
						},
					],
				},
				state: () => ({}),
			},
		};
	});

	it(...isValidComponent(CoursePage));

	it("should redirect to the proper details page when a task item is clicked", () => {
		// given
		const courseId = "0000dcfbfb5c7a3f00bf21ab";
		const lessonId = "5fae757c83b4223660b2e648";
		const homeworkId = "59cce3f6c6abf042248e888d";
		const expectedLessonUrl = `/courses/${courseId}/topics/${lessonId}`;
		const expectedHomeworkUrl = `/homework/${homeworkId}`;
		const mockRoute = {
			params: {
				id: courseId,
			},
		};
		// when
		const wrapper = mount(CoursePage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
				$route: mockRoute,
			}),
		});
		const homeworkLink = wrapper.find(`a#id-${homeworkId}`);
		const lessonLink = wrapper.find(`a#id-${lessonId}`);

		// then
		expect(homeworkLink.attributes().href).toStrictEqual(expectedHomeworkUrl);
		expect(lessonLink.attributes().href).toStrictEqual(expectedLessonUrl);
	});
});
