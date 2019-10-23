import CourseTimes from "./CourseTimes";

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

it("changing the element's value, updates the v-model", () => {
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
