import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import ContentEmptyState from "./ContentEmptyState.vue";
import { ContentEmptySvg, EmptyState } from "@ui-empty-state";

describe("@/components/lern-store/ContentEmptyState", () => {
	const wrapper = mount(ContentEmptyState, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
	});

	it("Renders an EmptyState", () => {
		const emptyStateElement = wrapper.findComponent(EmptyState);

		expect(emptyStateElement.exists()).toBe(true);
	});

	it("Provides prop title", () => {
		const emptyStateElement = wrapper.findComponent(EmptyState);

		expect(emptyStateElement.props().title).toBe(
			"pages.content.emptyState.error.title"
		);
	});

	it("Provides svg", () => {
		const emptyStateElement = wrapper.findComponent(EmptyState);
		const svgComponent = emptyStateElement.findComponent(ContentEmptySvg);

		expect(svgComponent.exists()).toBe(true);
	});

	it("have a description", () => {
		const emptyStateElement = wrapper.getComponent(EmptyState);
		const text = emptyStateElement.findAll("p")[1];

		const suggestionItems = [
			"moreThanOneCharacter",
			"correctSpelling",
			"otherSearchTerms",
			"generalSearchTerms",
			"lessSearchTerms",
		]
			.map((key) => `pages.content.emptyState.error.message.suggestions.${key}`)
			.join("");

		expect(text.text()).toBe(
			`pages.content.emptyState.error.message.suggestions${suggestionItems}`
		);
	});
});
