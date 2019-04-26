import CourseCard from "./CourseCard";

describe("@components/CourseCard", () => {
	it(...isValidComponent(CourseCard));

	it("check for footer and tab", () => {
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

		expect(wrapper.find("card-footer-stub").exists()).toBe(true);
		expect(wrapper.find(".tab").exists()).toBe(true);
		expect(wrapper.find(".tab-label").text()).toBe(course.teacherName);
		expect(wrapper.find(".abrivation-label").text()).toBe(course.abbreviation);
		expect(wrapper.find(".course-name-label").text()).toBe(course.name);
	});
	it("Check default values", () => {
		const wrapper = shallowMount(CourseCard);
		expect(wrapper.find(".abrivation-label").exists()).toBe(true);
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
		expect(wrapper.find(".card-info").attributes("style")).toBe(
			"background-color: rgb(1, 177, 170);"
		);
		expect(wrapper.find(".course-name-label").exists()).toBe(true);
	});
	it("Check that assignments and notifications render.", () => {
		const course = {
			color: "#01B1AA",
			colorGradient: "#03B2D6",
			abbreviation: "DEU",
			newAssignments: 1,
			name: "Deutsch",
			teacherName: "Mr.Mensch",
			alert: "Test Alert!",
			notification: 2,
		};
		const wrapper = shallowMount(CourseCard, {
			propsData: { course },
		});
		expect(wrapper.find("base-icon-stub").exists()).toBe(true);
		expect(wrapper.find(".assignments-label").text()).toBe(
			course.newAssignments.toString()
		);
		expect(wrapper.find(".notification-dot").text()).toBe(
			course.notification.toString()
		);
	});
});
