import Vue from "vue";
import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, MountOptions } from "@vue/test-utils";
import SubmissionContentElementEdit from "./SubmissionContentElementEdit.vue";
import SubmissionContentElementMenu from "./SubmissionContentElementMenu.vue";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";
import { i18nMock, submissionsResponseFactory } from "@@/tests/test-utils";
import { DateTimePicker } from "@feature-date-time-picker";

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
		};
		const wrapper = shallowMount(
			SubmissionContentElementEdit as MountOptions<Vue>,
			{
				...createComponentMocks({ i18n: true }),
				propsData,
				provide: {
					[I18N_KEY.valueOf()]: i18nMock,
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

	it("should render DateTimePicker", () => {
		const { wrapper } = setup();

		const dateTimePicker = wrapper.findComponent(DateTimePicker);

		expect(dateTimePicker.exists()).toBe(true);
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
