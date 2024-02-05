import { mount, Wrapper } from "@vue/test-utils";
import ExternalToolToolbar from "./ExternalToolToolbar.vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { I18N_KEY } from "@/utils/inject";

describe("ExternalToolToolbar", () => {
	let wrapper: Wrapper<any>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = mount(ExternalToolToolbar, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
			},
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

			expect(actions.length).toEqual(3);
			expect(actions.at(0).classes().includes("v-btn--icon")).toBeTruthy();
			expect(actions.at(1).classes().includes("v-btn--icon")).toBeTruthy();
			expect(actions.at(2).classes().includes("v-btn--icon")).toBeTruthy();
		});

		describe("when action button is clicked", () => {
			it("should emit edit event", async () => {
				setup();

				const editButton = wrapper.find("[data-testId=editAction]");
				await editButton.trigger("click");

				expect(wrapper.emitted("edit")).toHaveLength(1);
			});

			it("should emit datasheet event", async () => {
				setup();

				const datasheetButton = wrapper.find("[data-testId=datasheetAction]");
				await datasheetButton.trigger("click");

				expect(wrapper.emitted("datasheet")).toHaveLength(1);
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
