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
		expect(wrapper.findAll(".btn-delete").length).toBe(initTimes.length);
		expect(wrapper.findAll(".item").length).toBe(initTimes.length * 4);
	});

	//TODO something like this. But html isn't being rerendered
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
});
