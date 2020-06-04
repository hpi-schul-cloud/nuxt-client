import CourseWizard from "./index";
import { render } from "@testing-library/vue";
import { toBeVisible } from "@testing-library/jest-dom/matchers";

expect.extend({ toBeVisible });

describe("@components/organisms/CourseWizard", () => {
	it(...isValidComponent(CourseWizard));

	it("Test that only progress and data are showing.", async () => {
		const { getByTestId } = render(CourseWizard, {
			propsData: {
				user: {
					_id: "test1",
				},
				course: {
					name: "",
					description: "",
					startDate: "",
					untilDate: "",
					times: [],
					teacherIds: [],
					substitutionIds: [],
					userIds: [],
					classIds: [],
				},
			},
		});
		expect(getByTestId("stepProgressTest")).toBeVisible();
		expect(getByTestId("stepDataTest")).toBeVisible();
		expect(getByTestId("stepMembersTest")).not.toBeVisible();
		expect(getByTestId("stepDoneTest")).not.toBeVisible();
		// expect(
		// 	wrapper.find(".step-wrapper").findAll("base-button-stub")
		// ).toHaveLength(1);
	});

	it("Test click next step", async () => {
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
				course: {
					name: "",
					description: "",
					startDate: "",
					untilDate: "",
					times: [],
					teacherIds: [],
					substitutionIds: [],
					userIds: [],
					classIds: [],
				},
			},
		});

		expect(wrapper.vm.currentStep).toBe(0);
		expect(wrapper.findAll("base-button-stub")).toHaveLength(1);
		//find button next step, click next
		wrapper.findAll("base-button-stub").at(0).vm.$emit("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.currentStep).toBe(1);
		//has buttons: "Zurück", "Überspringen", "Weiter"
		expect(wrapper.findAll("base-button-stub")).toHaveLength(3);

		//find button next step, click next
		wrapper.findAll("base-button-stub").at(2).vm.$emit("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.currentStep).toBe(2);
		//has buttons: "Zurück", "Weiter"
		expect(wrapper.findAll("base-button-stub")).toHaveLength(2);

		// //find button step back, click back
		wrapper.findAll("base-button-stub").at(0).vm.$emit("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.currentStep).toBe(1);
	});
});
