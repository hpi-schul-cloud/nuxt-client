import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { EmptyState } from "@ui-empty-state";

describe("EmptyState", () => {
	const setupWrapper = () => {
		const title = "Test Title";
		const text = "Test Text";

		const wrapper = mount(EmptyState, {
			global: { plugins: [createTestingVuetify()] },
			props: {
				title,
			},
			slots: {
				media: `<svg></svg>`,
				text,
			},
		});

		return { wrapper, title, text };
	};

	it("should render the component with the correct props", () => {
		const { wrapper, title } = setupWrapper();

		expect(wrapper.text()).toContain(title);
	});

	it("should render the media slot", () => {
		const { wrapper } = setupWrapper();

		expect(wrapper.find("svg").exists()).toBe(true);
	});

	it("should render the text slot", () => {
		const { wrapper, text } = setupWrapper();

		expect(wrapper.text()).toContain(text);
	});

	it("should wrap media slot in a div with aria-hidden attribute", () => {
		const { wrapper } = setupWrapper();
		const mediaWrapper = wrapper.find("[aria-hidden=true]");

		expect(mediaWrapper.exists()).toBe(true);
		expect(mediaWrapper.find("svg").exists()).toBe(true);
	});
});
