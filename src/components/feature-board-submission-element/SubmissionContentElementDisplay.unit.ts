import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import SubmissionContentElementDisplay from "./SubmissionContentElementDisplay.vue";

describe("SubmissionContentElementDisplay", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			dueDate: "01.01.2023 01:23",
		};
		const wrapper = shallowMount(SubmissionContentElementDisplay, {
			...createComponentMocks({ i18n: true }),
			propsData,
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
			},
		});

		return {
			wrapper,
			dueDate: propsData.dueDate,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const component = wrapper.findComponent(SubmissionContentElementDisplay);
		expect(component.exists()).toBe(true);
	});

	it("should display icon", async () => {
		const { wrapper } = setup();

		const submissionIcon = wrapper.find("v-icon-stub");

		expect(submissionIcon.exists()).toBe(true);
	});

	it("should find submission tag", () => {
		const { wrapper } = setup();

		const submissionTag = wrapper.find("span").text();

		expect(submissionTag).toBe(
			wrapper.vm.$t("components.cardElement.submissionElement")
		);
	});

	it("should find dueDate text", () => {
		const { wrapper, dueDate } = setup();

		const submissionDueDate = wrapper
			.find("[data-testid=board-submission-element-due-date]")
			.text();

		expect(submissionDueDate).toBe(dueDate);
	});
});
