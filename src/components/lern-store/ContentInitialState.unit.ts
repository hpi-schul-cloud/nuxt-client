import vCustomEmptyState from "@/components/molecules/vCustomEmptyState.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import ContentInitialState from "./ContentInitialState.vue";

describe("@/components/molecules/ContentInitialState", () => {
	const wrapper = mount(ContentInitialState, {
		global: {
			plugins: [createTestingI18n(), createTestingVuetify()],
		},
		data: () => ({}),
	});

	it("Provides proper title", () => {
		expect(wrapper.findComponent(vCustomEmptyState).props("title")).toBe(
			"pages.content.initState.title"
		);
	});
	it("Provides message", () => {
		expect(wrapper.find(".initial-state-description").exists()).toBe(true);
	});
});
