import CourseWizard from "./index";

describe("@components/CourseWizard", () => {
	it(...isValidComponent(CourseWizard));

	it("Test that only progress and data are showing.", () => {
		const wrapper = shallowMount(CourseWizard, {
			propsData: {
				user: {
					_id: "test1",
				},
			},
		});
		expect(wrapper.find("step-progress-stub").isVisible()).toBe(true);
		expect(wrapper.find("step-data-stub").isVisible()).toBe(true);
		expect(wrapper.find("step-members-stub").isVisible()).toBe(false);
		expect(wrapper.find("step-done-stub").isVisible()).toBe(false);
		expect(
			wrapper.find(".step-wrapper").findAll("base-button-stub").length
		).toBe(1);
	});

	it("Test click next step", () => {
		const wrapper = shallowMount(CourseWizard, {
			propsData: {
				steps: [
					{ name: "Test one" },
					{ name: "Test two" },
					{ name: "Test three" },
					{ name: "Test four" },
					{ name: "Test five" },
					{ name: "Test six" },
				],
				user: {
					_id: "test1",
				},
			},
		});

		expect(wrapper.vm.currentStep).toBe(0);
		expect(wrapper.findAll("base-button-stub").length).toBe(1);
		//find button next step, click next
		wrapper
			.findAll("base-button-stub")
			.at(0)
			.vm.$emit("click");
		expect(wrapper.vm.currentStep).toBe(1);
		//has buttons: "Zurück", "Überspringen", "Weiter"
		expect(wrapper.findAll("base-button-stub").length).toBe(3);

		//find button next step, click next
		wrapper
			.findAll("base-button-stub")
			.at(2)
			.vm.$emit("click");
		expect(wrapper.vm.currentStep).toBe(2);
		//has buttons: "Zurück", "Weiter"
		expect(wrapper.findAll("base-button-stub").length).toBe(2);

		// //find button step back, click back
		wrapper
			.findAll("base-button-stub")
			.at(0)
			.vm.$emit("click");
		expect(wrapper.vm.currentStep).toBe(1);
	});
});
