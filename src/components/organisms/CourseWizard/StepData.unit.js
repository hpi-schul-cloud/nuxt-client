import StepData from "./StepData";
import BaseInput from "@components/base/BaseInput/BaseInput";

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

	it("test computed courseTimes getter", () => {
		const mockCourse = getValidCourse();
		mockCourse.times = [
			{
				weekday: 0,
				startTime: "28800000",
				duration: "3600000",
				room: "H1",
			},
		];
		const wrapper = mountWithCourse({
			course: mockCourse,
		});
		const { courseTimes } = wrapper.vm;
		expect(courseTimes.length).toBe(1);
		expect(courseTimes[0].duration).toBe(60);
		expect(courseTimes[0].room).toBe("H1");
		expect(courseTimes[0].startTime).toBe("08:00");
		expect(courseTimes[0].weekday).toBe(0);
	});
});

it("test computed courseTimes setter", () => {
	const mockCourse = getValidCourse();
	const wrapper = mountWithCourse({
		course: mockCourse,
	});
	const mockTime = [
		{
			weekday: 0,
			startTime: "08:00",
			duration: 60,
			room: "H1",
		},
	];
	wrapper.vm.courseTimes = mockTime;
	const events = wrapper.emitted();
	expect(events["update:course"].length).toBe(1);
	const updatedTimes = events["update:course"][0][0].times;
	expect(updatedTimes.length).toBe(1);
	expect(updatedTimes[0].room).toBe("H1");
	expect(updatedTimes[0].duration).toBe("3600000");
	expect(updatedTimes[0].startTime).toBe("28800000");
	expect(updatedTimes[0].weekday).toBe(0);
});
it("changing the element's value, updates the v-model", () => {
	const testInput = "any string";
	const wrapper = mount({
		data: () => ({ content: "" }),
		template: `<base-input
		v-model="content"
		name="name"
		label="label"
		type="text"
		placeholder="placehodler"
	/>`,
		components: { BaseInput },
	});
	const input = wrapper.find(`input`);
	input.setValue(testInput);
	expect(wrapper.vm.content).toBe(testInput);
});
