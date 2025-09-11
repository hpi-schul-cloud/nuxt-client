import StepProgress from "./StepProgress";
import { createTestingVuetify } from "@@/tests/test-utils/setup";

describe("@/components/administration/StepProgress", () => {
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
			global: {
				plugins: [createTestingVuetify()],
			},
			props: {
				steps: mockSteps,
				currentStep: 0,
			},
		});
		expect(wrapper.findAll(".description")).toHaveLength(mockSteps.length);
		expect(wrapper.findAll("li").at(0).classes()).toContain("active");
		expect(wrapper.findAll(".active")).toHaveLength(1);
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
			global: {
				plugins: [createTestingVuetify()],
			},
			props: {
				steps: mockSteps,
				currentStep: step,
			},
		});

		expect(wrapper.findAll("li").at(0).classes()).toContain("done");
		expect(wrapper.findAll("li").at(step).classes()).toContain("active");

		expect(
			wrapper
				.findAll(".description")
				.at(step - 1)
				.text()
		).toBe(mockSteps[step - 1].name);
	});

	it("Test with required default data only active on step 0", () => {
		const wrapper = shallowMount(StepProgress, {
			global: {
				plugins: [createTestingVuetify()],
			},
		});
		expect(wrapper.find("li").classes()).toContain("active");
	});
});
