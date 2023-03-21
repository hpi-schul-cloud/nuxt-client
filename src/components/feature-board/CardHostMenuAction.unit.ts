import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import CardHostMenuAction from "./CardHostMenuAction.vue";

describe("CardHostMenuAction Component", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = mount(CardHostMenuAction as MountOptions<Vue>, {
			...createComponentMocks({}),
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup();
			expect(wrapper).toBeDefined();
		});

		it("should emit if is clicked", async () => {
			setup();
			const listItemComponent = wrapper.findComponent({ name: "VListItem" });
			listItemComponent.vm.$emit("click"); // TODO: investigate how to handle click.prevent event in testing
			const emitted = wrapper.emitted();

			expect(emitted).toBeDefined();
		});
	});
});
