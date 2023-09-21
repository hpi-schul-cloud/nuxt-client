import Vue from "vue";
import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, MountOptions } from "@vue/test-utils";
import SubmissionContentElementEdit from "./SubmissionContentElementEdit.vue";
import SubmissionContentElementMenu from "./SubmissionContentElementMenu.vue";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";
import { submissionsResponseFactory } from "@@/tests/test-utils";

const mockedSubmissions = submissionsResponseFactory.build();

describe("SubmissionContentElementEdit", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			dueDate: "01.01.2023 01:23",
			isFirstElement: false,
			isLastElement: false,
			hasMultipleElements: false,
			submissions: mockedSubmissions,
			editable: true,
			loading: true,
		};
		const wrapper = shallowMount(
			SubmissionContentElementEdit as MountOptions<Vue>,
			{
				...createComponentMocks({ i18n: true }),
				propsData,
				provide: {
					[I18N_KEY.valueOf()]: { t: (key: string) => key },
				},
			}
		);

		return {
			wrapper,
			dueDate: propsData.dueDate,
			isFirstElementProp: propsData.isFirstElement,
			isLastElementProp: propsData.isLastElement,
			hasMultipleElementsProp: propsData.hasMultipleElements,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const submissionContentElement = wrapper.findComponent(
			SubmissionContentElementEdit
		);
		expect(submissionContentElement.exists()).toBe(true);
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

	it("should render the SubmissionContentElementMenu", () => {
		const { wrapper } = setup();

		const menu = wrapper.findComponent(SubmissionContentElementMenu);

		expect(menu.exists()).toBe(true);
	});

	it("should hand over isFirstElement prop correctly to SubmissionContentElementMenu", () => {
		const { wrapper, isFirstElementProp } = setup();

		const isFirstElement = wrapper
			.findComponent(SubmissionContentElementMenu)
			.props("isFirstElement");

		expect(isFirstElement).toBe(isFirstElementProp);
	});

	it("should hand over isLastElement prop correctly to SubmissionContentElementMenu", () => {
		const { wrapper, isLastElementProp } = setup();

		const isLastElement = wrapper
			.findComponent(SubmissionContentElementMenu)
			.props("isLastElement");

		expect(isLastElement).toBe(isLastElementProp);
	});

	it("should hand over hasMultipleElements prop correctly to SubmissionContentElementMenu", () => {
		const { wrapper, hasMultipleElementsProp } = setup();

		const hasMultipleElements = wrapper
			.findComponent(SubmissionContentElementMenu)
			.props("hasMultipleElements");

		expect(hasMultipleElements).toBe(hasMultipleElementsProp);
	});

	it("should hand over submissions prop to SubmissionItemsTeacherDisplay", () => {
		const { wrapper } = setup();

		const submissions = wrapper
			.findComponent(SubmissionItemsTeacherDisplay)
			.props("submissions");

		expect(submissions).toBe(mockedSubmissions);
	});

	it("should hand over loading prop to SubmissionItemsTeacherDisplay", () => {
		const { wrapper } = setup();

		const loading = wrapper
			.findComponent(SubmissionItemsTeacherDisplay)
			.props("loading");

		expect(loading).toBe(true);
	});

	it("should hand over editable prop to SubmissionItemsTeacherDisplay", () => {
		const { wrapper } = setup();

		const editable = wrapper
			.findComponent(SubmissionItemsTeacherDisplay)
			.props("editable");

		expect(editable).toBe(true);
	});

	it("should forward delete:element from SubmissionContentElementMenu", () => {
		const { wrapper } = setup();
		const menu = wrapper.findComponent(SubmissionContentElementMenu);

		menu.vm.$emit("delete:element");

		expect(wrapper.emitted("delete:element")).toHaveLength(1);
	});

	it("should forward move-down:element from SubmissionContentElementMenu", () => {
		const { wrapper } = setup();
		const menu = wrapper.findComponent(SubmissionContentElementMenu);

		menu.vm.$emit("move-down:element");

		expect(wrapper.emitted("move-down:element")).toHaveLength(1);
	});

	it("should forward move-down:up from SubmissionContentElementMenu", () => {
		const { wrapper } = setup();
		const menu = wrapper.findComponent(SubmissionContentElementMenu);

		menu.vm.$emit("move-up:element");

		expect(wrapper.emitted("move-up:element")).toHaveLength(1);
	});
});
