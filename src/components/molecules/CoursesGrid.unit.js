import CoursesGrid from "./CoursesGrid";

const course1 = {
	_id: "0000dcfbfb5c7a3f00bf21abc",
	color: "#01B1AA",
	colorGradient: "#03B2D6",
	abbreviation: "ENG",
	newAssignments: 0,
	name: "Test Englisch",
	teacherName: "Mr.Mensch",
	alert: "Test Alert!",
	notification: 0,
};
const course2 = {
	_id: "0000dcfbfb5c7a3f00bf21abd",
	color: "#01B1AA",
	colorGradient: "#03B2D6",
	abbreviation: "ENG",
	newAssignments: 0,
	name: "Test Englisch",
	teacherName: "Mr.Mensch",
	alert: "Test Alert!",
	notification: 0,
};

describe("@components/molecules/CoursesGrid", () => {
	it("exports a valid component", () => {
		expect(CoursesGrid).toBeAComponent();
	});

	it("generates course card grid with 2 cards", () => {
		const courses = [course1, course2];
		const wrapper = shallowMount(CoursesGrid, {
			propsData: { courses: courses },
			...createComponentMocks({ i18n: true }),
		});
		expect(wrapper.findAll("course-card-stub")).toHaveLength(2);
	});

	it("generates course card grid with no courses", () => {
		const wrapper = shallowMount(CoursesGrid, {
			propsData: { courses: [] },
			...createComponentMocks({ i18n: true }),
		});
		expect(wrapper.findAll("course-card-stub")).toHaveLength(0);
	});
});
