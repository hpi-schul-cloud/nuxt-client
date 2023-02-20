import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, Wrapper } from "@vue/test-utils";
import Vue, { ref } from "vue";
import CardHost from "./CardHost.vue";
import { useCardState } from "./CardState.composable";
import { LegacyLessonCard, LegacyTaskCard } from "./types/Card";

const MOCK_PROP_DEFAULT = {
	height: 200,
	id: "test-id",
};

const MOCK_TASK_REFERENCE: LegacyTaskCard = {
	id: "task-id",
	title: "Task Card",
	height: 200,
	elements: [],
	taskId: "25",
	cardType: "legacy-task-reference",
	visibility: { publishedAt: "2022-01-01 20:00:00" },
};

const MOCK_LESSON_REFERENCE: LegacyLessonCard = {
	id: "lesson-id",
	title: "Lesson Card",
	height: 200,
	elements: [],
	lessonId: "25",
	cardType: "legacy-lesson-reference",
	visibility: { publishedAt: "2022-01-01 20:00:00" },
};

jest.mock("./CardState.composable");
const mockedUseCardState = jest.mocked(useCardState);

describe("BoardColumn", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options?: {
		card: LegacyTaskCard | LegacyLessonCard;
		isLoading?: boolean;
	}) => {
		const { card, isLoading } = options ?? {};
		document.body.setAttribute("data-app", "true");
		mockedUseCardState.mockReturnValue({
			fetchCard: jest.fn(),
			card: ref(card),
			isLoading: ref(isLoading ?? false),
		});
		wrapper = shallowMount(CardHost, {
			...createComponentMocks({}),
			propsData: MOCK_PROP_DEFAULT,
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({ card: MOCK_TASK_REFERENCE });
			expect(wrapper.findComponent(CardHost).exists()).toBe(true);
		});

		describe("'CardSkeleton' component", () => {
			it("should be rendered if loading is set 'true'", () => {
				setup({ card: MOCK_TASK_REFERENCE, isLoading: true });
				expect(wrapper.findComponent({ name: "CardSkeleton" }).exists()).toBe(
					true
				);
			});

			it("should not be rendered if loading is set 'false'", () => {
				setup({ card: MOCK_TASK_REFERENCE });
				expect(wrapper.findComponent({ name: "CardSkeleton" }).exists()).toBe(
					false
				);
			});
		});
	});

	describe("when cardType is 'legacy-task-reference'", () => {
		it("should render a 'LegacyTaskReference'", () => {
			setup({ card: MOCK_TASK_REFERENCE });
			const taskCardComponent = wrapper.findComponent({
				name: "CardLegacyTaskReference",
			});
			const lessonCardComponent = wrapper.findComponent({
				name: "CardLegacyLessonReference",
			});
			expect(taskCardComponent.vm).toBeDefined();
			expect(lessonCardComponent.vm).not.toBeDefined();
		});
	});

	describe("when cardType is 'legacy-lesson-reference'", () => {
		it("should render a 'LegacyLessonReference'", () => {
			setup({ card: MOCK_LESSON_REFERENCE });
			const taskCardComponent = wrapper.findComponent({
				name: "CardLegacyTaskReference",
			});
			const lessonCardComponent = wrapper.findComponent({
				name: "CardLegacyLessonReference",
			});
			expect(lessonCardComponent.vm).toBeDefined();
			expect(taskCardComponent.vm).not.toBeDefined();
		});
	});
});
