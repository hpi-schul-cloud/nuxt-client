import Courses from "./Courses";

describe("@components/Courses", () => {
	it(...isValidComponent(Courses));

	it("Test default/empty", () => {
		const wrapper = shallowMount(Courses);
		expect(wrapper.find(".app").exists()).toBe(true);
	});
	//TODO missing test with set courses prop need to find out what format the server sends courses json
});
