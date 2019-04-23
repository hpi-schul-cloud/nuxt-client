import { shallowMount } from "@vue/test-utils";
import StepData from "./StepData";

describe("@components/StepData", () => {
	it(...isValidComponent(StepData));

	it("Check that everthing is rendering", () => {
		const mockCourse = {
			name: "1",
			description: "2",
			startDate: "",
			untilDate: "",
			times: [],
			teachers: ["test"],
		};
		const wrapper = shallowMount(StepData, {
			propsData: {
				course: mockCourse,
				availableTeachers: ["Test"],
				vmodel: "text",
				options: "test",
				value: "test2",
			},
			stubs: {
				"base-input": true,
				"base-select": true,
				"base-textarea": true,
			},
		});
		expect(wrapper.findAll("base-input-stub").length).toBe(3);
		expect(wrapper.find("base-textarea-stub").exists()).toBe(true);
		expect(wrapper.findAll("base-select-stub").length).toBe(2);
	});
	it("Test with non required as default", () => {
		const mockCourse = {
			name: "3",
			description: "4",
			startDate: "",
			untilDate: "",
			times: [],
			teachers: ["test"],
		};
		const wrapper = shallowMount(StepData, {
			propsData: {
				course: mockCourse,
				vmodel: "text",
				options: "test",
				value: "test2",
			},
			stubs: {
				"base-input": true,
				"base-select": true,
				"base-textarea": true,
			},
		});
		expect(wrapper.findAll("base-input-stub").length).toBe(3);
		expect(wrapper.find("base-textarea-stub").exists()).toBe(true);
		expect(wrapper.findAll("base-select-stub").length).toBe(2);
	});

	//should print error that the validator is failing
	it("Test validator by leaving out a key in courses", () => {
		const mockCourse = {
			untilDate: "",
			times: [],
			teachers: ["test"],
		};
		const wrapper = shallowMount(StepData, {
			propsData: {
				course: mockCourse,
				vmodel: "text",
				options: "test",
				value: "test2",
			},
			stubs: {
				"base-input": true,
				"base-select": true,
				"base-textarea": true,
			},
		});
		expect(wrapper.findAll("base-input-stub").length).toBe(3);
		expect(wrapper.find("base-textarea-stub").exists()).toBe(true);
		expect(wrapper.findAll("base-select-stub").length).toBe(2);
	});
});
