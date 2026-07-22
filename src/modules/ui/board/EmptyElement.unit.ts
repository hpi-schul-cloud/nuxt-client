import EmptyElement from "./EmptyElement.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { mdiLink } from "@icons/material";
import { mount } from "@vue/test-utils";
import { VIcon } from "vuetify/components";

describe("EmptyElement", () => {
	const setup = (props: { icon: string; title: string }) => {
		const wrapper = mount(EmptyElement, {
			global: {
				plugins: [createTestingVuetify()],
			},
			props,
		});

		return { wrapper };
	};

	it("should render the provided title", () => {
		const icon = mdiLink;
		const title = "No content available";

		const { wrapper } = setup({
			icon,
			title,
		});
		const iconComponent = wrapper.getComponent(VIcon);

		expect(iconComponent.props("icon")).toBe(icon);
		expect(wrapper.text()).toContain(title);
	});

	it("should have a marker class so keyboard interactions can be identified by parent handlers", () => {
		const { wrapper } = setup({ icon: mdiLink, title: "No content available" });

		const card = wrapper.find('[data-testid="board-empty-element"]');

		expect(card.classes()).toContain("board-empty-element");
	});
});
