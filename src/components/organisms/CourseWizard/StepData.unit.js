import StepData from "./StepData";

const getValidCourse = () => ({
	name: "1",
	description: "2",
	startDate: "",
	untilDate: "",
	times: [],
	teacherIds: ["test2"],
	substitutionIds: [],
	userIds: [],
	classIds: [],
});

const mountWithCourse = (propsData = {}) => {
	return shallowMount(StepData, {
		propsData,
		stubs: {
			"base-input": true,
			"base-select": true,
			"base-textarea": true,
		},
	});
};

const checkRendering = (wrapper) => {
	expect(wrapper.findAll("base-input-stub").length).toBe(3);
	expect(wrapper.find("base-textarea-stub").exists()).toBe(true);
	expect(wrapper.findAll("base-select-stub").length).toBe(2);
};

describe("@components/StepData", () => {
	it(...isValidComponent(StepData));

	it("Check that everything is rendering", () => {
		const propsData = {};
		propsData.availableTeachers = ["Test"];
		propsData.course = getValidCourse();
		checkRendering(mountWithCourse(propsData));
	});
	it("Test with non required as default", () => {
		const propsData = {};
		propsData.course = getValidCourse();
		checkRendering(mountWithCourse(propsData));
	});

	it("Test validator by leaving out a key in courses", () => {
		//should print error that the validator is failing
		let outputData = "";
		console.error = jest.fn((inputs) => (outputData += inputs));

		const propsData = {};
		propsData.course = {
			// some required values are missing (name)
			untilDate: "",
			times: [],
			teachers: ["test"],
		};
		checkRendering(mountWithCourse(propsData));
		expect(outputData).toContain("Invalid prop");
	});
});
