import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import ContentInitialState from "./ContentInitialState.vue";
import { ContentInitialSvg, EmptyState } from "@ui-empty-state";

describe("@/components/molecules/ContentInitialState", () => {
	const wrapper = mount(ContentInitialState, {
		global: {
			plugins: [createTestingI18n(), createTestingVuetify()],
		},
	});

	it("Provides proper title", () => {
		expect(wrapper.findComponent(EmptyState).props("title")).toBe(
			"pages.content.initState.title"
		);
	});

	it("Provides svg", () => {
		const emptyStateElement = wrapper.findComponent(EmptyState);
		const svgComponent = emptyStateElement.findComponent(ContentInitialSvg);

		expect(svgComponent.exists()).toBe(true);
	});

	it("Provides message", () => {
		expect(wrapper.find(".initial-state-description").exists()).toBe(true);
	});
});
