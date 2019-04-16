import CardFooter from "./CardFooter";
import PulsatingDot from "./PulsatingDot.vue";

describe("@components/CardFooter", () => {
	it("exports a valid component", () => {
		expect(CardFooter).toBeAComponent();
	});
	it("Check if alert is rendering", () => {
		const testAlert = "Test Alert";
		const wrapper = shallowMount(CardFooter, {
			propsData: {
				course: {
					alert: testAlert,
					nextCourseTime: "",
					nextCourseRoom: "",
				},
			},
		});
		expect(wrapper.classes("footer")).toBe(true);
		expect(wrapper.find("pulsating-dot-stub").is(PulsatingDot)).toBe(true);
		expect(wrapper.find(".alert-label").text()).toBe(testAlert);
	});
	it("Check if next course is rendering", () => {
		const testNextCourseTime = "Monday 10:30";
		const testNextCourseRoom = "B112";
		const wrapper = shallowMount(CardFooter, {
			propsData: {
				course: {
					alert: "",
					nextCourseTime: testNextCourseTime,
					nextCourseRoom: testNextCourseRoom,
				},
			},
		});
		expect(wrapper.classes("footer")).toBe(true);
		expect(wrapper.find("base-icon-stub").attributes("icon")).toBe("clock");
		expect(wrapper.find(".next-course-label").isVisible()).toBe(true);
		expect(wrapper.find(".next-course-room-label").text()).toBe(
			testNextCourseRoom
		);
	});
	it("Check when footer has empty data it's empty", () => {
		const wrapper = shallowMount(CardFooter, {
			propsData: {
				course: {
					alert: "",
					nextCourseTime: "",
					nextCourseRoom: "",
				},
			},
		});
		expect(wrapper.classes("footer")).toBe(true);
		expect(wrapper.isEmpty()).toBe(true);
	});
	it("Check when footer has no data it's empty", () => {
		const wrapper = shallowMount(CardFooter, {
			propsData: {},
		});
	});
});
