import ExternalToolToolbar from "./ExternalToolToolbar.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("ExternalToolToolbar", () => {
	const setup = () => {
		const wrapper = mount(ExternalToolToolbar, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});
		return { wrapper };
	};

	describe("when component is used", () => {
		it("should be found in the dom", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(ExternalToolToolbar).exists()).toBeTruthy();
		});
	});

	describe("component is rendered", () => {
		it("should have two v-icon buttons for actions", () => {
			const { wrapper } = setup();

			const actions = wrapper.findAll("button");

			expect(actions.length).toEqual(3);
			expect(actions.at(0)?.classes().includes("v-btn--icon")).toBeTruthy();
			expect(actions.at(1)?.classes().includes("v-btn--icon")).toBeTruthy();
			expect(actions.at(2)?.classes().includes("v-btn--icon")).toBeTruthy();
		});

		describe("when action button is clicked", () => {
			it("should emit edit event", async () => {
				const { wrapper } = setup();

				const editButton = wrapper.find("[data-testId=editAction]");
				await editButton.trigger("click");

				expect(wrapper.emitted("edit")).toHaveLength(1);
			});

			it("should emit datasheet event", async () => {
				const { wrapper } = setup();

				const datasheetButton = wrapper.find("[data-testId=datasheetAction]");
				await datasheetButton.trigger("click");

				expect(wrapper.emitted("datasheet")).toHaveLength(1);
			});

			it("should emit delete event", async () => {
				const { wrapper } = setup();

				const editButton = wrapper.find("[data-testId=deleteAction]");
				await editButton.trigger("click");

				expect(wrapper.emitted("delete")).toHaveLength(1);
			});
		});
	});
});
