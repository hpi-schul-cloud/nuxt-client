import { mount, Wrapper } from "@vue/test-utils";
import ExternalToolToolbar from "./ExternalToolToolbar.vue";
import createComponentMocks from "../../../tests/test-utils/componentMocks";

describe("ExternalToolToolbar", () => {
	let wrapper: Wrapper<any>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = mount(ExternalToolToolbar, {
			...createComponentMocks({
				i18n: true,
			}),
		});
	};

	describe("when component is used", () => {
		it("should be found in the dom", () => {
			setup();
			expect(wrapper.findComponent(ExternalToolToolbar).exists()).toBeTruthy();
		});
	});

	describe("component is rendered", () => {
		it("should have to v-icon buttons for actions", () => {
			setup();

			const actions = wrapper.findAll("button");

			expect(actions.length).toEqual(2);
			expect(actions.at(0).classes()).toContain("v-icon");
			expect(actions.at(1).classes()).toContain("v-icon");
		});

		describe("when action button is clicked", () => {
			it("should emit edit event", async () => {
				setup();

				const editButton = wrapper.find("[data-testId=editAction]");
				await editButton.trigger("click");

				expect(wrapper.emitted("edit")).toHaveLength(1);
			});

			it("should emit delete event", async () => {
				setup();

				const editButton = wrapper.find("[data-testId=deleteAction]");
				await editButton.trigger("click");

				expect(wrapper.emitted("delete")).toHaveLength(1);
			});
		});
	});
});
