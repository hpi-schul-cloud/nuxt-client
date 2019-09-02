import CourseCard from "./index.vue";

describe("@components/CourseCard", () => {
	it(...isValidComponent(CourseCard));

	it("Render with default values", () => {
		const wrapper = shallowMount(CourseCard);
		expect(wrapper.find(".abrivation-label").exists()).toBe(true);
		expect(wrapper.find(".course-name-label").exists()).toBe(true);
	});
	it("Background and abriviation isn't set.", () => {
		const course = {
			color: "#01B1AA",
			abbreviation: "",
			newAssignments: 0,
			name: "Deutsch",
			teacherName: "Mr.Mensch",
			alert: "Test Alert!",
			notification: 0,
		};
		const wrapper = shallowMount(CourseCard, {
			propsData: { course },
		});
		expect(wrapper.find(".abrivation-label").text()).toBe(
			course.name.substring(0, 3).toUpperCase()
		);
		expect(wrapper.find(".course-name-label").exists()).toBe(true);
	});
	it("check that assignment and notification aren't being rendered", () => {
		const course = {
			color: "#01B1AA",
			colorGradient: "#03B2D6",
			abbreviation: "ENG",
			newAssignments: 0,
			name: "Test Englisch",
			teacherName: "Mr.Mensch",
			alert: "Test Alert!",
			notification: 0,
		};
		const wrapper = shallowMount(CourseCard, {
			propsData: { course },
		});
		expect(wrapper.find(".notification-dot").exists()).toBe(false);
		expect(wrapper.find(".assignments-label").exists()).toBe(false);
		expect(wrapper.find(".abrivation-label").text()).toBe(course.abbreviation);
		expect(wrapper.find(".course-name-label").text()).toBe(course.name);
	});

	it("Check that assignments and notifications render.", () => {
		const course = {
			color: "#01B1AA",
			colorGradient: "#03B2D6",
			abbreviation: "DEU",
			newAssignments: 42,
			name: "Deutsch",
			teacherName: "Mr.Mensch",
			alert: "Test Alert!",
			notification: 123,
		};
		const wrapper = mount(CourseCard, {
			propsData: { course },
		});
		expect(wrapper.text()).toContain(course.newAssignments.toString());
		expect(wrapper.text()).toContain(course.notification.toString());
	});
});
