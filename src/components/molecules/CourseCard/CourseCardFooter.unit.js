import CourseCardFooter from "./CourseCardFooter";

describe("@components/molecules/CourseCardFooter", () => {
	it(...isValidComponent(CourseCardFooter));

	it("Check if alert is rendering", () => {
		const testAlert = "Test Alert";
		const wrapper = shallowMount(CourseCardFooter, {
			propsData: {
				alert: testAlert,
				nextCourseTime: "",
				nextCourseRoom: "",
			},
		});
		expect(wrapper.classes("footer")).toBe(true);
		expect(wrapper.find("pulsating-dot-stub").exists()).toBe(true);
		expect(wrapper.find(".alert-label").text()).toBe(testAlert);
	});
	it("Check if next course is rendering", () => {
		const testNextCourseTime = "Monday 10:30";
		const testNextCourseRoom = "B112";
		const wrapper = shallowMount(CourseCardFooter, {
			propsData: {
				alert: "",
				nextCourseTime: testNextCourseTime,
				nextCourseRoom: testNextCourseRoom,
			},
		});
		expect(wrapper.classes("footer")).toBe(true);
		expect(wrapper.find("base-icon-stub").attributes("icon")).toBe("clock");
		expect(wrapper.find(".next-course").text()).toContain(testNextCourseRoom);
	});
	it("Check when footer has empty data it's empty", () => {
		const wrapper = shallowMount(CourseCardFooter, {
			propsData: {
				alert: "",
				nextCourseTime: "",
				nextCourseRoom: "",
			},
		});
		expect(wrapper.classes("footer")).toBe(true);
		expect(wrapper.element.textContent).toBe("");
	});
});
