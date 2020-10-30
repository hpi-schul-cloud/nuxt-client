import CourseHeader from "./CourseHeader";

const title = "Mathe";
const nextLessonDate = "12.10.2020 14:30";
const courseId = "Df56Hyu888";

describe("@components/molecules/CourseHeader", () => {
	it(...isValidComponent(CourseHeader));

	it("should show nextLessonDate", () => {
		const wrapper = shallowMount(CourseHeader, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				title: title,
				nextLessonDate: nextLessonDate,
				courseId: courseId,
			},
		});
		expect(wrapper.text()).toContain(nextLessonDate);
	});

	it("should create a valid redirection link to course files page", () => {
		const wrapper = shallowMount(CourseHeader, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				title: title,
				nextLessonDate: nextLessonDate,
				courseId: courseId,
			},
		});

		expect(wrapper.vm.redirectUrl).toStrictEqual(`/files/courses/${courseId}`);
	});
});
