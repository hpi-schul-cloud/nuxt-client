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
		expect(wrapper.findAll(".btn-delete")).toHaveLength(initTimes.length);
		//checks if every property of the object has the class ".item"
		expect(wrapper.findAll(".item")).toHaveLength(initTimes.length * 4);
		//checks the number of rows
		expect(wrapper.findAll(".time-wrapper")).toHaveLength(initTimes.length);
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
		expect(wrapper.vm.value).toHaveLength(1);
		// Add a time
		wrapper.findAll("base-button-stub").at(1).vm.$emit("click");
		expect(wrapper.vm.value).toHaveLength(2);
		// Remove a time
		wrapper.findAll("base-button-stub").at(0).vm.$emit("click");
		expect(wrapper.vm.value).toHaveLength(1);
	});

	// TODO: currently broken on windows
	it.skip("changing the element's value, updates the v-model", () => {
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
		const input = wrapper.find(`input[name="duration"]`);
		input.setValue("65");
		expect(wrapper.vm.content[0].duration).toBe(65);
	});
});
