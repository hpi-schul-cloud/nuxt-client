import { vInputAttrs } from "./inputAttrs.directive";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent } from "vue";

describe("vInputAttrs directive", () => {
	it("sets attributes on nested input element", () => {
		const TestComponent = defineComponent({
			directives: { inputAttrs: vInputAttrs },
			template: `
				<div v-input-attrs="{ id: 'email', 'data-testid': 'user_email' }">
					<input class="inner-input" />
				</div>
			`,
		});

		const wrapper = mount(TestComponent);
		const input = wrapper.find(".inner-input");

		expect(input.attributes("id")).toBe("email");
		expect(input.attributes("data-testid")).toBe("user_email");
	});
});
