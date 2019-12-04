import CourseTimes from "./CourseTimes";

describe("@components/molecules/CourseTimes", () => {
	it(...isValidComponent(CourseTimes));

	it("Test rendering with random init data", () => {
		const initTimes = [
			{
				weekday: "Montag",
				startTime: "08:00",
				duration: "60",
				room: "H1",
			},
			{
				weekday: "Dienstag",
				startTime: "08:00",
				duration: "60",
				room: "H1",
			},
		];

		const wrapper = shallowMount(CourseTimes, {
			propsData: {
				value: initTimes,
			},
			stubs: {
				"base-input": true,
			},
		});
		//checks if every "row" has a delete button
		expect(wrapper.findAll(".btn-delete").length).toBe(initTimes.length);
		//checks if every property of the object has the class ".item"
		expect(wrapper.findAll(".item").length).toBe(initTimes.length * 4);
		//checks the number of rows
		expect(wrapper.findAll(".time-wrapper").length).toBe(initTimes.length);
	});

	it("Add and remove a time", () => {
		const initTimes = [
			{
				weekday: "Dienstag",
				startTime: "08:00",
				duration: "60",
				room: "H1",
			},
		];
		const wrapper = shallowMount(CourseTimes, {
			propsData: {
				value: initTimes,
			},
			stubs: {
				"base-input": true,
			},
		});
		expect(wrapper.vm.value.length).toBe(1);
		// Add a time
		wrapper
			.findAll("base-button-stub")
			.at(1)
			.vm.$emit("click");
		expect(wrapper.vm.value.length).toBe(2);
		// Remove a time
		wrapper
			.findAll("base-button-stub")
			.at(0)
			.vm.$emit("click");
		expect(wrapper.vm.value.length).toBe(1);
	});

// TODO: currently broken on windows
xit("changing the element's value, updates the v-model", () => {
	const wrapper = mount({
		data: () => ({
			content: [
				{
					weekday: "Dienstag",
					startTime: "08:00",
					duration: 60,
					room: "H1",
				},
			],
		}),
		template: `<course-times v-model="content" />`,
		components: { CourseTimes },
	});
});
