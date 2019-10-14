import CoursesGrid from "./CoursesGrid";

const course1 = {
	_id: "0000dcfbfb5c7a3f00bf21abc",
	name: "Deutsch",
};

const course2 = {
	_id: "0000dcfbfb5c7a3f00bf21abd",
	name: "Mathe",
};

describe("@components/molecules/CoursesGrid", () => {
	it("exports a valid component", () => {
		expect(CoursesGrid).toBeAComponent();
	});
	it("generates course card grid with 2 cards", () => {
		const courses = [course1, course2];
		const wrapper = shallowMount(CoursesGrid, {
			propsData: { courses: courses },
		});
		expect(wrapper.findAll("course-card-stub").length).toBe(2);
	});
	it("generates course card grid with no courses", () => {
		const wrapper = shallowMount(CoursesGrid);
		expect(wrapper.findAll("course-card-stub").length).toBe(0);
	});
});
