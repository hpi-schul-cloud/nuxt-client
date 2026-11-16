import { vInputAttrs } from "./inputAttrs.directive";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, nextTick, ref } from "vue";

describe("vInputAttrs directive", () => {
	const attrs = ref<Record<string, string>>({});
	const innerTag = ref("input");

	const TestComponent = defineComponent({
		directives: { inputAttrs: vInputAttrs },
		setup: () => ({ attrs, innerTag }),
		template: `
			<div class="outer" v-input-attrs="attrs">
				<component :is="innerTag" class="inner" />
			</div>
		`,
	});

	const setup = (value: Record<string, string>, tag = "input") => {
		attrs.value = value;
		innerTag.value = tag;
		return mount(TestComponent);
	};

	it("sets attributes on nested input element", () => {
		const wrapper = setup({ id: "email", "data-testid": "user_email" });
		const input = wrapper.find(".inner");

		expect(input.attributes("id")).toBe("email");
		expect(input.attributes("data-testid")).toBe("user_email");
	});

	it("updates attributes when the binding changes", async () => {
		const wrapper = setup({ "data-testid": "user_email" }, "textarea");
		attrs.value = { "data-testid": "user_email_readonly" };
		await nextTick();

		expect(wrapper.find(".inner").attributes("data-testid")).toBe("user_email_readonly");
	});

	it("does nothing when there is no nested form element", () => {
		const wrapper = setup({ id: "email" }, "span");

		expect(wrapper.find(".outer").attributes("id")).toBeUndefined();
		expect(wrapper.find(".inner").attributes("id")).toBeUndefined();
	});
});
