import vCustomEmptyState from "@/components/molecules/vCustomEmptyState.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import ContentEmptyState from "./ContentEmptyState.vue";

describe("@/components/molecules/ContentEmptyState", () => {
	const wrapper = shallowMount(ContentEmptyState, {
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
			"pages.content.empty_state.error.title"
		);
	});

	it("Provides prop image", () => {
		const vCustomEmptyStateElement = wrapper.findComponent(vCustomEmptyState);

		expect(vCustomEmptyStateElement.props().image).toBe("content-empty");
	});

	it("Provides prop message", () => {
		const vCustomEmptyStateElement = wrapper.findComponent(vCustomEmptyState);

		const renderHTMLElement =
			vCustomEmptyStateElement.vm.$slots.description()[0];

		expect(renderHTMLElement.props.html).toBe(
			"pages.content.empty_state.error.message"
		);
	});

	it("Provides prop component", () => {
		const vCustomEmptyStateElement = wrapper.findComponent(vCustomEmptyState);

		const renderHTMLElement =
			vCustomEmptyStateElement.vm.$slots.description()[0];

		expect(renderHTMLElement.props.component).toBe("span");
	});
});
