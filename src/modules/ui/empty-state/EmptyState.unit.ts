import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { EmptyState } from "@ui-empty-state";

describe("EmptyState", () => {
	const setupWrapper = () => {
		const title = "Test Title";
		const headline = "Test Headline";
		const text = "Test Text";

		const wrapper = mount(EmptyState, {
			global: { plugins: [createTestingVuetify()] },
			props: {
				title,
				headline,
				text,
			},
			slots: {
				media: `<svg></svg>`,
			},
		});

		return { wrapper, title, headline, text };
	};

	it("should render the component with the correct props", () => {
		const { wrapper, title, headline, text } = setupWrapper();

		expect(wrapper.text()).toContain(title);
		expect(wrapper.text()).toContain(text);
		expect(wrapper.text()).toContain(headline);
	});

	it("should render the media slot", () => {
		const { wrapper } = setupWrapper();

		expect(wrapper.find("svg").exists()).toBe(true);
	});

	it("should wrap media slot in a div with aria-hidden attribute", () => {
		const { wrapper } = setupWrapper();
		const mediaWrapper = wrapper.find("[aria-hidden=true]");

		expect(mediaWrapper.exists()).toBe(true);
		expect(mediaWrapper.find("svg").exists()).toBe(true);
	});
});
