import CardTitle from "./CardTitle.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";

const componentProps = {
	value: "props value",
	isFocused: true,
};

describe("CardTitle", () => {
	const setup = (options: { isEditMode: boolean }) => {
		document.body.setAttribute("data-app", "true");
		const wrapper = shallowMount(CardTitle, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			propsData: {
				...componentProps,
				isEditMode: options.isEditMode,
			},
			provide: {
				CARD_HOST_INTERACTION_EVENT: undefined,
			},
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ isEditMode: false });
			expect(wrapper).toBeDefined();
		});

		it("should pass the value to its sub component", async () => {
			const { wrapper } = setup({ isEditMode: true });
			const anyTitleInput = wrapper.findComponent({
				name: "BoardAnyTitleInput",
			});
			expect(anyTitleInput.attributes("value")).toStrictEqual("props value");
		});

		it("should bubble enter event", async () => {
			const { wrapper } = setup({ isEditMode: true });
			const anyTitleInput = wrapper.findComponent({
				name: "BoardAnyTitleInput",
			});
			anyTitleInput.vm.$emit("enter");
			const emitted = wrapper.emitted();

			expect(emitted["enter"]).toHaveLength(1);
		});
	});
});
