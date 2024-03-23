import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import BoardMenu from "./BoardMenu.vue";

describe("BoardMenu Component", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(BoardMenu, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			slots: {
				default: "<div>Delete Card</div>",
			},
			props: { scope: "card" },
		});

		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const wrapper = setup();
			expect(wrapper).toBeDefined();
		});

		it("should have correct slot element", () => {
			const wrapper = setup();
			const htmlElement = wrapper.element.innerHTML;

			expect(htmlElement).toContain("<div>Delete Card</div>");
		});
	});
});
