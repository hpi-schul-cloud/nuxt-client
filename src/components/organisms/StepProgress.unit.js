import StepProgress from "./StepProgress";

describe("@components/organisms/StepProgress", () => {
	it(...isValidComponent(StepProgress));

	it("Test that all steps are rendered", () => {
		const mockSteps = [
			{ name: "Test one" },
			{ name: "Test two" },
			{ name: "Test three" },
			{ name: "Test four" },
			{ name: "Test five" },
			{ name: "Test six" },
		];
		const wrapper = shallowMount(StepProgress, {
			propsData: {
				steps: mockSteps,
				currentStep: 0,
			},
		});
		expect(wrapper.findAll(".description").length).toBe(mockSteps.length);
		expect(
			wrapper
				.findAll("li")
				.at(0)
				.classes()
		).toContain("active");
		expect(wrapper.findAll(".active").length).toBe(1);
	});
	it("Test with the 3rd step all steps are rendered", () => {
		const mockSteps = [
			{ name: "Test one" },
			{ name: "Test two" },
			{ name: "Test three" },
			{ name: "Test four" },
			{ name: "Test five" },
			{ name: "Test six" },
		];
		const step = 3;
		const wrapper = shallowMount(StepProgress, {
			propsData: {
				steps: mockSteps,
				currentStep: step,
			},
		});

		expect(
			wrapper
				.findAll("li")
				.at(0)
				.classes()
		).toContain("done");
		expect(
			wrapper
				.findAll("li")
				.at(step)
				.classes()
		).toContain("active");

		expect(
			wrapper
				.findAll(".description")
				.at(step - 1)
				.text()
		).toBe(mockSteps[step - 1].name);
	});

	it("Test with required default data only active on step 0", () => {
		const wrapper = shallowMount(StepProgress);
		expect(wrapper.find("li").classes()).toContain("active");
	});
});
