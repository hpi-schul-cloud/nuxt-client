import vCustomEmptyState from "@/components/molecules/vCustomEmptyState.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import ContentEmptyState from "./ContentEmptyState.vue";

describe("@/components/molecules/ContentEmptyState", () => {
	const wrapper = mount(ContentEmptyState, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		data: () => ({}),
	});

	it("Renders an vCustomEmptyState", () => {
		const vCustomEmptyStateElement = wrapper.findComponent(vCustomEmptyState);

		expect(vCustomEmptyStateElement.exists()).toBe(true);
	});

	it("Provides prop title", () => {
		const vCustomEmptyStateElement = wrapper.findComponent(vCustomEmptyState);

		expect(vCustomEmptyStateElement.props().title).toBe(
			"pages.content.emptyState.error.title"
		);
	});

	it("Provides prop image", () => {
		const vCustomEmptyStateElement = wrapper.findComponent(vCustomEmptyState);

		expect(vCustomEmptyStateElement.props().image).toBe("content-empty");
	});

	it("have a description", () => {
		const vCustomEmptyStateElement = wrapper.getComponent(vCustomEmptyState);
		const description = vCustomEmptyStateElement.get("p");

		const suggestionItems = [
			"moreThanOneCharacter",
			"correctSpelling",
			"otherSearchTerms",
			"generalSearchTerms",
			"lessSearchTerms",
		]
			.map((key) => `pages.content.emptyState.error.message.suggestions.${key}`)
			.join("");

		expect(description.text()).toBe(
			`pages.content.emptyState.error.message.suggestions${suggestionItems}`
		);
	});
});
