import InputWrapperWithCheckmark from "./InputWrapperWithCheckmark.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("InputWrapperWithCheckmark", () => {
	const setup = (options = {}) => {
		const wrapper = mount(InputWrapperWithCheckmark, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...options,
		});

		return wrapper;
	};

	it("should render component", () => {
		const wrapper = setup();

		const inputWrapperWithCheckmark = wrapper.findComponent(InputWrapperWithCheckmark);

		expect(inputWrapperWithCheckmark.exists()).toBe(true);
	});

	it("should emit confirm on click", async () => {
		const wrapper = setup();

		const btn = wrapper.findComponent(InputWrapperWithCheckmark).find("button");
		await btn.trigger("click");

		expect(wrapper.emitted("confirm")).toHaveLength(1);
	});

	it("should emit confirm on keydown enter", async () => {
		const wrapper = setup();

		const btn = wrapper.findComponent(InputWrapperWithCheckmark).find("button");
		await btn.trigger("keydown", { key: "Enter" });

		expect(wrapper.emitted("confirm")).toHaveLength(1);
	});

	describe("DOM events", () => {
		it("should stop click event propagation", async () => {
			const wrapper = setup();
			const btn = wrapper.findComponent(InputWrapperWithCheckmark).find("button");

			const parent = document.createElement("div");
			document.body.appendChild(parent);
			parent.appendChild(wrapper.element);

			let bubbled = false;
			parent.addEventListener("click", () => {
				bubbled = true;
			});

			await btn.trigger("click");

			expect(bubbled).toBe(false);
		});

		it("should stop keydown enter event propagation", async () => {
			const wrapper = setup();
			const btn = wrapper.findComponent(InputWrapperWithCheckmark).find("button");

			const parent = document.createElement("div");
			document.body.appendChild(parent);
			parent.appendChild(wrapper.element);

			let bubbled = false;
			parent.addEventListener("keydown", (e) => {
				if (e.key === "Enter") {
					bubbled = true;
				}
			});
			await btn.trigger("keydown", { key: "Enter" });
			expect(bubbled).toBe(false);
		});
	});
});
